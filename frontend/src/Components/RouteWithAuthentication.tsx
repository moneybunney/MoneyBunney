import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { isAuthenticated } from "../Utilities/AuthenticationCookies";

interface IProps {
  Component: React.ComponentType;
  onlyLoggedIn: boolean;
  redirectRoute: string;
}

const RouteWithAuthentication = ({
  Component,
  onlyLoggedIn,
  redirectRoute,
  ...rest
}: IProps & RouteProps) => {

  const render = (props: RouteComponentProps<any>) =>
    isAuthenticated() === onlyLoggedIn ? (
      <Component />
    ) : (
      <Redirect
        to={{
          pathname: redirectRoute,
          state: { from: props.location },
        }}
      />
    );

  return <Route {...rest} render={render} />;
};

export default RouteWithAuthentication;
