import React from 'react';
import classes from './Select.module.scss';

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
        {props.list.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
