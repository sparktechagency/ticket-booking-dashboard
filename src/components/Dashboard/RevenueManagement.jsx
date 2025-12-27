import { useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Box,
} from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaTimes,
  FaDollarSign,
  FaChartLine,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { MetricCard } from "../UI/MetricCard";
import {
  allAdjustmentsData,
  allConversionData,
  // allFamilyVsIndividualData,
  allMrrData,
  allPlanMixData,
  generateRevenueData,
} from "../../../public/data/revenueData";
import RevenueUserComparisonChart from "../Chart/RevenueChart/RevenueUserComparisonChart";

export default function RevenueManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Year filters for each chart
  const [mrrYear, setMrrYear] = useState("2025");
  const [conversionYear, setConversionYear] = useState("2025");
  const [planMixYear, setPlanMixYear] = useState("2025");
  const [adjustmentsYear, setAdjustmentsYear] = useState("2025");
  // const [familyVsIndividualYear, setFamilyVsIndividualYear] = useState("2025");

  const mrrData = allMrrData[mrrYear];
  const conversionData = allConversionData[conversionYear];
  const planMixData = allPlanMixData[planMixYear];
  const adjustmentsData = allAdjustmentsData[adjustmentsYear];
  // const familyVsIndividualData =
  //   allFamilyVsIndividualData[familyVsIndividualYear];

  const COLORS = [
    "#3b82f6", // bright blue
    "#2563eb", // deeper blue
    "#1d4ed8", // strong blue
    "#1e40af", // bold blue
    "#6366f1", // indigo
    "#4f46e5", // deep indigo
  ];

  // Current metrics (from latest month)
  const currentMRR = mrrData[mrrData.length - 1].mrr;
  const currentARR = mrrData[mrrData.length - 1].arr;
  const currentARPU = mrrData[mrrData.length - 1].arpu;
  const currentPayback = mrrData[mrrData.length - 1].payback;

  const revenueData = generateRevenueData();

  const paginatedData = revenueData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // console.log(paginatedData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Top Row Metrics - Revenue KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Monthly Recurring Revenue"
          value={`$${(currentMRR / 1000).toFixed(1)}k`}
          change={8.2}
          icon={FaDollarSign}
          subtitle="MRR"
        />
        <MetricCard
          title="Annual Recurring Revenue"
          value={`$${(currentARR / 1000).toFixed(0)}k`}
          change={9.5}
          icon={FaChartLine}
          subtitle="ARR"
        />
        <MetricCard
          title="Average Revenue Per User"
          value={`$${currentARPU.toFixed(2)}`}
          change={5.3}
          icon={FaUsers}
          subtitle="ARPU"
        />
        <MetricCard
          title="Customer Acq. Payback"
          value={`${currentPayback.toFixed(1)} mo`}
          change={-12.5}
          icon={FaClock}
          subtitle="Payback Period"
        />
      </div>

      {/* Charts Row 1: MRR/ARR Trend & Trial to Paid Conversion */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                MRR, ARR & ARPU Trends
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={mrrYear}
                  onChange={(e) => setMrrYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Revenue metrics and customer value
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={mrrData}>
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
                  dataKey="mrr"
                  fill="#93c5fd"
                  name="MRR ($)"
                />
                <Bar
                  yAxisId="left"
                  dataKey="arr"
                  fill="#3b82f6"
                  name="ARR ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="arpu"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="ARPU ($)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Trial to Paid Conversion
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={conversionYear}
                  onChange={(e) => setConversionYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Trial users converting to paid plans
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={conversionData}>
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
                  dataKey="trials"
                  fill="#93c5fd"
                  name="Trials"
                />
                <Bar yAxisId="left" dataKey="paid" fill="#3b82f6" name="Paid" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rate"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Conversion %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Plan Mix Distribution & Upgrades/Downgrades */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Plan Mix Distribution
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={planMixYear}
                  onChange={(e) => setPlanMixYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Subscriber distribution across plans
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={planMixData.distribution}
                  dataKey="users"
                  nameKey="plan"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.plan}: ${entry.percent}%`}
                >
                  {planMixData.distribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Upgrades & Downgrades
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={planMixYear}
                  onChange={(e) => setPlanMixYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Plan tier changes over time
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={planMixData.changes}>
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
                <Legend />
                <Bar dataKey="upgrades" fill="#10b981" name="Upgrades" />
                <Bar dataKey="downgrades" fill="#ef4444" name="Downgrades" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3: Revenue Adjustments & Family vs Individual */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Discounts, Refunds & Revenue Recognition
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={adjustmentsYear}
                  onChange={(e) => setAdjustmentsYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Payment adjustments and recognized revenue
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={adjustmentsData}>
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
                <Legend />
                <Bar
                  dataKey="discounts"
                  stackId="a"
                  fill="#f59e0b"
                  name="Discounts ($)"
                />
                <Bar
                  dataKey="refunds"
                  stackId="a"
                  fill="#ef4444"
                  name="Refunds ($)"
                />
                <Line
                  type="monotone"
                  dataKey="recognized"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Recognized Revenue ($)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* <Card
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
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Family vs Individual Plans
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={familyVsIndividualYear}
                  onChange={(e) => setFamilyVsIndividualYear(e.target.value)}
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
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Revenue and user comparison
            </p>
            <RevenueUserComparisonChart
              familyVsIndividualData={familyVsIndividualData}
            />
          </CardContent>
        </Card> */}
      </div>

      {/* Data Table */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Amount</TableCell>
              {/* <TableCell>Discount</TableCell> */}
              <TableCell>Status</TableCell>
              {/* <TableCell>Payment Method</TableCell> */}
              <TableCell>Next Billing</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                <TableCell>
                  <div>
                    <div>{record.userName}</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {record.userId}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.plan}
                    size="small"
                    color={
                      record.plan.includes("Annual") ? "primary" : "default"
                    }
                  />
                </TableCell>
                <TableCell>${record.amount}</TableCell>
                {/* <TableCell>
                  {record.discount > 0 ? `$${record.discount}` : "-"}
                </TableCell> */}
                <TableCell>
                  <Chip
                    label={record.status}
                    size="small"
                    color={
                      record.status === "Active"
                        ? "success"
                        : record.status === "Trial"
                        ? "info"
                        : "default"
                    }
                  />
                </TableCell>
                {/* <TableCell>{record.paymentMethod}</TableCell> */}
                <TableCell>{record.nextBilling}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleView(record)}>
                    <FaEye size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={revenueData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            borderRadius: 4,
            width: 600,
            p: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2>View Subscription</h2>
            <IconButton onClick={closeModal}>
              <FaTimes size={20} />
            </IconButton>
          </div>

          {selectedRecord && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
              }}
            >
              <div>
                <p className="label">User Name</p>
                <p>{selectedRecord.userName}</p>
              </div>
              <div>
                <p className="label">User ID</p>
                <p style={{ fontFamily: "monospace" }}>
                  {selectedRecord.userId}
                </p>
              </div>
              <div>
                <p className="label">Plan</p>
                <p>{selectedRecord.plan}</p>
              </div>
              <div>
                <p className="label">Amount</p>
                <p>${selectedRecord.amount}</p>
              </div>
              <div>
                <p className="label">Discount</p>
                <p>
                  {selectedRecord.discount > 0
                    ? `$${selectedRecord.discount}`
                    : "None"}
                </p>
              </div>
              <div>
                <p className="label">Status</p>
                <p>{selectedRecord.status}</p>
              </div>
              <div>
                <p className="label">Payment Method</p>
                <p>{selectedRecord.paymentMethod}</p>
              </div>
              <div>
                <p className="label">Next Billing</p>
                <p>{selectedRecord.nextBilling}</p>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
