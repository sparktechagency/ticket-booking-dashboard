import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch, FaUsers, FaCrown } from "react-icons/fa";
import TransactionDetailsModal from "../UI/TransactionDetailsModal";
import { getStatusColor } from "../utils/statusColor";

// === Subscription Plans (from your image) ===
const subscriptionPlans = [
  {
    id: 1,
    name: "Dual Admin",
    description: "Up to 2 Admin Users",
    price: 4.99,
    icon: "users",
    features: [
      "All premium features included",
      "AI-powered scheduling assistant",
      "Real-time traffic updates",
      "Weather integration",
      "Smart notifications",
      "Family calendar sync",
      "Private & secure",
    ],
  },
  {
    id: 2,
    name: "Family Plan",
    description: "Unlimited Admin Users",
    price: 10.99,
    icon: "crown",
    isPopular: true,
    features: [
      "All premium features included",
      "AI-powered scheduling assistant",
      "Real-time traffic updates",
      "Weather integration",
      "Smart notifications",
      "Family calendar sync",
      "Private & secure",
    ],
  },
];

// === Realistic Transaction Data (linked to plans) ===
const transactionData = [
  {
    id: 1,
    transactionId: "TXN001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+1 (555) 123-4567",
    planId: 1, // Dual Admin
    amount: 4.99,
    date: "2024-01-15",
    status: "Completed",
    paymentMethod: "Credit Card",
    description: "Monthly subscription - Dual Admin",
  },
  {
    id: 2,
    transactionId: "TXN002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+1 (555) 234-5678",
    planId: 2, // Family Plan
    amount: 10.99,
    date: "2024-01-20",
    status: "Completed",
    paymentMethod: "PayPal",
    description: "Monthly subscription - Family Plan",
  },
  {
    id: 3,
    transactionId: "TXN003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+1 (555) 345-6789",
    planId: 1,
    amount: 4.99,
    date: "2024-02-01",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    description: "Monthly subscription - Dual Admin",
  },
  {
    id: 4,
    transactionId: "TXN004",
    customerName: "Sarah Williams",
    customerEmail: "sarah.williams@email.com",
    customerPhone: "+1 (555) 456-7890",
    planId: 2,
    amount: 10.99,
    date: "2024-02-10",
    status: "Completed",
    paymentMethod: "Debit Card",
    description: "Monthly subscription - Family Plan",
  },
  {
    id: 5,
    transactionId: "TXN005",
    customerName: "David Brown",
    customerEmail: "david.brown@email.com",
    customerPhone: "+1 (555) 567-8901",
    planId: 1,
    amount: 4.99,
    date: "2024-02-15",
    status: "Failed",
    paymentMethod: "Credit Card",
    description: "Monthly subscription - Dual Admin",
  },
  {
    id: 6,
    transactionId: "TXN006",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    customerPhone: "+1 (555) 678-9012",
    planId: 2,
    amount: 131.88, // Annual Family Plan
    date: "2024-03-01",
    status: "Completed",
    paymentMethod: "Credit Card",
    description: "Annual subscription - Family Plan",
  },
  {
    id: 7,
    transactionId: "TXN007",
    customerName: "Chris Wilson",
    customerEmail: "chris.wilson@email.com",
    customerPhone: "+1 (555) 789-0123",
    planId: 1,
    amount: 4.99,
    date: "2024-03-05",
    status: "Completed",
    paymentMethod: "Apple Pay",
    description: "Monthly subscription - Dual Admin",
  },
  {
    id: 8,
    transactionId: "TXN008",
    customerName: "Lisa Martinez",
    customerEmail: "lisa.martinez@email.com",
    customerPhone: "+1 (555) 890-1234",
    planId: 2,
    amount: 10.99,
    date: "2024-03-15",
    status: "Pending",
    paymentMethod: "Credit Card",
    description: "Monthly subscription - Family Plan",
  },
  {
    id: 9,
    transactionId: "TXN009",
    customerName: "Tom Anderson",
    customerEmail: "tom.anderson@email.com",
    customerPhone: "+1 (555) 901-2345",
    planId: 1,
    amount: 59.88, // Annual Dual Admin
    date: "2024-03-20",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Annual subscription - Dual Admin",
  },
  {
    id: 10,
    transactionId: "TXN010",
    customerName: "Rachel Taylor",
    customerEmail: "rachel.taylor@email.com",
    customerPhone: "+1 (555) 012-3456",
    planId: 2,
    amount: 10.99,
    date: "2024-04-01",
    status: "Completed",
    paymentMethod: "Credit Card",
    description: "Monthly subscription - Family Plan",
  },
];

export default function Transaction() {
  const [data] = useState(transactionData);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Filter transactions
  const filteredTransactions = data.filter(
    (t) =>
      t.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      t.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
      subscriptionPlans
        .find((p) => p.id === t.planId)
        ?.name.toLowerCase()
        .includes(searchText.toLowerCase())
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (transaction) => {
    const plan = subscriptionPlans.find((p) => p.id === transaction.planId);
    setSelectedTransaction({ ...transaction, plan });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  const handleSearchChange = (e) => setSearchText(e.target.value);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const getPlanDisplay = (planId) => {
    const plan = subscriptionPlans.find((p) => p.id === planId);
    if (!plan) return "Unknown";
    return (
      <Box display="flex" alignItems="center" gap={1} justifyContent="center">
        {plan.icon === "crown" ? (
          <FaCrown size={16} color="#A78BFA" />
        ) : (
          <FaUsers size={16} color="#94A3B8" />
        )}
        <span className="font-medium">{plan.name}</span>
        {plan.isPopular && (
          <Chip
            label="Popular"
            size="small"
            sx={{
              bgcolor: "#3B82F6",
              color: "white",
              fontSize: "0.65rem",
              height: 18,
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <div className="px-10 py-8 bg-[#fffffe] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Transaction Management
          </h1>
          <p className="text-[#2B7FFF] mt-2">
            Total Transactions:{" "}
            <span className="font-semibold text-lg">
              {filteredTransactions.length}
            </span>
          </p>
        </div>

        <TextField
          placeholder="Search by Customer, ID, or Plan"
          value={searchText}
          onChange={handleSearchChange}
          size="small"
          sx={{
            width: { xs: "100%", sm: 320 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: "44px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2B7FFF",
                boxShadow: "0 0 0 3px rgba(43, 127, 255, 0.1)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch color="#9CA3AF" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Table */}
      <TableContainer
        sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(90deg, #00D3F2 0%, #2B7FFF 100%)",
              }}
            >
              {[
                "Transaction ID",
                "Customer",
                "Package",
                "Amount",
                "Date",
                "Status",
                "Action",
              ].map((h) => (
                <TableCell
                  key={h}
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", fontSize: "14px" }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((t) => (
                <TableRow
                  key={t.id}
                  hover
                  sx={{ "&:hover": { bgcolor: "#f8faff" } }}
                >
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, color: "#1A1A1A" }}
                  >
                    {t.transactionId}
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                      <Typography fontWeight="medium">
                        {t.customerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t.customerEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {getPlanDisplay(t.planId)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, color: "#16a34a" }}
                  >
                    {formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(t.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleViewDetails(t)}
                      sx={{ color: "#2563eb" }}
                    >
                      <AiOutlineEye className="text-xl" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 8, 10]}
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />

      {/* Modal */}
      <TransactionDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        getStatusColor={getStatusColor}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}
