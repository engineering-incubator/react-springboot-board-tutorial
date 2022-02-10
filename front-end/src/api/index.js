import axios from 'axios';
import RestWithCredentials from '_/utils/rest';

export function generateQueryString(params) {
  return Object.keys(params)
    .map(
      (key) =>
        `${key}=${key === 'keyword' ? encodeURIComponent(String(params[key])) : params[key]}`,
    )
    .join('&');
}

export function generateUrl(path, params = {}) {
  const query = generateQueryString(params);
  return `${process.env.REACT_APP_API_URL}${path}?${query ? `&${query}` : ''}`;
}

export async function fetchApi(type, url, data) {
  try {
    const response = await RestWithCredentials[type](url, data);
    return response.data;
  } catch (errnknown) {
    const { message } = err;
    console.error(`api error: ${message}`);
  }
}
