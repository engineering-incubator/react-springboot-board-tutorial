import axios, { AxiosRequestConfig } from 'axios';

const RestWithCredentials = (options?: AxiosRequestConfig) =>
  axios.create({ withCredentials: true, timeout: 2000, ...options });

export default RestWithCredentials;
