import { useFormik } from 'formik';
import styles from './formAddRecipe.module.less';
import { Camera } from '@/assets';
import InputIngredient from '@/UI/InputIngredient/InputIngredient';
import { useEffect, useState } from 'react';
import LoaderSmall from '@/UI/LoaderSmall/LoaderSmall';
import { addRecipeAPI } from '@/api/recipesApi';
import userStore from '@/store/userStore';

interface IModal {
  closeModal: () => void;
}

const FormAddRecipe = ({ closeModal }: IModal) => {
  const [isLoading, setIsLoading] = useState(false);
  const ingredientObj = {
    ingredient_name: '',
    amount: '',
    unit: '',
  };
  const [image, setImage] = useState<File>();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      file: '',
      difficulty: 'Easy',
      category: 'Breakfast',
      time: '',
      ingredients: [ingredientObj],
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('difficulty', values.difficulty);
      formData.append('ingredients', JSON.stringify(values.ingredients));
      formData.append('preparation_time', values.time);
      formData.append('category', values.category);
      formData.append('meal_picture', image, image.name);
      setIsLoading(true);
      await addRecipeAPI(formData, userStore.accessToken);
      setIsLoading(false);
      closeModal();
    },
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  useEffect(() => {
    setBtnDisabled(
      Object.values(formik.values).reduce((acc, field) => {
        if (typeof field === 'object') {
          return (
            acc || field[0]?.ingredient_name === '' || field[0]?.amount === ''
          );
        }
        return acc || field === '';
      }, false),
    );
  }, [formik.values]);
  const difficultyBtn = (difficulty: string) => {
    return (
      <button
        type="button"
        className={
          formik.values.difficulty === difficulty
            ? styles.difficultBtnActive
            : styles.difficultBtn
        }
        onClick={() => {
          formik.setFieldValue('difficulty', difficulty);
        }}
      >
        {difficulty}
      </button>
    );
  };
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
          <label htmlFor="difficulty" className={styles.label}>
            Difficulty
          </label>
          <div className={styles.difficultBtnGroup}>
            {difficultyBtn('Easy')}
            {difficultyBtn('Medium')}
            {difficultyBtn('Hard')}
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <label className={styles.label} htmlFor="category">
            Category of meal
          </label>
          <select
            name="category"
            id="category"
            className={styles.selectGrey}
            onChange={formik.handleChange}
          >
            <option selected value="Breakfast">
              Breakfast
            </option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className={styles.timeContainer}>
          <label className={styles.label} htmlFor="time">
            Add a time
          </label>
          <input
            id="time"
            name="time"
            placeholder="How much time?(min)"
            type="text"
            className={styles.inputGrey}
            onKeyDown={(event) => {
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

      <button
        type="submit"
        className={styles.buttonSubmit}
        disabled={btnDisabled}
      >
        {isLoading ? <LoaderSmall /> : 'Save changes'}
      </button>
    </form>
  );
};

export default FormAddRecipe;
