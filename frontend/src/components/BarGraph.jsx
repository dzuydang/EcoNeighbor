import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getNumAdmin, getNumAuthority, getNumResident } from "../api/data";

const getBarGraphData = async () => {
  const [resident, authority, admin] = await Promise.all([
    await getNumResident(),
    await getNumAuthority(),
    await getNumAdmin(),
  ]);

  return [
    {
      name: "Residents",
      userCount: Number(resident.count),
    },
    {
      name: "Authority",
      userCount: Number(authority.count),
    },
    {
      name: "Admin",
      userCount: Number(admin.count),
    },
  ];
};

// #endregion
const SimpleBarChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function loadData() {
      const graphData = await getBarGraphData();
      setData(graphData);
    }
    loadData();
  }, []);

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "600px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="userCount"
        fill="#82ca9d"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  );
};

export default SimpleBarChart;
