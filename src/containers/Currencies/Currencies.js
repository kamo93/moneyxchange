import React, { useEffect, useReducer, useState } from 'react';
import classes from './Currencies.module.scss';
import CurrencyChange from '../../components/CurrencyChange/CurrencyChange';
import HistoricCurrencies from '../../components/HistoricCurrencies/HistoricCurrencies';
import axiosInstance from '../../custom-axios';
import { formatDate } from '../../utils';
import { NUMBER_OF_DAYS_HISTORIC, CURRENCIES_LIST, ERROR_MSG, DELAY_HISTORIC } from '../../constants';

const lastDays = [];
for (let i = 0; i < NUMBER_OF_DAYS_HISTORIC; i++) {
  lastDays.push(formatDate(new Date(new Date().setDate(new Date().getDate() - (i + 1)))));
}

const httpStateInit = {
  loading: false,
  error: null
};
const httpStateReducer = (currentHttpReducer, action) => {
  switch (action.type) {
    case 'SEND_REQUEST':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.errorMsg };
    default:
      throw new Error(`Action type not handle correctly ${action.type}`);
  }
};

const Currencies = () => {
  const [httpState, dispatchHttpState] = useReducer(httpStateReducer, httpStateInit);
  const [historic, setHistoric] = useState([]);

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
          dispatchHttpState({ type: 'RESPONSE' });
          const keys = Object.keys(CURRENCIES_LIST);
          const historicPerCurrency = [];
          for (const key of keys) {
            const values = [];
            for (let i = 0; i < responses.length; i++) {
              values.push({ [responses[i].data.timestamp]: responses[i].data.rates[key] });
            }
            historicPerCurrency.push({ currency: key, values: [...values], symbol: CURRENCIES_LIST[key] });
          }
          setHistoric(historicPerCurrency);
        })
        .catch(() => {
          dispatchHttpState({ type: 'ERROR', errorMsg: ERROR_MSG.historic });
        });
    }, DELAY_HISTORIC);
  }, []);

  return (
    <React.Fragment>
      <section className={classes.SectionContainer}>
        <CurrencyChange />
      </section>
      <section className={classes.SectionContainer}>
        <HistoricCurrencies historic={historic} loading={httpState.loading} />
      </section>
    </React.Fragment>
  );
};

export default Currencies;
