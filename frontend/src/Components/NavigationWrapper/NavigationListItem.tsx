import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {
  text: string;
  children: any;
  route: string;
}

const NavigationListItem = ({
  text,
  children,
  route,
  history,
  location,
}: IProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(route);
  };

  const itemSelected = location.pathname.startsWith(route);

  return (
    <ListItem button={true} onClick={onClick} selected={itemSelected}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default withRouter(NavigationListItem);
