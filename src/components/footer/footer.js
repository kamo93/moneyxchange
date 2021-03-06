import React from 'react';
import SocialNetworks from './social-networks/social-networks';
import classes from './footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className="row">
        <div className={[classes.sectionContainers, 'col-md-3', 'col-12'].join(' ')}>
          <h3 className={classes.Title}>Money Xchange</h3>
          <p>
            We have the <strong>most precise currencies</strong> in the world.
          </p>
        </div>
        <div className="col-md-3 col-6">
          <h5 className={classes.sectionTitle}>Explore</h5>
          <ul className={classes.section}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 col-6">
          <h5 className={classes.sectionTitle}>Visit Us</h5>
          <ul className={classes.section}>
            <li>Bogotá, Colombia</li>
            <li>Cra. 13a #97-35</li>
          </ul>
        </div>
        <div className={[classes.sectionContainers, 'col-md-3', 'col-12'].join(' ')}>
          <h5 className={classes.sectionTitle}>Follow Us</h5>
          <SocialNetworks />
        </div>
      </div>
      <p>
        <small>© 2020 Money Xchange. All Rights Reserved.</small>
      </p>
    </footer>
  );
};

export default Footer;
