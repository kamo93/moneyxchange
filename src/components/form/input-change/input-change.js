import React from 'react';
import classes from './input-change.module.scss';
import PropTypes from 'prop-types';

const InputChange = React.memo(props => {
  return (
    <div className={[classes.InputChange, 'form-group'].join(' ')}>
      <label>{props.label}</label>
      <input
        id={props.id}
        type="text"
        pattern="[0-9.]*"
        className="form-control"
        value={`${props.symbol} ${props.textValue}`}
        readOnly={props.isReadOnly}
        onChange={event => {
          props.changed(event);
        }}
        onBlur={event => {
          props.blur(event);
        }}
        onFocus={event => {
          props.focus(event);
        }}
      />
    </div>
  );
});

InputChange.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string,
  textValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isReadOnly: PropTypes.bool,
  changed: PropTypes.func,
  blur: PropTypes.func,
  focus: PropTypes.func
};

export default InputChange;
