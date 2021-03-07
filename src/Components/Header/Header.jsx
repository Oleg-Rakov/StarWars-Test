import React from 'react';
import styles from './Header.module.css';

const Header = ({currentPage}) => (
  <div className={styles.headerBlock}>
    <div>
      STARWARS TEST
    </div>
    <div>
      PageCount: {currentPage}
    </div>
  </div>
);

export default Header;
