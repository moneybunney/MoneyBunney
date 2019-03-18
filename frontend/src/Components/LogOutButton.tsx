import { Button } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { signOut } from "../Utilities/AuthenticationCookies";

const LogOutButton = ({ history }: RouteComponentProps<any>) => {

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    signOut();
    history.replace("/login");
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
    >
    Log out
    </Button>
  );
};

export default withRouter(LogOutButton);
