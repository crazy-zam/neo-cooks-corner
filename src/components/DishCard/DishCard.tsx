import { Heart, Bookmark } from '@/assets';
import styles from './dishCard.module.less';
import { Link } from 'react-router-dom';

interface IRecipeCard {
  slug: string;
  title: string;
  author: string;
  image: string;
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
}
const DishCard = ({
  slug,
  title,
  author,
  image,
  likes,
  saves,
  isLiked,
  isSaved,
}: IRecipeCard) => {
  return (
    <Link to={`/recipe/${slug}`} className={styles.wrapper}>
      <img src={image} alt={title} className={styles.img} />
      <div className={styles.title}>{title}</div>
      <div className={styles.author}>by {author}</div>
      <div className={styles.btnGroup}>
        <Heart className={isLiked ? styles.activeIcon : styles.icon} />
        {likes}
        <Bookmark className={isSaved ? styles.activeIcon : styles.icon} />
        {saves}
      </div>
    </Link>
  );
};

export default DishCard;
