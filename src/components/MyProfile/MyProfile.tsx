import { dishes } from '@/api/dishes';
import styles from './myProfile.module.less';
import ChefDescription from '../ChefDescription/ChefDescription';
import Grid from '../Grid/Grid';
import BackBtn from '@/UI/BackBtn/BackBtn';
import { chefs } from '@/api/chefs';
import { useFormik } from 'formik';
import { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';

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
      alert(JSON.stringify(values, null, 2));
      console.log(values.file);
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
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="fullName">First Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          <label htmlFor="bio">Last Name</label>
          <input
            id="bio"
            name="bio"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.bio}
          />
          <label htmlFor="file">file Address</label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(ev) => {
              console.log(ev.target.files);
              formik.setFieldValue('file', ev.target.files[0]);
              formik.setFieldValue(
                'tempFileURL',
                URL.createObjectURL(ev.target.files[0]),
              );
              console.log(formik.values);
            }}
            // value={formik.values.file}
          />
          <img src={formik.values.tempFileURL} alt="" />
          <button type="submit">Submit</button>
        </form>
      </ModalContainer>
    </div>
  );
};

export default MyProfile;
