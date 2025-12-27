import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GrowthVsLoyaltyChart({ userTypeData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={userTypeData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend iconType="circle" />
        <Area
          type="monotone"
          dataKey="new"
          stackId="1"
          stroke="#2B7FFF"
          fill="#2B7FFF"
          name="New Users"
        />
        <Area
          type="monotone"
          dataKey="returning"
          stackId="1"
          stroke="#10b981"
          fill="#10b981"
          name="Returning Users"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
