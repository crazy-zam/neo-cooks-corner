import styles from './grid.module.less';
import DishCard from '../DishCard/DishCard';
import { IChef } from '@/utils/typesAPI';
import ChefCard from '../ChefCard/ChefCard';

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

interface IGridParams {
  array: any;
  type?: 'chefs' | 'recipes';
}

const Grid = ({ array, type = 'recipes' }: IGridParams) => {
  return (
    <div
      className={type === 'recipes' ? styles.gridWrapper4 : styles.gridWrapper6}
    >
      {type === 'recipes'
        ? Array.from(array).map((card: ICard) => {
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
          })
        : Array.from(array).map((card: IChef) => {
            return (
              <ChefCard
                key={card.id}
                id={card.id}
                fullName={card.author}
                image={card.photo}
              />
            );
          })}
    </div>
  );
};

export default Grid;

{
}
