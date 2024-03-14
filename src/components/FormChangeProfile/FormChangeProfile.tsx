import { Camera } from '@/assets';
import { useFormik } from 'formik';
import styles from './formChangeProfile.module.less';
const FormChangeProfile = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      bio: '',
      file: '',
      tempFileURL: '',
    },
    onSubmit: (values) => {
      console.log(values);
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
          formik.values.tempFileURL
            ? styles.inputPhotoFilled
            : styles.inputPhoto
        }
      >
        {formik.values.tempFileURL ? (
          <>
            <img
              className={styles.smallImg}
              src={formik.values.tempFileURL}
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
          formik.setFieldValue('file', ev.target.files[0]);
          formik.setFieldValue(
            'tempFileURL',
            ev.target.files.length === 0
              ? ''
              : URL.createObjectURL(ev.target.files[0]),
          );
        }}
      />

      <button type="submit" className={styles.buttonSubmit}>
        Save changes
      </button>
    </form>
  );
};

export default FormChangeProfile;
