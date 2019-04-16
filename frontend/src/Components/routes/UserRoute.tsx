import React from "react";

import { RouteProps } from "react-router-dom";
import { LoginLocation } from "../../routes.constants";
import RouteWithAuthentication from "../RouteWithAuthentication";

interface IProps extends RouteProps {
  Component: React.ComponentType;
}

const UserRoute = ({ Component, ...rest }: IProps) => (
  <RouteWithAuthentication
    onlyLoggedIn={true}
    redirectRoute={LoginLocation}
    Component={Component}
    {...rest}
  />
);

export default UserRoute;
