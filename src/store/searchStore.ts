import { searchRecipes } from '@/api/recipesApi';
import { IChef, IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable } from 'mobx';
import userStore from './userStore';
import { searchChefs } from '@/api/userApi';

class searchStore {
  isLoading = false;
  category: 'chefs' | 'recipes' = 'chefs';
  results: Array<IRecipeSmall> | Array<IChef> = [];
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
  getResults = async (search: string) => {
    this.isLoading = true;
    const results =
      this.category === 'recipes'
        ? await searchRecipes(
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
    this.results = results;
    this.isLoading = false;
  };
}

export default new searchStore();
