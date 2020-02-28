import React, { useState, useCallback } from 'react';
import classes from './currency-change.module.scss';
import InputChange from '../form/input-change/input-change';
import { CURRENCIES_LIST, CURRENCY_DEFAULT, LABEL_CONVERT, LABEL_RESULT } from '../../constants';
import Select from '../form/select/select';
import { removeFormatCurrency, formatCompleteCurrency } from '../../utils';
import PropTypes from 'prop-types';

const converterList = Object.keys(CURRENCY_DEFAULT);
const resultList = Object.keys(CURRENCIES_LIST);

const CurrencyChange = React.memo(props => {
  const [moneyToConvert, setMoneyToConvert] = useState('');
  const [symbolSelected, setSymbolSelected] = useState('USD');

  const onChangedHandler = event => {
    const getNumber = event.target.value.split(' ')[1];
    let newValue;
    if (getNumber) {
      const cleanNumber = getNumber.split(',');
      newValue = Number(cleanNumber.join()) ? getNumber : moneyToConvert;
    } else {
      newValue = getNumber;
    }
    setMoneyToConvert(newValue);
  };

  const formatThousandsHandler = useCallback(event => {
    setMoneyToConvert(formatCompleteCurrency(event.target.value));
  }, []);

  const removeFormatThousandsHandler = useCallback(event => {
    const withoutFormat = removeFormatCurrency(event.target.value);
    setMoneyToConvert(withoutFormat);
  }, []);

  const onSymbolHandler = useCallback(event => {
    setSymbolSelected(event.target.value);
  }, []);

  const onClickHandler = () => {
    props.onCalculateMoney(moneyToConvert, symbolSelected);
  };

  return (
    <div className={[classes.CurrencyChange, 'container-fluid'].join(' ')}>
      <div className="row">
        <div className={[classes.joinInputs, 'col-lg-6 col-12'].join(' ')}>
          <InputChange
            id="converter"
            label={LABEL_CONVERT}
            isReadOnly={false}
            textValue={moneyToConvert}
            changed={onChangedHandler}
            symbol={CURRENCY_DEFAULT.EUR}
            blur={formatThousandsHandler}
            focus={removeFormatThousandsHandler}
          />
          <Select list={converterList} disabled={true} />
        </div>
        <div className={[classes.joinInputs, 'col-lg-6 col-12'].join(' ')}>
          <InputChange
            id="changed-money"
            label={LABEL_RESULT}
            isReadOnly={true}
            textValue={props.changedMoney}
            symbol={CURRENCIES_LIST[symbolSelected]}
          />
          <Select list={resultList} symbolSelected={symbolSelected} onSymbolChanged={onSymbolHandler} />
        </div>
      </div>
      <div className={classes.btnCalculate}>
        <button className="btn btn-primary" disabled={!moneyToConvert} onClick={onClickHandler}>
          CALCULATE
          {props.loading && (
            <div className={[classes.loader, 'spinner-border'].join(' ')} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
        {props.error && <p className={classes.serviceError}>{props.error}</p>}
      </div>
    </div>
  );
});

CurrencyChange.propTypes = {
  loading: PropTypes.bool,
  onCalculateMoney: PropTypes.func,
  changedMoney: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default CurrencyChange;
