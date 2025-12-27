import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PushNotificationChart({ deliverabilityData }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={deliverabilityData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
        <XAxis dataKey="month" stroke="#374151" />
        <YAxis stroke="#374151" />

        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
          }}
        />
        <Legend />

        <Area
          type="monotone"
          dataKey="pushSent"
          stackId="1"
          stroke="#60a5fa"
          fill="#60a5fa"
          name="Sent"
        />
        <Area
          type="monotone"
          dataKey="pushDelivered"
          stackId="2"
          stroke="#3b82f6"
          fill="#3b82f6"
          name="Delivered"
        />
        <Area
          type="monotone"
          dataKey="pushOpened"
          stackId="3"
          stroke="#2563eb"
          fill="#2563eb"
          name="Opened"
        />
        <Area
          type="monotone"
          dataKey="pushClicked"
          stackId="4"
          stroke="#1d4ed8"
          fill="#1d4ed8"
          name="Clicked"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
