import { AddBtn } from '@/assets';
import styles from './inputIngredient.module.less';

const InputIngredient = () => {
  return (
    <div className={styles.wrapper}>
      <input type="text" className={styles.ingredient} />
      <div className={styles.amountWrapper}>
        <input type="text" className={styles.amount} />
        <select name="" id="" className={styles.select}>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="glass">glass</option>
          <option value="spoon">spoon</option>
        </select>
      </div>

      <button>
        <AddBtn className={styles.addBtn} />
      </button>
    </div>
  );
};

export default InputIngredient;
