import React from "react";
import useApi from "../../Hooks/useApi";
import { IChart } from "../../Models/ChartModel";
import { getExpenseByCategoryData } from "../../Utilities/Api";
import PieChart from "./PieChart";

const fetchChartData = async () => {
  const response = await getExpenseByCategoryData();
  return response.map(
    (resp): IChart => {
      return {
        name: resp.Key,
        value: 0 - resp.Sum
      };
    }
  );
};

const CategoryPie = () => {
  const { data, loading } = useApi(fetchChartData, []);
  return <PieChart data={data} loading={loading} />;
};

export default CategoryPie;
