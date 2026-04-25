"use client";

import React, { useRef, useState } from "react";

export default function ValidationInfo() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="p-6 rounded-xl">
      {/* License Details */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Validation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-md text-gray-600">
            Current Validation Status
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="Pending"
          />
        </div>

        <div>
          <label className="text-md text-gray-600">Submitted On</label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="xyz"
          />
        </div>

        <div>
          <label className="text-md text-gray-600">Validated On</label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="xyz"
          />
        </div>

        <div>
          <label className="text-md text-gray-600">Validated By</label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="xyz"
          />
        </div>
      </div>

      {/* Business Registration */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
        Review Comments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-md text-gray-600">Admin Comment</label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="xyz"
          />
        </div>

        <div>
          <label className="text-md text-gray-600">Notes</label>
          <input
            type="text"
            className="w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg"
            placeholder="xyz"
          />
        </div>

        <div className="md:col-span-2">
          {/* <label className="text-sm text-gray-600">
            Upload Business Registration Document
          </label> */}

          {/* CLICKABLE BOX */}
          <div
            onClick={handleFileClick}
            className="flex items-center gap-3 w-full mt-1 p-3 bg-[#F5F7FA] border border-gray-200 rounded-lg cursor-pointer hover:bg-[#eef1f5]"
          >
            <span className="text-gray-700">
              {uploadedFile ? `📄 ${uploadedFile}` : "Attach Additional Notes"}
            </span>
          </div>

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.png,.jpeg"
          />
        </div>
      </div>
    </div>
  );
}
