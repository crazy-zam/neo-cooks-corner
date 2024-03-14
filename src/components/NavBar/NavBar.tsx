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
const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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
      <button className={styles.exitTab} onClick={openModal}>
        <ExitIcon className={styles.icon} />
      </button>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Are you sure you wanna leave?"
      >
        <div>
          <button className={styles.btnExitYes}>Yes</button>
          <button className={styles.btnExitNo} onClick={closeModal}>
            No
          </button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default NavBar;
