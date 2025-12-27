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

export default function InviteMetricsChart({ inviteData }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={inviteData}>
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
        <Bar
          yAxisId="left"
          dataKey="sent"
          fill="#93c5fd"
          name="Invites Sent"
          barSize={30}
        />
        <Bar
          yAxisId="left"
          dataKey="accepted"
          fill="#3b82f6"
          name="Accepted"
          barSize={30}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="rate"
          stroke="#10b981"
          strokeWidth={3}
          name="Accept Rate %"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
