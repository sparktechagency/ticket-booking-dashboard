import { useState } from "react";
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  allFunnelData,
  allGeoData,
  allInviteData,
  allRetentionData,
} from "../../../public/data/growthData";
import ConversionChart from "../Chart/GrowthChart/ConversionChart";
import CohortChart from "../Chart/GrowthChart/CohortChart";
import InviteMetricsChart from "../Chart/GrowthChart/InviteMetricsChart";
import StateUserChart from "../Chart/GrowthChart/StateUserChart";

export function GrowthRetention() {
  // Year filters for each chart
  const [funnelYear, setFunnelYear] = useState("2025");
  const [retentionYear, setRetentionYear] = useState("2025");
  const [inviteYear, setInviteYear] = useState("2025");
  const [geoYear, setGeoYear] = useState("2025");

  const funnelData = allFunnelData[funnelYear];
  const retentionData = allRetentionData[retentionYear];
  const inviteData = allInviteData[inviteYear];
  const geoData = allGeoData[geoYear];

  const COLORS = [
    "#2563eb", // vibrant blue
    "#3b82f6", // bright blue
    "#06b6d4", // bright cyan
    "#14b8a6", // bright teal
    "#10b981", // bright green
    "#8b5cf6", // bright purple
  ];

  return (
    <div style={{ padding: "32px" }}>
      {/* Charts Row 1: Conversion Funnel & Cohort Retention */}
      <div
        className="grid gap-6 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p className="text-lg font-semibold">Conversion Funnel</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={funnelYear}
                  onChange={(e) => setFunnelYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Signup to paid user journey
            </p>
            <ConversionChart funnelData={funnelData} />
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Cohort Retention</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={retentionYear}
                  onChange={(e) => setRetentionYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Retention rates at day 7, 30, and 60 days
            </p>
            <CohortChart retentionData={retentionData} />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Invite Metrics & Geographic Distribution */}
      <div
        className="grid gap-6 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Invite Metrics</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={inviteYear}
                  onChange={(e) => setInviteYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Invites sent and acceptance rates
            </p>
            <InviteMetricsChart inviteData={inviteData} />
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Users by State</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={geoYear}
                  onChange={(e) => setGeoYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Geographic distribution of users
            </p>
            <StateUserChart geoData={geoData} COLORS={COLORS} />
          </CardContent>
        </Card>
      </div>

      {/* Top Zip Codes Card */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <p className="text-lg font-semibold mb-1">Top Zip Codes</p>
          <p className="text-sm text-[#6b7280] mb-6">
            Highest user concentration areas
          </p>
          <div className="grid grid-cols-5 gap-5">
            {geoData.byZip.map((item, index) => (
              <div
                key={item.zip}
                className="p-4 rounded-lg border border-[#e5e7eb]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt
                    style={{ color: COLORS[index], fontSize: "20px" }}
                  />
                  <p className="text-lg font-bold">{item.zip}</p>
                </div>
                <p className="text-sm text-[#6b7280] mb-1">{item.city}</p>
                <p className="text-lg font-semibold text-[#3b82f6]">
                  {item.users} users
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
