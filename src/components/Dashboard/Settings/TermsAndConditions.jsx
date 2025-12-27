import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

// import { toast } from "sonner";
// import {
//   useGetSettingsQuery,
//   useUpdateSettingsMutation,
// } from "../../../Redux/api/settingsApi";
import { Button } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

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
    <div className="min-h-[90vh] bg-[#fbfbfb] rounded-lg py-5 px-4">
      <Button
        onClick={() => window.history.back()}
        sx={{
          backgroundColor: "#2B7FFF",
          color: "white",
          padding: "5px",
          width: "10px",
          height: "30px",
          ":hover": {
             backgroundColor: "white",
            color: "#2B7FFF",
            border: "1px solid #2B7FFF",
          },
        }}
      >
        <MdArrowBackIosNew />
      </Button>{" "}
      <div className="p-2 rounded">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-bold  text-[#222021]">
            Terms and Condition
          </h1>
          <Button
            onClick={handleOnSave}
            sx={{
              width: "150px",
              bgcolor: "#2B7FFF",
              color: "white",
              textTransform: "none",
              height: "40px",
              fontSize: "16px",
              ":hover": {
                bgcolor: "#242424",
                borderColor: "#0080FF",
              },
            }}
          >
            Save & Change
          </Button>
        </div>
        <div className="my-5">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
};
export default TermsAndConditions;
