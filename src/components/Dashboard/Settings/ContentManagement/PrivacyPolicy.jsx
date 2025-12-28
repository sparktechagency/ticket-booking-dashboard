import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

// import { toast } from "sonner";
// import {
//   useGetSettingsQuery,
//   useUpdateSettingsMutation,
// } from "../../../Redux/api/settingsApi";
import { Button } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";

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

  // const {
  //   data: getSettingsData,
  //   isLoading: isFetching,
  //   error: fetchError,
  //   refetch,
  // } = useGetSettingsQuery();
  // console.log(getSettingsData?.data?.termsOfService);

  // const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  // const [updateSettings, { isLoading: isUpdating }] =
  //   useUpdateSettingsMutation();

  // useEffect(() => {
  //   if (getSettingsData?.data.termsOfService) {
  //     setContent(getSettingsData.data.termsOfService);
  //   }
  // }, [getSettingsData]);

  const handleOnSave = async () => {
    // try {
    //   await updateSettings({ termsOfService: content }).unwrap();
    //   toast.success("Terms and Conditions updated successfully!");
    // if
    // (getSettingsData?.data.termsOfService) { }
    //  else {
    //   // Add a new Terms and Conditions if not existing
    //   await addSettings({ termsOfService: content }).unwrap();
    //   toast.success("Terms and Conditions added successfully!");
    // }
    // refetch();
    // } catch (error) {
    //   toast.error("Failed to save Terms and Conditions. Please try again.");
    //   console.error("Save error:", error);
    // }
  };

  // if (isFetching || isUpdating) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spin size="large" tip="Loading Terms and Conditions..." />
  //     </div>
  //   );
  // }

  // if (fetchError) {
  //   return (
  //     <div className="text-white">
  //       Error loading Terms and Conditions. Please try again later.
  //     </div>
  //   );
  // }

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
