import React from 'react';
import classes from './Header.module.scss';
import Logo from './Logo/Logo';

const Header = () => (
  <header className={classes.Header}>
    <div>
      <Logo />
      <nav className={classes.Navigation}>
        <ul className={classes.NavigationList}>
          <li className={[classes.NavigationListItem, classes.active].join(' ')}>HOME</li>
          <li className={classes.NavigationListItem}>ABOUT</li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
