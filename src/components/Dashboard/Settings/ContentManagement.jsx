import { useState } from "react";
import { TextField, Button, Chip, Alert } from "@mui/material";
import { FaGlobe, FaInfo, FaSave } from "react-icons/fa";
import { FaFile, FaShield } from "react-icons/fa6";
import { FiHelpCircle, FiMail } from "react-icons/fi";
import { toast } from "sonner";
import { demoCmsContent } from "../../../../public/data/cmdData";
import FAQ from "./ContentManagement/FAQ";

export function ContentManagement() {
  const [activeSection, setActiveSection] = useState("contact");
  const [cmsContent, setCmsContent] = useState(demoCmsContent);

  const handleSave = () => {
    toast.success("Content saved successfully!", {
      description: "All changes have been updated across the website.",
    });
  };

  const sections = [
    { id: "contact", label: "Contact Page", icon: FiMail },
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
      {activeSection === "contact" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
                <FiMail className="w-5 h-5 text-[#bd85f1]" />
              </div>
              <h3 className="text-xl text-white font-display">
                Contact Information
              </h3>
            </div>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={cmsContent.contactEmail}
                onChange={(e) =>
                  setCmsContent({
                    ...cmsContent,
                    contactEmail: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Contact Phone"
                type="tel"
                value={cmsContent.contactPhone}
                onChange={(e) =>
                  setCmsContent({
                    ...cmsContent,
                    contactPhone: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Physical Address"
                value={cmsContent.contactAddress}
                onChange={(e) =>
                  setCmsContent({
                    ...cmsContent,
                    contactAddress: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Chat Support Text"
                value={cmsContent.contactChatText}
                onChange={(e) =>
                  setCmsContent({
                    ...cmsContent,
                    contactChatText: e.target.value,
                  })
                }
                sx={textFieldStyles}
              />
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {activeSection === "faq" && (
        <FAQ
          cmsContent={cmsContent}
          setCmsContent={setCmsContent}
          textFieldStyles={textFieldStyles}
        />
      )}

      {/* Refund Policy Section */}
      {activeSection === "refund" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
                <FaShield className="w-5 h-5 text-[#bd85f1]" />
              </div>
              <h3 className="text-xl text-white font-display">Refund Policy</h3>
            </div>
            <div className="space-y-6">
              {Object.entries(cmsContent.refundPolicy).map(([key, section]) => (
                <div key={key} className="space-y-3">
                  <TextField
                    fullWidth
                    label={`${section.title} - Title`}
                    value={section.title}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        refundPolicy: {
                          ...cmsContent.refundPolicy,
                          [key]: {
                            ...section,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={`${section.title} - Content`}
                    value={section.content}
                    onChange={(e) =>
                      setCmsContent({
                        ...cmsContent,
                        refundPolicy: {
                          ...cmsContent.refundPolicy,
                          [key]: {
                            ...section,
                            content: e.target.value,
                          },
                        },
                      })
                    }
                    sx={textFieldStyles}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Section */}
      {activeSection === "privacy" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
                <FaFile className="w-5 h-5 text-[#bd85f1]" />
              </div>
              <h3 className="text-xl text-white font-display">
                Privacy Policy
              </h3>
            </div>
            <div className="space-y-4">
              {cmsContent.privacyPolicy.map((section, index) => (
                <div
                  key={section.id}
                  className="p-4 bg-white/5 rounded-xl space-y-3"
                >
                  <TextField
                    fullWidth
                    label={`Section ${index + 1} Title`}
                    value={section.title}
                    onChange={(e) => {
                      const updated = [...cmsContent.privacyPolicy];
                      updated[index].title = e.target.value;
                      setCmsContent({
                        ...cmsContent,
                        privacyPolicy: updated,
                      });
                    }}
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Content"
                    value={section.content}
                    onChange={(e) => {
                      const updated = [...cmsContent.privacyPolicy];
                      updated[index].content = e.target.value;
                      setCmsContent({
                        ...cmsContent,
                        privacyPolicy: updated,
                      });
                    }}
                    sx={textFieldStyles}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Section */}
      {activeSection === "terms" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
                <FaFile className="w-5 h-5 text-[#bd85f1]" />
              </div>
              <h3 className="text-xl text-white font-display">
                Terms & Conditions
              </h3>
            </div>
            <div className="space-y-4">
              {cmsContent.termsConditions.map((section, index) => (
                <div
                  key={section.id}
                  className="p-4 bg-white/5 rounded-xl space-y-3"
                >
                  <TextField
                    fullWidth
                    label={`Section ${index + 1} Title`}
                    value={section.title}
                    onChange={(e) => {
                      const updated = [...cmsContent.termsConditions];
                      updated[index].title = e.target.value;
                      setCmsContent({
                        ...cmsContent,
                        termsConditions: updated,
                      });
                    }}
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Content"
                    value={section.content}
                    onChange={(e) => {
                      const updated = [...cmsContent.termsConditions];
                      updated[index].content = e.target.value;
                      setCmsContent({
                        ...cmsContent,
                        termsConditions: updated,
                      });
                    }}
                    sx={textFieldStyles}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<FaSave className="w-4 h-4" />}
          sx={{
            px: 3,
            py: 1.5,
            background: "linear-gradient(to right, #6d1db9, #bd85f1)",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "1rem",
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
