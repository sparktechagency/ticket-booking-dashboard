import { useState } from "react";
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
import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import { StatCard } from "../UI/StatCard";
import { useGetDashboardDataQuery } from "../../Redux/api/dashboardApi";

export default function Dashboard() {
  // const [statsTimeFilter, setStatsTimeFilter] = useState("month");
  const [selectedYearForIncome, setSelectedYearForIncome] = useState(2026);
  const [selectedYearForSales, setSelectedYearForSales] = useState(2026);

  const {
    data: allDashboardData,
    isLoading,
    isError,
  } = useGetDashboardDataQuery();
  const dashboardData = allDashboardData?.data;
  console.log(dashboardData);

  // const menuItemStyle = {
  //   fontSize: "14px",
  //   "&:hover": {
  //     backgroundColor: "rgba(189,133,241,0.15)",
  //   },
  //   "&.Mui-selected": {
  //     backgroundColor: "rgba(189,133,241,0.25)",
  //     "&:hover": {
  //       backgroundColor: "rgba(189,133,241,0.35)",
  //     },
  //   },
  // };

  // const stats = useMemo(() => overviewData[statsTimeFilter], [statsTimeFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div className="p-8 bg-[#0a0d27] h-screen">
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl text-white font-display">
              Platform Overview
            </h2>
            {/* <p className="text-sm text-[#99a1af]">
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
            </p> */}
          </div>

          {/* <FormControl
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

            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-[#99a1af]" />
          </FormControl> */}
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FaDollarSign />}
            value={`$${dashboardData?.summary?.revenue.toLocaleString()}`}
            label="Revenue"
            color="#05df72"
          />
          <StatCard
            icon={<FaTicketAlt />}
            value={dashboardData?.summary?.ticketsSold.toLocaleString()}
            label="Tickets Sold"
            color="#bd85f1"
          />
          <StatCard
            icon={<FaUsers />}
            value={dashboardData?.summary?.users.toLocaleString()}
            label="Users"
            color="#42A5F5"
          />
          <StatCard
            icon={<FaCrown />}
            value={dashboardData?.summary?.premiumMembers}
            label="Premium Members"
            color="#FFEE58"
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyIncomeChart
            title="Monthly Income"
            // data={monthlyIncomeByYear[selectedYearForIncome]}
            data={dashboardData?.charts?.monthlyRevenue}
            dataKey="value"
            colorStart="#bd85f1"
            colorEnd="#6d1db9"
            selectedYear={selectedYearForIncome}
            setSelectedYear={setSelectedYearForIncome}
          />
          <TotalSalesChart
            title="Monthly Income"
            // data={monthlySalesByYear[selectedYearForSales]}
            data={dashboardData?.charts?.monthlyTicketSales}
            dataKey="value"
            colorStart="#4ade80"
            colorEnd="#22c55e"
            selectedYear={selectedYearForSales}
            setSelectedYear={setSelectedYearForSales}
          />
        </div>

        {/* ORDERS & EVENTS */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders orders={orders} />
          <ActiveEvents events={events} activeEvents={activeEvents} />
        </div> */}
      </div>
    </div>
  );
}
