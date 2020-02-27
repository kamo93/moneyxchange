import React from 'react';
import classes from './select.module.scss';

const Select = props => {
  return (
    <div className={[classes.Select, 'form-group'].join(' ')}>
      <select
        className="form-control"
        disabled={props.disabled}
        value={props.symbolSelected}
        onChange={event => {
          props.onSymbolChanged(event);
        }}
      >
        {props.list.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
