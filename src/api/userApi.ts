import { IChef, ITokens, IUser } from '@/utils/typesAPI';
import { sleep } from '@/utils/utils';
import axios from 'axios';
import { chefs } from './chefs';
const API = 'https://';

const instance = axios.create({
  baseURL: API,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});

export const userLoginAPI = async (email: string, password: string) => {
  try {
    const obj = {
      email: email,
      password: password,
    };
    // const response = await instance.post('/v1/auth/login', JSON.stringify(obj));
    // const tokens: ITokens = response.data;
    const tokens: ITokens = {
      accessToken: 'sdf',
      refreshToken: 'sd',
    };
    return tokens;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUserAPI = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const obj = {
      username: username,
      password: password,
      email: email,
    };
    const response = await instance.post('/v1/users/', JSON.stringify(obj));
  } catch (error) {
    throw error.response.data;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    let data = `Bearer ${refreshToken}`;
    const accessToken = await instance.post('/v1/auth/refresh', data);
    return accessToken.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserAPI = async (accessToken: string) => {
  try {
    // const response = await instance.get('/v1/users', {
    //   headers: { Authorization: 'Bearer ' + accessToken },
    // });
    // const user: IUser = response.data;
    const user: IUser = {
      username: 'test',
      bio: 'test bio',
      photo: 'https://robohash.org/illoquoquia.png?size=160x160&set=set1',
      recipes: 5,
      followers: 3,
      follow: 2,
    };
    await sleep(1000);
    return user;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchChefs = async (
  accessToken: string,
  page: number,
  limit: number,
  search: string,
) => {
  try {
    // const response = await instance.get(`/v1/users/search/`, {
    //   headers: { Authorization: 'Bearer ' + accessToken },
    //   params: {
    //     page: page,
    //     limit: limit,
    //     search: search,
    //   },
    // });
    // await sleep(1000);
    // const chefsArr: Array<IRecipeSmall> = dishes;
    const chefsArr: Array<IChef> = chefs;
    return chefsArr;
  } catch (error) {
    throw error.response.data;
  }
};
