import { ListItemSecondaryAction } from "@material-ui/core";
import React from "react";
import BalanceAmountText from "../../Components/BalanceAmountText";

interface IProps {
  amount: number;
}

const TransactionListItemAmount = ({ amount: amount }: IProps) => (
  <ListItemSecondaryAction>
    <BalanceAmountText amount={amount} difference={true} />
  </ListItemSecondaryAction>
);

export default TransactionListItemAmount;
