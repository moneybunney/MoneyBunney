import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import {
  AccountBalance,
  BarChart,
  Dashboard,
  Layers
} from "@material-ui/icons";
import React from "react";

export const MainListItems = () => (
  <React.Fragment>
    <ListItem button={true}>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <AccountBalance />
      </ListItemIcon>
      <ListItemText primary="Balance" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <BarChart />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button={true}>
      <ListItemIcon>
        <Layers />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItem>
  </React.Fragment>
);

export default MainListItems;
