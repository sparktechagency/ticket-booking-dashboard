import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  FaDollarSign,
  FaArrowUp,
  FaTicketAlt,
  FaUsers,
  FaCrown,
  FaCalendarAlt,
} from "react-icons/fa";
import { MonthlyIncomeChart } from "../Chart/OverviewChart/MonthlyIncomeChart";
import { TotalSalesChart } from "../Chart/OverviewChart/TotalSalesChart";
import { FormControl, MenuItem, Select } from "@mui/material";
import {
  monthlyIncomeByYear,
  monthlySalesByYear,
  overviewData,
} from "../../../public/data/overviewData";
import { StatCard } from "../UI/StatCard";
import { RecentOrders } from "../UI/RecentOrders";
import { ActiveEvents } from "../UI/ActiveEvents";

export default function Dashboard() {
  const [statsTimeFilter, setStatsTimeFilter] = useState("month");
  const [selectedYearForIncome, setSelectedYearForIncome] = useState(2025);
  const [selectedYearForSales, setSelectedYearForSales] = useState(2025);

  /* ---------------- ORDERS ---------------- */
  const orders = [
    {
      id: 1,
      eventTitle: "Coldplay Live",
      customerInfo: { name: "John Doe" },
      total: 240,
      createdAt: "2025-01-14",
    },
    {
      id: 2,
      eventTitle: "NBA Finals",
      customerInfo: { name: "Sarah Miles" },
      total: 420,
      createdAt: "2025-01-13",
    },
  ];

  /* ---------------- EVENTS ---------------- */
  const events = [
    {
      id: 1,
      title: "Tomorrowland Festival",
      date: "2025-12-28",
      imageUrl: "https://images.unsplash.com/photo-1518972559570-6c24a8e9f6f8",
      ticketCategories: [{ availableQuantity: 120 }],
    },
    {
      id: 2,
      title: "UFC Championship",
      date: "2025-04-02",
      imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
      ticketCategories: [{ availableQuantity: 85 }],
    },
  ];

  const activeEvents = events.filter(
    (e) => new Date(e.date) > new Date()
  ).length;

  const menuItemStyle = {
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "rgba(189,133,241,0.15)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(189,133,241,0.25)",
      "&:hover": {
        backgroundColor: "rgba(189,133,241,0.35)",
      },
    },
  };

  const stats = useMemo(() => overviewData[statsTimeFilter], [statsTimeFilter]);

  /* ---------------- RENDER ---------------- */
  return (
    <div className="p-8 bg-[#0a0d27]">
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl text-white font-display">
              Platform Overview
            </h2>
            <p className="text-sm text-[#99a1af]">
              Performance{" "}
              {statsTimeFilter === "today"
                ? "Today"
                : statsTimeFilter === "week"
                ? "This Week"
                : statsTimeFilter === "month"
                ? "This Month"
                : statsTimeFilter === "year"
                ? "This Year"
                : "All Time"}
            </p>
          </div>

          <FormControl
            size="small"
            sx={{
              minWidth: 160,
              position: "relative",
            }}
          >
            <Select
              value={statsTimeFilter}
              onChange={(e) => setStatsTimeFilter(e.target.value)}
              displayEmpty
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
                backgroundColor: "#030a1d",
                borderRadius: "12px",
                color: "#fff",
                paddingRight: "36px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#bd85f1",
                },
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem value="today" sx={menuItemStyle}>
                Today
              </MenuItem>
              <MenuItem value="week" sx={menuItemStyle}>
                This Week
              </MenuItem>
              <MenuItem value="month" sx={menuItemStyle}>
                This Month
              </MenuItem>
              <MenuItem value="year" sx={menuItemStyle}>
                This Year
              </MenuItem>
              <MenuItem value="all" sx={menuItemStyle}>
                All Time
              </MenuItem>
            </Select>

            {/* Calendar Icon */}
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-[#99a1af]" />
          </FormControl>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FaDollarSign />}
            value={`$${stats.revenue.toLocaleString()}`}
            label="Revenue"
            growth={stats.revenueGrowth}
            color="#05df72"
          />
          <StatCard
            icon={<FaTicketAlt />}
            value={stats.ticketsSold.toLocaleString()}
            label="Tickets Sold"
            growth={stats.ticketGrowth}
            color="#bd85f1"
          />
          <StatCard
            icon={<FaUsers />}
            value={stats.users.toLocaleString()}
            label="Users"
            color="#42A5F5"
          />
          <StatCard
            icon={<FaCrown />}
            value={stats.premiumMembers}
            label="Premium Members"
            color="#FFEE58"
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyIncomeChart
            title="Monthly Income"
            data={monthlyIncomeByYear[selectedYearForIncome]}
            dataKey="income"
            colorStart="#bd85f1"
            colorEnd="#6d1db9"
            selectedYear={selectedYearForIncome}
            setSelectedYear={setSelectedYearForIncome}
          />
          <TotalSalesChart
            title="Monthly Income"
            data={monthlySalesByYear[selectedYearForSales]}
            dataKey="sales"
            colorStart="#4ade80"
            colorEnd="#22c55e"
            selectedYear={selectedYearForSales}
            setSelectedYear={setSelectedYearForSales}
          />
        </div>

        {/* ORDERS & EVENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders orders={orders} />
          <ActiveEvents events={events} activeEvents={activeEvents} />
        </div>
      </div>
    </div>
  );
}
