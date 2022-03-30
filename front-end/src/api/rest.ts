import axios, { AxiosRequestConfig } from 'axios';

const RestWithCredentials = (options?: AxiosRequestConfig) =>
  axios.create({ withCredentials: true, timeout: 5000, ...options });

export default RestWithCredentials();
