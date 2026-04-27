"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { Icon } from "@iconify/react";

type DocStatus = "uploaded" | "rejected" | "expired";

interface DocItem {
  id: number;
  title: string;
  status: DocStatus;
  note?: string;
  date: string;
}

const initialDocuments: DocItem[] = [
  { id: 1, title: "National Identity", status: "uploaded", date: "12/03/2025" },
  {
    id: 2,
    title: "Medical Diploma.JPEG",
    status: "uploaded",
    date: "12/03/2025",
  },
  {
    id: 3,
    title: "Registration Certificate.JPEG",
    status: "uploaded",
    date: "12/03/2025",
  },
  {
    id: 4,
    title: "Professional Photo",
    status: "rejected",
    note: "image is blur",
    date: "12/03/2025",
  },
  {
    id: 5,
    title: "Liability Insurance Proof",
    status: "expired",
    note: "12/sep/2020",
    date: "12/03/2025",
  },
  {
    id: 6,
    title: "Bank Details Proof",
    status: "expired",
    note: "12/sep/2020",
    date: "12/03/2025",
  },
];

const StatusText = ({ status, note }: { status: DocStatus; note?: string }) => {
  if (status === "uploaded")
    return <span className="text-green-600 text-xs">✓ Uploaded</span>;

  if (status === "rejected")
    return <span className="text-red-500 text-xs">✕ Rejected · {note}</span>;

  return <span className="text-orange-500 text-xs">⚠ Expired · {note}</span>;
};

export default function DocumentsAndRevalidation() {
  const router = useRouter();
  const [documents, setDocuments] = useState(initialDocuments);

  const handleDelete = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="rounded-2xl p-4 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <Typography size="h4" className="font-semibold">
          Document Info
        </Typography>

        <Button
          onClick={() => router.push("/profile/document-info/edit")}
          className="bg-primary-color text-white rounded-lg px-5 text-sm w-full sm:w-auto"
        >
          Re-upload Medical License
        </Button>
      </div>

      {/* DOCUMENT LIST */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between items-center bg-white border rounded-lg px-4 py-3"
          >
            <div className="space-y-1">
              <Typography className="font-semibold text-sm">
                {doc.title}
              </Typography>
              <StatusText status={doc.status} note={doc.note} />
              <div className="text-xs text-gray-400">{doc.date}</div>
            </div>

            <div className="flex gap-3">
              <Icon
                icon="mdi:pencil-outline"
                className="text-primary-color cursor-pointer"
                width={18}
                onClick={() => router.push("/profile/document-info/reupload")}
              />
              <Icon
                icon="mdi:delete-outline"
                className="text-red cursor-pointer"
                width={18}
                onClick={() => handleDelete(doc.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* INFO ALERT */}
      <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-700">
        <Icon icon="mdi:alert-circle-outline" width={18} />
        Documents are encrypted and access is logged.
      </div>

      {/* REVALIDATION */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
        <Typography size="h4" className="font-semibold">
          Revalidation
        </Typography>
        <Button className="bg-primary-color text-white rounded-lg px-5 w-full sm:w-auto">
          Revalidate Data
        </Button>
      </div>

      {/* CIRCLE */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-24 rounded-full border-[10px] border-orange-400 flex items-center justify-center">
          <span className="text-sm font-semibold">30 Days</span>
        </div>
        <span className="text-xs text-gray-500">
          Verification expires in 30 days
        </span>
      </div>

      {/* WARNING */}
      <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm text-yellow-800">
        <Icon icon="mdi:alert" width={18} />
        Your profile verification expires in 30 days. Please revalidate your
        information.
      </div>
    </div>
  );
}
