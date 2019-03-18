import React from "react";

import { RouteProps } from "react-router-dom";
import RouteWithAuthentication from "../RouteWithAuthentication";

interface IProps extends RouteProps {
  Component: React.ComponentType;
}

const UserRoute = ({ Component, ...rest }: IProps) => (
  <RouteWithAuthentication
    onlyLoggedIn={true}
    redirectRoute="/login"
    Component={Component}
    {...rest}
  />
);

export default UserRoute;
