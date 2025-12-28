import { TextField } from "@mui/material";
import React from "react";
import { FiMail } from "react-icons/fi";

export default function ContactInfo({
  cmsContent,
  setCmsContent,
  textFieldStyles,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#bd85f1]/20 to-[#6d1db9]/10 rounded-xl flex items-center justify-center">
            <FiMail className="w-5 h-5 text-[#bd85f1]" />
          </div>
          <h3 className="text-xl text-white font-krona">
            Contact Information
          </h3>
        </div>
        <div className="flex flex-col gap-5">
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
  );
}
