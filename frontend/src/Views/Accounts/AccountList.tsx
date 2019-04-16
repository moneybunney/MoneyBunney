import {
  CircularProgress,
  Collapse,
  Divider,
  List,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import { IAccount } from "../../Models/AccountModel";
import AccountListItem from "./AccountListItem";

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  }
}));

export interface IProps {
  accounts: IAccount[];
  loading: boolean;
}

const AccountList = ({ accounts, loading }: IProps) => {
  const classes = useStyles();
  return (
    <List className={classes.listRoot}>
      <Collapse collapsedHeight="40px" in={!loading}>
        {loading && <CircularProgress size={40} />}
        {accounts.map((account, i) => (
          <React.Fragment>
            <AccountListItem key={"account_" + i} account={account} />
            <Divider />
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
};

export default AccountList;
