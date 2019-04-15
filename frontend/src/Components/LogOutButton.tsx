import { Button } from "@material-ui/core";
import React from "react";
import useReactRouter from "use-react-router";
import { LoginLocation } from "../routes";
import { signOut } from "../Utilities/AuthenticationCookies";

const LogOutButton = () => {
  const { history } = useReactRouter();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    signOut();
    history.replace(LoginLocation);
  };

  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Log out
    </Button>
  );
};

export default LogOutButton;
