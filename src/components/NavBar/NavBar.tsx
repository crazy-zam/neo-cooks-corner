import React, { useState } from 'react';
import {
  LogoSmall,
  HomeIcon,
  SearchIcon,
  ProfileIcon,
  ExitIcon,
} from '@/assets';
import styles from './navBar.module.less';
const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className={styles.wrapper}>
      <div className={styles.btnBlock}>
        <div className={styles.logo}>
          <LogoSmall className={styles.logoImg} />

          <div className={styles.logoTxt}>CooksCorner</div>
        </div>
        <div className={styles.line}></div>
        <button className={styles.activeTab}>
          <HomeIcon className={styles.icon} />
        </button>
        <button className={styles.tab}>
          <SearchIcon className={styles.icon} />
        </button>
        <button className={styles.tab}>
          <ProfileIcon className={styles.icon} />
        </button>
      </div>
      <button className={styles.exitTab}>
        <ExitIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default NavBar;
