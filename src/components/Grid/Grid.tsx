import styles from './grid.module.less';
import DishCard from '../DishCard/DishCard';
import { IChef, IRecipeSmall } from '@/utils/typesAPI';
import ChefCard from '../ChefCard/ChefCard';
import { string } from 'yup';

interface IGridParams {
  array: IRecipeSmall[] | IChef[];
  type?: 'chefs' | 'recipes';
}

const Grid = ({ array, type = 'recipes' }: IGridParams) => {
  return (
    <div
      className={type === 'recipes' ? styles.gridWrapper4 : styles.gridWrapper6}
    >
      {array.map((card) => {
        if ('title' in card) {
          return (
            <DishCard
              key={card.slug}
              slug={card.slug}
              title={card.title}
              author={card.author_name}
              image={card.meal_picture}
              likes={card.likes}
              saves={card.saves}
              isLiked={card.isLiked}
              isSaved={card.isSaved}
            />
          );
        } else {
          return (
            <ChefCard
              key={card.slug}
              slug={card.slug}
              fullName={card.author_name}
              image={card.author_photo}
            />
          );
        }
      })}
    </div>
  );
};

export default Grid;

{
}
