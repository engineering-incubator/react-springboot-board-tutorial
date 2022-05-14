import axios from "axios";

export const requester = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
