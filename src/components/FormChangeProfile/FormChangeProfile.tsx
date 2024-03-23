import { Camera } from '@/assets';
import { useFormik } from 'formik';
import styles from './formChangeProfile.module.less';
import { useState } from 'react';
import userStore from '@/store/userStore';
import LoaderSmall from '@/UI/LoaderSmall/LoaderSmall';
interface IModal {
  closeModal: () => void;
}
const FormChangeProfile = ({ closeModal }: IModal) => {
  const [image, setImage] = useState<File>();
  const formik = useFormik({
    initialValues: {
      fullName: userStore.username,
      bio: userStore.bio,
      file: '',
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('username', values.fullName);
        formData.append('bio', values.bio);
        formData.append('profile_picture', image, image.name);
        await userStore.changeProfile(formData);
      } catch (error) {
        console.log(error);
      } finally {
        closeModal();
        userStore.getUser();
      }
    },
  });
  return (
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
      <label
        htmlFor="file"
        className={
          formik.values.file ? styles.inputPhotoFilled : styles.inputPhoto
        }
      >
        {formik.values.file ? (
          <>
            <img
              className={styles.smallImg}
              src={formik.values.file}
              alt="Change photo"
            />
            <div>Change photo</div>
          </>
        ) : (
          <>
            <Camera className={styles.smallImg} />
            <div>Upload a new photo</div>
          </>
        )}
      </label>
      <input
        id="file"
        name="file"
        type="file"
        className={styles.hiddenInput}
        onChange={(ev) => {
          setImage(ev.target.files[0]);

          formik.setFieldValue(
            'file',
            ev.target.files.length === 0
              ? ''
              : URL.createObjectURL(ev.target.files[0]),
          );
        }}
      />

      <button type="submit" className={styles.buttonSubmit}>
        {userStore.isLoading ? <LoaderSmall /> : 'Save changes'}
      </button>
    </form>
  );
};

export default FormChangeProfile;
