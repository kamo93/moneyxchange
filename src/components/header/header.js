import React from 'react';
import classes from './header.module.scss';
import Logo from './Logo/logo';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className={classes.Header}>
    <div>
      <Logo />
      <nav className={classes.Navigation}>
        <ul className={classes.NavigationList}>
          <li className={[classes.NavigationListItem, classes.active].join(' ')}>
            <NavLink exact to="/" activeClassName={classes.active}>
              HOME
            </NavLink>
          </li>
          <li className={classes.NavigationListItem}>
            <NavLink to="/about" activeClassName={classes.active}>
              ABOUT
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
