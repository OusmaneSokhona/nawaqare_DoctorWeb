"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

type Props = {
  open: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend?: () => void;
};

export default function WhatsappVerificationModal({
  open,
  email,
  onClose,
}: Props) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  /* ===== TIMER ===== */
  useEffect(() => {
    if (!open) return;
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, open]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const code = otp.join("");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-gray-200 w-[95%] max-w-xl rounded-xl p-6 relative">
        {/* CLOSE */}
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
        <Typography size="h4" className="font-bold text-left mb-1 px-3">
          Verification
        </Typography>

        <Typography className="text-sm text-gray-500 text-left mb-6 px-3">
          A 6-digit code has been sent to WhatsApp{" "}
          <span className="font-semibold text-gray-700">{email}</span>
        </Typography>

        {/* OTP BOXES */}
        <div className="flex justify-center gap-5 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              //   ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                w-12 h-12
                text-center text-lg font-semibold
                bg-white
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:border-[#2F80ED]
              "
            />
          ))}
        </div>

        {/* TIMER */}
        <Typography className="text-center text-sm font-semibold">
          00:{timeLeft.toString().padStart(2, "0")}
        </Typography>

        <Typography className="text-center text-xs text-red mb-1">
          Code expires in 00:{timeLeft.toString().padStart(2, "0")}
        </Typography>

        <Typography className="text-center text-xs text-gray-500 mb-4">
          Didn’t receive code?{" "}
          <span className="underline font-semibold">Try another method</span>
        </Typography>

        {/* VERIFY */}
        <Button
          disabled={code.length !== 6}
          onClick={() => router.push("/reset-password")}
          className="
            w-full
            bg-[#2F80ED]
            hover:bg-[#2F80ED]
            text-white
            rounded-lg
          "
        >
          Verify & Continue
        </Button>

        {/* RESEND */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            disabled={timeLeft > 0}
            onClick={() => {
              setTimeLeft(30);
              setOtp(Array(6).fill(""));
            }}
            className={`flex items-center gap-1 text-sm ${
              timeLeft > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600"
            }`}
          >
            <Icon icon="mdi:whatsapp" className="text-green-600" width={16} />
            <span className="text-gray-500 underline">Re-send to Whatsapp</span>
          </button>

          <button className="text-xs text-[#2F80ED] font-semibold underline">
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
}
