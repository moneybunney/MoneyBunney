import {
  createStyles,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React, { ChangeEvent } from "react";
import IAccount from "./AccountModel";
import ICategory from "./CategoryModel";
import TagPicker from "./TagPicker";
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
});

interface IProps extends WithStyles<typeof styles> {
  onFieldChange: (field: string, value: any) => void;
  transaction: ITransaction;
  categories: ICategory[];
  accounts: IAccount[];
}

const TransactionFormUI = ({ transaction, onFieldChange, classes, categories, accounts}: IProps) => {

  const fieldUpdate = (fieldId: string) => (e: ChangeEvent<HTMLInputElement>): void  => {
    onFieldChange(fieldId, e.target.value);
  };

  const handleSelect = (fieldId: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    onFieldChange(fieldId, e.target.value);
  };

  const onTagsChange = (tags: string[]) => {
    onFieldChange("tags", tags);
  };

  return (
  <React.Fragment>
    <Typography variant="h6" gutterBottom={true}>
      Transaction details
    </Typography>
    <Grid container={true} spacing={24}>
      <Grid item={true} xs={12} sm={5}>
        <FormControl className={classes.categoryDropdown} >
          <InputLabel htmlFor="category-helper">Category</InputLabel>
          <Select
            fullWidth={true}
            value={transaction.category}
            onChange={handleSelect("category")}
            input={<Input name="category" id="category-helper" />}
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
      />
      </Grid>
      <Grid item={true} xs={6} sm={7}>
        <TextField
          required={true}
          id="price"
          name="price"
          label="Price"
          fullWidth={true}
          onChange={fieldUpdate("price")}
          // tslint:disable-next-line:jsx-no-multiline-js
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
            type: "number",
            min: "1",
            step: "any",
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
        />
      </Grid>
      <TagPicker tags={transaction.tags} onChange={onTagsChange}/>
    </Grid>
  </React.Fragment>
  );
};

export default withStyles(styles)(TransactionFormUI);
