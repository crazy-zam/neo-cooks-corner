import styles from './grid.module.less';
import DishCard from '../DishCard/DishCard';
import { useRef } from 'react';
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

const Grid = (array: any) => {
  return (
    <div className={styles.gridWrapper}>
      {array.array.map((card: ICard) => {
        return (
          <DishCard
            key={card.id}
            id={card.id}
            title={card.title}
            author={card.author}
            image={card.image}
            likes={card.likes}
            saves={card.saves}
            isLiked={card.isLiked}
            isSaved={card.isSaved}
          />
        );
      })}
    </div>
  );
};

export default Grid;
