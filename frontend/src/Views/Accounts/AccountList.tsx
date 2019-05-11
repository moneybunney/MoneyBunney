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
    backgroundColor: theme.palette.background.paper
  }
}));

const AccountList = () => {
  const classes = useStyles();
  const { data: accounts, loading } = useAccounts();

  return (
    <List className={classes.listRoot}>
      <Collapse in={!loading}>
        {loading && <CircularProgress size={40} />}
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            <AccountListItem account={account} />
            {index + 1 < accounts.length && <Divider />}
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
};

export default AccountList;
