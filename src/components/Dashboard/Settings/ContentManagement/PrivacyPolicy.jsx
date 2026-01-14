import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

// import { toast } from "sonner";
// import {
//   useGetSettingsQuery,
//   useUpdateSettingsMutation,
// } from "../../../Redux/api/settingsApi";
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

  const config = {
    readonly: false,
    height: "450px",
    width: "100%",
    theme: "dark",
    style: {
      background: "linear-gradient(to right, #080014, #030a1d)",
      border: "1px solid rgba(189, 133, 241, 0.3)",
      color: "white",
    },
  };

  const {
    data: getPrivacyData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetPrivacyPolicyQuery();
  const privacyData = getPrivacyData?.data;
  console.log(privacyData);

  const [addSettings, { isLoading: isAdding }] = useAddPrivacyPolicyMutation();

  useEffect(() => {
    if (privacyData?.data) {
      setContent(privacyData.data);
    }
  }, [privacyData]);

  const handleOnSave = async () => {
    try {
      const response = await addSettings({
        termsOfService: content,
      }).unwrap();
      console.log(response);
      toast.success("Terms and Conditions updated successfully!");

      refetch();
    } catch (error) {
      toast.error("Failed to save Terms and Conditions. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isAdding) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Privacy Policy. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => window.history.back()}
            sx={{
              py: 1,
              background: "linear-gradient(to right, #6d1db9, #bd85f1)",
              borderRadius: "12px",
              textTransform: "none",
              color: "white",
              fontSize: "14px",
              boxShadow: "0 10px 40px rgba(109, 29, 185, 0.3)",
              "&:hover": {
                background: "linear-gradient(to right, #5b189b, #a66fd9)",
                transform: "scale(1.05)",
              },
            }}
          >
            <MdArrowBackIosNew />
          </Button>{" "}
          <h1 className="text-2xl font-bold  text-white font-krona">
            Privacy Policy
          </h1>{" "}
        </div>
        <Button
          onClick={handleOnSave}
          sx={{
            px: 3,
            py: 1,
            background: "linear-gradient(to right, #6d1db9, #bd85f1)",
            borderRadius: "12px",
            textTransform: "none",
            color: "white",
            fontSize: "14px",
            boxShadow: "0 10px 40px rgba(109, 29, 185, 0.3)",
            "&:hover": {
              background: "linear-gradient(to right, #5b189b, #a66fd9)",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s",
          }}
        >
          Save & Change
        </Button>
      </div>

      <div className="my-3">
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
