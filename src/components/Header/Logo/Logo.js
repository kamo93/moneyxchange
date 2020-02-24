import React from 'react';
import classes from './Logo.module.scss';
import LogoImg from '../../../assets/img/logo.png';

const Logo = () => {
  return (
    <figure className={classes.Logo}>
      <img src={LogoImg} alt="Logo money exchange" />
    </figure>
  );
};

export default Logo;
