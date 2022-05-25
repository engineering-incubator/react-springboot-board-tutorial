import React from "react";
import axios from "axios";
import { isSuccess } from "../utilites/validates/httpValidation";

export const requester = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default async function requester1(url, method = "GET", data) {
  try {
    const response = await requester.request({
      url,
      method,
      data:
        (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") &&
        data,
      params:
        (method.toUpperCase() === "GET" || method.toUpperCase() === "DELETE") &&
        data,
    });

    if (isSuccess(response)) {
      return {
        isSuccess: true,
        data: response.data.content,
      };
    }
    return {
      isSuccess: false,
      data: null,
      message: data.message,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        isSuccess: false,
        data: null,
        message: e.message || "잠시 후 시도하세요. (E0001)",
      };
    }
    return {
      isSuccess: false,
      data: null,
      message: "잠시 후 시도하세요. (E0002)",
    };
  }
}
