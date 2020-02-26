import React, { useState } from 'react';
import classes from './CurrencyChange.module.scss';
import InputChange from '../Form/InputChange/InputChange';
import { CURRENCIES_LIST, CURRENCY_DEFAULT, LABEL_CONVERT, LABEL_RESULT } from '../../constants';
import Select from '../Form/Select/Select';
import { removeFormatCurrency, formatCompleteCurrency } from '../../utils';

const CurrencyChange = React.memo(props => {
  const [moneyToConvert, setMoneyToConvert] = useState('');
  const [symbolSelected, setSymbolSelected] = useState('USD');

  const onChangedHandler = event => {
    const getNumber = event.target.value.split(' ')[1];
    const cleanNumber = getNumber.split(',');
    const numberValue = Number(cleanNumber.join()) ? event.target.value.split(' ')[1] : moneyToConvert;
    setMoneyToConvert(numberValue);
  };

  const formatThousandsHandler = event => {
    setMoneyToConvert(formatCompleteCurrency(event.target.value));
  };

  const removeFormatThousandsHandler = event => {
    const withoutFormat = removeFormatCurrency(event.target.value);
    setMoneyToConvert(withoutFormat);
  };

  const onSymbolHandler = event => {
    setSymbolSelected(event.target.value);
  };

  const onClickHandler = () => {
    props.onCalculateMoney(moneyToConvert, symbolSelected);
  };

  return (
    <div className={[classes.CurrencyChange, 'container-fluid'].join(' ')}>
      <div className="row">
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange
            label={LABEL_CONVERT}
            convert={true}
            textValue={moneyToConvert}
            changed={onChangedHandler}
            symbol={CURRENCY_DEFAULT.EUR}
            format={formatThousandsHandler}
            focus={removeFormatThousandsHandler}
          />
          <Select list={Object.keys(CURRENCY_DEFAULT)} disabled={true} />
        </div>
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange
            label={LABEL_RESULT}
            convert={false}
            textValue={props.changedMoney}
            symbol={CURRENCIES_LIST[symbolSelected]}
          />
          <Select
            list={Object.keys(CURRENCIES_LIST)}
            symbolSelected={symbolSelected}
            onSymbolChanged={onSymbolHandler}
          />
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
      </div>
    </div>
  );
});

export default CurrencyChange;
