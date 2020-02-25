import React from 'react';
import classes from './CurrencyChange.module.scss';
import InputChange from '../InputChange/InputChange';

const CurrencyChange = () => {
  return (
    <div className={[classes.CurrencyChange, 'container-fluid'].join(' ')}>
      <div className="row">
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange />
        </div>
        <div className={[classes.joinInputs, 'col-sm-6 col-12'].join(' ')}>
          <InputChange />
        </div>
      </div>
      <div className={classes.btnCalculate}>
        <button className="btn btn-primary">CALCULATE</button>
      </div>
    </div>
  );
};

export default CurrencyChange;
