import styles from './myProfile.module.less';
import ChefDescription from '../../components/ChefDescription/ChefDescription';
import Grid from '../../components/Grid/Grid';
import { useEffect, useState } from 'react';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import FormChangeProfile from '../../components/FormChangeProfile/FormChangeProfile';
import userStore from '@/store/userStore';
import PageBtnGroup from '@/UI/PageBtnGroup/PageBtnGroup';
import { observer } from 'mobx-react-lite';
import Loader from '@/UI/Loader/Loader';
import { defaultPhoto } from '@/assets';
import FormChangePassword from '@/components/FormChangePassword/FormChangePassword';

const MyProfile = observer(() => {
  const [modalProfileIsOpen, setmodalProfileIsOpen] = useState(false);
  const [modalPasswordIsOpen, setmodalPasswordIsOpen] = useState(false);
  useEffect(() => {
    userStore.getRecipesAction();
  }, []);
  const toggleProfileModal = (state: boolean) => () => {
    setmodalProfileIsOpen(state);
  };
  const togglePasswordModal = (state: boolean) => () => {
    setmodalPasswordIsOpen(state);
  };

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
      <div className={styles.title}>Profile</div>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={userStore.photo ? userStore.photo : defaultPhoto}
          alt="avatar"
        />
        <div>
          <ChefDescription
            author={userStore.username}
            followers={userStore.followers}
            recipes={userStore.recipes}
            following={userStore.follow}
            bio={userStore.bio}
            myProfile={true}
          />
          <button
            className={styles.buttonProfile}
            onClick={toggleProfileModal(true)}
          >
            Manage Profile
          </button>
          <button
            className={styles.buttonProfile}
            onClick={togglePasswordModal(true)}
          >
            Change password
          </button>
        </div>
      </div>
      {userStore.isVerified ? (
        <>
          <div className={styles.tabs}>
            {addBtn('my')}
            {addBtn('saved')}
          </div>
          <div className={styles.grid}>
            {userStore.isLoading ? (
              <Loader />
            ) : (
              <>
                <Grid array={userStore.recipesArr} columns={4} />
                <PageBtnGroup store={userStore} />
              </>
            )}
          </div>
        </>
      ) : (
        <div className={styles.emailBlock}>
          <div className={styles.emailText}>
            You have not confirmed your email, functionality is limited for you.
            <br />
            To request another confirmation email click on the button below
          </div>
          <button
            className={styles.buttonProfile}
            onClick={() => {
              // resendEmailAPI('', '');
            }}
          >
            Request email
          </button>
        </div>
      )}

      <ModalContainer
        modalIsOpen={modalProfileIsOpen}
        closeModal={toggleProfileModal(false)}
        title="Manage profile"
        closeModalBtn={true}
      >
        <FormChangeProfile closeModal={toggleProfileModal(false)} />
      </ModalContainer>
      <ModalContainer
        modalIsOpen={modalPasswordIsOpen}
        closeModal={togglePasswordModal(false)}
        title="Change password"
        closeModalBtn={true}
      >
        <FormChangePassword closeModal={togglePasswordModal(false)} />
      </ModalContainer>
    </div>
  );
});

export default MyProfile;
