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
import { FaFilter } from "react-icons/fa6";

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
  const [filterType, setFilterType] = useState("all");

  // Filter transactions based on type
  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType === "all") return true;
    return transaction.status === filterType;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="space-y-6 min-h-screen bg-[#0a0d27] p-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
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
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
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
    </div>
  );
}
