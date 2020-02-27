import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { NUMBER_OF_SKELETONS } from '../../constants';

const HistoricCurrenciesSkeleton = () => {
  const skeletons = [];
  for (let i = 0; i < NUMBER_OF_SKELETONS; i++) {
    skeletons.push(
      <div className="col-sm-6 col-12" key={i}>
        <h5>
          <Skeleton width={100} height={20} />
        </h5>
        <ul>
          <li>
            <Skeleton width={300} />
          </li>
          <li>
            <Skeleton width={300} />
          </li>
          <li>
            <Skeleton width={300} />
          </li>
        </ul>
      </div>
    );
  }

  return skeletons.map(skeleton => skeleton);
};

export default HistoricCurrenciesSkeleton;
