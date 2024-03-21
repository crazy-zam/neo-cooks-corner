import { searchRecipesAPI } from '@/api/recipesApi';
import { IChef, IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable } from 'mobx';
import userStore from './userStore';

import { searchChefs } from '@/api/profileAPI';
import { isTokenExpired } from '@/utils/utils';

class searchStore {
  isLoading = false;
  category: 'chefs' | 'recipes' = 'chefs';
  results: Array<IRecipeSmall> | Array<IChef> = [];
  searchString: string;
  totalRecipes: number;
  page = 1;
  limit = 12;
  constructor() {
    makeAutoObservable(this);
  }
  setCategory = (category: 'chefs' | 'recipes') => {
    this.category = category;
    this.page = 1;
    this.results = [];
  };
  setPage = (page: number) => {
    this.page = page;
    this.getResults(this.searchString);
  };
  getResults = async (search: string) => {
    if (isTokenExpired(userStore.refreshToken)) {
      userStore.logout();
    }
    if (isTokenExpired(userStore.accessToken)) {
      userStore.refreshTokens(userStore.refreshToken);
    }
    this.isLoading = true;
    this.searchString = search;
    const response =
      this.category === 'recipes'
        ? await searchRecipesAPI(
            userStore.accessToken,
            this.page,
            this.limit,
            search,
          )
        : await searchChefs(
            userStore.accessToken,
            this.page,
            this.limit,
            search,
          );
    this.results = response.data;
    this.isLoading = false;
  };
}

export default new searchStore();
