import { ITokens } from '@/utils/typesAPI';
import axios from 'axios';
import URL from './base_url';
import { toast } from 'react-toastify';
import { errorNotify, successNotify } from '@/utils/toaster';
import userStore from '@/store/userStore';

const instance = axios.create({
  baseURL: URL + 'users/',
  headers: { 'Content-Type': 'application/json' },
});

export const userLoginAPI = async (email: string, password: string) => {
  try {
    const obj = {
      email: email,
      password: password,
    };
    const response = await instance.post('login/', JSON.stringify(obj));
    const tokens: ITokens = response.data;
    return tokens;
  } catch (error) {
    errorNotify(error.response.data.Error);
    throw error.response.data;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    const obj = {
      refresh: refreshToken,
    };
    const response = await instance.post('login/refresh/', JSON.stringify(obj));
    const tokens: ITokens = response.data;
    return tokens;
  } catch (error) {
    errorNotify(error.response.data.Error);
    throw error.response.data;
  }
};

export const logoutAPI = async (refreshToken: string) => {
  try {
    const obj = {
      refresh: refreshToken,
    };
    const response = await instance.post('logout/', JSON.stringify(obj));
    return response.data;
  } catch (error) {
    errorNotify(error.response.data.Error);
    throw error.response.data;
  }
};

export const changePasswordAPI = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const obj = {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirm: newPassword,
    };
    const response = await instance.post(
      'change-password/',
      JSON.stringify(obj),
      { headers: { Authorization: `Bearer ${userStore.accessToken}` } },
    );
    successNotify(response.data.Message);
    return response.data;
  } catch (error) {
    errorNotify(error.response.data.Error);
    throw error.response.data;
  }
};

export const forgotPasswordAPI = async (email: string) => {
  try {
    const obj = {
      email: email,
      // url: 'https://crazy-zam.github.io/neo-cooks-corner/#/auth/change-password?fpt=',
      url: 'http://localhost:3000/#/auth/change-password?fpt=',
    };
    const response = await instance.post(
      'forgot-password/',
      JSON.stringify(obj),
    );
    successNotify(response.data.Message);
    return response.data;
  } catch (error) {
    errorNotify(error.response.data.Error);
    throw error.response.data;
  }
};

export const forgotPasswordChangeAPI = async (
  password: string,
  token: string,
) => {
  try {
    const obj = {
      password: password,
      password_confirm: password,
    };
    const response = await instance.post(
      'forgot-password/change/',
      JSON.stringify(obj),
      { params: { token: token } },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUserAPI = async (refreshToken: string) => {
  try {
    const response = await instance.delete('forgot-password/', {
      params: {
        refresh: refreshToken,
      },
    });
    return response.data;
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
      email: email,
      password: password,
      password_confirm: password,
      url: 'https://crazy-zam.github.io/neo-cooks-corner/#/auth/confirmation?ct=',
      // url: 'http://localhost:3000/#/auth/confirmation?ct=',
    };
    const response = await instance.post('signup/', JSON.stringify(obj));
    return response.data;
  } catch (error) {
    console.log(error);
    toast(error.data.Message);
    return error.response.data;
  }
};

export const resendEmailAPI = async (email: string, url: string) => {
  try {
    const obj = {
      email: email,
      url: url,
    };
    const response = await instance.post('resend-email/', JSON.stringify(obj));
    toast(response.data);
  } catch (error) {
    throw error.response.data;
  }
};
export const emailVerifyAPI = async (token: string) => {
  try {
    const response = await instance.get('email-verify/', {
      params: {
        token: token,
      },
    });
    toast(response.data);
  } catch (error) {
    throw error.response.data;
  }
};
