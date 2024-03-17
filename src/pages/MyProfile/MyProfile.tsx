import { dishes } from '@/api/dishes';
import styles from './myProfile.module.less';
import ChefDescription from '../../components/ChefDescription/ChefDescription';
import Grid from '../../components/Grid/Grid';
import BackBtn from '@/UI/BackBtn/BackBtn';
import { chefs } from '@/api/chefs';
import { useState } from 'react';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import FormChangeProfile from '../../components/FormChangeProfile/FormChangeProfile';
import userStore from '@/store/userStore';
import PageBtnGroup from '@/UI/PageBtnGroup/PageBtnGroup';

import { observer } from 'mobx-react-lite';
import Loader from '@/UI/Loader/Loader';

const MyProfile = observer(() => {
  const chef = chefs[0];
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const addBtn = (category: 'my' | 'saved') => {
    return (
      <button
        className={
          userStore.recipesArrCategory === category
            ? styles.activeTab
            : styles.tab
        }
        onClick={() => {
          userStore.setCategory(category);
        }}
      >
        {category === 'my' ? 'My recipe' : 'Saved recipe'}
      </button>
    );
  };
  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <div className={styles.title}>Profile</div>
      <div className={styles.header}>
        <img className={styles.avatar} src={chef.image} alt="avatar" />
        <div>
          <ChefDescription
            author={userStore.username}
            followers={userStore.followers}
            recipes={userStore.recipes}
            following={userStore.follow}
            bio={userStore.bio}
            myProfile={true}
          />
          <button className={styles.buttonProfile} onClick={openModal}>
            Manage Profile
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        {addBtn('my')}
        {addBtn('saved')}
      </div>
      <div className={styles.grid}>
        {userStore.isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid array={dishes} />
            <PageBtnGroup store={userStore} />
          </>
        )}
      </div>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Manage profile"
        closeModalBtn={true}
      >
        <FormChangeProfile />
      </ModalContainer>
    </div>
  );
});

export default MyProfile;
