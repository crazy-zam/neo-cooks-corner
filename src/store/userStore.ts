import { getRecipesById, getSavedRecipes } from '@/api/recipesApi';
import { userLoginAPI, getUserAPI } from '@/api/userApi';
import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';

class userStore {
  isAuth = false;
  isLoading = false;
  id: number;
  accessToken: string;
  refreshToken: string;
  username: string;
  bio: string;
  photo: string;
  recipes: number;
  followers: number;
  follow: number;
  recipesArr: Array<IRecipeSmall>;
  totalRecipes: number;
  page: number = 1;
  limit: number = 12;
  recipesArrCategory: 'my' | 'saved' = 'my';
  constructor() {
    makeAutoObservable(this);
  }

  login = async (email: string, password: string) => {
    try {
      const response = await userLoginAPI(email, password);
      this.isAuth = true;
      this.accessToken = response.accessToken;
      this.refreshToken = response.refreshToken;
      this.getUser();
    } catch (error) {
      throw error;
    }
  };
  getUser = async () => {
    this.isLoading = true;
    try {
      const response = await getUserAPI(this.accessToken);
      this.username = response.username;
      this.bio = response.bio;
      this.photo = response.photo;
      this.recipes = response.recipes;
      this.followers = response.followers;
      this.follow = response.follow;
    } catch (error) {
      this.isAuth = false;
      throw error;
    } finally {
      this.isLoading = false;
    }
  };
  logout = () => {
    this.isAuth = false;
    this.accessToken = '';
    this.refreshToken = '';
    this.username = '';
    this.bio = '';
    this.photo = '';
    this.recipes = 0;
    this.followers = 0;
    this.follow = 0;
  };
  getRecipesAction = async () => {
    this.isLoading = true;
    const response =
      this.recipesArrCategory === 'my'
        ? await getRecipesById(this.accessToken, this.page, this.limit, this.id)
        : await getSavedRecipes(this.accessToken, this.page, this.limit);
    this.recipesArr = response;
    this.isLoading = false;
  };
  setPage = (page: number) => {
    this.page = page;
    this.getRecipesAction();
  };
  setCategory = (category: 'my' | 'saved') => {
    this.recipesArrCategory = category;
    this.getRecipesAction();
  };
}

export default new userStore();
