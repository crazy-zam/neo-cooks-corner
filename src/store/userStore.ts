import { getSavedRecipesAPI, getRecipesByChefAPI } from '@/api/recipesApi';
import { userLoginAPI, refreshTokenAPI } from '@/api/userApi';
import { getProfileAPI } from '@/api/profileAPI';
import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import { isTokenExpired } from '@/utils/utils';

class userStore {
  isAuth = false;
  isLoading = false;
  isVerified = false;
  slug: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  bio: string;
  photo: string;
  recipes: number;
  followers: number;
  follow: number;
  recipesArr: Array<IRecipeSmall> = [];
  totalRecipes: number;
  page: number = 1;
  limit: number = 12;
  recipesArrCategory: 'my' | 'saved' = 'my';
  constructor() {
    makeAutoObservable(this);
  }
  setTokens = (accessToken: string, refreshToken: string) => {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };
  login = async (email: string, password: string) => {
    try {
      const response = await userLoginAPI(email, password);
      this.isAuth = true;
      this.setTokens(response.access, response.refresh);

      this.getUser();
    } catch (error) {
      throw error;
    }
  };
  refreshTokens = async (refreshToken: string) => {
    const response = await refreshTokenAPI(refreshToken);
    this.setTokens(response.accessToken, response.refreshToken);
  };
  getUser = async () => {
    this.isLoading = true;
    try {
      const response = await getProfileAPI(this.accessToken);
      this.username = response.username;
      this.bio = response.bio;
      this.photo = response.photo;
      this.recipes = response.recipes;
      this.followers = response.followers;
      this.follow = response.follow;
      this.slug = response.slug;
    } catch (error) {
      this.isAuth = false;
      throw error;
    } finally {
      this.isLoading = false;
    }
  };
  logout = () => {
    localStorage.clear();
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
    if (isTokenExpired(this.refreshToken)) {
      this.logout();
    }
    if (isTokenExpired(this.accessToken)) {
      this.refreshTokens(this.refreshToken);
    }
    this.isLoading = true;
    const response =
      this.recipesArrCategory === 'my'
        ? await getRecipesByChefAPI(
            this.accessToken,
            this.slug,
            this.page,
            this.limit,
          )
        : await getSavedRecipesAPI(this.accessToken, this.page, this.limit);
    this.recipesArr = response.data;
    this.totalRecipes = response.total;
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
