import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { name: "Apple pie", value: 100 },
  { name: "Cherry pie", value: 200 },
  { name: "Raspberry pie", value: 50 },
  { name: "Chocolate pie", value: 20 }
];

export default function BasicBarChart() {
  return (
    <BarChart
      width={520}
      height={300}
      data={data}
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
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
