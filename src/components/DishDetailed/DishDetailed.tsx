import styles from './dishDetailed.module.less';
import { detailedDishes } from '@/api/detailed';
import { ingredients } from '@/api/ingredients';
import { Heart, Bookmark, ClockIcon } from '@/assets';
import BactBtn from '@/UI/BackBtn/BackBtn';
const DishDetailed = ({ id = 1 }) => {
  const dish = detailedDishes[id];
  const complexityObj = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
  type ObjectKey = keyof typeof complexityObj;
  const complexity = dish.complexity as ObjectKey;
  return (
    <div className={styles.wrapper}>
      <BactBtn />
      <img src={dish.image} alt="" className={styles.img} />
      <div className={styles.descriptionContainer}>
        <div className={styles.title}>{dish.title}</div>
        <div className={styles.author}>by {dish.author}</div>
        <div className={styles.time}>
          <ClockIcon className={styles.clock} />
          {dish.time} min
        </div>
        <div className={styles.complexity}>{complexityObj[complexity]}</div>
        <div className={styles.likesGroup}>
          <Heart className={dish.isLiked ? styles.activeIcon : styles.icon} />
          <div className={styles.likes}>{dish.likes} Likes</div>

          <Bookmark
            className={dish.isSaved ? styles.activeIcon : styles.icon}
          />
          {/* {dish.saves} */}
        </div>
        <div className={styles.header}>Description</div>
        <div>{dish.description}</div>
        <div className={styles.header}>Ingredients</div>
        {dish.ingredients.map((id, ind, arr) => {
          const item = ingredients[id];
          return (
            <div
              className={
                ind !== arr.length - 1
                  ? styles.ingredient
                  : styles.ingredientLast
              }
            >
              <div>{item.ingridient}</div>
              <div className={styles.amount}>
                <div>{item.amount}</div>
                <div>{item.unit}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishDetailed;
