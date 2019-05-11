import {
  CircularProgress,
  Collapse,
  Divider,
  List,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import { useAccounts } from "../../Hooks/useApi";
import AccountListItem from "./AccountListItem";

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  }
}));

const AccountList = () => {
  const classes = useStyles();
  const { data: accounts, loading } = useAccounts();

  return (
    <List className={classes.listRoot}>
      <Collapse in={!loading}>
        {loading && <CircularProgress size={40} />}
        {accounts.map(account => (
          <React.Fragment key={account.id}>
            <AccountListItem account={account} />
            <Divider />
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
};

export default AccountList;
