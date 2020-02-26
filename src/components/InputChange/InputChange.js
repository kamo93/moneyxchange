import React from 'react';
import classes from './InputChange.module.scss';
import { CURRENCIES_LIST } from '../../constants';

const InputChange = props => {
  return (
    <React.Fragment>
      <div className={[classes.InputChange, 'form-group'].join(' ')}>
        <label>{props.label}</label>
        <input
          type="text"
          className="form-control"
          placeholder="$10.00"
          value={props.textValue}
          disabled={!props.convert}
          onChange={event => {
            props.changed(event);
          }}
        />
      </div>
      <div className={[classes.InputChange, classes.InputChangeSelect, 'form-group'].join(' ')}>
        <select
          className="form-control"
          name="currencies"
          id="currencyFrom"
          value={props.symbolSelected}
          onChange={event => {
            props.onSymbolChanged(event);
          }}
        >
          {Object.keys(CURRENCIES_LIST).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default InputChange;
