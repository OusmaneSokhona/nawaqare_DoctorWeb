"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, UserProfile } from "@/api/service/auth";

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
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data))
      .catch(() => {});
  }, []);

  const p = user?.profile;
  const fullName = p
    ? `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim()
    : "—";
  const dob = p?.date_of_birth
    ? new Date(p.date_of_birth).toLocaleDateString("fr-FR")
    : "—";
  const languages: string[] = p?.languages ?? [];

  return (
    <div className="rounded-2xl w-full">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <Typography size="h4" className="font-semibold">
          Personal Information
        </Typography>
        <Button
          className="bg-primary-color text-white rounded-lg text-sm px-1 sm:px-4 py-2 w-full sm:w-auto sm:min-w-[180px]"
          onClick={() => router.push(`/profile/edit`)}
        >
          Edit Personal Info
        </Button>
      </div>

      {/* IDENTITY */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Identity</Typography>
        <Row label="Full Name" value={fullName} />
        <Row label="Date of birth" value={dob} />
        <Row label="ID Number" value={p?.id_number} />
        <Row label="ID Type" value={p?.id_type} />
        <Row label="Expiry date" value={p?.id_expiry} />
      </section>

      {/* CONTACT */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Contact</Typography>
        <Row label="Email" value={user?.email} />
        <Row label="Phone" value={user?.phone} />
        <Row label="WhatsApp" value={p?.phone_whatsapp} />
        <Row label="City" value={p?.city} />
        <Row label="Area" value={p?.area} />
        <Row label="Address" value={p?.address} />
      </section>

      {/* DEMOGRAPHICS */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Demographics</Typography>
        <Row label="Gender" value={p?.gender} />
        <Row label="Nationality" value={p?.nationality} />
      </section>

      {/* PROFILE DISPLAY */}
      <section className="mb-6">
        <Typography className="font-semibold mb-3">Profile Display</Typography>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
          <span>Public Profile</span>
          <Toggle checked={user?.is_active ?? false} />
        </div>
      </section>

      {/* LANGUAGE */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Language Spoken</Typography>
        {languages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        ) : (
          <Typography size="sm" className="text-gray-400">
            No languages set
          </Typography>
        )}
      </section>

      {/* ABOUT */}
      {p?.about && (
        <section>
          <Typography className="font-semibold text-gray-400 mb-2">
            About Me
          </Typography>
          <p className="text-sm text-gray-600 leading-relaxed">{p.about}</p>
        </section>
      )}
    </div>
  );
}
