import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { ArticleItemType, ArticlesParams } from '../hooks/api/useArticles';
import { LoginDataType } from '../hooks/api/useLogin';
import { ExternalResponse } from '../@types/response';

export const httpClient = axios.create({
  withCredentials: true,
});

export function generateUrl(path: string, params: { [key: string]: string | number }) {
  const query = qs.stringify(params);
  return `${path}?${query ? `&${query}` : ''}`;
}

export const requestClient = async (params: AxiosRequestConfig) => {
  try {
    const response = await httpClient({
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
  await requestClient({ method: 'post', url: '/api/v1/authentication/sign-up', data });

export const requestArticles = async (params: ArticlesParams) =>
  await requestClient({ method: 'get', url: '/api/v1/articles', params });

export const requestArticleItem = async (articleId: string) =>
  await requestClient({ method: 'get', url: `/api/v1/articles/${articleId}` });

export const createArticleItem = async <T>(data: T): Promise<ExternalResponse<ArticleItemType>> =>
  await requestClient({ method: 'post', url: '/api/v1/articles', data });

export const updateArticleItem = async <T>(
  data: T,
  articleId: string,
): Promise<ExternalResponse<ArticleItemType>> =>
  await requestClient({ method: 'put', url: `/api/v1/articles/${articleId}`, data });

export const deleteArticleItem = async <T>(
  data: T,
  articleId: string,
): Promise<ExternalResponse<ArticleItemType>> =>
  await requestClient({ method: 'delete', url: `/api/v1/articles/${articleId}`, data });

export const loginRequest = async (data: LoginDataType): Promise<ExternalResponse<LoginDataType>> =>
  await requestClient({
    method: 'post',
    url: '/api/v1/authentication/sign-in',
    data,
  });
