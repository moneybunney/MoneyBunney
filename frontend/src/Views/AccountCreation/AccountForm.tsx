import { Button, InputAdornment, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import FormField from "../../Components/FormField";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    justifyContent: "space-between"
  }
}));

interface IProps {
  onSubmit: (accountName: string, initialBalance: number) => void;
}

const AccountForm = ({ onSubmit }: IProps) => {
  const classes = useStyles();

  const [accountName, setAccountName] = React.useState("");
  const [initialBalance, setInitialBalance] = React.useState("0");

  const onAccountNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value);
  };

  const onInitialBalanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInitialBalance(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(accountName, +initialBalance);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormField
        error={false}
        disabled={false}
        fieldType="text"
        name="accountName"
        text="Account name"
        onChange={onAccountNameChange}
        value={accountName}
        autoFocus={true}
      />
      <FormField
        fieldType="number"
        name="initialBalance"
        text="Initial balance"
        onChange={onInitialBalanceChange}
        value={initialBalance}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
      />
      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={false}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
