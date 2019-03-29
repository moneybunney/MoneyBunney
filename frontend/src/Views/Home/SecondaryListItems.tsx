import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import { AccountCircle, Settings } from "@material-ui/icons";
import React from "react";

export const SecondaryListItems = () => (
  <React.Fragment>
    <ListItem button={true}>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </React.Fragment>
);

export default SecondaryListItems;
