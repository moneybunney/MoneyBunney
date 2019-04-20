import React, { useEffect, useState } from "react";
import { IChart } from "../../Models/ChartModel";
import { getExpenseByCategoryData } from "../../Utilities/Api";
import PieChart from "./PieChart";

const CategoryPie = () => {
  const [data, setData] = useState<IChart[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getExpenseByCategoryData();
      const result = response.map(resp => {
        return {
          name: resp.Key,
          value: 0 - resp.Sum
        };
      });
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);
  return <PieChart data={data} loading={loading} />;
};

export default CategoryPie;
