import {
  Alert,
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Box,
} from "@mui/material";
import React from "react";
import { MdAdd, MdDelete, MdPalette } from "react-icons/md";

export default function TicketsAndPricing({
  formData,
  setFormData,
  addTicketCategory,
  removeTicketCategory,
  updateTicketCategory,
  darkFieldSx,
  darkLabelSx,
}) {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={formData.ticketsAvailable}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ticketsAvailable: e.target.checked,
              }))
            }
            sx={{
              color: "#6d1db9",
            }}
          />
        }
        label="Tickets available for sale"
        sx={{ color: "white", mb: 4 }}
      />

      {formData.ticketsAvailable && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.4rem" }}>Ticket Categories</h3>
            <Button
              variant="contained"
              startIcon={<MdAdd />}
              onClick={addTicketCategory}
              sx={{
                bgcolor: "#6d1db9",
                "&:hover": { bgcolor: "#5b189b" },
                minWidth: "160px",
                textTransform: "none",
              }}
            >
              Add Category
            </Button>
          </div>

          {formData.ticketCategories.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
              }}
            >
              <p style={{ color: "#99a1af", fontSize: "1.1rem" }}>
                No ticket categories yet
              </p>
              <Button
                variant="contained"
                onClick={addTicketCategory}
                sx={{
                  bgcolor: "#6d1db9",
                  "&:hover": { bgcolor: "#5b189b" },
                  minWidth: "160px",
                  textTransform: "none",
                }}
              >
                Create First Category
              </Button>
            </div>
          )}

          {formData.ticketCategories.map((cat, index) => (
            <Paper
              key={cat.id}
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                p: 3,
                mb: 3,
                borderRadius: "12px",
              }}
            >
              <div className="flex justify-between items-center mb-5">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Avatar sx={{ bgcolor: cat.color }}>
                    <MdPalette />
                  </Avatar>
                  <h4 className="text-white">
                    {cat.name || `Category ${index + 1}`}
                  </h4>
                </div>
                <IconButton
                  onClick={() => removeTicketCategory(cat.id)}
                  color="error"
                >
                  <MdDelete size={22} />
                </IconButton>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <TextField
                  fullWidth
                  label="Ticket Name *"
                  value={cat.name}
                  onChange={(e) =>
                    updateTicketCategory(cat.id, {
                      name: e.target.value,
                    })
                  }
                  InputProps={{ sx: darkFieldSx }}
                  InputLabelProps={{ sx: darkLabelSx }}
                />

                <div className="flex gap-4 items-center">
                   <div className="relative w-full">
                      <label className="text-xs text-[#9ca3af] absolute -top-2.5 left-3 bg-[#080014] px-1">
                        Category Color
                      </label>
                      <div className="flex items-center gap-3 p-3 bg-[#030a1d] rounded-xl border border-white/15 h-[56px]">
                         <input 
                           type="color"
                           value={cat.color}
                           onChange={(e) =>
                             updateTicketCategory(cat.id, {
                               color: e.target.value,
                             })
                           }
                           className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                         />
                         <span className="text-white font-mono">{cat.color}</span>
                      </div>
                   </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <TextField
                    fullWidth
                    label="Price per Ticket ($)"
                    type="number"
                    value={cat.basePrice}
                    onChange={(e) =>
                      updateTicketCategory(cat.id, {
                        basePrice: Number(e.target.value) || 0,
                      })
                    }
                    InputProps={{ sx: darkFieldSx }}
                    InputLabelProps={{ sx: darkLabelSx }}
                  />
                  <TextField
                    fullWidth
                    label="Total Quantity"
                    type="number"
                    value={cat.totalQuantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value) || 0;
                      updateTicketCategory(cat.id, {
                        totalQuantity: qty,
                        availableQuantity: qty,
                      });
                    }}
                    InputProps={{ sx: darkFieldSx }}
                    InputLabelProps={{ sx: darkLabelSx }}
                  />
                </div>

                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Notes (optional)"
                  value={cat.notes}
                  onChange={(e) =>
                    updateTicketCategory(cat.id, {
                      notes: e.target.value,
                    })
                  }
                  InputProps={{ sx: darkFieldSx }}
                  InputLabelProps={{ sx: darkLabelSx }}
                />
              </div>
            </Paper>
          ))}
        </>
      )}

      {!formData.ticketsAvailable && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Tickets are not available. The event will be published without ticket
          sales.
        </Alert>
      )}
    </>
  );
}
