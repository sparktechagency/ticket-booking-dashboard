import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";

export default function ManageSubscriptionModal({
  openModal,
  handleCloseModal,
  currentSubscription,
  setCurrentSubscription,
  modalMode,
  handleFeatureChange,
  removeFeatureField,
  addFeatureField,
  handleSaveSubscription,
}) {
  return (
    <div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 700 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
          }}
        >
          <p className="text-center font-bold mb-1">
            {modalMode === "edit" ? "Edit Plan" : "Create New Plan"}
          </p>

          <Box sx={{ display: "grid", gap: 3 }}>
            <TextField
              label="Plan Name"
              value={currentSubscription.name}
              onChange={(e) =>
                setCurrentSubscription({
                  ...currentSubscription,
                  name: e.target.value,
                })
              }
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
            />
            <TextField
              label="Description"
              value={currentSubscription.description}
              onChange={(e) =>
                setCurrentSubscription({
                  ...currentSubscription,
                  description: e.target.value,
                })
              }
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Price"
                type="number"
                value={currentSubscription.price}
                onChange={(e) =>
                  setCurrentSubscription({
                    ...currentSubscription,
                    price: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDollarSign />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                }}
              />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Icon</InputLabel>
                <Select
                  value={currentSubscription.icon}
                  label="Icon"
                  onChange={(e) =>
                    setCurrentSubscription({
                      ...currentSubscription,
                      icon: e.target.value,
                    })
                  }
                  sx={{ borderRadius: "16px" }}
                >
                  <MenuItem value="users">Users</MenuItem>
                  <MenuItem value="crown">Crown</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <p className="mb-1 font-medium">Features</p>
              {currentSubscription.features.map((feature, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g. AI-powered assistant"
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                  {currentSubscription.features.length > 1 && (
                    <IconButton
                      onClick={() => removeFeatureField(index)}
                      color="error"
                      size="small"
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                onClick={addFeatureField}
                size="small"
                sx={{
                  mt: 1,
                  color: "white",
                  width: "120px",
                  bgcolor: "#3B82F6",
                  textTransform: "none",
                }}
              >
                + Add Feature
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                onClick={handleCloseModal}
                sx={{
                  border: "1px solid #3B82F6",
                  color: "#3B82F6",
                  borderRadius: "10px",
                  px: 3,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSubscription}
                variant="contained"
                sx={{
                  bgcolor: "#3B82F6",
                  color: "white",
                  borderRadius: "10px",
                  px: 4,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#2563EB" },
                }}
              >
                {modalMode === "edit" ? "Update" : "Create"} Plan
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
