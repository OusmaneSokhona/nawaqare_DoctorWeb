"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useRouter } from "next/navigation";

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800 text-right">{value || "-"}</span>
  </div>
);

const Toggle = ({ checked }: { checked: boolean }) => (
  <div
    className={`w-9 h-5 rounded-full relative transition ${
      checked ? "bg-blue-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
        checked ? "right-0.5" : "left-0.5"
      }`}
    />
  </div>
);

export default function PersonalInformation() {
  const router = useRouter();
  return (
    <div className="rounded-2xl w-full">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <Typography size="h4" className="font-semibold">
          Personal Information
        </Typography>

        <Button
          className="
      bg-primary-color
      text-white
      rounded-lg
      text-sm
      px-1
      sm:px-4
      py-2
      w-full
      sm:w-auto
      sm:min-w-[180px]
    "
          onClick={() => router.push(`/profile/edit`)}
        >
          Edit Personal Info
        </Button>
      </div>

      {/* IDENTITY */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Identity</Typography>
        <Row label="Full Name" value="Dr. Daniel Lee" />
        <Row label="Date of birth" value="02/Sep/2025" />
        <Row label="ID Number" value="NID-SN-98374521" />
        <Row label="ID Type" value="Numeric" />
        <Row label="Expiry date" value="12/Sep/2022" />
      </section>

      {/* CONTACT */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Contact</Typography>
        <Row label="Email" value="Abc@gmail.com" />
        <Row label="Phone" value="+1 234 567 890" />
        <Row label="WhatsApp" value="+1 234 567 890" />
        <Row label="City" value="Lahore" />
        <Row label="Area" value="Johar Town" />
        <Row label="Address" value="67 avenue de Paris, 75000 Paris" />
      </section>

      {/* DEMOGRAPHICS */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Demographics</Typography>
        <Row label="Gender" value="Female" />
        <Row label="Nationality" value="Islam" />
      </section>

      {/* PROFILE DISPLAY */}
      <section className="mb-6">
        <Typography className="font-semibold mb-3">Profile Display</Typography>

        <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
          <span>Male</span>
          <Toggle checked={false} />
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
          <span>Female</span>
          <Toggle checked />
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
          <span>Public Profile</span>
          <Toggle checked />
        </div>
      </section>

      {/* LANGUAGE */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Language Spoken</Typography>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium">
            Urdu
          </span>
          <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium">
            English
          </span>
        </div>
      </section>

      {/* ABOUT */}
      <section>
        <Typography className="font-semibold text-gray-400 mb-2">
          About Me
        </Typography>
        <p className="text-sm text-gray-600 leading-relaxed">
          Dr. David Patel, a dedicated cardiologist, brings a wealth of
          experience to Golden Gate Cardiology Center in Golden Gate, CA.
        </p>
      </section>
    </div>
  );
}
