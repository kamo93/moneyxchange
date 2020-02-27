import React from 'react';
import classes from './historic-currency.module.scss';
import { getMonthName, getDay } from '../../../utils';
import PropTypes from 'prop-types';

const HistoricCurrency = props => {
  return (
    <div className="col-sm-6 col-12">
      <h5 className={classes.subTitle}>{props.name}</h5>
      <ul>
        {props.values.map((val, index) => (
          <li key={index}>
            <b>
              {getMonthName(Object.keys(val)[0])} - {getDay(Object.keys(val)[0])}:
            </b>
            <span className={classes.values}>
              {props.symbol} {val[Object.keys(val)[0]]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

HistoricCurrency.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array
};

export default HistoricCurrency;
