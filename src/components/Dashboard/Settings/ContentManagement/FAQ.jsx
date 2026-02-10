import {
  TextField,
  Button,
  Modal,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { FiHelpCircle } from "react-icons/fi";
import { FaPlus, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateFAQMutation,
  useGetFaqDataQuery,
  useUpdateFAQMutation,
} from "../../../../Redux/api/contentApi";

export default function FAQ({ textFieldStyles, category }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);

  const {
    data: allFaqData,
    isLoading,
    isError,
    refetch,
  } = useGetFaqDataQuery(category); // Pass category as searchTerm

  const faqData = allFaqData?.data || [];
  console.log(faqData);

  const [createFaq] = useCreateFAQMutation();
  const [updateFaq] = useUpdateFAQMutation();

  // Add/Edit FAQ modal handlers
  const handleOpenAddModal = () => {
    setNewFaq({ question: "", answer: "" });
    setEditingId(null);
    setAddModalOpen(true);
  };

  const handleEditClick = (faq) => {
    setNewFaq({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id || faq.id); // Handle both _id and id if consistent
    setAddModalOpen(true);
  };

  const handleSaveFaq = async () => {
    // Validate input
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }

    try {
      if (editingId) {
        // Update existing FAQ
        const response = await updateFaq({
          id: editingId,
          data: {
            question: newFaq.question,
            answer: newFaq.answer,
            category: category,
          },
        }).unwrap();

        if (response.success) {
          toast.success("FAQ Updated Successfully!");
          refetch();
          setAddModalOpen(false);
          setNewFaq({ question: "", answer: "" });
          setEditingId(null);
        }
      } else {
        // Create new FAQ
        const response = await createFaq({
          question: newFaq.question,
          answer: newFaq.answer,
          category: category,
        }).unwrap();

        if (response.success) {
          toast.success("FAQ Added Successfully!");
          refetch();
          setAddModalOpen(false);
          setNewFaq({ question: "", answer: "" });
        }
      }
    } catch (error) {
      toast.error(
        error?.data?.message || `Failed to ${editingId ? "update" : "add"} FAQ`,
      );
      console.error(`Error ${editingId ? "updating" : "creating"} FAQ:`, error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-400 text-center">Failed to load FAQs</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
              <FiHelpCircle className="w-5 h-5 text-[#bd85f1]" />
            </div>
            <h3 className="text-xl text-white capitalize">
              {category} FAQ Management
            </h3>
          </div>

          <Button
            onClick={handleOpenAddModal}
            startIcon={<FaPlus />}
            sx={{
              px: 3,
              py: 1,
              background: "linear-gradient(to right, #6d1db9, #bd85f1)",
              borderRadius: "12px",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(to right, #5b189b, #a66fd9)",
              },
            }}
          >
            Add FAQ
          </Button>
        </div>

        {/* FAQ List */}
        {faqData.length === 0 ? (
          <p className="text-[#99a1af] text-center py-12">
            No FAQs found for {category}. Click “Add FAQ” to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={faq.id || faq._id || index}
                className="p-4 bg-white/5 rounded-xl space-y-3 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#bd85f1] text-sm font-semibold">
                    FAQ #{index + 1}
                  </span>
                  <IconButton
                    onClick={() => handleEditClick(faq)}
                    size="small"
                    sx={{
                      color: "#60a5fa",
                      "&:hover": {
                        backgroundColor: "rgba(96, 165, 250, 0.1)",
                      },
                    }}
                  >
                    <MdEdit />
                  </IconButton>
                </div>

                <div className="flex flex-col gap-3">
                  <TextField
                    fullWidth
                    label={`Question`}
                    value={faq.question}
                    disabled
                    sx={{
                      ...textFieldStyles,
                      "& .MuiOutlinedInput-root": {
                        ...textFieldStyles["& .MuiOutlinedInput-root"],
                        "&.Mui-disabled": {
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.05)",
                          },
                        },
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "#6b7280",
                      },
                      "& .MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "#9ca3af",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={`Answer`}
                    value={faq.answer}
                    disabled
                    sx={{
                      ...textFieldStyles,
                      "& .MuiOutlinedInput-root": {
                        ...textFieldStyles["& .MuiOutlinedInput-root"],
                        "&.Mui-disabled": {
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.05)",
                          },
                        },
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "#6b7280",
                      },
                      "& .MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "#9ca3af",
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Add/Edit FAQ Modal ================= */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-xl p-6 rounded-2xl bg-gradient-to-br from-[#6d1db9]/50 via-[#260950] to-[#190146] shadow-lg flex flex-col gap-4 text-white">
          <p
            id="add-faq-modal-title"
            className="text-xl font-semibold capitalize"
          >
            {editingId ? "Edit" : "Add"} {category} FAQ
          </p>

          <TextField
            fullWidth
            label="Question"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Answer"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
            sx={textFieldStyles}
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button
              onClick={() => setAddModalOpen(false)}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "white",
                borderColor: "rgba(255,255,255,0.2)",
                borderRadius: "0.5rem",
                px: 2,
                py: 1,
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              sx={{
                textTransform: "none",
                color: "white",
                px: 2,
              }}
              onClick={handleSaveFaq}
              startIcon={<FaSave />}
              className="bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] hover:from-[#5b189b] hover:to-[#a66fd9] text-white rounded-lg "
            >
              {editingId ? "Update FAQ" : "Save FAQ"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
