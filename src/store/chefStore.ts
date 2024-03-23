import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import { getRecipesByChefAPI } from '@/api/recipesApi';
import { getChefBySlugAPI, followChefAPI } from '@/api/profileAPI';
import userStore from './userStore';
import { errorNotify, successNotify } from '@/utils/toaster';

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
    await userStore.checkTokens();
    this.isLoading = true;
    const chef = await getChefBySlugAPI(userStore.accessToken, slug);
    runInAction(() => {
      this.slug = slug;
      this.username = chef.username;
      this.bio = chef.bio;
      this.photo = chef.profile_picture;
      this.recipes = chef.recipes;
      this.followers = chef.followers;
      this.follow = chef.following;
      this.isFollow = chef.is_followed;
      this.getRecipes();
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
  followChefAction = () => async () => {
    try {
      const response = await followChefAPI(userStore.accessToken, this.slug);
      successNotify(response.Message);
      this.isFollow = !this.isFollow;
    } catch (error) {
      errorNotify(error.response.data.Message);
    }
  };
}
