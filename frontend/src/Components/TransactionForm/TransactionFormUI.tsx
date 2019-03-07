import {
  Button,
  Collapse,
  createStyles,
  FormControl,
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
  categoryDropdown: {
    width: "100%",
    marginRight: theme.spacing.unit,
  },
  strech: {
    width: "100%",
    justifyItems: "flex-end",
  },
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

  const fieldUpdate = (fieldId: string) => (e: ChangeEvent<HTMLInputElement>): void  => {
    onFieldChange(fieldId, e.target.value);
  };

  const handleSelect = (fieldId: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    onFieldChange(fieldId, e.target.value);
  };

  const onTagsChange = (tags: string[]) => {
    onFieldChange("tags", tags);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // validate
    onSubmit();
  };

  return (
  <React.Fragment>
    <Typography variant="h6" gutterBottom={true}>
      Transaction details
    </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12} sm={5}>
          <FormControl className={classes.categoryDropdown} >
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
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={7} className={classes.strech}>
        <TextField
          id="transaction-datetime"
          label="Time"
          type="datetime-local"
          defaultValue={transaction.date}
          InputLabelProps={{shrink: true}}
          onChange={fieldUpdate("date")}
          fullWidth={true}
          disabled={loading}
        />
        </Grid>
        <Grid item={true} xs={6} sm={7}>
          <TextField
            id="price"
            name="price"
            label="Price"
            fullWidth={true}
            onChange={fieldUpdate("price")}
            disabled={loading}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
              type: "number",
              min: "1",
            }}
          />
        </Grid>
        <Grid item={true} xs={6} sm={5}>
          <FormControl className={classes.categoryDropdown} >
            <InputLabel htmlFor="account-helper">Account</InputLabel>
            <Select
              fullWidth={true}
              value={transaction.account}
              onChange={handleSelect("account")}
              input={<Input name="category" id="category-helper" />}
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
