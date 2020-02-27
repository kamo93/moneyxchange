import React from 'react';
import classes from './historic-currencies.module.scss';
import HistoricCurrency from './historic-currency/historic-currency';
import { SkeletonTheme } from 'react-loading-skeleton';
import HistoricCurrenciesSkeleton from './historic-currencies-skeleton';
import PropTypes from 'prop-types';

const HistoricCurrencies = React.memo(props => {
  let component = <HistoricCurrenciesSkeleton />;

  if (!props.isLoading) {
    component = props.historic.map((his, index) => (
      <HistoricCurrency name={his.currency} values={his.values} symbol={his.symbol} key={index} />
    ));
  }

  return (
    <div className={classes.HistoricCurrency}>
      <h2 className={classes.SectionTitle}>HISTORIC PRICE</h2>
      <SkeletonTheme color="#174668" highlightColor="#6B899E">
        <div className="row">{component}</div>
      </SkeletonTheme>
    </div>
  );
});

HistoricCurrencies.propTypes = {
  isLoading: PropTypes.bool,
  historic: PropTypes.array
};

export default HistoricCurrencies;
