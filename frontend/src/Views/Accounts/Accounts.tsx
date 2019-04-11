import React, { useEffect, useState } from "react";

import { Fab, Paper, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import useReactRouter from "use-react-router";

import { getAccounts } from "../../Utilities/Api";
import AccountList from "./AccountList";
import { IAccount } from "../../Models/AccountModel";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "block",
    // the child list fills the parent
    width: "60%",
    marginTop: 32,
    marginBottom: 16,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(360 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 10
  }
}));

const Accounts = () => {
  const { history } = useReactRouter();
  const classes = useStyles();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setAccounts(await getAccounts());
      setLoading(false);
    };

    fetchData();
  }, []);

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace("/accounts/create");
  };

  return (
    <Paper className={classes.paper}>
      <AccountList accounts={accounts} loading={loading} />
      <Fab
        onClick={onClick}
        color="primary"
        className={classes.fab}
        aria-label="Add"
      >
        <Add />
      </Fab>
    </Paper>
  );
};

export default Accounts;
