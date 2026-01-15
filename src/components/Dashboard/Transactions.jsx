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
  CircularProgress,
} from "@mui/material";
import { FaFilter } from "react-icons/fa6";
import { useGetAllTransactionsQuery } from "../../Redux/api/transactionApi";
import dayjs from "dayjs";
import { useState } from "react";

export default function Transactions() {
  const {
    data: transactionsResponse,
    isLoading,
    isError,
  } = useGetAllTransactionsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [filterType, setFilterType] = useState("all");

  const transactions = transactionsResponse?.data || [];
  console.log(transactions);

  // Filter transactions based on type
  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType === "all") return true;
    return transaction.status?.toLowerCase() === filterType.toLowerCase();
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p className="text-white">
          Something went wrong while loading transactions.
        </p>
      </div>
    );
  }

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
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="succeeded">Succeeded</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
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
                key={transaction._id || transaction.id}
                sx={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <TableCell sx={{ padding: "16px 24px", color: "white" }}>
                  #
                  {transaction.transactionId ||
                    (transaction._id || transaction.id).substring(0, 8)}
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  <div>
                    <p className="text-white font-sans text-sm">
                      {transaction.description ||
                        `Order #${
                          (transaction.orderId?._id || transaction.orderId || "")
                            .toString()
                            .substring(0, 8) || "N/A"
                        }`}
                    </p>
                    {transaction.customerName && (
                      <p className="text-xs text-[#99a1af] font-sans">
                        {transaction.customerName}
                      </p>
                    )}
                  </div>
                </TableCell>

                <TableCell sx={{ padding: "16px 24px", color: "#9ca3af" }}>
                  {dayjs(transaction.createdAt || transaction.date).format(
                    "MMM DD, YYYY"
                  )}
                  <br />
                  <span className="text-xs">
                    {dayjs(transaction.createdAt || transaction.date).format(
                      "h:mm A"
                    )}
                  </span>
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  <span
                    className={`inline-flex px-3 py-1 rounded-lg text-xs font-sans capitalize ${
                      transaction.status?.toLowerCase() === "succeeded"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : transaction.status?.toLowerCase() === "pending"
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
                  {Math.abs(transaction.amount || 0).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {paginatedTransactions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{ textAlign: "center", py: 5, color: "#99a1af" }}
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
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
