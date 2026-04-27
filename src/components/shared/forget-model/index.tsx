"use client";

import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";

type Props = {
  open: boolean;
  onClose: () => void;
  onEmailVerify: () => void;
  onWhatsappVerify?: () => void;
};

export default function ForgotPasswordModal({
  open,
  onClose,
  onEmailVerify,
  onWhatsappVerify,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-gray-200 w-[95%] max-w-xl rounded-xl p-6 relative">
        {/* CLOSE ICON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <Icon
            icon="mdi:cross-circle"
            className="text-primary-color"
            width={20}
          />
        </button>

        {/* HEADER */}
        <Typography size="h4" className="font-bold mb-2">
          Forgot Password?
        </Typography>

        <Typography className="text-gray-500 mb-6">
          Then Let's Submit Password Reset.
        </Typography>

        {/* OPTIONS */}
        <div className="space-y-4">
          {/* EMAIL */}
          <button
            onClick={onEmailVerify}
            className="w-full border rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 bg-white"
          >
            <div className="bg-gray-200 py-2 px-2 rounded-md">
              <Icon icon="mdi:email-outline" width={26} />
            </div>
            <div className="text-left">
              <p className="font-semibold">Verification via Email</p>
              <p className="text-sm text-gray-500">
                We will send a code to your email
              </p>
            </div>
          </button>

          {/* WHATSAPP */}
          <button
            onClick={onWhatsappVerify}
            className="w-full border rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 bg-white"
          >
            <div className="bg-gray-200 py-2 px-2 rounded-md">
              <Icon
                icon="mdi:whatsapp"
                width={26}
                className="text-primary-color"
              />
            </div>
            <div className="text-left">
              <p className="font-semibold">Verification via WhatsApp</p>
              <p className="text-sm text-gray-500">
                Get OTP on your WhatsApp number
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
