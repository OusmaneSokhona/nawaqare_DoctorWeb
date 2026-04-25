"use client";

import { useRouter } from "next/navigation";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: string | React.ReactNode;
}) => (
  <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-400">{value || "-"}</span>
  </div>
);

export default function ProfessionalInfo() {
  const router = useRouter();

  return (
    <div className="">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <Typography size="h4" className="font-semibold">
          Professional Info
        </Typography>

        <Button
          onClick={() => router.push("/profile/personal-info/edit")}
          className="
      bg-primary-color
      text-white
      rounded-lg
      text-sm
      px-4
      py-2
      w-full
      sm:w-auto
      sm:min-w-[190px]
    "
        >
          Edit Professional Info
        </Button>
      </div>

      {/* LICENSING */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">Licensing</Typography>
        <Row label="License number" value="MA-PK-457621" />
        <Row label="Registration date" value="15 March 2018" />
        <Row label="Issuing authority" value="Docote" />
        <Row label="Expiry date" value="15 March 2018" />
        <Row
          label="Status"
          value={
            <span className="px-3 py-1 text-xs rounded-lg bg-orange-400 text-white">
              Pending
            </span>
          }
        />
      </section>

      {/* PRACTICE INFO */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">
          Practice Information
        </Typography>
        <Row label="Specialty (primary)" value="Cardiology" />
        <Row label="Secondary specialties" value="Cardiology" />
        <Row label="Place of Practice" value="Allied Hospital, Faisalabad" />
        <Row label="Years of experience" value="7 Year" />
        <Row label="Places of practice" value="7 Year" />
      </section>

      {/* CONSULTATION */}
      <section className="mb-6">
        <Typography className="font-semibold mb-2">
          Practice Information
        </Typography>
        <Row label="Consultation types" value="Video" />
        <Row label="Fees per type" value="$30" />

        <div className="pt-2">
          <span className="text-sm text-blue-600 font-medium cursor-pointer underline text-primary-color">
            Check Availability
          </span>
        </div>
      </section>

      <p className="text-xs text-gray-500">
        <span className="text-black">Note:</span> These details appear on your
        public profile.
      </p>
    </div>
  );
}
