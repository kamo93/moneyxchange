import React from 'react';
import classes from './InputChange.module.scss';

const InputChange = () => {
  return (
    <React.Fragment>
      <div className={[classes.InputChange, 'form-group'].join(' ')}>
        <input type="text" className="form-control" placeholder="$10.00" />
      </div>
      <div className={[classes.InputChange, 'form-group'].join(' ')}>
        <select name="currencies" id="currencyFrom" defaultValue={'usd'} disabled>
          <option value="USD">EUR</option>
        </select>
      </div>
    </React.Fragment>
  );
};

export default InputChange;
