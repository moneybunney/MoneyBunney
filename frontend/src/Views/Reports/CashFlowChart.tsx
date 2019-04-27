import React, { useEffect, useState } from "react";
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

const CashFlowChart = ({ numberOfMonths }: IProps) => {
  const [data, setData] = useState<IComposedChart[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dates = generateDates(numberOfMonths);
    const fetchData = async () => {
      const result = await Promise.all(
        dates.map(async date => {
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
          const positiveValues = incomeResponse.map(resp => {
            sum += resp.Sum;
            return {
              name: resp.Key,
              value: resp.Sum
            };
          });
          const expenseResponse = await getExpenseByDateRange(
            new Date(fromDate),
            new Date(toDate)
          );
          const negativeValues = expenseResponse.map(resp => {
            sum += resp.Sum;
            return {
              name: resp.Key,
              value: resp.Sum
            };
          });
          return {
            key: `${date.year}-${date.month}`,
            positiveValues,
            negativeValues,
            lineValue: sum
          };
        })
      );
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

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
