import { Divider, Drawer, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import MainListItems from "./MainListItems";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar
}));

const NavigationSidebar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <MainListItems />
        <Divider />
      </Drawer>
    </React.Fragment>
  );
};

export default NavigationSidebar;
