import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueUserComparisonChart({ familyVsIndividualData }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={familyVsIndividualData}>
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
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="familyRevenue"
          stackId="1"
          stroke="#3b82f6"
          fill="#3b82f6"
          name="Family Revenue ($)"
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="individualRevenue"
          stackId="1"
          stroke="#10b981"
          fill="#10b981"
          name="Individual Revenue ($)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="familyUsers"
          stroke="#f59e0b"
          strokeWidth={2}
          name="Family Users"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="individualUsers"
          stroke="#8b5cf6"
          strokeWidth={2}
          name="Individual Users"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
