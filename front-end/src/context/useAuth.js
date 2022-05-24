import React, { useContext } from "react";
import { loginContext } from "./loginContext";

export function useAuth() {
  return useContext(loginContext)
}