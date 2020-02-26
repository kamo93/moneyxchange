import React from 'react';
import classes from './InputChange.module.scss';

const InputChange = props => {
  return (
    <div className={[classes.InputChange, 'form-group'].join(' ')}>
      <label>{props.label}</label>
      <input
        type="text"
        pattern="[0-9.]*"
        className="form-control"
        placeholder="$10.00"
        value={`${props.symbol} ${props.textValue}`}
        readOnly={!props.convert}
        onChange={event => {
          props.changed(event);
        }}
        onBlur={event => {
          props.format(event);
        }}
        onFocus={event => {
          props.focus(event);
        }}
      />
    </div>
  );
};

export default InputChange;
