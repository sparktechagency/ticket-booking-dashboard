import { useState } from "react";
import { TextField, Button, Chip, Alert } from "@mui/material";
import { FaGlobe, FaInfo, FaSave } from "react-icons/fa";
import { FaFile, FaShield } from "react-icons/fa6";
import { FiHelpCircle, FiMail } from "react-icons/fi";
import { toast } from "sonner";
import { demoCmsContent } from "../../../../public/data/cmdData";
import FAQ from "./ContentManagement/FAQ";
import ContactInfo from "./ContentManagement/ContactInfo";
import RefundPolicy from "./ContentManagement/RefundPolicy";
import PrivacyPolicy from "./ContentManagement/PrivacyPolicy";
import TermsAndConditions from "./ContentManagement/TermsAndConditions";

export function ContentManagement() {
  const [activeSection, setActiveSection] = useState("faq");
  const [cmsContent, setCmsContent] = useState(demoCmsContent);

  const handleSave = () => {
    toast.success("Content saved successfully!", {
      description: "All changes have been updated across the website.",
    });
  };

  const sections = [
    // { id: "contact", label: "Contact Page", icon: FiMail },
    { id: "faq", label: "FAQ Page", icon: FiHelpCircle },
    { id: "refund", label: "Refund Policy", icon: FaShield },
    { id: "privacy", label: "Privacy Policy", icon: FaFile },
    { id: "terms", label: "Terms & Conditions", icon: FaFile },
  ];

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#030a1d",
      borderRadius: "12px",
      color: "white",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(189,133,241,0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bd85f1",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#99a1af",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#bd85f1",
    },
  };

  return (
    <div className="space-y-6 h-screen bg-[#0a0d27] p-6 overflow-y-auto">
      {/* Info Card */}
      <Alert
        severity="info"
        icon={<FaInfo className="text-[#bd85f1]" />}
        sx={{
          background:
            "linear-gradient(to right, rgba(109, 29, 185, 0.2), rgba(189, 133, 241, 0.1))",
          border: "1px solid rgba(189, 133, 241, 0.3)",
          borderRadius: "16px",
          color: "white",
          "& .MuiAlert-message": {
            color: "white",
          },
        }}
      >
        <div>
          <p className="text-white font-sans text-sm mb-1">
            Edit content for all public-facing pages
          </p>
          <p className="text-[#99a1af] font-sans text-xs">
            Changes made here will be reflected across Contact, FAQ, Refund
            Policy, Privacy Policy, and Terms pages.
          </p>
        </div>
      </Alert>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <Chip
              key={section.id}
              icon={<Icon className="w-4 h-4" />}
              label={section.label}
              onClick={() => setActiveSection(section.id)}
              sx={{
                px: 2,
                py: 1.5,
                height: "auto",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                ...(isActive
                  ? {
                      background: "linear-gradient(to right, #6d1db9, #bd85f1)",
                      color: "white",
                      boxShadow: "0 8px 20px rgba(109, 29, 185, 0.3)",
                      "& .MuiChip-icon": {
                        color: "white",
                      },
                    }
                  : {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "#99a1af",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                      },
                      "& .MuiChip-icon": {
                        color: "#99a1af",
                      },
                    }),
              }}
            />
          );
        })}
      </div>

      {/* Contact Page Section */}
      {/* {activeSection === "contact" && (
        <ContactInfo
          cmsContent={cmsContent}
          setCmsContent={setCmsContent}
          textFieldStyles={textFieldStyles}
        />
      )} */}

      {/* FAQ Section */}
      {activeSection === "faq" && (
        <FAQ
          cmsContent={cmsContent}
          setCmsContent={setCmsContent}
          textFieldStyles={textFieldStyles}
        />
      )}

      {/* Refund Policy Section */}
      {activeSection === "refund" && <RefundPolicy />}

      {/* Privacy Policy Section */}
      {activeSection === "privacy" && <PrivacyPolicy />}

      {/* Terms & Conditions Section */}
      {activeSection === "terms" && <TermsAndConditions />}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<FaSave className="w-4 h-4" />}
          sx={{
            px: 3,
            py: 1,
            background: "linear-gradient(to right, #6d1db9, #bd85f1)",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "14px",
            boxShadow: "0 10px 40px rgba(109, 29, 185, 0.3)",
            "&:hover": {
              background: "linear-gradient(to right, #5b189b, #a66fd9)",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s",
          }}
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
