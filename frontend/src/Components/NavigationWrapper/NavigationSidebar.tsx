import {
  createStyles,
  Divider,
  Drawer,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import React from "react";
import MainListItems from "./MainListItems";
import SecondaryListItems from "./SecondaryListItems";

const drawerWidth = 240;
const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    toolbar: theme.mixins.toolbar
  });

export interface IProps extends WithStyles<typeof styles> {}

const NavigationSidebar = ({ classes }: IProps) => {
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
        <SecondaryListItems />
      </Drawer>
    </React.Fragment>
  );
};

export default withStyles(styles)(NavigationSidebar);
