import React from "react";
import useApi, { useCategories } from "../../Hooks/useApi";
import { IChart } from "../../Models/ChartModel";
import { getCategoryName } from "../../Models/TransactionModel";
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
  const { data: categories } = useCategories();

  const categoryNameReducer = (reduced: IChart[], value: IChart) => {
    const categoryName = getCategoryName(parseInt(value.name, 10), categories);
    if (categoryName !== "" && value.value !== 0) {
      reduced.push({
        name: categoryName,
        value: value.value
      });
    }
    return reduced;
  };

  const dataWithCategories = data.reduce(categoryNameReducer, []);
  return <PieChart data={dataWithCategories} loading={loading} />;
};

export default CategoryPie;
