import React from "react";
import useApi, { useAccounts } from "../../Hooks/useApi";
import { getAccountName } from "../../Models/AccountModel";
import { IChart } from "../../Models/ChartModel";
import { IComposedChart } from "../../Models/ComposedChartModel";
import {
  getExpenseByDateRange,
  getIncomeByDateRange
} from "../../Utilities/Api";
import ComposedChart from "./ComposedStackedBarLineChart";

interface IDate {
  year: number;
  month: number;
}

interface IProps {
  numberOfMonths: number;
}

interface IParams {
  numberOfMonths: number;
  accounts: any;
}

const generateDates = (count: number) => {
  const dates: IDate[] = [];
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  dates.push({ year, month });
  for (let i = 1; i < count; i++) {
    if (month === 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
    dates.push({ year, month });
  }
  return dates.reverse();
};

const fetchChartData = async ({ numberOfMonths, accounts }: IParams) => {
  const dates = generateDates(numberOfMonths);
  const accountNameReducer = (reduced: IChart[], value: IChart) => {
    const accountName = getAccountName(value.name, accounts.data);
    if (accountName !== "") {
      reduced.push({ name: accountName, value: value.value });
    }
    return reduced;
  };

  return Promise.all(
    dates.map(
      async (date): Promise<IComposedChart> => {
        const fromDate = `${date.year}-${date.month}-01`;
        const toDate =
          date.month === 12
            ? `${date.year + 1}-01-01`
            : `${date.year}-${date.month + 1}-01`;
        const incomeResponse = await getIncomeByDateRange(
          new Date(fromDate),
          new Date(toDate)
        );
        let sum = 0;
        const positiveValues = incomeResponse
          .map(resp => {
            sum += resp.Sum;
            return {
              name: resp.Key,
              value: resp.Sum
            };
          })
          .reduce(accountNameReducer, []);
        const expenseResponse = await getExpenseByDateRange(
          new Date(fromDate),
          new Date(toDate)
        );
        const negativeValues = expenseResponse
          .map(resp => {
            sum += resp.Sum;
            return {
              name: resp.Key,
              value: resp.Sum
            };
          })
          .reduce(accountNameReducer, []);
        return {
          key: `${date.year}-${date.month}`,
          positiveValues,
          negativeValues,
          lineValue: sum
        };
      }
    )
  );
};

const CashFlowChart = ({ numberOfMonths }: IProps) => {
  const accounts = useAccounts();
  const { data, loading } = useApi(fetchChartData, [], {
    numberOfMonths,
    accounts
  });

  return (
    <ComposedChart
      data={data}
      loading={loading}
      positiveLabel="Income in "
      negativeLabel="Expenses in "
      lineLabel="Balance"
    />
  );
};

export default CashFlowChart;
