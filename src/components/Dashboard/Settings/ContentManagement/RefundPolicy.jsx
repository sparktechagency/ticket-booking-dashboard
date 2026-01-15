"use client";

import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";

import { toast } from "sonner";
import {
  useAddRefundPolicyMutation,
  useGetRefundPolicyQuery,
} from "../../../../Redux/api/contentApi";

const RefundPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    height: 450,
    width: "100%",
    theme: "dark",
    style: {
      background: "linear-gradient(to right, #080014, #030a1d)",
      border: "1px solid rgba(189, 133, 241, 0.3)",
      color: "white",
    },
    toolbarSticky: true,
  };

  const {
    data: getRefundPolicy,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetRefundPolicyQuery();

  const refundPolicyData = getRefundPolicy?.data;

  const [addRefundPolicy, { isLoading: isAdding }] =
    useAddRefundPolicyMutation();

  useEffect(() => {
    if (refundPolicyData?.length) {
      const latest = refundPolicyData.reduce((latest, current) =>
        new Date(current.createdAt) > new Date(latest.createdAt)
          ? current
          : latest
      );
      setContent(latest.content);
    }
  }, [refundPolicyData]);

  const handleOnSave = async () => {
    try {
      const response = await addRefundPolicy({ content }).unwrap();
      console.log(response);
      if (response.success) {
        toast.success("Refund Policy updated successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to save Refund Policy. Please try again.");
      console.error("Save error:", error);
    }
  };

  // Loading state
  if (isFetching || isAdding) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress sx={{ color: "#bd85f1" }} />
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="text-white text-center mt-10">
        Error loading Refund Policy. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => window.history.back()}
            sx={{
              py: 1,
              px: 1.5,
              background: "linear-gradient(to right, #6d1db9, #bd85f1)",
              borderRadius: "12px",
              textTransform: "none",
              color: "white",
              fontSize: "14px",
              boxShadow: "0 10px 40px rgba(109,29,185,0.3)",
              "&:hover": {
                background: "linear-gradient(to right, #5b189b, #a66fd9)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s",
            }}
          >
            <MdArrowBackIosNew />
          </Button>
          <h1 className="text-2xl font-bold text-white font-krona">
            Refund Policy
          </h1>
        </div>

        <Button
          onClick={handleOnSave}
          disabled={isAdding}
          sx={{
            px: 3,
            py: 1,
            background: "linear-gradient(to right, #6d1db9, #bd85f1)",
            borderRadius: "12px",
            textTransform: "none",
            color: "white",
            fontSize: "14px",
            boxShadow: "0 10px 40px rgba(109,29,185,0.3)",
            "&:hover": {
              background: "linear-gradient(to right, #5b189b, #a66fd9)",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s",
          }}
        >
          {isAdding ? "Saving..." : "Save & Change"}
        </Button>
      </div>

      {/* Editor */}
      <div className="mt-4">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
    </div>
  );
};
export default RefundPolicy;
