import axios, { AxiosRequestConfig } from 'axios';
import { API_URLS } from '../config';
import qs from 'qs';
import { ArticlesParams } from '../hooks/api/useArticles';

const httpClient = () =>
  axios.create({
    withCredentials: true,
    timeout: 2000,
  });

export function generateUrl(path: string, params = {}) {
  const query = qs.stringify(params);
  return `${path}?${query ? `&${query}` : ''}`;
}

const requestClient = async (params: AxiosRequestConfig) => {
  try {
    const response = await httpClient()({
      ...params,
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const { message } = err as Error;
      console.error(`api error: ${message}`);
    }
    // sentry 등 logging 을 보낸다.
    return 'uncaught error';
  }
};

export const postSignup = async <T>(data: T) =>
  await requestClient({ method: 'post', url: API_URLS.SIGNUP, data });

export const requestArticles = async (params: ArticlesParams) =>
  await requestClient({ method: 'get', url: API_URLS.ARTICLES, params });

export const requestArticleItem = async (articleId: number) =>
  await requestClient({ method: 'get', url: `${API_URLS.ARTICLES}/${articleId}` });

export const postArticleItem = async <T>(data: T) => {
  await requestClient({ method: 'post', url: `${API_URLS.ARTICLES}`, data });
};
