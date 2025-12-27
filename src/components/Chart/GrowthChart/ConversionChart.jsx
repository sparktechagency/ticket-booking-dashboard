import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ConversionChart({ funnelData }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={funnelData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="stage"
          stroke="#6b7280"
          angle={-20}
          textAnchor="end"
          height={50}
          style={{ fontSize: "12px" }}
        />
        <YAxis stroke="#6b7280" />
        <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend iconType="circle" />
        <Bar dataKey="users" fill="#3b82f6" name="Users" barSize={30} />
        <Bar
          dataKey="percent"
          fill="#10b981"
          name="Conversion %"
          barSize={30}
          yAxisId="right"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
