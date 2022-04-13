import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const httpClient = () =>
  axios.create({
    withCredentials: true,
    timeout: 2000,
  });

export function generateUrl(path: string, params = {}) {
  const query = qs.stringify(params);
  return `${path}?${query ? `&${query}` : ''}`;
}

export const fetchClient = async (config: AxiosRequestConfig) => {
  try {
    const response = await httpClient()({
      ...config,
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
