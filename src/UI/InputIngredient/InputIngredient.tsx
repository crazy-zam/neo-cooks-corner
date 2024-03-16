import { AddBtn, CloseModal } from '@/assets';
import styles from './inputIngredient.module.less';
import { FormikValues } from 'formik';
const ingredientObj = {
  ingredient: '',
  amount: '',
  unit: '',
};
interface IIngredient {
  ind: number;
  formik: FormikValues;
  addField: () => void;
}
const InputIngredient = ({ formik, ind, addField }: IIngredient) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.ingredient}
        onChange={(ev) => {
          formik.setFieldValue(
            'ingredients',
            formik.values.ingredients.map(
              (obj: typeof ingredientObj, index: number) => {
                if (index === ind)
                  return { ...obj, ingredient: ev.target.value };
                return obj;
              },
            ),
          );
        }}
        value={formik.values.ingredients[ind].ingredient}
      />
      <div className={styles.amountWrapper}>
        <input
          type="text"
          className={styles.amount}
          onChange={(ev) => {
            formik.setFieldValue(
              'ingredients',
              formik.values.ingredients.map(
                (obj: typeof ingredientObj, index: number) => {
                  if (index === ind) return { ...obj, amount: ev.target.value };
                  return obj;
                },
              ),
            );
          }}
          value={formik.values.ingredients[ind].amount}
        />
        <select
          className={styles.select}
          onChange={(ev) => {
            formik.setFieldValue(
              'ingredients',
              formik.values.ingredients.map(
                (obj: typeof ingredientObj, index: number) => {
                  if (index === ind) return { ...obj, unit: ev.target.value };
                  return obj;
                },
              ),
            );
          }}
          value={formik.values.ingredients[ind].unit}
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="glass">glass</option>
          <option value="spoon">spoon</option>
        </select>
      </div>
      {ind === 0 ? (
        <button type="button" onClick={addField}>
          <AddBtn className={styles.addBtn} />
        </button>
      ) : (
        <button
          className={styles.deleteBtn}
          type="button"
          onClick={() => {
            formik.values.ingredients.splice(ind, 1);
            formik.setFieldValue('ingredients', formik.values.ingredients);
          }}
        >
          <CloseModal className={styles.deleteBtnIcon} />
        </button>
      )}
    </div>
  );
};

export default InputIngredient;
