import React from 'react';
import {
  CartesianGrid, Legend, Line,
  LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', Actual: 160, Expected: 100 },
  { name: 'Feb', Actual: 180, Expected: 150 },
  { name: 'Mar', Actual: 140, Expected: 160 },
  { name: 'Apr', Actual: 90, Expected: 150 },
  { name: 'May', Actual: 200, Expected: 100 },
  { name: 'June', Actual: 400, Expected: 120 },
  { name: 'July', Actual: 300, Expected: 200 },
];

function SimpleLineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Actual" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Expected" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
