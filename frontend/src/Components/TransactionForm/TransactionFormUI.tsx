import {
  Button,
  Collapse,
  createStyles,
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
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React, { ChangeEvent, SyntheticEvent } from "react";
import TagPicker from "./TagPicker";
import { IAccount, ICategory } from "./TransactionForm";
import ITransaction from "./TransactionModel";

const styles = (theme: Theme) => createStyles({
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  progress: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
  },
  hidden: {
    opacity: 0,
  },
});

interface IProps extends WithStyles<typeof styles> {
  onFieldChange: (field: string, value: any) => void;
  transaction: ITransaction;
  categories: ICategory[];
  accounts: IAccount[];
  loading: boolean;
  onSubmit: () => void;
}

const TransactionFormUI = ({
  transaction,
  onFieldChange,
  classes,
  categories,
  accounts,
  loading,
  onSubmit,
 }: IProps) => {

  const [categoryError, setCategoryError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);

  const fieldUpdate = (fieldId: string) => (e: ChangeEvent<HTMLInputElement>): void  => {
    if (fieldId === "date") {
      // the date picker sucks
      // so just stop it from becomming invalid
      const selectedDate = new Date(e.target.value);
      const now = new Date();
      if (selectedDate > now) {
        setDateError(true);
        // disallow bad time entry
        e.preventDefault();
        return;
      } else {
        setDateError(false);
      }
    }
    onFieldChange(fieldId, e.target.value);
    if (fieldId === "price") {
      setPriceError(false);
    }
  };

  const handleSelect = (fieldId: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    onFieldChange(fieldId, e.target.value);
    if (fieldId === "category") {
      setCategoryError(false);
     }
  };

  const onTagsChange = (tags: string[]) => {
    onFieldChange("tags", tags);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    // basic validation:
    let error = false;
    e.preventDefault();
    if (transaction.category <= 0) {
      setCategoryError(true);
      error = true;
    } else {
      setCategoryError(false);
    }
    if (transaction.price === "") {
      setPriceError(true);
      error = true;
    } else {
      setPriceError(false);
    }

    if (!error) {
      onSubmit();
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
          <FormControl  fullWidth={true} error={categoryError}>
            <InputLabel htmlFor="category-helper">Category</InputLabel>
            <Select
              fullWidth={true}
              value={transaction.category}
              onChange={handleSelect("category")}
              input={<Input name="category" id="category-helper" />}
              disabled={loading}
            >
              {categories.map((item) => (<MenuItem value={item.id} key={item.id}>{item.text}</MenuItem>))}
            </Select>
            <FormHelperText className={categoryError ? "" : classes.hidden} >Please select a category</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
        <FormControl  fullWidth={true} error={dateError}>
          <TextField
            id="transaction-datetime"
            label="Time"
            type="datetime-local"
            value={transaction.date}
            InputLabelProps={{shrink: true}}
            onChange={fieldUpdate("date")}
            fullWidth={true}
            disabled={loading}
            error={dateError}
          />
          <FormHelperText className={dateError ? "" : classes.hidden} >Can't set a future date</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item={true} xs={6} sm={6}>
          <FormControl error={priceError} fullWidth={true}>
            <TextField
              id="price"
              name="price"
              label="Price"
              fullWidth={true}
              onChange={fieldUpdate("price")}
              error={priceError}
              disabled={loading}
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                type: "number",
                min: "1",
              }}
            />
            <FormHelperText className={priceError ? "" : classes.hidden}>Please enter a price</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item={true} xs={6} sm={6}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="account-helper">Account</InputLabel>
            <Select
              fullWidth={true}
              value={transaction.account}
              onChange={handleSelect("account")}
              input={<Input name="account" id="account-helper" />}
              disabled={loading}
            >
              {accounts.map((item) => (<MenuItem value={item.id} key={item.id}>{item.text}</MenuItem>))}
            </Select>
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
        <LinearProgress
          className={classes.progress}
        />
      </Collapse>
    </form>
  </React.Fragment>
  );
};

export default withStyles(styles)(TransactionFormUI);
