"use client";

import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  useAddPrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../../../Redux/api/contentApi";
import { toast } from "sonner";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Jodit Editor configuration
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

  // Fetch existing privacy policy
  const {
    data: getPrivacyData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetPrivacyPolicyQuery();

  const privacyData = getPrivacyData?.data;
  // console.log(privacyData);

  const [addPrivacyPolicy, { isLoading: isAdding }] =
    useAddPrivacyPolicyMutation();

  // Populate editor when data is fetched
  useEffect(() => {
    if (privacyData?.content.length) {
      // const latest = privacyData.reduce((latest, current) =>
      //   new Date(current.createdAt) > new Date(latest.createdAt)
      //     ? current
      //     : latest,
      // );
      console.log(privacyData?.content);
      setContent(privacyData?.content);
    }
  }, [privacyData]);

  // Save updated privacy policy
  const handleOnSave = async () => {
    try {
      const response = await addPrivacyPolicy({ content }).unwrap();
      console.log(response);
      if (response.success) {
        toast.success("Privacy Policy updated successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to save Privacy Policy. Please try again.");
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
        Error loading Privacy Policy. Please try again later.
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
            Privacy Policy
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

export default PrivacyPolicy;
