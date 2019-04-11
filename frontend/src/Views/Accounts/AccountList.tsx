import {
  Divider,
  List,
  Theme,
  Collapse,
  CircularProgress
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
      <Collapse in={!loading}>
        {accounts.map((account, i) => (
          <React.Fragment>
            <AccountListItem key={"account_" + i} account={account} />
            <Divider />
          </React.Fragment>
        ))}
      </Collapse>
      <Collapse in={loading}>
        <CircularProgress size={40} />
      </Collapse>
    </List>
  );
};

export default AccountList;
