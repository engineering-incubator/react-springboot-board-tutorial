import axios, { AxiosRequestConfig, Method } from 'axios';
import { API_URLS } from '../config';
import qs from 'qs';
import { ArticleItemType, ArticlesParams } from '../hooks/api/useArticles';
import { ExternalResponse } from 'src/@types/response';

const httpClient = () =>
  axios.create({
    withCredentials: true,
    timeout: 2000,
  });

export function generateUrl(path: string, params: { [key: string]: string | number }) {
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

export const requestArticleItem = async (articleId: string) =>
  await requestClient({ method: 'get', url: `${API_URLS.ARTICLES}/${articleId}` });

export const postArticleItem = async <T>(
  method: Method,
  data: T,
  articleId?: string,
): Promise<ExternalResponse<ArticleItemType>> =>
  await requestClient({ method, url: `${API_URLS.ARTICLES}/${articleId}`, data });

export const deleteArticleItem = async <T>(articleId: string): Promise<ExternalResponse<any>> =>
  await requestClient({ method: 'delete', url: `${API_URLS.ARTICLES}/${articleId}` });
