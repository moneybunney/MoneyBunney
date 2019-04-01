import Paper, {
  createStyles,
  Divider,
  List,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";

import { IAccount } from "../../Models/AccountModel";
import AccountListItem from "./AccountListItem";

const styles = (theme: Theme) =>
  createStyles({
    listRoot: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      paddingTop: 0,
      paddingBottom: 0
    }
  });

export interface IProps extends WithStyles<typeof styles> {
  accounts: IAccount[];
}

const AccountList = ({ classes, accounts }: IProps) => (
  <List className={classes.listRoot}>
    {accounts.map((account, i) => (
      <React.Fragment>
        <AccountListItem key={"account_" + i} account={account} />
        <Divider />
      </React.Fragment>
    ))}
  </List>
);

export default withStyles(styles)(AccountList);
