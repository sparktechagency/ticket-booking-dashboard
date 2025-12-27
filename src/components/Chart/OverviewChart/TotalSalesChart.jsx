import { FormControl, MenuItem, Select } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

export function TotalSalesChart({
  data,
  dataKey,
  colorStart,
  colorEnd,
  selectedYear,
  setSelectedYear,
}) {
  const gradientId = `${dataKey}-gradient`;

  return (
    <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-white text-lg">Total Sales</h3>

        {setSelectedYear && (
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              IconComponent={() => null}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#030a1d",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  },
                },
              }}
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#bd85f1",
                },
              }}
            >
              {[2023, 2024, 2025].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          {/* ✅ Gradient must be here */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#99a1af" }} />
          <YAxis tick={{ fill: "#99a1af" }} />
          <RechartsTooltip />

          {/* ✅ Reference gradient correctly */}
          <Bar
            dataKey={dataKey}
            fill={`url(#${gradientId})`}
            radius={[6, 6, 0, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
