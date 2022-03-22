import RestWithCredentials from '_/utils/rest';
import QueryString from 'qs';

export function generateUrl(path: string, params = {}) {
  const query = QueryString.parse(params);
  return `${process.env.REACT_APP_API_URL}${path}?${query ? `&${query}` : ''}`;
}

export async function fetchPostApi<T>(url: string, data?: T) {
  try {
    const response = await RestWithCredentials().post(url, data);
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
