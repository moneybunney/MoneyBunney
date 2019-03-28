import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { ReactNode } from "react";

interface IProps {
  text: string;
  children: any;
}

const NavigationListItem = ({ text, children }: IProps) => (
  <ListItem button={true}>
    <ListItemIcon>{children}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

export default NavigationListItem;
