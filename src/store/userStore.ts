import { getSavedRecipesAPI, getRecipesByChefAPI } from '@/api/recipesApi';
import { userLoginAPI, refreshTokenAPI, registerUserAPI } from '@/api/userApi';
import { updateProfileAPI } from '@/api/profileAPI';
import { getProfileAPI } from '@/api/profileAPI';
import { IRecipeSmall } from '@/utils/typesAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import { isTokenExpired } from '@/utils/utils';
import { errorNotify, successNotify } from '@/utils/toaster';

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
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setTokens = (accessToken: string, refreshToken: string) => {
    runInAction(() => {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    });
    console.log('access after refreshAction', this.accessToken);
  };
  login = async (email: string, password: string) => {
    try {
      this.isLoading = true;
      const response = await userLoginAPI(email, password);
      console.log('login', response);
      runInAction(() => {
        this.isAuth = true;
        this.setTokens(response.access, response.refresh);
        this.getUser();
      });
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  register = async (username: string, email: string, password: string) => {
    try {
      this.isLoading = true;
      const response = await registerUserAPI(username, password, email);
      runInAction(() => {
        this.isAuth = true;
        this.setTokens(response.access, response.refresh);
        this.getUser();
      });
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
    }
  };
  refreshTokens = async (refreshToken: string) => {
    try {
      console.log('refresh tokens');
      const response = await refreshTokenAPI(refreshToken);
      console.log('access after refreshFetch', response.access);
      runInAction(() => {
        this.setTokens(response.access, response.refresh);
      });
    } catch (error) {
      console.log(error);
    }
  };
  checkTokens = async () => {
    if (isTokenExpired(this.refreshToken)) {
      this.logout();
      return;
    }
    if (isTokenExpired(this.accessToken)) {
      await this.refreshTokens(this.refreshToken);
    }
  };
  getUser = async () => {
    this.isLoading = true;
    try {
      const response = await getProfileAPI(this.accessToken);
      console.log('getuser', response);
      this.username = response.username;
      this.bio = response.bio;
      this.photo = response.profile_picture;
      this.recipes = response.recipes;
      this.followers = response.followers;
      this.follow = response.following;
      this.slug = response.slug;
      this.isVerified = response.isVerified;
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
    this.checkTokens();
    try {
      console.log(this.accessToken);
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
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };
  setPage = (page: number) => {
    this.page = page;
    this.getRecipesAction();
  };
  setCategory = (category: 'my' | 'saved') => {
    this.recipesArrCategory = category;
    this.getRecipesAction();
  };
  changeProfile = async (formData: FormData) => {
    this.checkTokens();
    try {
      this.isLoading = true;
      const response = await updateProfileAPI(this.accessToken, formData);
      successNotify(response.Message);
      this.getUser();
    } catch (error) {
      console.log(error);
      errorNotify(error.response.data.Message);
    } finally {
      this.isLoading = false;
    }
  };
}

export default new userStore();
