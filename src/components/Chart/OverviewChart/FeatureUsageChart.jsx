import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function FeatureUsageChart({ featureUsageData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={featureUsageData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" stroke="#6b7280" />
        <YAxis dataKey="feature" type="category" width={120} stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend iconType="circle" />
        <Bar
          dataKey={(d) => d.usageRate * 100}
          fill="#3b82f6"
          name="Usage Rate %"
          barSize={30}
        />
        <Line
          dataKey="users"
          stroke="#10b981"
          strokeWidth={2}
          name="Active Users"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
