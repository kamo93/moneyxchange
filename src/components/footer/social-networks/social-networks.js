import React from 'react';
import { LINKS_SOCIAL_NETWORKS } from '../../../constants';
import classes from './social-networks.module.scss';
import fbLogo from '../../../assets/img/fb-logo.png';
import twLogo from '../../../assets/img/twitter-logo.png';
import liLogo from '../../../assets/img/linkedIn-logo.png';

const SocialNetworks = () => {
  return (
    <ul className={classes.SocialNetwork}>
      <li>
        <a href={LINKS_SOCIAL_NETWORKS.FB} target="_blank" rel="noopener noreferrer">
          <img src={fbLogo} alt="Facebook logo" />
        </a>
      </li>
      <li>
        <a href={LINKS_SOCIAL_NETWORKS.TW} target="_blank" rel="noopener noreferrer">
          <img className={classes.twitter} src={twLogo} alt="Twitter logo" />
        </a>
      </li>
      <li>
        <a href={LINKS_SOCIAL_NETWORKS.LI} target="_blank" rel="noopener noreferrer">
          <img className={classes.linkedIn} src={liLogo} alt="LinkedIn logo" />
        </a>
      </li>
    </ul>
  );
};

export default SocialNetworks;
