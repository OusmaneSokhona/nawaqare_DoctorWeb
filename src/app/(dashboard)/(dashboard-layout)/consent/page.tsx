"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { axiosClient } from "@/api/base";

// Load Quill dynamically (avoids SSR issues)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Quill toolbar config
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export default function ConsentPage() {
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load existing consent on mount
  useEffect(() => {
    axiosClient
      .get("/api/v1/access-control/me/consents")
      .then((res) => {
        const data = res.data?.data ?? res.data;
        const general = Array.isArray(data)
          ? data.find((c: any) => c.type === "general" || c.type === "GENERAL")
          : null;
        if (general?.content) setDescription(general.content);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      await axiosClient.put("/api/v1/access-control/me/consents/general", {
        content: description,
        type: "general",
      });
      setSaved(true);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to save consent.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl">
      <Typography size="h3" as="h3">
        Consent
      </Typography>
      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm mb-4">
          Consent updated successfully.
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
          {error}
        </div>
      )}
      <div className="containers rounded-md bg-white p-6 shadow-sm">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Description Box */}
          <div>
            <label className="block mb-2 font-medium">Description *</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              className="rounded-md h-[200px] mb-[40px]"
            />
          </div>
          <div className="flex  sm:flex-row items-center max-md:items-start gap-2 pt-8">
            <Button
              variant="outlined"
              size="medium"
              className=" text-secondary-color"
              // onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="medium"
              className="w-[191px] text-white rounded-xl bg-primary-color"
              disabled={saving}
            >
              {saving ? "Saving..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
