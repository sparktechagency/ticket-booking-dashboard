import { useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Modal,
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import {
  FaEye,
  FaTimes,
  FaUserShield,
  FaUsers,
  FaDollarSign,
  FaLock,
  FaExchangeAlt,
  FaGift,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { MetricCard } from "../UI/MetricCard";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 0,
  maxHeight: "90vh",
  overflow: "auto",
};

export default function AdminControls() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const [actionInputs, setActionInputs] = useState({
    promoMonths: "",
    refundAmount: "",
    targetId: "",
    reason: "",
  });

  // Generate user and family data
  const generateUserData = () => {
    const plans = ["Free", "Premium", "Trial"];
    const data = [];

    for (let i = 1; i <= 100; i++) {
      const plan = plans[i % 3];
      const status =
        i % 20 === 0 ? "Blocked" : i % 10 === 0 ? "Inactive" : "Active";
      data.push({
        id: `user_${1000 + i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        plan,
        status,
        familyId: `family_${Math.floor(i / 3) + 100}`,
        lastActive: `2024-12-${String(
          Math.floor(Math.random() * 28) + 1
        ).padStart(2, "0")}`,
        joinedDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        )}-15`,
        eventsCreated: Math.floor(Math.random() * 200),
        sessionsActive: Math.floor(Math.random() * 5),
        type: "user",
      });
    }
    return data;
  };

  const generateFamilyData = () => {
    const plans = ["Free", "Premium", "Premium Plus"];
    const data = [];

    for (let i = 1; i <= 50; i++) {
      const plan = plans[i % 3];
      const memberCount = Math.floor(Math.random() * 8) + 2;
      data.push({
        id: `family_${100 + i}`,
        name: `The ${
          ["Smith", "Johnson", "Williams", "Brown", "Jones"][i % 5]
        } Family`,
        plan,
        owner: `user_${1000 + i * 3}`,
        ownerEmail: `user${i * 3}@example.com`,
        memberCount,
        eventsCount: Math.floor(Math.random() * 500),
        createdDate: `2023-${String(
          Math.floor(Math.random() * 12) + 1
        ).padStart(2, "0")}-${String(
          Math.floor(Math.random() * 28) + 1
        ).padStart(2, "0")}`,
        lastActivity: `2024-12-${String(
          Math.floor(Math.random() * 28) + 1
        ).padStart(2, "0")}`,
        status: i % 15 === 0 ? "Inactive" : "Active",
        type: "family",
      });
    }
    return data;
  };

  const userData = generateUserData();
  const familyData = generateFamilyData();

  // Calculate metrics
  const totalUsers = userData.length;
  const activeUsers = userData.filter((u) => u.status === "Active").length;
  const blockedUsers = userData.filter((u) => u.status === "Blocked").length;
  const premiumUsers = userData.filter((u) => u.plan === "Premium").length;

  const totalFamilies = familyData.length;
  const activeFamilies = familyData.filter((f) => f.status === "Active").length;

  // Chart data
  const userStatusData = [
    {
      name: "Active",
      value: userData.filter((u) => u.status === "Active").length,
    },
    {
      name: "Inactive",
      value: userData.filter((u) => u.status === "Inactive").length,
    },
    {
      name: "Blocked",
      value: userData.filter((u) => u.status === "Blocked").length,
    },
  ];

  const planDistributionData = [
    { name: "Free", value: userData.filter((u) => u.plan === "Free").length },
    {
      name: "Premium",
      value: userData.filter((u) => u.plan === "Premium").length,
    },
    { name: "Trial", value: userData.filter((u) => u.plan === "Trial").length },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
  const PLAN_COLORS = ["#94a3b8", "#3b82f6", "#8b5cf6"];

  const currentData = activeTab === 0 ? userData : familyData;

  const filteredData = currentData.filter((record) => {
    const query = searchQuery.toLowerCase();
    if (activeTab === 0) {
      return (
        record.name.toLowerCase().includes(query) ||
        record.email.toLowerCase().includes(query) ||
        record.id.toLowerCase().includes(query) ||
        record.familyId.toLowerCase().includes(query)
      );
    } else {
      return (
        record.name.toLowerCase().includes(query) ||
        record.id.toLowerCase().includes(query) ||
        record.owner.toLowerCase().includes(query)
      );
    }
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setActionInputs({
      promoMonths: "",
      refundAmount: "",
      targetId: "",
      reason: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setActionInputs({
      promoMonths: "",
      refundAmount: "",
      targetId: "",
      reason: "",
    });
  };

  // Admin action handlers
  const handleImpersonate = () => {
    toast.success(
      `Impersonating ${
        selectedRecord.name || selectedRecord.email
      } in read-only mode`
    );
    closeModal();
  };

  const handleForcePasswordReset = () => {
    toast.success(`Password reset email sent to ${selectedRecord.email}`);
    closeModal();
  };

  const handleRevokeSessions = () => {
    toast.success(
      `All ${selectedRecord.sessionsActive || 0} active sessions revoked for ${
        selectedRecord.name
      }`
    );
    closeModal();
  };

  const handleBlockUser = () => {
    if (
      confirm(
        `Are you sure you want to block ${selectedRecord.name}? They will not be able to access the app.`
      )
    ) {
      toast.success(`User ${selectedRecord.name} has been blocked`);
      closeModal();
    }
  };

  const handleTransferOwnership = () => {
    if (!actionInputs.targetId) {
      toast.error("Please enter the new owner user ID");
      return;
    }
    toast.success(
      `Family ownership transferred from ${selectedRecord.owner} to ${actionInputs.targetId}`
    );
    closeModal();
  };

  const handleMergeFamilies = () => {
    if (!actionInputs.targetId) {
      toast.error("Please enter the target family ID to merge with");
      return;
    }
    if (
      confirm(
        `Merge ${selectedRecord.name} with ${actionInputs.targetId}? This cannot be undone.`
      )
    ) {
      toast.success(
        `Family ${selectedRecord.id} merged with ${actionInputs.targetId}`
      );
      closeModal();
    }
  };

  const handleDeleteFamily = () => {
    if (
      confirm(
        `Permanently delete ${selectedRecord.name}? All data will be lost. This cannot be undone.`
      )
    ) {
      toast.success(`Family ${selectedRecord.name} has been deleted`);
      closeModal();
    }
  };

  // const handleGrantPromo = () => {
  //   if (!actionInputs.promoMonths) {
  //     toast.error("Please enter number of promo months");
  //     return;
  //   }
  //   toast.success(
  //     `${actionInputs.promoMonths} promo months granted to ${selectedRecord.name}`
  //   );
  //   closeModal();
  // };

  // const handleCompPlan = () => {
  //   toast.success(`Premium plan comped for ${selectedRecord.name}`);
  //   closeModal();
  // };

  // const handleIssueRefund = () => {
  //   if (!actionInputs.refundAmount) {
  //     toast.error("Please enter refund amount");
  //     return;
  //   }
  //   toast.success(
  //     `Refund of $${actionInputs.refundAmount} issued to ${selectedRecord.name}`
  //   );
  //   closeModal();
  // };

  return (
    <div style={{ padding: "32px" }}>
      {/* Top Row Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Total Users"
          value={totalUsers.toString()}
          change={8.2}
          icon={FaUsers}
          subtitle={`${activeUsers} active`}
        />
        <MetricCard
          title="Premium Users"
          value={premiumUsers.toString()}
          change={12.5}
          icon={FaDollarSign}
          subtitle={`${((premiumUsers / totalUsers) * 100).toFixed(
            1
          )}% conversion`}
        />
        <MetricCard
          title="Total Families"
          value={totalFamilies.toString()}
          change={6.8}
          icon={FaUsers}
          subtitle={`${activeFamilies} active`}
        />
        <MetricCard
          title="Blocked Users"
          value={blockedUsers.toString()}
          change={-15.3}
          icon={FaLock}
          subtitle="Requires attention"
        />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <p
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              User Status Distribution
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Active, inactive, and blocked users
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <p
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Plan Distribution
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Free, premium, and trial users
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={planDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PLAN_COLORS[index % PLAN_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Table - Users & Families Management */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <TextField
            fullWidth
            placeholder={
              activeTab === 0
                ? "Search users by name, email, ID, or family ID..."
                : "Search families by name, ID, or owner..."
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </div>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
            setPage(0);
            setSearchQuery("");
          }}
        >
          <Tab label={`Users (${userData.length})`} />
          <Tab label={`Families (${familyData.length})`} />
        </Tabs>
      </Paper>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              {activeTab === 0 ? (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Active</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Family ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Members</TableCell>
                  <TableCell>Events</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                {activeTab === 0 ? (
                  <>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.plan}
                        size="small"
                        color={
                          record.plan === "Premium"
                            ? "primary"
                            : record.plan === "Trial"
                            ? "info"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        size="small"
                        color={
                          record.status === "Active"
                            ? "success"
                            : record.status === "Blocked"
                            ? "error"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {record.lastActive}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleView(record)}
                        color="primary"
                      >
                        <FaEye size={16} />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell
                      sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                    >
                      {record.id}
                    </TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.plan}
                        size="small"
                        color={
                          record.plan.includes("Premium")
                            ? "primary"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                    >
                      {record.owner}
                    </TableCell>
                    <TableCell>{record.memberCount}</TableCell>
                    <TableCell>{record.eventsCount}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        size="small"
                        color={
                          record.status === "Active" ? "success" : "default"
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {record.createdDate}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleView(record)}
                        color="primary"
                      >
                        <FaEye size={16} />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Admin Actions Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          {/* Modal Header */}
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
              color: "white",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              {selectedRecord?.type === "user"
                ? "👤 User Admin Controls"
                : "👨‍👩‍👧‍👦 Family Admin Controls"}
            </p>
            <IconButton
              onClick={closeModal}
              size="small"
              sx={{ color: "white" }}
            >
              <FaTimes size={20} />
            </IconButton>
          </div>

          {/* Modal Body */}
          <div style={{ padding: "24px" }}>
            {selectedRecord && (
              <>
                {/* Details Section */}
                <div
                  style={{
                    marginBottom: "24px",
                    padding: "16px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                      color: "#1e40af",
                    }}
                  >
                    {selectedRecord.type === "user"
                      ? "📋 User Details"
                      : "📋 Family Details"}
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "12px",
                    }}
                  >
                    {selectedRecord.type === "user" ? (
                      <>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            User ID
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "monospace",
                              fontWeight: 600,
                            }}
                          >
                            {selectedRecord.id}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Name
                          </p>
                          <p style={{ margin: 0, fontWeight: 600 }}>
                            {selectedRecord.name}
                          </p>
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Email
                          </p>
                          <p style={{ margin: 0, fontWeight: 600 }}>
                            {selectedRecord.email}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Plan
                          </p>
                          <Chip
                            label={selectedRecord.plan}
                            size="small"
                            color={
                              selectedRecord.plan === "Premium"
                                ? "primary"
                                : "default"
                            }
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Status
                          </p>
                          <Chip
                            label={selectedRecord.status}
                            size="small"
                            color={
                              selectedRecord.status === "Active"
                                ? "success"
                                : selectedRecord.status === "Blocked"
                                ? "error"
                                : "default"
                            }
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Family ID
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "monospace",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedRecord.familyId}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Active Sessions
                          </p>
                          <p style={{ margin: 0 }}>
                            {selectedRecord.sessionsActive}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Family ID
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "monospace",
                              fontWeight: 600,
                            }}
                          >
                            {selectedRecord.id}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Name
                          </p>
                          <p style={{ margin: 0, fontWeight: 600 }}>
                            {selectedRecord.name}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Plan
                          </p>
                          <Chip
                            label={selectedRecord.plan}
                            size="small"
                            color="primary"
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Status
                          </p>
                          <Chip
                            label={selectedRecord.status}
                            size="small"
                            color={
                              selectedRecord.status === "Active"
                                ? "success"
                                : "default"
                            }
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Owner
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "monospace",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedRecord.owner}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Owner Email
                          </p>
                          <p style={{ margin: 0, fontSize: "0.875rem" }}>
                            {selectedRecord.ownerEmail}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Members
                          </p>
                          <p style={{ margin: 0 }}>
                            {selectedRecord.memberCount} members
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginBottom: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Events
                          </p>
                          <p style={{ margin: 0 }}>
                            {selectedRecord.eventsCount} events
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Divider sx={{ my: 3 }} />

                {/* Actions Section */}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "20px",
                      color: "#1e293b",
                    }}
                  >
                    🛠️ Admin Actions
                  </p>

                  {selectedRecord.type === "user" ? (
                    <>
                      {/* User Security Actions */}
                      <div style={{ marginBottom: "24px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#64748b",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          🔒 Security Actions
                        </p>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "12px",
                          }}
                        >
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleImpersonate}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              borderColor: "#3b82f6",
                              color: "#3b82f6",
                              "&:hover": {
                                borderColor: "#2563eb",
                                bgcolor: "#eff6ff",
                              },
                            }}
                          >
                            👁️ Impersonate (Read-Only)
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleForcePasswordReset}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              borderColor: "#f59e0b",
                              color: "#f59e0b",
                              "&:hover": {
                                borderColor: "#d97706",
                                bgcolor: "#fef3c7",
                              },
                            }}
                          >
                            🔑 Force Password Reset
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleRevokeSessions}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              borderColor: "#f59e0b",
                              color: "#f59e0b",
                              "&:hover": {
                                borderColor: "#d97706",
                                bgcolor: "#fef3c7",
                              },
                            }}
                          >
                            🚫 Revoke Sessions
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleBlockUser}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              borderColor: "#ef4444",
                              color: "#ef4444",
                              "&:hover": {
                                borderColor: "#dc2626",
                                bgcolor: "#fee2e2",
                              },
                            }}
                          >
                            ⛔ Block User
                          </Button>
                        </div>
                      </div>

                      {/* Billing Actions */}
                      {/* <div style={{ marginBottom: "16px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#64748b",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          💰 Billing Actions
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                marginBottom: "8px",
                              }}
                            >
                              <TextField
                                size="small"
                                label="Number of Months"
                                type="number"
                                value={actionInputs.promoMonths}
                                onChange={(e) =>
                                  setActionInputs({
                                    ...actionInputs,
                                    promoMonths: e.target.value,
                                  })
                                }
                                sx={{ flex: 1 }}
                              />
                              <Button
                                variant="contained"
                                onClick={handleGrantPromo}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: "none",
                                  bgcolor: "#10b981",
                                  "&:hover": { bgcolor: "#059669" },
                                }}
                              >
                                🎁 Grant Promo Months
                              </Button>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <TextField
                              size="small"
                              label="Refund Amount ($)"
                              type="number"
                              value={actionInputs.refundAmount}
                              onChange={(e) =>
                                setActionInputs({
                                  ...actionInputs,
                                  refundAmount: e.target.value,
                                })
                              }
                              sx={{ flex: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={handleIssueRefund}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "#f59e0b",
                                "&:hover": { bgcolor: "#d97706" },
                              }}
                            >
                              💵 Issue Refund
                            </Button>
                          </div>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCompPlan}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              bgcolor: "#8b5cf6",
                              "&:hover": { bgcolor: "#7c3aed" },
                            }}
                          >
                            ⭐ Comp Premium Plan
                          </Button>
                        </div>
                      </div> */}
                    </>
                  ) : (
                    <>
                      {/* Family Management Actions */}
                      <div style={{ marginBottom: "24px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#64748b",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          👨‍👩‍👧‍👦 Family Management
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <div style={{ display: "flex", gap: "8px" }}>
                            <TextField
                              size="small"
                              label="New Owner User ID"
                              value={actionInputs.targetId}
                              onChange={(e) =>
                                setActionInputs({
                                  ...actionInputs,
                                  targetId: e.target.value,
                                })
                              }
                              sx={{ flex: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={handleTransferOwnership}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "#3b82f6",
                                "&:hover": { bgcolor: "#2563eb" },
                              }}
                            >
                              🔄 Transfer Ownership
                            </Button>
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <TextField
                              size="small"
                              label="Target Family ID"
                              value={actionInputs.targetId}
                              onChange={(e) =>
                                setActionInputs({
                                  ...actionInputs,
                                  targetId: e.target.value,
                                })
                              }
                              sx={{ flex: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={handleMergeFamilies}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "#10b981",
                                "&:hover": { bgcolor: "#059669" },
                              }}
                            >
                              🔗 Merge Families
                            </Button>
                          </div>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleDeleteFamily}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              borderColor: "#ef4444",
                              color: "#ef4444",
                              "&:hover": {
                                borderColor: "#dc2626",
                                bgcolor: "#fee2e2",
                              },
                            }}
                          >
                            🗑️ Delete Family
                          </Button>
                        </div>
                      </div>

                      {/* Billing Actions for Families */}
                      {/* <div style={{ marginBottom: "16px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#64748b",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          💰 Billing Actions
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <div style={{ display: "flex", gap: "8px" }}>
                            <TextField
                              size="small"
                              label="Number of Months"
                              type="number"
                              value={actionInputs.promoMonths}
                              onChange={(e) =>
                                setActionInputs({
                                  ...actionInputs,
                                  promoMonths: e.target.value,
                                })
                              }
                              sx={{ flex: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={handleGrantPromo}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "#10b981",
                                "&:hover": { bgcolor: "#059669" },
                              }}
                            >
                              🎁 Grant Promo Months
                            </Button>
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <TextField
                              size="small"
                              label="Refund Amount ($)"
                              type="number"
                              value={actionInputs.refundAmount}
                              onChange={(e) =>
                                setActionInputs({
                                  ...actionInputs,
                                  refundAmount: e.target.value,
                                })
                              }
                              sx={{ flex: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={handleIssueRefund}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "#f59e0b",
                                "&:hover": { bgcolor: "#d97706" },
                              }}
                            >
                              💵 Issue Refund
                            </Button>
                          </div>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCompPlan}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              py: 1.5,
                              bgcolor: "#8b5cf6",
                              "&:hover": { bgcolor: "#7c3aed" },
                            }}
                          >
                            ⭐ Comp Premium Plan
                          </Button>
                        </div>
                      </div> */}
                    </>
                  )}

                  {/* Optional Notes */}
                  {/* <TextField
                    fullWidth
                    size="small"
                    label="Reason / Notes (optional)"
                    multiline
                    rows={2}
                    value={actionInputs.reason}
                    onChange={(e) =>
                      setActionInputs({
                        ...actionInputs,
                        reason: e.target.value,
                      })
                    }
                    sx={{ mt: 2 }}
                  /> */}
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              background: "#f8fafc",
            }}
          >
            <Button
              onClick={closeModal}
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
