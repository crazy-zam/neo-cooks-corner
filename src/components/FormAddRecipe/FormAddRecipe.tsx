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
      difficulty: 'easy',
      category: 'breakfast',
      time: '',
      ingredients: [ingredientObj],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.photoContainer}>
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
        </div>
        <div className={styles.nameContainer}>
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
        </div>
        <div className={styles.difficultyContainer}>
          {' '}
          <label htmlFor="difficulty" className={styles.label}>
            Difficulty
          </label>
          <div className={styles.difficultBtnGroup}>
            <button
              type="button"
              className={
                formik.values.difficulty === 'easy'
                  ? styles.difficultBtnActive
                  : styles.difficultBtn
              }
              onClick={() => {
                formik.setFieldValue('difficulty', 'easy');
              }}
            >
              Easy
            </button>
            <button
              type="button"
              className={
                formik.values.difficulty === 'medium'
                  ? styles.difficultBtnActive
                  : styles.difficultBtn
              }
              onClick={() => {
                formik.setFieldValue('difficulty', 'medium');
              }}
            >
              Medium
            </button>
            <button
              type="button"
              className={
                formik.values.difficulty === 'hard'
                  ? styles.difficultBtnActive
                  : styles.difficultBtn
              }
              onClick={() => {
                formik.setFieldValue('difficulty', 'hard');
              }}
            >
              Hard
            </button>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <label className={styles.label} htmlFor="category">
            Category of meal
          </label>
          <select name="category" id="category" className={styles.selectGrey}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className={styles.timeContainer}>
          <label className={styles.label} htmlFor="time">
            Add a time
          </label>
          <input
            id="time"
            name="time"
            placeholder="How much time does it need?(minutes)"
            type="text"
            className={styles.inputGrey}
            onKeyDown={(event) => {
              // Only allow if the e.key value is a number or if it's 'Backspace'
              if (isNaN(+event.key) && event.key !== 'Backspace') {
                event.preventDefault();
              }
            }}
            onChange={formik.handleChange}
            value={formik.values.time}
          />
        </div>
      </div>

      <label className={styles.label} htmlFor="description">
        Add a description
      </label>

      <textarea
        id="description"
        name="description"
        placeholder="Add here description"
        onKeyDown={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.cssText = 'height:auto';
          target.style.cssText = 'height:' + target.scrollHeight + 'px';
        }}
        className={styles.inputDesciption}
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <label className={styles.label} htmlFor="ingredients">
        Add an ingredients
      </label>
      {formik.values.ingredients.map((_, index: number) => {
        return (
          <InputIngredient
            formik={formik}
            ind={index}
            addField={() => {
              formik.setFieldValue('ingredients', [
                ...formik.values.ingredients,
                ingredientObj,
              ]);
            }}
          />
        );
      })}

      <button type="submit" className={styles.buttonSubmit}>
        Save changes
      </button>
    </form>
  );
};

export default FormAddRecipe;
