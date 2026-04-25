// "use client";

// import React from "react";
// import { Typography } from "../../typography";
// import { Icon } from "@iconify/react";

// /* ================= TYPES ================= */
// type DocumentStatus = "Draft" | "Signed" | "Send";

// interface DocumentItem {
//   title: string;
//   date: string;
//   status: DocumentStatus;
//   icon:string;
// }

// /* ================= STATUS CONFIG ================= */
// const statusConfig: Record<
//   DocumentStatus,
//   {
//     badgeClass: string;
//     actionText: string;
//   }
// > = {
//   Draft: {
//     badgeClass: "bg-[#F2994A] text-white",
//     actionText: "Add",
//   },
//   Signed: {
//     badgeClass: "bg-secondary-color text-white",
//     actionText: "Edit",
//   },
//   Send: {
//     badgeClass: "bg-primary-color text-white",
//     actionText: "View",
//   },
// };

// /* ================= DATA ================= */
// const documents: DocumentItem[] = [
//   {
//     title: "Blood Test",
//     date: "Lab . New . 23 Jan 2025",
//     status: "Draft",
//     icon:'ri:test-tube-line',
//   },
//   {
//     title: "Chest X-ray",
//     date: "Patient . Reviewed . 20 Jan 2025",
//     status: "Signed",
//     icon:'fluent:xray-20-regular',
//   },
//   {
//     title: "Referral Letter",
//     date: "Dr. smith . Reviewed . 23 Jan 2025",
//     status: "Send",
//     icon:'ri:test-tube-line',
//   },

// ];

// /* ================= COMPONENT ================= */
// export default function DocumentsPlan() {
//   return (
//     <div className="p-6">
//         <Typography size='lg' className='text-[#2C2C2C] font-semibold'>All patient action in one place</Typography>
//         <div className="mt-5">
//             <Typography size='h5' className='text-[#2C2C2C] font-semibold'>Recent Document</Typography>
//             <div className=" rounded-xl mt-2 border p-4">
//       {documents.map((item, index) => {
//         const config = statusConfig[item.status];

//         return (
//           <div
//             key={index}
//             className="flex items-start justify-between border-b  last:border-b-0 mt-2 pb-3 last:pb-0"
//           >
//             {/* LEFT CONTENT */}
//             <div>
//               <div className="flex items-center gap-4">
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={item.icon} width='20' height='20'/>
//                   <p className="text-lg font-medium text-[#2C2C2C]">
//                   {item.title}
//                 </p>
//                 </div>
//               </div>

//               <p className=" flex gap-1 items-center text-gray-400 mt-1"> <span><Icon className="text-secondary-color" icon='hugeicons:tick-02' width='20' height='20'/></span> {item.date}</p>
//             </div>

//             <Icon className="text-primary-color" icon='mdi:eye' width='20' height='20'/>
//           </div>
//         );
//       })}
//     </div>
//         </div>
//         <div className="mt-4">
//             <Typography size='h5' className='text-[#2C2C2C] font-semibold'>Upload Report</Typography>
//             <div className="pt-4">
//                 <Typography className="pb-2 text-[#2C2C2C] font-semibold">Upload Report</Typography>
//                 <div className="bg-white cursor-pointer rounded-xl py-4 flex gap-2 flex-col items-center justify-center shadow">
//                     <Icon className="text-primary-color" icon='material-symbols:file-upload' width='28' height='28'/>
//                     <Typography className="text-[#4F4F4F] font-medium">Upload your Report</Typography>
//                 </div>
//             </div>
//         </div>
//         <div className="flex gap-2 items-end justify-end max-md:justify-start mt-8 max-md:flex-col max-md:items-start">
//             <button className="text-[#1C2A3A] w-[150px] h-[37px] flex items-center cursor-pointer justify-center bg-[#EAE6EB] rounded-xl">Cancel</button>
//             <button className="text-white w-[150px] h-[37px] flex items-center justify-center cursor-pointer bg-primary-color rounded-xl">Upload report</button>
//         </div>
//     </div>
//   );
// }
"use client";

import React, { useRef, useState } from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";

/* ================= TYPES ================= */
type DocumentStatus = "Draft" | "Signed" | "Send";

interface DocumentItem {
  title: string;
  date: string;
  status: DocumentStatus;
  icon: string;
}

/* ================= STATUS CONFIG ================= */
const statusConfig: Record<
  DocumentStatus,
  {
    badgeClass: string;
    actionText: string;
  }
> = {
  Draft: {
    badgeClass: "bg-[#F2994A] text-white",
    actionText: "Add",
  },
  Signed: {
    badgeClass: "bg-secondary-color text-white",
    actionText: "Edit",
  },
  Send: {
    badgeClass: "bg-primary-color text-white",
    actionText: "View",
  },
};

/* ================= DATA ================= */
const documents: DocumentItem[] = [
  {
    title: "Blood Test",
    date: "Lab . New . 23 Jan 2025",
    status: "Draft",
    icon: "ri:test-tube-line",
  },
  {
    title: "Chest X-ray",
    date: "Patient . Reviewed . 20 Jan 2025",
    status: "Signed",
    icon: "fluent:xray-20-regular",
  },
  {
    title: "Referral Letter",
    date: "Dr. smith . Reviewed . 23 Jan 2025",
    status: "Send",
    icon: "ri:test-tube-line",
  },
];

/* ================= COMPONENT ================= */
export default function DocumentsPlan() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /* open file picker */
  const handleUploadDivClick = () => {
    fileInputRef.current?.click();
  };

  /* file select */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  /* upload action */
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    // 🔥 API / FormData yahan lagegi
    console.log("Uploading file:", selectedFile);

    alert(`File "${selectedFile.name}" uploaded successfully`);
  };

  return (
    <div className="p-6">
      <Typography size="lg" className="text-[#2C2C2C] font-semibold">
        All patient action in one place
      </Typography>

      {/* ================= RECENT DOCUMENT ================= */}
      <div className="mt-5">
        <Typography size="h5" className="text-[#2C2C2C] font-semibold">
          Recent Document
        </Typography>

        <div className="rounded-xl mt-2 border p-4">
          {documents.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b last:border-b-0 mt-2 pb-3 last:pb-0"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1 items-center">
                    <Icon
                      className="text-primary-color"
                      icon={item.icon}
                      width="20"
                      height="20"
                    />
                    <p className="text-lg font-medium text-[#2C2C2C]">
                      {item.title}
                    </p>
                  </div>
                </div>

                <p className="flex gap-1 items-center text-gray-400 mt-1">
                  <Icon
                    className="text-secondary-color"
                    icon="hugeicons:tick-02"
                    width="20"
                    height="20"
                  />
                  {item.date}
                </p>
              </div>

              <Icon
                className="text-primary-color"
                icon="mdi:eye"
                width="20"
                height="20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= UPLOAD ================= */}
      <div className="mt-4">
        <Typography size="h5" className="text-[#2C2C2C] font-semibold">
          Upload Report
        </Typography>

        <div className="pt-4">
          <Typography className="pb-2 text-[#2C2C2C] font-semibold">
            Upload Report
          </Typography>

          {/* CLICKABLE UPLOAD DIV */}
          <div
            onClick={handleUploadDivClick}
            className="bg-white cursor-pointer rounded-xl py-4 flex gap-2 flex-col items-center justify-center shadow"
          >
            <Icon
              className="text-primary-color"
              icon="material-symbols:file-upload"
              width="28"
              height="28"
            />
            <Typography className="text-[#4F4F4F] font-medium">
              {selectedFile ? selectedFile.name : "Upload your Report"}
            </Typography>
          </div>

          {/* HIDDEN FILE INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-2 items-end justify-end max-md:gap-3 max-md:justify-start mt-8 max-md:flex-col max-md:items-start">
        <button className="text-[#1C2A3A] w-[150px] max-md:w-full h-[37px] bg-[#EAE6EB] rounded-xl">
          Cancel
        </button>

        <button
          onClick={handleUpload}
          className="text-white w-[150px] h-[37px] max-md:w-full bg-primary-color rounded-xl"
        >
          Upload report
        </button>
      </div>
    </div>
  );
}
