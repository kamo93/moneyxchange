import React, { useEffect, useState, useCallback, Fragment } from 'react';
import classes from './currencies.module.scss';
import CurrencyChange from '../../components/currency-change/currency-change';
import HistoricCurrencies from '../../components/historic-currencies/historic-currencies';
import axiosInstance from '../../custom-axios';
import { formatDate, removeFormatCurrency, formatCompleteCurrency } from '../../utils';
import {
  NUMBER_OF_DAYS_HISTORIC,
  CURRENCIES_LIST,
  ERROR_MSG,
  DELAY_HISTORIC,
  PATH_LATEST,
  DELAY_LATEST,
  TIMER_GET_LATEST_RATES
} from '../../constants';
import useHttpState from '../../hooks/http-state';

const lastDays = [];
for (let i = 0; i < NUMBER_OF_DAYS_HISTORIC; i++) {
  lastDays.push(formatDate(new Date(new Date().setDate(new Date().getDate() - (i + 1)))));
}
const httpStateInit = {
  loading: false,
  error: null
};

const Currencies = () => {
  const [httpState, dispatchHttpState] = useHttpState(httpStateInit);
  const [httpStateExchange, dispatchHttpStateExchange] = useHttpState(httpStateInit);
  const [historic, setHistoric] = useState([]);
  const [newCurrency, setNewCurrency] = useState({ symbol: 'USD', value: 0 });

  // Get Historic currencies
  useEffect(() => {
    const httpHistoricCalls = [];
    lastDays.forEach(day => {
      httpHistoricCalls.push(
        axiosInstance.get(`/${day}`, {
          params: {
            symbols: Object.keys(CURRENCIES_LIST).join(',')
          }
        })
      );
    });
    dispatchHttpState({ type: 'SEND_REQUEST' });
    setTimeout(() => {
      Promise.all(httpHistoricCalls)
        .then(responses => {
          dispatchHttpState({ type: 'SUCCESS' });
          const keys = Object.keys(CURRENCIES_LIST);
          const historicPerCurrency = [];
          for (const key of keys) {
            const values = [];
            for (let i = 0; i < responses.length; i++) {
              values.push({
                [responses[i].data.timestamp]: formatCompleteCurrency(responses[i].data.rates[key].toString())
              });
            }
            historicPerCurrency.push({ currency: key, values: [...values], symbol: CURRENCIES_LIST[key] });
          }
          setHistoric(historicPerCurrency);
        })
        .catch(() => {
          dispatchHttpState({ type: 'ERROR', errorMsg: ERROR_MSG.historic });
        });
    }, DELAY_HISTORIC);
  }, [dispatchHttpState]);

  const getLatestRate = useCallback(
    (moneyToConvert, symbol) => {
      setTimeout(() => {
        axiosInstance
          .get(PATH_LATEST, { params: { symbols: symbol } })
          .then(res => {
            dispatchHttpStateExchange({ type: 'SUCCESS' });
            setNewCurrency({
              value: formatCompleteCurrency((res.data.rates[symbol] * removeFormatCurrency(moneyToConvert)).toString()),
              symbol
            });
          })
          .catch(() => {
            dispatchHttpStateExchange({ type: 'ERROR', errorMsg: ERROR_MSG.latest });
          });
      }, DELAY_LATEST);
    },
    [dispatchHttpStateExchange]
  );

  useEffect(() => {
    let updateRateTimer;
    if (newCurrency.value !== 0) {
      updateRateTimer = setTimeout(() => {
        getLatestRate(newCurrency.value, newCurrency.symbol);
      }, TIMER_GET_LATEST_RATES);
    }
    return () => {
      clearTimeout(updateRateTimer);
    };
  }, [newCurrency, getLatestRate]);

  const changeMoneyHandler = (moneyToConvert, symbol) => {
    dispatchHttpStateExchange({ type: 'SEND_REQUEST' });
    getLatestRate(moneyToConvert, symbol);
  };

  return (
    <Fragment>
      <section className={classes.SectionContainer}>
        <CurrencyChange
          onCalculateMoney={changeMoneyHandler}
          changedMoney={newCurrency.value}
          loading={httpStateExchange.loading}
          error={httpStateExchange.error}
        />
      </section>
      <section className={classes.SectionContainer}>
        <HistoricCurrencies historic={historic} isLoading={httpState.loading} error={httpState.error} />
      </section>
    </Fragment>
  );
};

export default Currencies;
