import React from "react";
import useApi, { useAccounts } from "../../Hooks/useApi";
import { getAccountName } from "../../Models/AccountModel";
import { IChart } from "../../Models/ChartModel";
import { IComposedChart } from "../../Models/ComposedChartModel";
import {
  getMonthlyExpensesByDateRange,
  getMonthlyIncomeByDateRange
} from "../../Utilities/Api";
import ComposedChart from "./ComposedStackedBarLineChart";

interface IDate {
  year: number;
  month: number;
}

interface IProps {
  numberOfMonths: number;
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
  }
  dates.push({ year, month });
  return dates.reverse();
};

const fetchChartData = async (numberOfMonths: number) => {
  const dates = generateDates(numberOfMonths);

  const fromDate = `${dates[0].year}-${dates[0].month}-01`;
  const toDate =
    dates[1].year === 12
      ? `${dates[1].year + 1}-01-01`
      : `${dates[1].year}-${dates[1].month + 1}-01`;
  const incomeResponse = await getMonthlyIncomeByDateRange(
    new Date(fromDate),
    new Date(toDate)
  );
  const expensesResponse = await getMonthlyExpensesByDateRange(
    new Date(fromDate),
    new Date(toDate)
  );
  const chartData: IComposedChart[] = [];
  let year = dates[0].year;
  let month = dates[0].month;
  for (let i = 0; i < numberOfMonths; i++) {
    let sum = 0;
    const positiveValues: IChart[] = [];
    const negativeValues: IChart[] = [];
    incomeResponse.forEach(resp => {
      if (resp.DateKey === `${year}-${month}`) {
        sum += resp.Sum;
        positiveValues.push({
          name: resp.Key,
          value: resp.Sum
        });
      }
    });
    expensesResponse.forEach(resp => {
      if (resp.DateKey === `${year}-${month}`) {
        sum += resp.Sum;
        negativeValues.push({
          name: resp.Key,
          value: resp.Sum
        });
      }
    });
    chartData.push({
      key: `${year}-${month}`,
      positiveValues,
      negativeValues,
      lineValue: sum
    });
    if (month === 12) {
      month = 1;
      year++;
    } else {
      month++;
    }
  }
  return chartData;
};

const CashFlowChart = ({ numberOfMonths }: IProps) => {
  const { data: accounts } = useAccounts();
  const { data, loading } = useApi(fetchChartData, [], numberOfMonths);

  const accountNameReducer = (reduced: IChart[], value: IChart) => {
    const accountName = getAccountName(value.name, accounts);
    if (accountName !== "") {
      reduced.push({ name: accountName, value: value.value });
    }
    return reduced;
  };

  const dataWithAccountNames = data.map(element => {
    return {
      ...element,
      negativeValues: element.negativeValues.reduce(accountNameReducer, []),
      positiveValues: element.positiveValues.reduce(accountNameReducer, [])
    };
  });
  return (
    <ComposedChart
      data={dataWithAccountNames}
      loading={loading}
      positiveLabel="Income in "
      negativeLabel="Expenses in "
      lineLabel="Balance"
    />
  );
};

export default CashFlowChart;
