import { CircularProgress, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { IChart } from "../../Models/ChartModel";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#2243B6",
  "#FFAA1D",
  "#FD3A4A",
  "#9C51B6",
  "#E936A7",
  "#A83731"
];

const RADIAN = Math.PI / 180;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: 110,
    marginTop: 110
  }
}));

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: PieLabelRenderProps) => {
  if (
    typeof cx === "number" &&
    typeof cy === "number" &&
    typeof innerRadius === "number" &&
    typeof outerRadius === "number" &&
    typeof midAngle === "number" &&
    typeof percent === "number"
  ) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
};

interface IProps {
  data: IChart[];
  loading: boolean;
}

const BasicPieChart = ({ data, loading }: IProps) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {loading && <CircularProgress size={100} className={classes.root} />}
      {!loading && (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={150}
            cy={150}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      )}
    </React.Fragment>
  );
};

export default BasicPieChart;
