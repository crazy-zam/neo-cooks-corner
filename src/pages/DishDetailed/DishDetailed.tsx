import styles from './dishDetailed.module.less';
import { Heart, Bookmark, ClockIcon } from '@/assets';
import BackBtn from '@/UI/BackBtn/BackBtn';
import { Link, useParams } from 'react-router-dom';
import recipeStore from '@/store/recipeStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Loader from '@/UI/Loader/Loader';
import userStore from '@/store/userStore';
const recipe = new recipeStore();
const DishDetailed = observer(() => {
  const { slug } = useParams();
  const likeHandler = () => {
    if (!userStore.isVerified) return;
    recipe.likeRecipeAction();
  };
  const saveHandler = () => {
    if (!userStore.isVerified) return;
    recipe.saveRecipeAction();
  };
  useEffect(() => {
    recipe.getRecipe(slug);
  }, [slug]);
  console.log(slug);
  return (
    <div className={styles.wrapper}>
      {recipe.isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <BackBtn />
          <img src={recipe.image} alt="" className={styles.img} />
          <div className={styles.descriptionContainer}>
            <div className={styles.title}>{recipe.title}</div>
            <Link
              to={`/chef-details/${recipe.authorSlug}`}
              className={styles.author}
            >
              by {recipe.author}
            </Link>
            <div className={styles.time}>
              <ClockIcon className={styles.clock} />
              {recipe.time} min
            </div>
            <div className={styles.complexity}>{recipe.complexity}</div>
            <div className={styles.likesGroup}>
              <Heart
                className={
                  !recipe.isLiked
                    ? styles.icon
                    : recipe.likesTouched
                    ? styles.likeIcon
                    : styles.likedIcon
                }
                onClick={likeHandler}
              />
              <div className={styles.likes}>{recipe.likes} Likes</div>

              <Bookmark
                className={
                  !recipe.isSaved
                    ? styles.icon
                    : recipe.savesTouched
                    ? styles.saveIcon
                    : styles.savedIcon
                }
                onClick={saveHandler}
              />
            </div>
            <div className={styles.header}>Description</div>
            <div>{recipe.description}</div>
            <div className={styles.header}>Ingredients</div>

            {recipe.ingredients.map((item, ind, arr) => {
              return (
                <div
                  className={
                    ind !== arr.length - 1
                      ? styles.ingredient
                      : styles.ingredientLast
                  }
                >
                  <div>{item.ingredient_name}</div>
                  <div className={styles.amount}>
                    <div>{item.amount}</div>
                    <div>{item.unit}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
});

export default DishDetailed;
