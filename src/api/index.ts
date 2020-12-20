import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getEnvironment } from 'src/utils';
import { LoginParam, LoginReturn, ApiReturn } from './types';

const { baseUrl } = getEnvironment();
const LOGIN = `${baseUrl}/oauth/token`;
const RAW_LIST = `${baseUrl}/raw-materials`;

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
    .catch(err => {
      logError(err);
      return { error: true };
    });
};
