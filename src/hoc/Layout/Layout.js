import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.scss';

const Layout = props => (
  <React.Fragment>
    <Header />
    <main className={classes.Layout}>{props.child}</main>
    <Footer />
  </React.Fragment>
);

export default Layout;
