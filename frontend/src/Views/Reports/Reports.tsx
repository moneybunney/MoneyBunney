import React, { useEffect, useState } from "react";
import { getExpenseByCategoryChart } from "../../Utilities/Api";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  }
}));

export interface IChart {
  name: string;
  value: number;
}

const Reports = () => {
  const classes = useStyles();
  const [data, setData] = useState<IChart[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getExpenseByCategoryChart();
      const result: IChart[] = [];
      response.forEach(resp => {
        result.push({
          name: resp.Key,
          value: 0 - resp.Sum
        });
      });
      setData(result);
    };

    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Typography component="div" className={classes.root}>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={6}>
            <h1>Expenses by category chart</h1>
            <PieChart data={data} />
          </Grid>
          <Grid item={true} xs={6}>
            <h1>Favourite pies</h1>
            <BarChart />
          </Grid>
        </Grid>
      </Typography>
    </React.Fragment>
  );
};

export default Reports;
