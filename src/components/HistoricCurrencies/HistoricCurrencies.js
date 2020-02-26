import React from 'react';
import classes from './HistoricCurrencies.module.scss';
import HistoricCurrency from './HistoricCurrency/HistoricCurrency';
import { SkeletonTheme } from 'react-loading-skeleton';
import HistoricCurrenciesSkeleton from './HistoricCurrenciesSkeleton';

const HistoricCurrencies = React.memo(props => {
  let component = <HistoricCurrenciesSkeleton />;

  if (!props.loading) {
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

export default HistoricCurrencies;
