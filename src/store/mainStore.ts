import { getRecipes } from '@/api/recipesApi';
import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import userStore from './userStore';

class mainStore {
  isLoading: boolean = false;
  category: 'breakfast' | 'lunch' | 'dinner' = 'breakfast';
  recipes: Array<IRecipeSmall> = [];
  totalRecipes = 36;
  page = 1;
  limit = 6;
  detailed: number;

  constructor() {
    makeAutoObservable(this);
  }
  setCategory = (category: 'breakfast' | 'lunch' | 'dinner') => {
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
    this.isLoading = true;

    try {
      const response = await getRecipes(
        userStore.accessToken,
        this.category,
        this.page,
        this.limit,
      );
      this.recipes = response;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };
}
export default new mainStore();
