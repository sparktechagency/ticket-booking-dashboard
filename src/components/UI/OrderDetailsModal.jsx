import {
  Modal,
  Paper,
  Typography,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import {
  FaCreditCard,
  FaHome,
  FaMailBulk,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { IoClose } from "react-icons/io5";

export default function OrderDetailModal({ order, isOpen, onClose }) {
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const platformFee = order.total * 0.05;

  const statusColors = {
    confirmed: {
      bg: "rgba(16,185,129,0.25)",
      text: "#4CAF0f",
      border: "rgba(16,185,129,0.2)",
    },
    pending: {
      bg: "rgba(234,179,8,0.25)",
      text: "#EAB308",
      border: "rgba(234,179,8,0.2)",
    },
    other: {
      bg: "rgba(59,130,246,0.25)",
      text: "#3B82F6",
      border: "rgba(59,130,246,0.2)",
    },
  };

  const currentStatus = statusColors[order.status] || statusColors.other;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Paper
        sx={{
          maxWidth: 800,
          mx: "auto",
          my: 5,
          p: 4,
          bgcolor: "#080014",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 3,
          maxHeight: "90vh",
          overflowY: "auto",
          color: "white",
          position: "relative",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 1.5,
            right: 3,
            color: "white",
          }}
        >
          <IoClose className="text-2xl" />
        </Button>
        {/* Header */}
        <div className="mb-4">
          <Typography variant="h5" fontFamily="display">
            Order Details
          </Typography>
          <Typography variant="body2" color="#99a1af">
            Order #{order.id} - {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
        </div>

        {/* Status Banner */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            border: `1px solid ${currentStatus.border}`,
            bgcolor: currentStatus.bg,
            mb: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: currentStatus.text }}>
            Status:{" "}
            <span style={{ textTransform: "capitalize", fontWeight: 600 }}>
              {order.status}
            </span>
          </Typography>
        </Paper>

        {/* Customer Information */}
        <div className="p-5 bg-[#150d20] border border-white/20 rounded-lg mb-3">
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <FaUser className="w-5 h-5 text-[#bd85f1]" />
            <p className="text-white font-display mb-4 flex items-center gap-2 text-2xl font-corona">
              Customer Information
            </p>
          </Stack>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Typography variant="caption" color="#99a1af">
                Full Name
              </Typography>
              <Typography>{order.customerInfo.name}</Typography>
            </div>
            <div>
              <Typography variant="caption" color="#99a1af">
                Email
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FaMailBulk />
                <Typography>{order.customerInfo.email}</Typography>
              </Stack>
            </div>

            <div>
              <Typography variant="caption" color="#99a1af">
                Phone
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FaPhone />
                <Typography>{order.customerInfo.phone}</Typography>
              </Stack>
            </div>

            <div>
              <Typography variant="caption" color="#99a1af">
                User ID
              </Typography>
              <Typography>{order.userId}</Typography>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            mb: 3,
            bgcolor: "#150d20",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <FaHome className="w-5 h-5 text-[#bd85f1]" />
            <p className="text-white font-display mb-4 flex items-center gap-2 text-2xl font-corona">
              Delivery Address
            </p>
          </Stack>
          <p className="text-white mt-1">{order.customerInfo.address}</p>
        </Paper>

        {/* Event Details */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            mb: 3,
            bgcolor: "#150d20",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <GoPackage className="w-5 h-5 text-[#bd85f1]" />
            <p className="text-white font-display mb-4 flex items-center gap-2 text-2xl font-corona">
              Event & Tickets
            </p>
          </Stack>
          <p className="text-[#99a1af] uppercase">Event Name</p>
          <p className="text-lg text-white font-medium">{order.eventTitle}</p>
          <p className="text-[#99a1af] py-2">Tickets:</p>

          {order.items.map((item, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                mb: 1,
                borderRadius: 1,
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p className="text-white">{item.categoryName}</p>
                <Typography variant="caption" color="#99a1af">
                  Quantity: {item.quantity}
                </Typography>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="text-white font-medium">${item.totalPrice}</p>
                <Typography variant="caption" color="#99a1af">
                  ${item.unitPrice} each
                </Typography>
              </div>
            </Paper>
          ))}
        </Paper>

        {/* Payment Summary */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            mb: 3,
            bgcolor: "#150d20",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <FaCreditCard className="w-5 h-5 text-[#bd85f1]" />
            <p className="text-white font-display mb-4 flex items-center gap-2 text-2xl font-corona">
              Payment Summary
            </p>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="#99a1af">Subtotal</Typography>
              <p className="text-white">${subtotal.toFixed(2)}</p>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="#99a1af">Platform Fee</Typography>
              <p className="text-white">${platformFee.toFixed(2)}</p>
            </Stack>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 1 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <p className="text-white">Total Amount</p>
              <p className="text-2xl text-[#bd85f1] font-display">
                ${order.total.toFixed(2)}
              </p>
            </Stack>
          </Stack>
        </Paper>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              textTransform: "none",
              height: "50px",
              color: "white",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#bd85f1",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
            startIcon={<FaDownload />}
          >
            Download Invoice
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              textTransform: "none",
              height: "50px",
              borderRadius: "10px",
              borderColor: "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": {
                borderColor: "#bd85f1",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
            startIcon={<FiPrinter />}
          >
            Print Receipt
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
}
