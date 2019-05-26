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

const spinnerSize = 40;
const marginTopSize = 10;

const useStyles = makeStyles((theme: Theme) => ({
  loadingSpinner: {
    marginTop: `${marginTopSize}px`,
    marginLeft: "20px"
  },
  listRoot: {
    backgroundColor: theme.palette.background.paper
  }
}));

const AccountList = ({ showDelete = false }: { showDelete?: boolean }) => {
  const classes = useStyles();
  const { data: accounts, loading, setData } = useAccounts();

  const onAccountDeleted = (id: string) =>
    setData(accounts.filter(it => it.id !== id));

  const collapsedHeight = loading
    ? `${spinnerSize + marginTopSize * 2}px`
    : undefined;

  return (
    <List className={classes.listRoot}>
      <Collapse in={!loading} collapsedHeight={collapsedHeight}>
        {loading && (
          <CircularProgress
            className={classes.loadingSpinner}
            size={spinnerSize}
          />
        )}
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            <AccountListItem
              account={account}
              onDeleted={showDelete ? onAccountDeleted : undefined}
            />
            {index + 1 < accounts.length && <Divider />}
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
};

export default AccountList;
