import { IRecipe, IRecipeSmall } from '@/utils/typesAPI';
import axios from 'axios';
const API = 'https://';
import { dishes } from './dishes';
import { sleep } from '@/utils/utils';
const instance = axios.create({
  baseURL: API,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});

export const getRecipes = async (
  accessToken: string,
  category: string,
  page: number,
  limit: number,
) => {
  try {
    // const response = await instance.get('/v1/recipes', {
    //   headers: { Authorization: 'Bearer ' + accessToken },
    //   params: {
    //     category: category,
    //     page: page,
    //     limit: limit,
    //   },
    // });
    // const recipesArr: Array<IRecipeSmall> = response.data;
    await sleep(1000);
    const recipesArr: Array<IRecipeSmall> = dishes;
    return recipesArr;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRecipesById = async (
  accessToken: string,
  page: number,
  limit: number,
  id: number,
) => {
  try {
    const response = await instance.get(`/v1/recipes/by-chef/:${id}`, {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: {
        page: page,
        limit: limit,
      },
    });
    const recipesArr: Array<IRecipeSmall> = response.data;
    return recipesArr;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSavedRecipes = async (
  accessToken: string,
  page: number,
  limit: number,
) => {
  try {
    const response = await instance.get('/v1/saved-recipes', {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: {
        page: page,
        limit: limit,
      },
    });
    const recipesArr: Array<IRecipeSmall> = response.data;
    return recipesArr;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRecipeById = async (accessToken: string, id: number) => {
  try {
    const response = await instance.get(`/v1/recipes/:${id}`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    const recipe: IRecipe = response.data;
    return recipe;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchRecipes = async (
  accessToken: string,
  page: number,
  limit: number,
  search: string,
) => {
  try {
    // const response = await instance.get(`/v1/recipes/search/`, {
    //   headers: { Authorization: 'Bearer ' + accessToken },
    //   params: {
    //     page: page,
    //     limit: limit,
    //     search: search,
    //   },
    // });
    // const recipesArr: Array<IRecipeSmall> = response.data;
    await sleep(1000);
    const recipesArr: Array<IRecipeSmall> = dishes;
    return recipesArr;
  } catch (error) {
    throw error.response.data;
  }
};
