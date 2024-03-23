import { IRecipe, IRecipeSmall, IResponseRecipesArr } from '@/utils/typesAPI';
import axios from 'axios';
import URL from './base_url';
import { successNotify } from '@/utils/toaster';

const instance = axios.create({
  baseURL: URL + 'recipes/',

  headers: { 'Content-Type': 'application/json' },
});

export const addRecipeAPI = async (formData: FormData, accessToken: string) => {
  try {
    const response = await instance.post('add-recipe/', formData, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'multipart/form-data',
      },
    });
    successNotify(response.data.Message);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRecipesByCategoryAPI = async (
  accessToken: string,
  category: string,
  page: number,
  limit: number,
) => {
  try {
    const response = await instance.get('by-category/', {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: {
        category: category,
        // page: page,
        // limit: limit,
      },
    });
    const responseData: IResponseRecipesArr = response.data;
    return responseData;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRecipesByChefAPI = async (
  accessToken: string,
  slug: string,
  page: number,
  limit: number,
) => {
  try {
    const response = await instance.get(`by-chef/${slug}/`, {
      headers: { Authorization: 'Bearer ' + accessToken },
      // params: {
      //   page: page,
      //   limit: limit,
      // },
    });
    const responseData: IResponseRecipesArr = response.data;
    return responseData;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRecipeBySlugAPI = async (accessToken: string, slug: string) => {
  try {
    const response = await instance.get(`/detail/${slug}/`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    const recipe: IRecipe = response.data;
    return recipe;
  } catch (error) {
    throw error.response.data;
  }
};

export const likeRecipeAPI = async (
  accessToken: string,
  slug: string,
  prev: boolean,
) => {
  try {
    const response = await instance.put(
      `like/${slug}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const saveRecipeAPI = async (
  accessToken: string,
  slug: string,
  prev: boolean,
) => {
  try {
    const response = await instance.put(
      `save/${slug}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSavedRecipesAPI = async (
  accessToken: string,
  page: number,
  limit: number,
) => {
  try {
    const response = await instance.get('saved-recipes/', {
      headers: { Authorization: 'Bearer ' + accessToken },
      // params: {
      //   page: page,
      //   limit: limit,
      // },
    });
    const responseData: IResponseRecipesArr = response.data;
    return responseData;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchRecipesAPI = async (
  accessToken: string,
  page: number,
  limit: number,
  search: string,
) => {
  try {
    const response = await instance.get(`search/`, {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: {
        // page: page,
        // limit: limit,
        search: search,
      },
    });
    const responseData: IResponseRecipesArr = response.data;
    return responseData;
  } catch (error) {
    throw error.response.data;
  }
};
