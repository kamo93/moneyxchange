import React, { useState } from 'react';
import classes from './CurrencyChange.module.scss';
import InputChange from '../InputChange/InputChange';
import { LABEL_CONVERT, LABEL_RESULT } from '../../constants';

const CurrencyChange = props => {
  const [moneyToConvert, setMoneyToConvert] = useState('');
  const [symbolSelected, setSymbolSelected] = useState('USD');

  const onChangedHandler = event => {
    setMoneyToConvert(event.target.value);
  };

  const onSymbolHandler = event => {
    setSymbolSelected(event.target.value);
  };

  const onClickHandler = event => {
    console.log(event.stopProgation);
    props.onCalculatMoney(moneyToConvert, symbolSelected);
  };

  return (
    <div className={[classes.CurrencyChange, 'container-fluid'].join(' ')}>
      <div className="row">
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange label={LABEL_CONVERT} convert={true} textValue={moneyToConvert} changed={onChangedHandler} />
        </div>
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange
            label={LABEL_RESULT}
            convert={false}
            textValue={props.changedMoney}
            symbolSelected={symbolSelected}
            onSymbolChanged={onSymbolHandler}
          />
        </div>
      </div>
      <div className={classes.btnCalculate}>
        <button className="btn btn-primary" disabled={!moneyToConvert} onClick={onClickHandler}>
          CALCULATE
          <div
            className="spinner-border text-primary"
            style={{ position: 'absolute', top: '5px', left: 'calc(100% - 40px)' }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurrencyChange;
