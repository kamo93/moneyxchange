import React from 'react';
import Header from '../components/Header/Header';

const Layout = props => (
  <React.Fragment>
    <Header />
    <main>{props.child}</main>
  </React.Fragment>
);

export default Layout;
