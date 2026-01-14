import { Modal, Box, Button, Fade, Backdrop } from "@mui/material";

export function DeleteConfirmationModal({
  open,
  title = "Confirm Delete",
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: { backgroundColor: "rgba(0,0,0,0.6)" },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 420,
            bgcolor: "rgba(3,10,29,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            p: 3,
            boxShadow: 24,
            outline: "none",
          }}
        >
          <h3
            id="confirm-delete-title"
            style={{ color: "white", fontSize: "1.25rem", marginBottom: "8px" }}
          >
            {title}
          </h3>

          <p
            id="confirm-delete-description"
            style={{ color: "#99a1af", marginBottom: "24px" }}
          >
            {description}
          </p>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "white",
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  borderColor: "#bd85f1",
                  backgroundColor: "rgba(189,133,241,0.08)",
                },
              }}
            >
              {cancelText}
            </Button>

            <Button
              variant="contained"
              onClick={onConfirm}
              sx={{
                bgcolor: "#e11d48",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#be123c",
                },
              }}
            >
              {confirmText}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
