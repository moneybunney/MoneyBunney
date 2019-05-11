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

const SpinnerSize = 40;
const MarginTopSize = 10;

const useStyles = makeStyles((theme: Theme) => ({
  loadingSpinner: {
    marginTop: `${MarginTopSize}px`,
    marginLeft: "20px"
  },
  listRoot: {
    backgroundColor: theme.palette.background.paper
  }
}));

const AccountList = () => {
  const classes = useStyles();
  const { data: accounts, loading } = useAccounts();

  return (
    <List className={classes.listRoot}>
      <Collapse
        in={!loading}
        collapsedHeight={`${SpinnerSize + MarginTopSize * 2}px`}
      >
        {loading && (
          <CircularProgress
            className={classes.loadingSpinner}
            size={SpinnerSize}
          />
        )}
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
