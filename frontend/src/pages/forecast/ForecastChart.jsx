import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ForecastChart({ forecast, chartData }) {
  if (forecast === null) {
    return null;
  }

  return (
    <div className="mt-6 bg-[#FFFBFA] rounded-lg p-4 shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Previsão: {forecast} unidades
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="demanda"
            stroke="#8AF3FF"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
