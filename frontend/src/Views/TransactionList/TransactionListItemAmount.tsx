import React from "react";
import BalanceAmountText from "../../Components/BalanceAmountText";

interface IProps {
  amount: number;
}

const TransactionListItemAmount = ({ amount: amount }: IProps) => (
  <BalanceAmountText amount={amount} difference={true} />
);

export default TransactionListItemAmount;
