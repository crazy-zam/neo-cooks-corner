import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import { getRecipesByChefAPI } from '@/api/recipesApi';
import { getChefBySlugAPI } from '@/api/profileAPI';
import userStore from './userStore';
import { isTokenExpired } from '@/utils/utils';

export default class chefStore {
  isLoading = false;
  slug = '';
  username = '';
  bio = '';
  photo = '';
  recipes = 0;
  followers = 0;
  follow = 0;
  isFollow = false;
  recipesArr: Array<IRecipeSmall> = [];
  page = 1;
  limit = 12;
  totalRecipes = 0;
  constructor() {
    makeAutoObservable(this);
  }
  getChef = async (slug: string) => {
    if (isTokenExpired(userStore.refreshToken)) {
      userStore.logout();
    }
    if (isTokenExpired(userStore.accessToken)) {
      userStore.refreshTokens(userStore.refreshToken);
    }
    this.isLoading = true;
    const chef = await getChefBySlugAPI(userStore.accessToken, slug);
    runInAction(() => {
      this.slug = slug;
      this.username = chef.username;
      this.bio = chef.bio;
      this.photo = chef.photo;
      this.recipes = chef.recipes;
      this.followers = chef.followers;
      this.follow = chef.follow;
      this.isFollow = chef.isFollow;
      this.isLoading = false;
    });
  };
  setPage = (page: number) => {
    this.page = page;
    this.getRecipes();
  };
  getRecipes = async () => {
    const response = await getRecipesByChefAPI(
      userStore.accessToken,
      this.slug,
      this.page,
      this.limit,
    );
    runInAction(() => {
      this.recipesArr = response.data;
      this.totalRecipes = response.total;
    });
  };
}

// export default new recipeStore();
