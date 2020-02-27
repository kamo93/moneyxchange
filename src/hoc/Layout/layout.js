import React, { Fragment } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import classes from './layout.module.scss';

const Layout = props => (
  <Fragment>
    <Header />
    <main className={classes.Layout}>{props.children}</main>
    <Footer />
  </Fragment>
);

export default Layout;
