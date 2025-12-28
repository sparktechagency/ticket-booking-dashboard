import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaDollarSign,
  FaArrowRotateRight,
  FaFilter,
  FaArrowUpRightFromSquare,
  FaArrowDownLong,
  FaCreditCard,
  FaBuilding,
  FaWallet,
} from "react-icons/fa6";

const mockTransactions = [
  {
    id: "TXN001",
    type: "income",
    description: "Ticket Sale - Coldplay Live",
    amount: 450.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    orderId: "ORD12345",
    customerName: "John Doe",
  },
  {
    id: "TXN002",
    type: "refund",
    description: "Refund - Ed Sheeran Concert",
    amount: -280.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5),
    orderId: "ORD12344",
    customerName: "Sarah Smith",
  },
  {
    id: "TXN003",
    type: "income",
    description: "Ticket Sale - Taylor Swift Era",
    amount: 890.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12),
    orderId: "ORD12343",
    customerName: "Mike Johnson",
  },
  {
    id: "TXN004",
    type: "payout",
    description: "Bank Transfer - Weekly Payout",
    amount: -5000.0,
    status: "pending",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "TXN005",
    type: "fee",
    description: "Platform Fee - Month of December",
    amount: -125.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "TXN006",
    type: "income",
    description: "Ticket Sale - Bruno Mars Concert",
    amount: 650.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72),
    orderId: "ORD12342",
    customerName: "Emily Davis",
  },
  {
    id: "TXN007",
    type: "refund",
    description: "Refund - Weekend Festival Pass",
    amount: -320.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96),
    orderId: "ORD12341",
    customerName: "Alex Brown",
  },
  {
    id: "TXN008",
    type: "income",
    description: "Ticket Sale - Jazz Night Live",
    amount: 180.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 120),
    orderId: "ORD12340",
    customerName: "Chris Wilson",
  },
  {
    id: "TXN009",
    type: "payout",
    description: "Bank Transfer - Monthly Payout",
    amount: -8500.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 144),
  },
  {
    id: "TXN010",
    type: "fee",
    description: "Processing Fee - Q4 2024",
    amount: -95.0,
    status: "completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 168),
  },
];

export default function Transactions() {
  const [transactions] = useState(mockTransactions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [refundData, setRefundData] = useState({
    orderId: "",
    amount: "",
    reason: "",
  });

  // Filter transactions based on type
  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType === "all") return true;
    return transaction.type === filterType;
  });

  // Calculate balance based on filtered transactions
  const totalBalance = filteredTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = filteredTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = filteredTransactions
    .filter((t) => t.type === "refund" && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getTransactionIcon = (type) => {
    switch (type) {
      case "income":
        return <FaArrowDownLong className="w-4 h-4" />;
      case "refund":
        return <FaArrowUpRightFromSquare className="w-4 h-4" />;
      case "payout":
        return <FaBuilding className="w-4 h-4" />;
      case "fee":
        return <FaCreditCard className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "income":
        return "text-green-400 bg-green-400/10";
      case "refund":
        return "text-red-400 bg-red-400/10";
      case "payout":
        return "text-blue-400 bg-blue-400/10";
      case "fee":
        return "text-yellow-400 bg-yellow-400/10";
      default:
        return "";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefundSubmit = () => {
    // Handle refund logic here
    console.log("Refund Data:", refundData);
    setShowRefundModal(false);
    setRefundData({ orderId: "", amount: "", reason: "" });
  };

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="space-y-6 min-h-screen bg-[#0a0d27] p-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#bd85f1]/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-2xl flex items-center justify-center">
              <FaWallet className="w-6 h-6 text-[#bd85f1]" />
            </div>
          </div>
          <p className="text-3xl text-white font-display mb-1">
            ${totalBalance.toLocaleString()}
          </p>
          <p className="text-sm text-[#99a1af] font-sans">Available Balance</p>
        </div>

        {/* Pending Amount */}
        <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#bd85f1]/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl flex items-center justify-center">
              <FaArrowRotateRight className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <p className="text-3xl text-white font-display mb-1">
            ${pendingAmount.toLocaleString()}
          </p>
          <p className="text-sm text-[#99a1af] font-sans">Pending</p>
        </div>

        {/* Total Income */}
        <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#bd85f1]/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl flex items-center justify-center">
              <FaArrowTrendUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <p className="text-3xl text-white font-display mb-1">
            ${totalIncome.toLocaleString()}
          </p>
          <p className="text-sm text-[#99a1af] font-sans">Total Income</p>
        </div>

        {/* Total Refunds */}
        <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#bd85f1]/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl flex items-center justify-center">
              <FaArrowTrendDown className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <p className="text-3xl text-white font-display mb-1">
            ${totalRefunds.toLocaleString()}
          </p>
          <p className="text-sm text-[#99a1af] font-sans">Total Refunds</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl text-white font-display">
          Transaction History
        </h2>
        <div className="flex gap-3">
          {/* Filter Dropdown */}
          <div className="relative">
            <FormControl>
              <Select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setPage(0);
                }}
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
                  color: "white",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minWidth: "150px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    padding: "12px 40px 12px 16px",
                  },
                }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="income">Income Only</MenuItem>
                <MenuItem value="refund">Refunds Only</MenuItem>
                <MenuItem value="payout">Payouts Only</MenuItem>
                <MenuItem value="fee">Fees Only</MenuItem>
              </Select>
            </FormControl>
            <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <Button
            sx={{
              textTransform: "none",
              color: "white",
              borderRadius: "15px",
              px: 3,
            }}
            onClick={() => setShowRefundModal(true)}
            className="bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] hover:from-[#5b189b] hover:to-[#a66fd9] text-white rounded-xl font-display transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#6d1db9]/30"
          >
            <FaArrowRotateRight className="w-4 h-4" />
            Issue Refund
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <TableContainer
        component={Paper}
        sx={{
          background:
            "linear-gradient(to bottom right, rgba(109, 29, 185, 0.1), #080014, rgba(3, 10, 29, 0.5))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {[
                "Transaction ID",
                "Type",
                "Description",
                "Date",
                "Status",
                "Amount",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    padding: "16px 24px",
                    textAlign: header === "Amount" ? "right" : "left",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <TableCell sx={{ padding: "16px 24px", color: "white" }}>
                  #{transaction.id}
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${getTransactionColor(
                      transaction.type
                    )}`}
                  >
                    {getTransactionIcon(transaction.type)}
                    <span className="text-xs font-sans capitalize">
                      {transaction.type}
                    </span>
                  </div>
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  <div>
                    <p className="text-white font-sans text-sm">
                      {transaction.description}
                    </p>
                    {transaction.customerName && (
                      <p className="text-xs text-[#99a1af] font-sans">
                        {transaction.customerName}
                      </p>
                    )}
                  </div>
                </TableCell>

                <TableCell sx={{ padding: "16px 24px", color: "#9ca3af" }}>
                  {transaction.date.toLocaleDateString()}{" "}
                  {transaction.date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  <span
                    className={`inline-flex px-3 py-1 rounded-lg text-xs font-sans capitalize ${
                      transaction.status === "completed"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : transaction.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>

                <TableCell
                  sx={{
                    padding: "16px 24px",
                    textAlign: "right",
                    color: transaction.amount >= 0 ? "#4ade80" : "#f87171",
                  }}
                >
                  {transaction.amount >= 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            color: "white",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              { color: "#99a1af" },
          }}
        />
      </TableContainer>

      {/* Refund Modal */}
      <Modal
        open={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="bg-[#080014] border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4">
          <h3 className="text-2xl text-white font-display mb-6">
            Issue Refund
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Order ID"
                placeholder="Enter order ID"
                value={refundData.orderId}
                onChange={(e) =>
                  setRefundData({ ...refundData, orderId: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#030a1d",
                    borderRadius: "12px",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(189,133,241,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#bd85f1",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#99a1af",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#bd85f1",
                  },
                }}
              />

              <TextField
                fullWidth
                type="number"
                label="Refund Amount"
                placeholder="0.00"
                value={refundData.amount}
                onChange={(e) =>
                  setRefundData({ ...refundData, amount: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#030a1d",
                    borderRadius: "12px",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(189,133,241,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#bd85f1",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#99a1af",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#bd85f1",
                  },
                }}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason"
                placeholder="Reason for refund"
                value={refundData.reason}
                onChange={(e) =>
                  setRefundData({ ...refundData, reason: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#030a1d",
                    borderRadius: "12px",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(189,133,241,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#bd85f1",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#99a1af",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#bd85f1",
                  },
                }}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                sx={{
                  textTransform: "none",
                  color: "white",
                  borderRadius: "15px",
                  px: 3,
                }}
                onClick={() => setShowRefundModal(false)}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-sans transition-all"
              >
                Cancel
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  color: "white",
                  borderRadius: "15px",
                  px: 3,
                }}
                onClick={handleRefundSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] hover:from-[#5b189b] hover:to-[#a66fd9] text-white rounded-xl font-display transition-all"
              >
                Process Refund
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
