import React from "react";

import {
  AppBar,
  createStyles,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { Notifications } from "@material-ui/icons";
import LogOutButton from "../LogOutButton";

const drawerWidth = 240;
const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    title: {
      flexGrow: 1
    }
  });

export interface IProps extends WithStyles<typeof styles> {
  text: string;
}

const PageHeader = ({ classes, text }: IProps) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Typography
        variant="h6"
        color="inherit"
        noWrap={true}
        className={classes.title}
      >
        {text}
      </Typography>
      <LogOutButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(PageHeader);
