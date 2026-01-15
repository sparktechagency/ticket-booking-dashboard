import {
  TextField,
  Button,
  IconButton,
  Modal,
  CircularProgress,
} from "@mui/material";
import { FiHelpCircle } from "react-icons/fi";
import { FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateFAQMutation,
  useGetFaqDataQuery,
} from "../../../../Redux/api/contentApi";

export default function FAQ({ textFieldStyles }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  // const [faqToDelete, setFaqToDelete] = useState(null);

  const {
    data: allFaqData,
    isLoading,
    isError,
    refetch,
  } = useGetFaqDataQuery();
  const faqData = allFaqData?.data;
  console.log(faqData);

  const [createFaq] = useCreateFAQMutation();

  // Add FAQ modal handlers
  const handleOpenAddModal = () => {
    setNewFaq({ question: "", answer: "" });
    setAddModalOpen(true);
  };

  const handleSaveNewFaq = async () => {
    // Validate input
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }

    try {
      // Call the create FAQ API
      const response = await createFaq({
        question: newFaq.question,
        answer: newFaq.answer,
      }).unwrap();

      console.log(response);

      if (response.success) {
        toast.success("FAQ Added Successfully!");
        refetch();
        setAddModalOpen(false);
        setNewFaq({ question: "", answer: "" });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add FAQ");
      console.error("Error creating FAQ:", error);
    }
  };

  // Delete FAQ modal handlers
  // const handleDeleteClick = (faq) => {
  //   setFaqToDelete(faq);
  //   setDeleteOpen(true);
  // };

  // const handleConfirmDelete = () => {
  //   toast.success("FAQ deleted succesfully!");
  //   setDeleteOpen(false);
  //   setFaqToDelete(null);
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
              <FiHelpCircle className="w-5 h-5 text-[#bd85f1]" />
            </div>
            <h3 className="text-xl text-white">FAQ Management</h3>
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
            No FAQs yet. Click “Add FAQ” to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className="p-4 bg-white/5 rounded-xl space-y-3 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#bd85f1] text-sm font-semibold">
                    FAQ #{index + 1}
                  </span>
                  {/* <div className="flex items-center gap-2">
                    {editingId === faq.id ? (
                      <Button
                        onClick={() => setEditingId(null)}
                        size="small"
                        startIcon={<FaSave />}
                        sx={{
                          color: "#4ade80",
                          textTransform: "none",
                          fontSize: "0.75rem",
                          "&:hover": {
                            backgroundColor: "rgba(74, 222, 128, 0.1)",
                          },
                        }}
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        onClick={() => setEditingId(faq.id)}
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
                    )}
                    <IconButton
                      onClick={() => handleDeleteClick(faq)}
                      size="small"
                      sx={{
                        color: "#f87171",
                        "&:hover": {
                          backgroundColor: "rgba(248, 113, 113, 0.1)",
                        },
                      }}
                    >
                      <FaTrash />
                    </IconButton>
                  </div> */}
                </div>

                <div className="flex flex-col gap-3">
                  <TextField
                    fullWidth
                    label={`Question ${index + 1}`}
                    value={faq.question}
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
                    label={`Answer ${index + 1}`}
                    value={faq.answer}
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

      {/* ================= Add FAQ Modal ================= */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-xl p-6 rounded-2xl bg-gradient-to-br from-[#6d1db9]/50 via-[#260950] to-[#190146] shadow-lg flex flex-col gap-4 text-white">
          <p id="add-faq-modal-title" className="text-xl font-semibold">
            Add FAQ
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
                textTransform: "none", // same as Tailwind normal-case
                color: "white", // text-white
                borderColor: "rgba(255,255,255,0.2)", // border-white/20
                borderRadius: "0.5rem", // rounded-lg
                px: 2, // padding-left & right
                py: 1, // padding-top & bottom
                fontSize: "14px", // text-sm
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)", // hover:bg-white/10
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
              onClick={handleSaveNewFaq}
              startIcon={<FaSave />}
              className="bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] hover:from-[#5b189b] hover:to-[#a66fd9] text-white rounded-lg "
            >
              Save FAQ
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
