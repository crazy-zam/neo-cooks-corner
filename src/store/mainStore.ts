import { getRecipesByCategoryAPI } from '@/api/recipesApi';
import { IRecipeSmall } from '@/utils/typesAPI';
import { flow, makeAutoObservable, runInAction } from 'mobx';
import userStore from './userStore';
import { isTokenExpired } from '@/utils/utils';

class mainStore {
  isLoading: boolean = false;
  category: 'Breakfast' | 'Lunch' | 'Dinner' = 'Breakfast';
  recipes: Array<IRecipeSmall> = [];
  totalRecipes = 0;
  page = 1;
  limit = 12;
  detailed = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setCategory = (category: 'Breakfast' | 'Lunch' | 'Dinner') => {
    this.category = category;

    this.getRecipesAction();
  };
  setPage = (page: number) => {
    this.page = page;
    this.getRecipesAction();
  };
  setDetailedPage = (id: number) => {
    this.detailed = id;
  };

  getRecipesAction = async () => {
    await userStore.checkTokens();
    this.isLoading = true;
    try {
      const response = await getRecipesByCategoryAPI(
        userStore.accessToken,
        this.category,
        this.page,
        this.limit,
      );
      this.recipes = response.data;
      this.totalRecipes = response.total;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };
}
export default new mainStore();
