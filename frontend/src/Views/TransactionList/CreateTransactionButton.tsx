import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";

import useReactRouter from "use-react-router";

import { TransactionsCreateLocation } from "../../routes.constants";

interface IProps {
  className?: string;
}

const CreateTransactionButton = ({ className }: IProps) => {
  const { history } = useReactRouter();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(TransactionsCreateLocation);
  };

  return (
    <Fab
      onClick={onClick}
      color="primary"
      className={className}
      aria-label="Add"
    >
      <Add />
    </Fab>
  );
};

export default CreateTransactionButton;
