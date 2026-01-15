import { useState, useMemo } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Chip,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { FaSearch, FaEye } from "react-icons/fa";
// import { ordersData } from "../../../public/data/ordersData";
import OrderDetailsModal from "../UI/OrderDetailsModal";
import { useGetAllOrdersQuery } from "../../Redux/api/ordersApi";

export default function Orders() {
  const { data: ordersResponse, isLoading } = useGetAllOrdersQuery();
  const orders = ordersResponse?.data?.data || [];
  console.log(orders);  
  
  // const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  // Filter & sort orders
  // Filter & sort orders
  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // Status filter
    if (statusFilter !== "all") {
      data = data.filter((o) => o.status === statusFilter);
    }

    // Sorting
    if (sortOption === "date") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "amount") {
      data.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
    } else if (sortOption === "status") {
      data.sort((a, b) => a.status.localeCompare(b.status));
    }

    return data;
  }, [orders, statusFilter, sortOption]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Filters */}
      <div className="flex items-center justify-end gap-5">
        {/* <TextField
          placeholder="Search orders..."
          value={searchText}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: "#030a1d",
            borderRadius: 2,
            input: { color: "white" },
            flex: 1,
          }}
        /> */}

        <FormControl
          sx={{
            minWidth: 180,
            backgroundColor: "#030a1d",
            borderRadius: 5,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#bd85f1",
            },
          }}
        >
          <InputLabel sx={{ color: "white" }}>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
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
              ".MuiSvgIcon-root": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
              borderRadius: 5,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl
          sx={{
            minWidth: 180,
            backgroundColor: "#030a1d",
            borderRadius: 5,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <InputLabel sx={{ color: "white" }}>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
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
              ".MuiSvgIcon-root": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
              borderRadius: 5,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            <MenuItem
              value="date"
              sx={{
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
              }}
            >
              Sort By Date
            </MenuItem>
            <MenuItem
              value="amount"
              sx={{
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
              }}
            >
              Sort By Amount
            </MenuItem>
            <MenuItem
              value="status"
              sx={{
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
              }}
            >
              Sort By Status
            </MenuItem>
          </Select>
        </FormControl> */}
      </div>

      {/* Orders Table */}
      <Paper
        sx={{
          bgcolor: "transparent", // replaces bg-gradient-to-br via transparency (gradient can also be added via backgroundImage)
          backgroundImage:
            "linear-gradient(to bottom right, rgba(109,29,185,0.1), rgba(8,0,20,0.3), rgba(3,10,29,0.5))", // mimic Tailwind gradient
          backdropFilter: "blur(10px)", // replaces backdrop-blur-xl
          border: "1px solid rgba(255,255,255,0.1)", // replaces border-white/10
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                textTransform: "uppercase",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#99a1af", fontWeight: 600 }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: "#99a1af", fontWeight: 600 }}>
                  Customer
                </TableCell>
                <TableCell sx={{ color: "#99a1af", fontWeight: 600 }}>
                  Event
                </TableCell>
                <TableCell sx={{ color: "#99a1af", fontWeight: 600 }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "#99a1af", fontWeight: 600 }}>
                  Status
                </TableCell>
                <TableCell
                  sx={{ color: "#99a1af", fontWeight: 600 }}
                  align="right"
                >
                  Total
                </TableCell>
                <TableCell sx={{ color: "#99a1af" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}
                  >
                    <TableCell sx={{ color: "white" }}>{order.orderCode}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      <div>
                        <p>{order.userId?.fullName || "N/A"}</p>
                        <p className="text-[#99a1af] text-xs">
                          {order.userId?.email || "N/A"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell sx={{ color: "#99a1af" }}>
                      {order.eventId?.title || "Unknown Event"}
                    </TableCell>
                    <TableCell sx={{ color: "#99a1af" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const getStatusColor = (status) => {
                          switch (status) {
                            case "confirmed":
                            case "paid":
                              return {
                                color: "#16a34a",
                                bgcolor: "rgba(22,163,74,0.1)",
                                border: "1px solid rgba(22,163,74,0.2)",
                              };
                            case "pending":
                              return {
                                color: "#ca8a04",
                                bgcolor: "rgba(202,138,4,0.1)",
                                border: "1px solid rgba(202,138,4,0.2)",
                              };
                            case "cancelled":
                              return {
                                color: "#ef4444",
                                bgcolor: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.2)",
                              };
                            default:
                              return {
                                color: "#3b82f6",
                                bgcolor: "rgba(59,130,246,0.1)",
                                border: "1px solid rgba(59,130,246,0.2)",
                              };
                          }
                        };
                        const styles = getStatusColor(order.status);
                        return (
                          <Chip
                            label={order.status}
                            size="small"
                            sx={{
                              ...styles,
                              textTransform: "capitalize",
                            }}
                          />
                        );
                      })()}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      ${order.totalAmount?.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{
                          color: "#bd85f1",
                          textTransform: "none",
                        }}
                        onClick={() => handleViewOrder(order)}
                      >
                        <FaEye className="mr-2" />
                        <p>View Details</p>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ color: "#99a1af", py: 6 }}
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            color: "white",
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              { color: "#99a1af" },
          }}
        />
      </Paper>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
