import React, { useState } from 'react';
import classes from './currency-change.module.scss';
import InputChange from '../form/input-change/input-change';
import { CURRENCIES_LIST, CURRENCY_DEFAULT, LABEL_CONVERT, LABEL_RESULT } from '../../constants';
import Select from '../form/select/select';
import { removeFormatCurrency, formatCompleteCurrency } from '../../utils';
import PropTypes from 'prop-types';

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
            isReadOnly={false}
            textValue={moneyToConvert}
            changed={onChangedHandler}
            symbol={CURRENCY_DEFAULT.EUR}
            blur={formatThousandsHandler}
            focus={removeFormatThousandsHandler}
          />
          <Select list={Object.keys(CURRENCY_DEFAULT)} disabled={true} />
        </div>
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange
            label={LABEL_RESULT}
            isReadOnly={true}
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

CurrencyChange.propTypes = {
  loading: PropTypes.bool,
  onCalculateMoney: PropTypes.func,
  changedMoney: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default CurrencyChange;
