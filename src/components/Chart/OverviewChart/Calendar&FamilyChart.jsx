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

export default function CalendarAndFamilyChart({ calendarDensityData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={calendarDensityData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis yAxisId="left" stroke="#6b7280" />
        <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend iconType="circle" />
        <Bar
          yAxisId="left"
          dataKey="eventsPerFamily"
          fill="#3b82f6"
          name="Events per Family"
          barSize={30}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="avgMembers"
          stroke="#10b981"
          strokeWidth={3}
          name="Avg Members"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
