import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CohortChart({ retentionData }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={retentionData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="cohort" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="day7"
          stroke="#3b82f6"
          strokeWidth={3}
          name="Day 7 %"
        />
        <Line
          type="monotone"
          dataKey="day30"
          stroke="#10b981"
          strokeWidth={3}
          name="Day 30 %"
        />
        <Line
          type="monotone"
          dataKey="day60"
          stroke="#f59e0b"
          strokeWidth={3}
          name="Day 60 %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
