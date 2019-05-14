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
import { ICategory } from "../../Models/TransactionModel";
import { IBudget } from "../../Models/BudgetModel";

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
  budget: IBudget;
  categories: ICategory[];
  loading: boolean;
  onSubmit: (budget: IBudget) => void;
}

const BudgetForm = ({
  budget,
  onFieldChange,
  categories,
  loading,
  onSubmit
}: IProps) => {
  const classes = useStyles();

  const budgetAmount = Number(budget.amount);
  const [categoryError, setCategoryError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const [startDateError, setStartDateError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);

  const fieldUpdate = (fieldId: string) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    if (fieldId === "startDate") {
      const selectedDate = new Date(e.target.value);
      if (isNaN(selectedDate.getTime())) {
        setStartDateError(true);
      } else {
        setStartDateError(false);
      }
    }

    if (fieldId === "endDate") {
      const now = new Date();
      const selectedDate = new Date(e.target.value);
      if (selectedDate < now || isNaN(selectedDate.getTime())) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
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
    setCategoryError(false);
    onFieldChange(fieldId, e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    // basic validation:
    let error = false;
    const endDate = new Date(budget.endDate);
    const startDate = new Date(budget.startDate);
    e.preventDefault();
    if (categories.filter(it => it.id === budget.category).length === 0) {
      setCategoryError(true);
      error = true;
    } else {
      setCategoryError(false);
    }
    if (isNaN(budget.amount) || budget.amount <= 0) {
      setAmountError(true);
      error = true;
    } else {
      setAmountError(false);
    }
    if (budget.endDate <= budget.startDate) {
      setEndDateError(true);
      error = true;
    }
    if (endDateError || startDateError) error = true;

    if (!error) {
      onSubmit(budget);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom={true}>
        Budget details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={12} sm={6}>
            <FormControl fullWidth={true} error={categoryError}>
              <InputLabel htmlFor="category-helper">Category</InputLabel>
              <Select
                fullWidth={true}
                value={budget.category}
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
            <FormControl fullWidth={true} error={startDateError}>
              <TextField
                id="budget-start-datetime"
                label="Start date"
                type="datetime-local"
                value={budget.startDate}
                InputLabelProps={{ shrink: true }}
                onChange={fieldUpdate("startDate")}
                fullWidth={true}
                disabled={loading}
                error={startDateError}
              />
              <FormHelperText className={startDateError ? "" : classes.hidden}>
                Can't set an invalid start date
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <FormControl fullWidth={true} error={endDateError}>
              <TextField
                id="budget-end-datetime"
                label="End date"
                type="datetime-local"
                value={budget.endDate}
                InputLabelProps={{ shrink: true }}
                onChange={fieldUpdate("endDate")}
                fullWidth={true}
                disabled={loading}
                error={endDateError}
              />
              <FormHelperText className={endDateError ? "" : classes.hidden}>
                Can't set an invalid end date
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item={true} xs={6} sm={6}>
            <FormControl fullWidth={true} error={amountError}>
              <TextField
                id="amount"
                name="amount"
                label="Amount"
                fullWidth={true}
                onChange={fieldUpdate("amount")}
                value={budget.amount}
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

export default BudgetForm;
