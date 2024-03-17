import { searchRecipes } from '@/api/recipesApi';
import { IChef, IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable } from 'mobx';
import userStore from './userStore';
import { searchChefs } from '@/api/userApi';

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
    this.isLoading = true;
    this.searchString = search;
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
