import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

export function PrivateRoute({ ...rest }) {
  const auth = useAuth();
  if (auth.isLoggedIn()) {
    return <Route {...rest} />;
  }
  return <Redirect to="/login" />;
}
