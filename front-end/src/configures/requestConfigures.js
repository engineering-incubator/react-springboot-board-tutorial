import axios from "axios";
import React from "react";

export const requester = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
