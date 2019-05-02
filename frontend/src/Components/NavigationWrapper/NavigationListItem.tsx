import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { ReactElement } from "react";
import useReactRouter from "use-react-router";

interface IProps {
  text: string;
  children: ReactElement;
  route: string;
}

const NavigationListItem = ({ text, children, route }: IProps) => {
  const { history, location } = useReactRouter();

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

export default NavigationListItem;
