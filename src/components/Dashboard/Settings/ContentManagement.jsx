import { useState } from "react";
import { TextField, Button, Chip, Alert, Tabs, Tab } from "@mui/material";
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
  const [faqTab, setFaqTab] = useState("community");

  const sections = [
    // { id: "contact", label: "Contact Page", icon: FiMail },
    { id: "faq", label: "FAQ Page", icon: FiHelpCircle },
    // { id: "refund", label: "Refund Policy", icon: FaShield },
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

      {/* FAQ Section with Tabs */}
      {activeSection === "faq" && (
        <div className="space-y-6">
          <Tabs
            value={faqTab}
            onChange={(e, newValue) => setFaqTab(newValue)}
            sx={{
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              "& .MuiTabs-indicator": {
                backgroundColor: "#bd85f1",
              },
            }}
          >
            <Tab
              label="Community FAQ"
              value="community"
              sx={{
                color: "#99a1af",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#bd85f1",
                },
              }}
            />
            <Tab
              label="Membership FAQ"
              value="membership"
              sx={{
                color: "#99a1af",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#bd85f1",
                },
              }}
            />
          </Tabs>

          <FAQ
            cmsContent={cmsContent}
            setCmsContent={setCmsContent}
            textFieldStyles={textFieldStyles}
            category={faqTab}
          />
        </div>
      )}

      {/* Refund Policy Section */}
      {/* {activeSection === "refund" && <RefundPolicy />} */}

      {/* Privacy Policy Section */}
      {activeSection === "privacy" && <PrivacyPolicy />}

      {/* Terms & Conditions Section */}
      {activeSection === "terms" && <TermsAndConditions />}
    </div>
  );
}
