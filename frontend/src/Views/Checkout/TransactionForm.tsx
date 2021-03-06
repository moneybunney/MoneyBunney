import {
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { ChangeEvent, SyntheticEvent } from "react";
import { IAccount } from "../../Models/AccountModel";
import { ICategory, ITransaction } from "../../Models/TransactionModel";
import TagPicker from "./TagPicker";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  progress: {
    width: "100%",
    marginTop: theme.spacing.unit * 4
  },
  hidden: {
    opacity: 0
  }
}));

interface IProps {
  onFieldChange: (field: string, value: any) => void;
  transaction: ITransaction;
  categories: ICategory[];
  accounts: IAccount[];
  loading: boolean;
  onSubmit: (transaction: ITransaction) => void;
}

enum TransferType {
  Income = "Income",
  Expense = "Expense"
}

const TransactionForm = ({
  transaction,
  onFieldChange,
  categories,
  accounts,
  loading,
  onSubmit
}: IProps) => {
  const classes = useStyles();

  const transactionAmount = Number(transaction.amount);
  const [accountError, setAccountError] = React.useState(false);
  const [categoryError, setCategoryError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);

  const initialTransferType =
    isNaN(transactionAmount) || transactionAmount >= 0
      ? TransferType.Expense
      : TransferType.Income;
  const [transferType, setTransferType] = React.useState(initialTransferType);

  const fieldUpdate = (fieldId: string) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    if (fieldId === "date") {
      // the date picker sucks
      // so just stop it from becomming invalid
      const selectedDate = new Date(e.target.value);
      const now = new Date();
      if (selectedDate > now || isNaN(selectedDate.getTime())) {
        setDateError(true);
        // disallow bad time entry
        e.preventDefault();
        return;
      } else {
        setDateError(false);
      }
    }

    if (fieldId === "amount") {
      setAmountError(false);
    }

    onFieldChange(fieldId, e.target.value);
  };

  const handleSelect = (fieldId: string) => (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    if (fieldId === "transferType") {
      // typescript making jokes again
      const transactionTypeIndex = Number(e.target.value);
      const newTransactionType = Object.values(TransferType)[
        transactionTypeIndex
      ];
      setTransferType(newTransactionType);
      return;
    }
    if (fieldId === "category") {
      setCategoryError(false);
    }

    if (fieldId === "account") {
      setAccountError(false);
    }

    onFieldChange(fieldId, e.target.value);
  };

  const onTagsChange = (tags: string[]) => {
    onFieldChange("tags", tags);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    // basic validation:
    let error = false;
    e.preventDefault();
    if (categories.filter(it => it.id === transaction.category).length === 0) {
      setCategoryError(true);
      error = true;
    } else {
      setCategoryError(false);
    }
    if (isNaN(transaction.amount) || transaction.amount <= 0) {
      setAmountError(true);
      error = true;
    } else {
      setAmountError(false);
    }

    if (accounts.filter(it => it.id === transaction.account).length === 0) {
      setAccountError(true);
      error = true;
    } else {
      setAccountError(false);
    }

    if (!error) {
      const transferAmount =
        transferType === TransferType.Expense
          ? -Number(transaction.amount)
          : Number(transaction.amount);
      const finalTransaction = {
        ...transaction,
        amount: transferAmount
      };
      onSubmit(finalTransaction);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom={true}>
        Transaction details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={12} sm={6}>
            <FormControl fullWidth={true} error={categoryError}>
              <InputLabel htmlFor="category-helper">Category</InputLabel>
              <Select
                fullWidth={true}
                value={transaction.category}
                onChange={handleSelect("category")}
                input={<Input name="category" id="category-helper" />}
                disabled={loading}
              >
                {categories.map(item => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={categoryError ? "" : classes.hidden}>
                Please select a category
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <FormControl fullWidth={true} error={dateError}>
              <TextField
                id="transaction-datetime"
                label="Time"
                type="datetime-local"
                value={transaction.date}
                InputLabelProps={{ shrink: true }}
                onChange={fieldUpdate("date")}
                fullWidth={true}
                disabled={loading}
                error={dateError}
              />
              <FormHelperText className={dateError ? "" : classes.hidden}>
                Can't set an invalid date
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item={true} xs={6} sm={6}>
            <FormControl error={amountError} fullWidth={true}>
              <TextField
                id="amount"
                name="amount"
                label="Amount"
                fullWidth={true}
                onChange={fieldUpdate("amount")}
                value={transaction.amount}
                error={amountError}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                  type: "number",
                  min: "1"
                }}
              />
              <FormHelperText className={amountError ? "" : classes.hidden}>
                Please enter a valid amount
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item={true} xs={6} sm={3}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="transferType-helper">Type</InputLabel>
              <Select
                fullWidth={true}
                value={Object.keys(TransferType).indexOf(transferType)}
                onChange={handleSelect("transferType")}
                input={<Input name="transferType" id="transferType-helper" />}
                disabled={loading}
              >
                {Object.keys(TransferType).map((type, index) => (
                  <MenuItem value={index} key={index}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item={true} xs={12} sm={3}>
            <FormControl fullWidth={true} error={accountError}>
              <InputLabel htmlFor="account-helper">Account</InputLabel>
              <Select
                fullWidth={true}
                value={transaction.account}
                onChange={handleSelect("account")}
                input={<Input name="account" id="account-helper" />}
                disabled={loading}
              >
                {accounts.map(item => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={accountError ? "" : classes.hidden}>
                Please select a valid account
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item={true} xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              onChange={fieldUpdate("description")}
              fullWidth={true}
              multiline={true}
              rowsMax={4}
              disabled={loading}
            />
          </Grid>
          <TagPicker
            tags={transaction.tags}
            onChange={onTagsChange}
            disabled={loading}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          disabled={loading}
        >
          Submit
        </Button>
        <Collapse in={loading}>
          <LinearProgress className={classes.progress} />
        </Collapse>
      </form>
    </React.Fragment>
  );
};

export default TransactionForm;
