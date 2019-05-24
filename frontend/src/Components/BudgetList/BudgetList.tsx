import {
  CircularProgress,
  Collapse,
  Divider,
  List,
  Theme,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useBudgets, useCategories } from "../../Hooks/useApi";
import BudgetListItem from "./BudgetListItem";
import {
  getCategoryName,
  getCategoryIcon,
  ICategory
} from "../../Models/TransactionModel";
import { IBudget } from "../../Models/BudgetModel";

const spinnerSize = 40;
const marginTopSize = 10;

const useStyles = makeStyles((theme: Theme) => ({
  loadingSpinner: {
    marginTop: `${marginTopSize}px`,
    marginLeft: "20px"
  },
  listRoot: {
    backgroundColor: theme.palette.background.paper
  }
}));

const BudgetList = () => {
  const classes = useStyles();
  const { data: budgets, loading } = useBudgets();
  const { data: categories } = useCategories();
  const collapsedHeight = loading
    ? `${spinnerSize + marginTopSize * 2}px`
    : undefined;
  if (budgets.length == 0) {
    return (
      <Typography
        variant="subheading"
        align="center"
        color="textSecondary"
        style={{ padding: 15 }}
      >
        No budgets found
      </Typography>
    );
  }
  return (
    <List className={classes.listRoot}>
      <Collapse in={!loading} collapsedHeight={collapsedHeight}>
        {loading && (
          <CircularProgress
            className={classes.loadingSpinner}
            size={spinnerSize}
          />
        )}
        {budgets.map((budget, index) => (
          <React.Fragment key={budget.id}>
            <BudgetListItem
              budget={budget}
              categoryText={getCategoryName(budget.category, categories)}
              categoryIcon={getCategoryIcon(budget.category, categories)}
              load={budget.currentAmount}
            />
            {index + 1 < budgets.length && <Divider />}
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
};

export default BudgetList;
