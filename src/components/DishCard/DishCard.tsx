import { Heart, Bookmark } from '@/assets';
import styles from './dishCard.module.less';
import { JSXElementConstructor, ReactElement } from 'react';

interface ICard {
  id: number;
  title: string;
  author: string;
  image: string;
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
}
const DishCard = ({
  id: number,
  title,
  author,
  image,
  likes,
  saves,
  isLiked,
  isSaved,
}: ICard) => {
  console.log(isLiked, isSaved);
  return (
    <div className={styles.wrapper}>
      <img src={image} alt={title} className={styles.img} />
      <div className={styles.title}>{title}</div>
      <div className={styles.author}>by {author}</div>
      <div className={styles.btnGroup}>
        <Heart className={isLiked ? styles.activeIcon : styles.icon} />
        {likes}
        <Bookmark className={isSaved ? styles.activeIcon : styles.icon} />
        {saves}
      </div>
    </div>
  );
};

export default DishCard;
