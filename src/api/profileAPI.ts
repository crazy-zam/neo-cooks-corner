import { IChef, IResponseChefssArr, ITokens, IUser } from '@/utils/typesAPI';
import axios from 'axios';
import URL from './base_url';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: URL + 'profile/',
  headers: { 'Content-Type': 'application/json' },
});

export const getProfileAPI = async (accessToken: string) => {
  try {
    const response = await instance.get('myprofile/', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    const user: IUser = response.data;

    return user;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfileAPI = async (
  accessToken: string,
  username: string,
  bio: string,
  picture: File,
) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('picture', picture, picture.name);
    const response = await instance.put(`myprofile/`, formData, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getChefBySlugAPI = async (accessToken: string, slug: string) => {
  try {
    const response = await instance.get(`detail/${slug}/`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    const user: IUser = response.data;
    return user;
  } catch (error) {
    throw error.response.data;
  }
};

export const followChefAPI = async (accessToken: string, slug: string) => {
  try {
    const response = await instance.put(`follow/${slug}/`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    return response.data;
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
    const response = await instance.get('search/', {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: {
        // page: page,
        // limit: limit,
        search: search,
      },
    });
    const responseData: IResponseChefssArr = response.data;

    return responseData;
  } catch (error) {
    throw error.response.data;
  }
};
