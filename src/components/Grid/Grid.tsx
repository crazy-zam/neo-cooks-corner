import styles from './grid.module.less';
import DishCard from '../DishCard/DishCard';
import { IChef, IRecipeSmall } from '@/utils/typesAPI';
import ChefCard from '../ChefCard/ChefCard';

interface IGridParams {
  array: IRecipeSmall[] | IChef[];
  type?: 'chefs' | 'recipes';
}

const Grid = ({ array, type = 'recipes' }: IGridParams) => {
  return (
    <div
      className={type === 'recipes' ? styles.gridWrapper4 : styles.gridWrapper6}
    >
      {type === 'recipes'
        ? array.map((recipe: IRecipeSmall) => {
            return (
              <DishCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                author={recipe.author}
                image={recipe.image}
                likes={recipe.likes}
                saves={recipe.saves}
                isLiked={recipe.isLiked}
                isSaved={recipe.isSaved}
              />
            );
          })
        : array.map((chef: IChef) => {
            return (
              <ChefCard
                key={chef.id}
                id={chef.id}
                fullName={chef.author}
                image={chef.image}
              />
            );
          })}
    </div>
  );
};

export default Grid;

{
}
