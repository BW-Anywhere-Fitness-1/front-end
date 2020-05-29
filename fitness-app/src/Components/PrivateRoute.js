import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocalStorage } from "../hooks";

function PrivateRoute(props) {
  const [user, setUser] = useLocalStorage("user", "");
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (user.access_token) {
          // We are logged in, so render the component as normal
          // Passing "renderProps" so "Component" has access to all
          // the React Router stuff
          return <Component {...renderProps} />;
        } else {
          // We are not logged in, so redirect to the signin page
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
export default PrivateRoute;
