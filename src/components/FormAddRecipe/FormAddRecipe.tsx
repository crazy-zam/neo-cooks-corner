import { useFormik } from 'formik';
import styles from './formAddRecipe.module.less';
import { Camera } from '@/assets';
import InputIngredient from '@/UI/InputIngredient/InputIngredient';

const FormAddRecipe = () => {
  const ingredientObj = {
    ingredient: '',
    amount: '',
    unit: '',
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      file: '',
      tempFileURL: '',
      difficulty: '',
      category: '',
      time: '',
      ingredients: [ingredientObj],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="file">
        Add a recipe photo
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
      <label className={styles.label} htmlFor="name">
        Name yor recipe
      </label>
      <input
        id="name"
        name="name"
        placeholder="Input here"
        type="text"
        className={styles.inputName}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <label className={styles.label} htmlFor="description">
        Add a description
      </label>
      <input
        id="description"
        name="description"
        placeholder="Add here description"
        type="text"
        className={styles.inputdescription}
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <label className={styles.label} htmlFor="ingredients">
        Add an ingredients
      </label>
      <InputIngredient />
      <label htmlFor="difficulty" className={styles.label}>
        Difficulty
      </label>
      <div className={styles.difficultBtnGroup}>
        <button className={styles.difficultBtnActive}>Easy</button>
        <button className={styles.difficultBtn}>Medium</button>
        <button className={styles.difficultBtn}>Hard</button>
      </div>
      <label className={styles.label} htmlFor="description">
        Add a description
      </label>
      <input
        id="description"
        name="description"
        placeholder="Add here description"
        type="text"
        className={styles.inputdescription}
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <label className={styles.label} htmlFor="time">
        Add a time
      </label>
      <input
        id="time"
        name="time"
        placeholder="How much time does it need?(minutes)"
        type="text"
        className={styles.inputtime}
        onChange={formik.handleChange}
        value={formik.values.time}
      />
      <button type="submit" className={styles.buttonSubmit}>
        Save changes
      </button>
    </form>
  );
};

export default FormAddRecipe;
