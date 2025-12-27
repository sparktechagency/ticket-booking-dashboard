import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function StateUserChart({ geoData, COLORS }) {
  console.log("geoData", geoData);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={geoData.byState}
          dataKey="users"
          nameKey="state"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => `${entry.state}: ${entry.percent}%`}
        >
          {geoData.byState.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
