import React from 'react';
import classes from './SocialNetworks.module.scss';
import fbLogo from '../../../assets/img/fb-logo.png';
import twLogo from '../../../assets/img/twitter-logo.png';
import liLogo from '../../../assets/img/linkedIn-logo.png';

const SocialNetworks = () => {
  return (
    <ul className={classes.SocialNetwork}>
      <li>
        <img src={fbLogo} alt="Facebook logo" />
      </li>
      <li>
        <img className={classes.twitter} src={twLogo} alt="Twitter logo" />
      </li>
      <li>
        <img className={classes.linkedIn} src={liLogo} alt="LinkedIn logo" />
      </li>
    </ul>
  );
};

export default SocialNetworks;
