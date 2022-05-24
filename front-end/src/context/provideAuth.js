import React from "react";
import { useAuth } from "./useAuth";
import { Redirect, Route, useLocation } from "react-router-dom";

export function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        auth.isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}