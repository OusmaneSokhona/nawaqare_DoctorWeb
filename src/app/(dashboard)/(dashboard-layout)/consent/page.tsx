"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Description:", description);
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl">
      <Typography size="h3" as="h3">
        Consent
      </Typography>
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
              // variant="primary"
              size="medium"
              className="w-[191px] text-white rounded-xl bg-primary-color"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
