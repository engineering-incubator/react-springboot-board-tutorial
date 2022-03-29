import axios from 'axios';
import qs from 'qs';

export function generateUrl(path: string, params = {}) {
  const query = qs.stringify(params);
  return `${path}?${query ? `&${query}` : ''}`;
}

export async function fetchPostApi<T>(url: string, data?: T) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const { message } = err as Error;
      console.error(`api error: ${message}`);
    }
    // sentry 등 logging 을 보낸다.
    return 'uncaught error';
  }
}
