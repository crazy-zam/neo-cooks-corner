import { dishes } from '@/api/dishes';
import styles from './myProfile.module.less';
import ChefDescription from '../../components/ChefDescription/ChefDescription';
import Grid from '../../components/Grid/Grid';
import BackBtn from '@/UI/BackBtn/BackBtn';
import { chefs } from '@/api/chefs';

import { useState } from 'react';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import { CloseModal } from '@/assets';
import FormChangeProfile from '../../components/FormChangeProfile/FormChangeProfile';

const MyProfile = () => {
  const chef = chefs[0];
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <div className={styles.title}>Profile</div>
      <div className={styles.header}>
        <img className={styles.avatar} src={chef.photo} alt="avatar" />
        <div>
          <ChefDescription
            author={chef.author}
            followers={chef.followers}
            recipes={chef.recipes}
            following={chef.following}
            bio={chef.bio}
            myProfile={true}
          />
          <button className={styles.buttonProfile} onClick={openModal}>
            Manage Profile
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={styles.tab}>My recipe</button>
        <button className={styles.activeTab}>Saved recipe</button>
      </div>
      <div className={styles.grid}>
        <Grid array={dishes} />
      </div>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Manage profile"
      >
        <button className={styles.buttonCloseModal} onClick={closeModal}>
          <CloseModal />
        </button>
        <FormChangeProfile />
      </ModalContainer>
    </div>
  );
};

export default MyProfile;
