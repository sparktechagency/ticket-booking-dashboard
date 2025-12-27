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

export default function SessionChart({ sessionData }) {
  // Custom tooltip to show more context
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <p className="text-sm text-blue-600">
            Avg Length:{" "}
            <span className="font-bold">{payload[0].value} min</span>
          </p>
          <p className="text-sm text-green-600">
            Sessions/User:{" "}
            <span className="font-bold">{payload[1].value.toFixed(2)}</span>
          </p>
          <p className="text-sm text-purple-600 mt-1">
            Sessions/Week:{" "}
            <span className="font-bold">
              {(payload[1].value * 7).toFixed(1)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={sessionData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: "12px" }} />
        <YAxis
          yAxisId="left"
          stroke="#3b82f6"
          label={{
            value: "Avg Length (min)",
            angle: -90,
            position: "insideLeft",
            style: { fill: "#3b82f6", fontSize: "12px" },
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#10b981"
          label={{
            value: "Sessions per User",
            angle: 90,
            position: "insideRight",
            style: { fill: "#10b981", fontSize: "12px" },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
        <Bar
          yAxisId="left"
          dataKey="avgLength"
          fill="#3b82f6"
          name="Avg Session Length (min)"
          barSize={30}
          radius={[8, 8, 0, 0]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="sessionsPerUser"
          stroke="#10b981"
          strokeWidth={3}
          name="Sessions per User"
          dot={{ fill: "#10b981", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
