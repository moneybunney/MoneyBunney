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
import { IBudgetCreateDTO } from "../../Models/BudgetModel";

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
  budget: IBudgetCreateDTO;
  categories: ICategory[];
  loading: boolean;
  onSubmit: (budget: IBudgetCreateDTO) => void;
}

const BudgetForm = ({
  budget,
  onFieldChange,
  categories,
  loading,
  onSubmit
}: IProps) => {
  const classes = useStyles();

  const budgetAmount = Number(budget.Amount);
  const [categoryError, setCategoryError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const [startDateError, setStartDateError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);

  const fieldUpdate = (fieldId: string) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    if (fieldId === "StartDate") {
      const selectedDate = new Date(e.target.value);
      if (isNaN(selectedDate.getTime())) {
        setStartDateError(true);
      } else {
        setStartDateError(false);
      }
    }

    if (fieldId === "EndDate") {
      const now = new Date();
      const selectedDate = new Date(e.target.value);
      if (selectedDate < now || isNaN(selectedDate.getTime())) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
      }
    }

    if (fieldId === "Amount") {
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
    const endDate = new Date(budget.EndDate);
    const startDate = new Date(budget.StartDate);
    e.preventDefault();
    if (categories.filter(it => it.id === budget.Category).length === 0) {
      setCategoryError(true);
      error = true;
    } else {
      setCategoryError(false);
    }
    if (isNaN(budget.Amount) || budget.Amount <= 0) {
      setAmountError(true);
      error = true;
    } else {
      setAmountError(false);
    }
    if (budget.EndDate <= budget.StartDate) {
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
                value={budget.Category}
                onChange={handleSelect("Category")}
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
                id="startDate"
                label="Start date"
                type="datetime-local"
                value={budget.StartDate}
                InputLabelProps={{ shrink: true }}
                onChange={fieldUpdate("StartDate")}
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
                id="endDate"
                label="End date"
                type="datetime-local"
                value={budget.EndDate}
                InputLabelProps={{ shrink: true }}
                onChange={fieldUpdate("EndDate")}
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
                onChange={fieldUpdate("Amount")}
                value={budget.Amount}
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
