import { getRecipesByCategoryAPI } from '@/api/recipesApi';
import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import userStore from './userStore';
import { isTokenExpired } from '@/utils/utils';

class mainStore {
  isLoading: boolean = false;
  category: 'breakfast' | 'lunch' | 'dinner' = 'breakfast';
  recipes: Array<IRecipeSmall> = [];
  totalRecipes = 0;
  page = 1;
  limit = 12;
  detailed = 0;

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
    if (isTokenExpired(userStore.refreshToken)) {
      userStore.logout();
    }
    if (isTokenExpired(userStore.accessToken)) {
      userStore.refreshTokens(userStore.refreshToken);
    }
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
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
export default new mainStore();
