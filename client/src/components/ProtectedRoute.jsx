import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ authenticated, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
