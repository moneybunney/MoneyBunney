import React from "react";

import {
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import BalanceAmountText from "../../Components/BalanceAmountText";
import useApi from "../../Hooks/useApi";
import {
  getExpensesThisMonth,
  getExpensesThisWeek,
  getExpensesToday,
  getIncomeThisMonth,
  getNetWorth
} from "../../Utilities/Api";

const SpinnerSize = 40;
const MarginTopSize = 10;

const useStyles = makeStyles((theme: Theme) => ({
  loadingSpinner: {
    marginTop: `${MarginTopSize}px`,
    marginLeft: "20px"
  }
}));

interface IStatistics {
  name: string;
  amount: number;
}

const DashboardStatisticList = () => {
  const classes = useStyles();

  const { data: netWorth, loading: netWorthLoading } = useApi(getNetWorth, 0);
  const { data: expensesToday, loading: expensesTodayLoading } = useApi(
    getExpensesToday,
    0
  );
  const { data: expensesThisWeek, loading: expensesThisWeekLoading } = useApi(
    getExpensesThisWeek,
    0
  );
  const { data: expensesThisMonth, loading: expensesThisMonthLoading } = useApi(
    getExpensesThisMonth,
    0
  );
  const { data: incomeThisMonth, loading: incomeThisMonthLoading } = useApi(
    getIncomeThisMonth,
    0
  );

  const loading =
    netWorthLoading ||
    expensesTodayLoading ||
    expensesThisWeekLoading ||
    expensesThisMonthLoading ||
    incomeThisMonthLoading;
  const stats: IStatistics[] = [
    {
      name: "Net Worth",
      amount: netWorth
    },
    {
      name: "Expenses today",
      amount: expensesToday
    },
    {
      name: "Expenses this week",
      amount: expensesThisWeek
    },
    {
      name: "Expenses this month",
      amount: expensesThisMonth
    },
    {
      name: "Income this month",
      amount: incomeThisMonth
    }
  ];

  return (
    <List>
      <Collapse
        in={!loading}
        collapsedHeight={`${SpinnerSize + MarginTopSize * 2}px`}
      >
        {loading && (
          <CircularProgress
            size={SpinnerSize}
            className={classes.loadingSpinner}
          />
        )}
        {stats.map((stat, index) => (
          <React.Fragment key={`stat_${index}`}>
            <ListItem>
              <ListItemText primary={stat.name} />
              <ListItemSecondaryAction>
                <BalanceAmountText amount={stat.amount} difference={false} />
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
};

export default DashboardStatisticList;
