import { Button, InputAdornment, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { ChangeEvent, SyntheticEvent } from "react";

import FormField from "../../Components/FormField";
import { IAccount } from "../../Models/AccountModel";

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
  onFieldChange: (field: string, value: any) => void;
  account: IAccount;
  onSubmit?: (account: IAccount) => void;
}

const AccountForm = ({ account, onFieldChange, onSubmit }: IProps) => {
  const classes = useStyles();
  const fieldUpdate = (fieldId: string) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    onFieldChange(fieldId, e.target.value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    onSubmit(account);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormField
        error={false}
        disabled={false}
        fieldType="text"
        name="accountName"
        text="Account name"
        onChange={fieldUpdate("name")}
        value={account.name}
        autoFocus={true}
      />
      <FormField
        fieldType="number"
        name="initialBalance"
        text="Initial balance"
        onChange={fieldUpdate("initialBalance")}
        value={account.initialBalance.toString()}
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
