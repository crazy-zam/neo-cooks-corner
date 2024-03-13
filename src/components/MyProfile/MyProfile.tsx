import { dishes } from '@/api/dishes';
import styles from './myProfile.module.less';
import ChefDescription from '../ChefDescription/ChefDescription';
import Grid from '../Grid/Grid';
import BackBtn from '@/UI/BackBtn/BackBtn';
import { chefs } from '@/api/chefs';
import { useFormik } from 'formik';
import { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { Camera } from '@/assets';

const MyProfile = () => {
  const chef = chefs[0];
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const formik = useFormik({
    initialValues: {
      fullName: '',
      bio: '',
      file: '',
      tempFileURL: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });
  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <div className={styles.title}>Profile</div>
      <div className={styles.header}>
        <img className={styles.avatar} src={chef.photo} alt="avatar" />
        <ChefDescription
          author={chef.author}
          followers={chef.followers}
          recipes={chef.recipes}
          following={chef.following}
          bio={chef.bio}
          isFollow={chef.isFollow}
          myProfile={true}
        />
      </div>
      <button onClick={openModal}>Open Modal</button>
      <div className={styles.tabs}>
        <button className={styles.tab}>My recipe</button>
        <button className={styles.activeTab}>Saved recipe</button>
      </div>
      <div className={styles.grid}>
        <Grid array={dishes} />
      </div>
      <ModalContainer modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <div>Manage profile</div>
        <button>X</button>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="fullName">
            Change your name
          </label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Change your name"
            type="text"
            className={styles.inputName}
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          <label className={styles.label} htmlFor="bio">
            Change your bio
          </label>
          <input
            id="bio"
            name="bio"
            placeholder="Change your bio"
            type="text"
            className={styles.inputBio}
            onChange={formik.handleChange}
            value={formik.values.bio}
          />
          <label className={styles.label} htmlFor="file">
            Add your photo
          </label>
          <label htmlFor="file" className={styles.inputPhoto}>
            {formik.values.tempFileURL ? (
              <>
                <img
                  className={styles.smallImg}
                  src={formik.values.tempFileURL}
                  alt="Change photo"
                />
              </>
            ) : (
              <>
                <Camera /> <div>Upload a new photo</div>
              </>
            )}
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className={styles.hiddenInput}
            onChange={(ev) => {
              formik.setFieldValue('file', ev.target.files[0]);
              formik.setFieldValue(
                'tempFileURL',
                ev.target.files.length === 0
                  ? ''
                  : URL.createObjectURL(ev.target.files[0]),
              );
            }}
            // value={formik.values.file}
          />

          <button type="submit">Submit</button>
        </form>
      </ModalContainer>
    </div>
  );
};

export default MyProfile;
