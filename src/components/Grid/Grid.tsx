import styles from './grid.module.less';
import DishCard from '../DishCard/DishCard';
import { IChef, IRecipeSmall } from '@/utils/typesAPI';
import ChefCard from '../ChefCard/ChefCard';
import { string } from 'yup';

interface IGridParams {
  array: IRecipeSmall[] | IChef[];
  columns: number;
  type?: 'chefs' | 'recipes';
}
const stylesObj = {
  1: styles.gridWrapper1,
  2: styles.gridWrapper2,
  3: styles.gridWrapper3,
  4: styles.gridWrapper4,
  5: styles.gridWrapper5,
  6: styles.gridWrapper6,
};
type ObjKey = keyof typeof stylesObj;

const Grid = ({ array, type = 'recipes', columns }: IGridParams) => {
  const key = columns as ObjKey;

  return (
    <div className={stylesObj[key]}>
      {array.map((card) => {
        if ('name' in card) {
          return (
            <DishCard
              key={card.slug}
              slug={card.slug}
              title={card.name}
              author={card.author_name}
              image={card.meal_picture}
              likes={card.likes}
              saves={card.saves}
              isLiked={card.is_liked}
              isSaved={card.is_saved}
            />
          );
        } else {
          return (
            <ChefCard
              key={card.slug}
              slug={card.slug}
              fullName={card.username}
              image={card.profile_picture}
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
