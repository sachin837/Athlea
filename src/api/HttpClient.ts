import axios, {AxiosInstance} from 'axios';
import {getErrorGenerater} from './api-problem.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReturnResponse} from './type';
import environment from '../env.js';

const baseURL = environment.baseURL;

const createHttpAPI = (): AxiosInstance => {
  const client = axios.create({
    baseURL: baseURL,
  });

  client.defaults.headers.post['Content-Type'] = 'application/json';
  client.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  client.interceptors.response.use(
    response => {
      return response.data;
    },
    async error => {
      let originalConfig = error.config;
      if (error.response.status === 401) {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          originalConfig = {
            ...originalConfig,
            headers: {
              ...originalConfig.headers,
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
        }
        return client(originalConfig);
      }
      return Promise.reject(error.response.data);
    },
  );

  return client;
};

const API: AxiosInstance = createHttpAPI();

const HttpClient = {
  async get<TReturnType, TInput>(
    url: string,
    params?: TInput,
  ): Promise<ReturnResponse<TReturnType>> {
    try {
      const response = await API.get(url, {
        params: params,
      });
      return response;
    } catch (error) {
      return getErrorGenerater(error?.errors);
    }
  },
  async post<TReturnType, TInput>(
    url: string,
    body?: TInput,
  ): Promise<TReturnType> {
    try {
      const response = await API.post(url, body);
      return response;
    } catch (error) {
      return getErrorGenerater(error?.errors);
    }
  },
  async put<TReturnType, TInput>(
    url: string,
    body: TInput,
  ): Promise<ReturnResponse<TReturnType>> {
    try {
      const response = await API.put(url, body);
      return response;
    } catch (error) {
      return getErrorGenerater(error?.errors);
    }
  },
  async delete<TReturnType>(url: string): Promise<ReturnResponse<TReturnType>> {
    try {
      const response = await API.delete(url);
      return response;
    } catch (error) {
      return getErrorGenerater(error?.errors);
    }
  },
};

export default HttpClient;
