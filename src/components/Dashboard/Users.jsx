import { useState, useMemo } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { FaChevronDown, FaCrown, FaEllipsisV } from "react-icons/fa";
import { users } from "../../../public/data/userData";

export default function Users() {
  const [userFilter, setUserFilter] = useState("all");
  const [userSort, setUserSort] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* ---------------- FILTER + SORT ---------------- */
  const filteredUsers = useMemo(() => {
    let data = [...users]; // Changed from USERS to users

    if (userFilter === "premium") {
      data = data.filter((u) => u.isMember);
    }
    if (userFilter === "free") {
      data = data.filter((u) => !u.isMember);
    }

    data.sort((a, b) => {
      if (userSort === "name") return a.name.localeCompare(b.name);
      if (userSort === "email") return a.email.localeCompare(b.email);
      if (userSort === "date")
        return (
          new Date(b.membershipExpiry || 0) - new Date(a.membershipExpiry || 0)
        );
      return 0;
    });

    return data;
  }, [userFilter, userSort]);

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        {/* Filter */}
        <div className="relative">
          <FormControl fullWidth>
            <Select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
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
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "12px 40px 12px 16px",
                },
              }}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="premium">Premium Only</MenuItem>
              <MenuItem value="free">Free Only</MenuItem>
            </Select>
          </FormControl>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <FormControl fullWidth>
            <Select
              value={userSort}
              onChange={(e) => setUserSort(e.target.value)}
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
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "12px 40px 12px 16px",
                },
              }}
            >
              <MenuItem value="name">Sort by Name</MenuItem>
              <MenuItem value="email">Sort by Email</MenuItem>
              <MenuItem value="date">Sort by Date</MenuItem>
            </Select>
          </FormControl>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* MUI Table */}
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
                "User",
                "Email",
                "Phone",
                "Role",
                "Membership",
                "Expiry Date",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    padding: "16px 24px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <TableCell sx={{ padding: "16px 24px" }}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      sx={{
                        background:
                          "linear-gradient(to bottom right, #bd85f1, #6d1db9)",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <div>
                      <p className="text-white text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">ID: {user.id}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell sx={{ color: "#9ca3af", padding: "16px 24px" }}>
                  {user.email}
                </TableCell>

                <TableCell sx={{ color: "#9ca3af", padding: "16px 24px" }}>
                  {user.phone || "N/A"}
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  <Chip
                    label={user.role}
                    sx={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#60a5fa",
                      textTransform: "capitalize",
                      fontSize: "0.75rem",
                    }}
                  />
                </TableCell>

                <TableCell sx={{ padding: "16px 24px" }}>
                  {user.isMember ? (
                    <Chip
                      icon={<FaCrown style={{ fontSize: "0.75rem" }} />}
                      label="Premium"
                      sx={{
                        backgroundColor: "rgba(234, 179, 8, 0.1)",
                        color: "#facc15",
                        fontSize: "0.75rem",
                      }}
                    />
                  ) : (
                    <Chip
                      label="Free"
                      sx={{
                        backgroundColor: "rgba(107, 114, 128, 0.1)",
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                      }}
                    />
                  )}
                </TableCell>

                <TableCell sx={{ color: "#9ca3af", padding: "16px 24px" }}>
                  {user.membershipExpiry
                    ? new Date(user.membershipExpiry).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell sx={{ padding: "16px 24px", textAlign: "center" }}>
                  <IconButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <FaEllipsisV style={{ color: "#9ca3af" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            color: "white",
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              { color: "#99a1af" },
          }}
        />
      </TableContainer>
    </div>
  );
}
