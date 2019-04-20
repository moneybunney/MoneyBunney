import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "Date1", positiveValue: 100, negativeValue: -20, lineValue: 80 },
  { name: "Date2", positiveValue: 50, negativeValue: -30, lineValue: 20 },
  { name: "Date3", positiveValue: 40, negativeValue: -50, lineValue: -10 }
];

const BasicComposedChart = () => {
  return (
    <ComposedChart
      width={400}
      height={400}
      data={data}
      stackOffset="sign"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="positiveValue" fill="#006633" stackId="stack" />
      <Bar dataKey="negativeValue" fill="#8B0000" stackId="stack" />
      <Line dataKey="lineValue" stroke="#ff7300" />
    </ComposedChart>
  );
};

export default BasicComposedChart;
