import { Box, Button, Modal } from "@mui/material";
import React from "react";

export default function DeleteSubscriptionModal({
  openDeleteModal,
  setOpenDeleteModal,
  subscriptionToDelete,
  confirmDelete,
}) {
  return (
    <div>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <p className="font-bold text-lg">Delete Plan?</p>
          <p className="">
            Remove <strong>{subscriptionToDelete?.name}</strong> permanently?
          </p>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              onClick={() => setOpenDeleteModal(false)}
              sx={{
                border: "1px solid #3B82F6",
                color: "#3B82F6",
                borderRadius: "10px",
                textTransform: "none",
                width: "80px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              sx={{
                bgcolor: "#EF4444",
                color: "white",
                borderRadius: "10px",
                textTransform: "none",
                width: "80px",
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
