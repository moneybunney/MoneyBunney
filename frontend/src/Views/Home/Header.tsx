import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  AppBar,
  Badge,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  List,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { Notifications } from "@material-ui/icons";
import LogOutButton from "../../Components/LogOutButton";
import MainListItems from "./MainListItems";
import SecondaryListItems from "./SecondaryListItems";

const drawerWidth = 240;
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    },
    title: {
      flexGrow: 1
    },
    headerIcon: {
      marginRight: "25px"
    }
  });

export interface IProps extends WithStyles<typeof styles> {}

const Header = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap={true}
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton className={classes.headerIcon} color="inherit">
            <Badge badgeContent={1} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <LogOutButton />
        </Toolbar>
      </AppBar>
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
    </div>
  );
};

export default withStyles(styles)(Header);
