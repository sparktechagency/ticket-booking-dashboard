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
  Modal,
  Box,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from "@mui/material";
import {
  FaEye,
  FaTimes,
  FaDownload,
  FaTrash,
  FaShieldAlt,
  FaHistory,
  FaDatabase,
  FaClock,
} from "react-icons/fa";
import { toast } from "sonner";
import { MetricCard } from "../UI/MetricCard";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 0,
  maxHeight: "90vh",
  overflow: "auto",
};

export default function PrivacyCompliance() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAccessControlsOpen, setIsAccessControlsOpen] = useState(false);
  const [isRetentionSettingsOpen, setIsRetentionSettingsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Access control settings
  const [accessControls, setAccessControls] = useState({
    piiAccess: true,
    emailAccess: true,
    phoneAccess: true,
    locationAccess: false,
    paymentAccess: false,
    auditLogging: true,
  });

  // Data retention settings (in days)
  const [retentionSettings, setRetentionSettings] = useState({
    errorLogs: 90,
    notificationLogs: 30,
    auditLogs: 365,
    analyticsData: 730,
    crashReports: 180,
    userActivity: 365,
  });

  // Generate audit trail data
  const generateAuditData = () => {
    const actions = [
      "Exported User Data",
      "Deleted User Data",
      "Accessed PII",
      "Modified Access Controls",
      "Updated Retention Policy",
      "Viewed User Profile",
    ];
    const admins = ["admin@app.com", "support@app.com", "privacy@app.com"];
    const data = [];

    for (let i = 1; i <= 50; i++) {
      const action = actions[i % actions.length];
      const severity = action.includes("Deleted")
        ? "Critical"
        : action.includes("Exported") || action.includes("PII")
        ? "High"
        : action.includes("Modified") || action.includes("Updated")
        ? "Medium"
        : "Low";

      data.push({
        id: String(i),
        timestamp: `2024-12-${String(
          Math.floor(Math.random() * 28) + 1
        ).padStart(2, "0")} ${String(Math.floor(Math.random() * 24)).padStart(
          2,
          "0"
        )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        admin: admins[i % admins.length],
        action,
        targetUser: `user_${1000 + i}`,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`,
        dataType: action.includes("PII")
          ? "PII"
          : action.includes("User")
          ? "User Profile"
          : "Settings",
        severity,
        details: action.includes("Exported")
          ? "GDPR request"
          : action.includes("Deleted")
          ? "User requested deletion"
          : "Admin action",
      });
    }
    return data.reverse(); // Most recent first
  };

  const auditData = generateAuditData();

  const filteredData = auditData.filter(
    (record) =>
      record.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.targetUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.dataType.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleExportData = () => {
    if (!selectedUserId) {
      toast.error("Please enter a user ID");
      return;
    }
    toast.success(
      `Exporting all data for ${selectedUserId}. You'll receive an email when ready.`
    );
    setIsExportModalOpen(false);
    setSelectedUserId("");
  };

  const handleDeleteData = () => {
    if (!selectedUserId) {
      toast.error("Please enter a user ID");
      return;
    }
    if (
      confirm(
        `⚠️ PERMANENT ACTION: Delete ALL data for ${selectedUserId}? This cannot be undone.`
      )
    ) {
      toast.success(
        `All data for ${selectedUserId} has been permanently deleted.`
      );
      setIsDeleteModalOpen(false);
      setSelectedUserId("");
    }
  };

  const handleAccessControlChange = (key, value) => {
    setAccessControls({ ...accessControls, [key]: value });
    toast.success("Access control updated");
  };

  const handleRetentionChange = (key, value) => {
    setRetentionSettings({ ...retentionSettings, [key]: parseInt(value) });
  };

  const saveRetentionSettings = () => {
    toast.success("Data retention policies updated successfully");
    setIsRetentionSettingsOpen(false);
  };

  // Calculate metrics
  const totalAuditLogs = auditData.length;
  const piiAccesses = auditData.filter((a) => a.dataType === "PII").length;
  const dataExports = auditData.filter((a) =>
    a.action.includes("Exported")
  ).length;
  const dataDeletions = auditData.filter((a) =>
    a.action.includes("Deleted")
  ).length;

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
          title="Audit Logs"
          value={totalAuditLogs.toString()}
          change={8.2}
          icon={FaHistory}
          subtitle="Total admin actions logged"
        />
        <MetricCard
          title="PII Accesses"
          value={piiAccesses.toString()}
          change={-12.4}
          icon={FaShieldAlt}
          subtitle="Last 30 days"
        />
        <MetricCard
          title="Data Exports"
          value={dataExports.toString()}
          change={15.3}
          icon={FaDownload}
          subtitle="GDPR/Privacy requests"
        />
        <MetricCard
          title="Data Deletions"
          value={dataDeletions.toString()}
          change={5.7}
          icon={FaTrash}
          subtitle="User deletion requests"
        />
      </div>

      {/* Quick Actions Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaDownload size={24} color="white" />
              </div>
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Export User Data
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              One-click export of all user data for GDPR/CCPA compliance.
              Includes profile, events, notifications, and billing history.
            </p>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsExportModalOpen(true)}
              sx={{ borderRadius: 2, textTransform: "none", py: 1.5 }}
            >
              Export User Data
            </Button>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaTrash size={24} color="white" />
              </div>
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Delete User Data
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Permanently delete all user data for right-to-be-forgotten
              requests. This action cannot be undone.
            </p>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsDeleteModalOpen(true)}
              color="error"
              sx={{ borderRadius: 2, textTransform: "none", py: 1.5 }}
            >
              Delete User Data
            </Button>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaShieldAlt size={24} color="white" />
              </div>
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Access Controls
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Manage PII access permissions and control who can view sensitive
              user data across your team.
            </p>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsAccessControlsOpen(true)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1.5,
                bgcolor: "#10b981",
                "&:hover": { bgcolor: "#059669" },
              }}
            >
              Manage Access
            </Button>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaClock size={24} color="white" />
              </div>
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Data Retention
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Configure how long to keep logs, notifications, and analytics data
              for compliance and efficiency.
            </p>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsRetentionSettingsOpen(true)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1.5,
                bgcolor: "#8b5cf6",
                "&:hover": { bgcolor: "#7c3aed" },
              }}
            >
              Configure Retention
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail Table */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            PII Access & Admin Action Audit Trail
          </p>
        </div>
        <TextField
          fullWidth
          placeholder="Search by admin, action, user, or data type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
      </Paper>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Target User</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {record.timestamp}
                </TableCell>
                <TableCell>{record.admin}</TableCell>
                <TableCell>
                  <Chip
                    label={record.action}
                    size="small"
                    color={
                      record.action.includes("Deleted")
                        ? "error"
                        : record.action.includes("Exported") ||
                          record.action.includes("PII")
                        ? "warning"
                        : record.action.includes("Modified")
                        ? "info"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                >
                  {record.targetUser}
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.dataType}
                    size="small"
                    sx={{
                      bgcolor:
                        record.dataType === "PII" ? "#fee2e2" : "#e0f2fe",
                      color: record.dataType === "PII" ? "#991b1b" : "#075985",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.severity}
                    size="small"
                    color={
                      record.severity === "Critical"
                        ? "error"
                        : record.severity === "High"
                        ? "warning"
                        : record.severity === "Medium"
                        ? "info"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                  }}
                >
                  {record.ipAddress}
                </TableCell>
                <TableCell sx={{ fontSize: "0.875rem" }}>
                  {record.details}
                </TableCell>
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

      {/* Export User Data Modal */}
      <Modal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              📦 Export User Data
            </p>
            <IconButton
              onClick={() => setIsExportModalOpen(false)}
              size="small"
            >
              <FaTimes size={20} />
            </IconButton>
          </div>

          <div style={{ padding: "24px" }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Export includes: Profile data, event history, notification logs,
              billing records, family data, and app settings. The export will be
              sent to your email as a ZIP file.
            </Alert>

            <TextField
              fullWidth
              label="User ID or Email"
              placeholder="user_1234 or user@example.com"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              sx={{ mb: 2 }}
            />

            <div
              style={{
                padding: "16px",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Export Contents:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                <li>User profile and account settings</li>
                <li>Event history and calendar data</li>
                <li>Notification preferences and logs</li>
                <li>Billing and subscription history</li>
                <li>Family membership and relationships</li>
                <li>App usage and activity logs</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              onClick={() => setIsExportModalOpen(false)}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleExportData}
              startIcon={<FaDownload />}
              sx={{ textTransform: "none" }}
            >
              Export Data
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Delete User Data Modal */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fee2e2",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#991b1b",
              }}
            >
              ⚠️ Delete User Data
            </p>
            <IconButton
              onClick={() => setIsDeleteModalOpen(false)}
              size="small"
            >
              <FaTimes size={20} />
            </IconButton>
          </div>

          <div style={{ padding: "24px" }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <strong>
                WARNING: This action is permanent and cannot be undone.
              </strong>{" "}
              All user data will be permanently deleted from all systems.
            </Alert>

            <TextField
              fullWidth
              label="User ID or Email"
              placeholder="user_1234 or user@example.com"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              sx={{ mb: 2 }}
            />

            <div
              style={{
                padding: "16px",
                background: "#fef2f2",
                borderRadius: "8px",
                border: "1px solid #fecaca",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#991b1b",
                }}
              >
                Data to be deleted:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  fontSize: "0.875rem",
                  color: "#7f1d1d",
                }}
              >
                <li>User profile and authentication</li>
                <li>All event and calendar data</li>
                <li>Notification history and preferences</li>
                <li>Billing records (anonymized for accounting)</li>
                <li>Family relationships and shared data</li>
                <li>All app activity and usage logs</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteData}
              startIcon={<FaTrash />}
              sx={{ textTransform: "none" }}
            >
              Permanently Delete
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Access Controls Modal */}
      <Modal
        open={isAccessControlsOpen}
        onClose={() => setIsAccessControlsOpen(false)}
      >
        <Box sx={modalStyle}>
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              🔒 PII Access Controls
            </p>
            <IconButton
              onClick={() => setIsAccessControlsOpen(false)}
              size="small"
            >
              <FaTimes size={20} />
            </IconButton>
          </div>

          <div style={{ padding: "24px" }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              These settings control which team members can access sensitive
              personal data. All access is logged in the audit trail.
            </Alert>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={accessControls.piiAccess}
                    onChange={(e) =>
                      handleAccessControlChange("piiAccess", e.target.checked)
                    }
                  />
                }
                label={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Full PII Access
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      Enable access to all personally identifiable information
                    </p>
                  </div>
                }
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessControls.emailAccess}
                    onChange={(e) =>
                      handleAccessControlChange("emailAccess", e.target.checked)
                    }
                  />
                }
                label={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Email Address Access
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      View and search by user email addresses
                    </p>
                  </div>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessControls.phoneAccess}
                    onChange={(e) =>
                      handleAccessControlChange("phoneAccess", e.target.checked)
                    }
                  />
                }
                label={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Phone Number Access
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      View user phone numbers for SMS notifications
                    </p>
                  </div>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessControls.locationAccess}
                    onChange={(e) =>
                      handleAccessControlChange(
                        "locationAccess",
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Location Data Access
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      Access to GPS coordinates and location history
                    </p>
                  </div>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessControls.paymentAccess}
                    onChange={(e) =>
                      handleAccessControlChange(
                        "paymentAccess",
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Payment Information Access
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      View billing details and payment methods
                    </p>
                  </div>
                }
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={accessControls.auditLogging}
                    onChange={(e) =>
                      handleAccessControlChange(
                        "auditLogging",
                        e.target.checked
                      )
                    }
                    disabled
                  />
                }
                label={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Audit Logging (Required)
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      All PII access is automatically logged for compliance
                    </p>
                  </div>
                }
              />
            </div>
          </div>

          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setIsAccessControlsOpen(false)}
              sx={{ textTransform: "none" }}
            >
              Done
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Data Retention Settings Modal */}
      <Modal
        open={isRetentionSettingsOpen}
        onClose={() => setIsRetentionSettingsOpen(false)}
      >
        <Box sx={modalStyle}>
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              ⏰ Data Retention Policies
            </p>
            <IconButton
              onClick={() => setIsRetentionSettingsOpen(false)}
              size="small"
            >
              <FaTimes size={20} />
            </IconButton>
          </div>

          <div style={{ padding: "24px" }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Configure how long to keep different types of data. Older data is
              automatically deleted to stay compliant and efficient.
            </Alert>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Error Logs
                </p>
                <TextField
                  fullWidth
                  type="number"
                  value={retentionSettings.errorLogs}
                  onChange={(e) =>
                    handleRetentionChange("errorLogs", e.target.value)
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        days
                      </span>
                    ),
                  }}
                />
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Notification Logs
                </p>
                <TextField
                  fullWidth
                  type="number"
                  value={retentionSettings.notificationLogs}
                  onChange={(e) =>
                    handleRetentionChange("notificationLogs", e.target.value)
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        days
                      </span>
                    ),
                  }}
                />
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Audit Logs (Recommended: 365 days minimum)
                </p>
                <TextField
                  fullWidth
                  type="number"
                  value={retentionSettings.auditLogs}
                  onChange={(e) =>
                    handleRetentionChange("auditLogs", e.target.value)
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        days
                      </span>
                    ),
                  }}
                />
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Analytics Data
                </p>
                <TextField
                  fullWidth
                  type="number"
                  value={retentionSettings.analyticsData}
                  onChange={(e) =>
                    handleRetentionChange("analyticsData", e.target.value)
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        days
                      </span>
                    ),
                  }}
                />
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Crash Reports
                </p>
                <TextField
                  fullWidth
                  type="number"
                  value={retentionSettings.crashReports}
                  onChange={(e) =>
                    handleRetentionChange("crashReports", e.target.value)
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        days
                      </span>
                    ),
                  }}
                />
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  User Activity Logs
                </p>
                <TextField
                  fullWidth
                  type="number"
                  value={retentionSettings.userActivity}
                  onChange={(e) =>
                    handleRetentionChange("userActivity", e.target.value)
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        days
                      </span>
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              onClick={() => setIsRetentionSettingsOpen(false)}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={saveRetentionSettings}
              sx={{ textTransform: "none" }}
            >
              Save Settings
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
