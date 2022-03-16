import axios from 'axios';
import RestWithCredentials from '_/utils/rest';
import { QueryStringParams, AXIOS_TYPE } from '_/constants';

export function generateQueryString(params: QueryStringParams) {
  return Object.keys(params)
    .map(
      (key) =>
        `${key}=${key === 'keyword' ? encodeURIComponent(String(params[key])) : params[key]}`,
    )
    .join('&');
}

export function generateUrl(path: string, params = {}) {
  const query = generateQueryString(params);
  return `${process.env.REACT_APP_API_URL}${path}?${query ? `&${query}` : ''}`;
}

export async function fetchApi<T>(type: AXIOS_TYPE, url: string, data?: T) {
  try {
    const response = await RestWithCredentials[type](url, data);
    return response.data;
  } catch (err: unknown) {
    const { message } = err as Error;
    console.error(`api error: ${message}`);
  }
}
