import React from "react";

import { AppBar, Theme, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Notifications } from "@material-ui/icons";
import LogOutButton from "../LogOutButton";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  title: {
    flexGrow: 1
  }
}));

export interface IProps {
  text: string;
}

const PageHeader = ({ text }: IProps) => {
  const classes = useStyles();

  return (
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
};

export default PageHeader;
