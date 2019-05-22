import { Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import useReactRouter from "use-react-router";
import { useCategories } from "../../Hooks/useApi";
import {
  createEmptyBudget,
  IBudget,
  IBudgetCreateDTO
} from "../../Models/BudgetModel";
import { BudgetsLocation } from "../../routes.constants";
import BudgetForm from "./BudgetForm";
import { postBudget } from "../../Utilities/Api";

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: "auto",
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      marginTop: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
}));

interface IProps {
  onSubmit?: (budget: IBudgetCreateDTO) => void;
}

const BudgetCreation = (props: IProps) => {
  const { data: categories } = useCategories();
  const { history } = useReactRouter();

  const [budget, setBudget] = useState(createEmptyBudget({}));

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const onFieldChange = (field: string, value: any) => {
    const clone = { ...budget } as any;
    clone[field] = value;
    setBudget(clone);
  };

  const onSubmit = (currentBudget: IBudgetCreateDTO) => {
    setLoading(true);
    if (props.onSubmit) {
      props.onSubmit(currentBudget);
    }
    postBudget(currentBudget)
      .catch(error => {
        enqueueSnackbar(
          "An unspecified error occured when creating the budget",
          {
            variant: "error"
          }
        );
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Successfully created a budget!", {
          variant: "success"
        });
        history.replace(BudgetsLocation);
      });
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left">
            New Budget
          </Typography>
          <React.Fragment>
            <BudgetForm
              onFieldChange={onFieldChange}
              budget={budget}
              categories={categories}
              loading={loading}
              onSubmit={onSubmit}
            />
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default BudgetCreation;
