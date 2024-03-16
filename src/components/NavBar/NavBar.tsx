import { useState } from 'react';
import ModalContainer from '@/components/ModalContainer/ModalContainer';
import {
  LogoSmall,
  HomeIcon,
  SearchIcon,
  ProfileIcon,
  ExitIcon,
} from '@/assets';
import styles from './navBar.module.less';
import userStore from '@/store/userStore';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import appStore from '@/store/appStore';
const NavBar = observer(() => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const setStyle = (page: 'main' | 'search' | 'profile') =>
    appStore.page === page ? styles.activeTab : styles.tab;
  return (
    <div className={styles.wrapper}>
      <div className={styles.btnBlock}>
        <div className={styles.logo}>
          <LogoSmall className={styles.logoImg} />
          <div className={styles.logoTxt}>CooksCorner</div>
        </div>
        <div className={styles.line}></div>
        <Link
          to="/main"
          className={setStyle('main')}
          onClick={() => appStore.setPage('main')}
        >
          <HomeIcon className={styles.icon} />
        </Link>
        <Link
          to="/search"
          className={setStyle('search')}
          onClick={() => appStore.setPage('search')}
        >
          <SearchIcon className={styles.icon} />
        </Link>
        <Link
          to="/my-profile"
          className={setStyle('profile')}
          onClick={() => appStore.setPage('profile')}
        >
          <ProfileIcon className={styles.icon} />
        </Link>
      </div>
      <button className={styles.exitTab} onClick={openModal}>
        <ExitIcon className={styles.icon} />
      </button>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Are you sure you wanna leave?"
      >
        <div>
          <button className={styles.btnExitYes} onClick={userStore.logout}>
            Yes
          </button>
          <button className={styles.btnExitNo} onClick={closeModal}>
            No
          </button>
        </div>
      </ModalContainer>
    </div>
  );
});

export default NavBar;
