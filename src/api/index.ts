import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  LoginParam,
  LoginReturn,
  ApiReturn,
  RawMaterial,
  RawMaterialReturn,
  GetRawMaterialParam,
  User,
  CurrentUser,
} from './types';
import { url } from './apiUrl';

const { CUR_USER, LOGIN, RAW_LIST } = url;

const logError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('AXIOS ERROR DATA', error.response.data);
    console.log('AXIOS ERROR STATUS', error.response.status);
    console.log('AXIOS ERROR HEADER', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('AXIOS ERROR REQUEST', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('AXIOS ERROR MESSAGE', error.message);
  }
};

export const setAxiosAuthHeader = (token: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const login = (data: LoginParam): Promise<ApiReturn<LoginReturn>> => {
  const options: AxiosRequestConfig = {
    method: 'post',
    url: LOGIN,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
      grant_type: 'password',
      client_id: 7,
      client_secret: '7NDniuscI4542dXzaUiCTN79iIuuMNiQ0wcItmxa',
    },
  };

  return axios(options)
    .then((res: AxiosResponse<LoginReturn>) => ({
      error: false,
      data: res.data,
    }))
    .catch((err: AxiosError<LoginReturn>) => {
      logError(err);
      return {
        error: true,
        message: err.response?.data?.message ?? 'Unknown Error',
      };
    });
};

export const getRawMaterial = (
  params: GetRawMaterialParam,
): Promise<ApiReturn<RawMaterial[]>> => {
  const options: AxiosRequestConfig = {
    method: 'get',
    url: RAW_LIST,
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  };
  console.log('PRINT', options.params);

  return axios(options)
    .then((res: AxiosResponse<RawMaterialReturn>) => ({
      error: false,
      data: res.data.data,
      lastPage: res.data.meta.last_page,
    }))
    .catch((err: AxiosError<RawMaterialReturn>) => {
      logError(err);
      return {
        error: true,
        message: err.response?.data?.message ?? 'Unknown Error',
      };
    });
};

export const getUserProfile = (): Promise<ApiReturn<User>> => {
  const options: AxiosRequestConfig = {
    method: 'get',
    url: CUR_USER,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios(options)
    .then((res: AxiosResponse<CurrentUser>) => ({
      error: false,
      data: res.data.user,
    }))
    .catch((err: AxiosError<CurrentUser>) => {
      logError(err);
      return {
        error: true,
        message: err.response?.data?.message ?? 'Unknown Error',
      };
    });
};
