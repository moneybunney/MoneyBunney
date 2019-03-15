import React from "react";

import { RouteProps } from "react-router-dom";
import RouteWithAuthentication from "../RouteWithAuthentication";

interface IProps extends RouteProps {
  Component: React.ComponentType;
}

const GuestRoute = ({ Component, ...rest }: IProps) => (
  <RouteWithAuthentication
    onlyLoggedIn={false}
    redirectRoute="/"
    Component={Component}
    {...rest}
  />
);

export default GuestRoute;
