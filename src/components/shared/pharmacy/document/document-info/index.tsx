// 'use client'
// import { Typography } from '@/components/shared/typography'
// import React from 'react'
// //import { Typography } from '../../typography'

// const getStatusClasses = (status: string)=>{
//     switch(status){
//         case "Expires Soon":
//         return "bg-red text-white";
//         case "Validated":
//         return "bg-secondary-color text-white";
//         case "Pending":
//         return "bg-[#F2994A] text-white"
//         default:
//         return "bg-gray-200 text-gray-700";
//     }
// }

// const DocumentsInfo = () => {
//   return (
//     <div className='space-y-5 bg-white rounded-xl p-8'>
//       <div className='bg-white rounded-xl flex justify-between items-center px-3 py-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
//         <div className='space-y-2'>
//         <Typography className='font-bold'>License</Typography>
//         <Typography className='font-semibold'>License_2025.pdf</Typography>
//         <Typography className='text-desc-color'>Uploaded untill Oct 20, 2025</Typography>
//         </div>
//         <div className='w-[90px] cursor-pointer h-[30px] rounded-full bg-primary-color flex items-center justify-center'>
//             <Typography className='text-white'>Expires Soon</Typography>
//         </div>
//       </div>
//       <div className='bg-white rounded-xl flex justify-between items-center px-3 py-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
//         <div className='space-y-2'>
//         <Typography className='font-bold'>Certification</Typography>
//         <Typography className='font-semibold'>Pharmacist_Cert.pdf</Typography>
//         <Typography className='text-desc-color'>Validate untill Oct 20, 2025</Typography>
//         </div>
//         <div className='w-[90px] cursor-pointer h-[30px] rounded-full bg-secondary-color flex items-center justify-center'>
//             <Typography className='text-white'> Validated</Typography>
//         </div>
//       </div>
//       <div className='bg-white rounded-xl flex justify-between items-center px-3 py-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'>
//         <div className='space-y-2'>
//         <Typography className='font-bold'>Insurance ID</Typography>
//         <Typography className='font-semibold'>98231-HDS</Typography>
//         <Typography className='text-desc-color'> Expiration date: Valid until 31/12/2026</Typography>
//         </div>
//         <div className='w-[90px] cursor-pointer h-[30px] rounded-full bg-secondary-color2 flex items-center justify-center'>
//             <Typography className='text-white'>Pending</Typography>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DocumentsInfo
// 'use client'
// import { Typography } from '@/components/shared/typography'
// import React from 'react'

// const getStatusClasses = (status: string) => {
//   switch (status) {
//     case "Expires Soon":
//       return "bg-red text-white";
//     case "Validated":
//       return "bg-secondary-color text-white";
//     case "Pending":
//       return "bg-[#F2994A] text-white";
//     default:
//       return "bg-gray-200 text-gray-700";
//   }
// };

// // DOCUMENTS DATA ARRAY
// const documents = [
//   {
//     title: "License",
//     file: "License_2025.pdf",
//     desc: "Uploaded until Oct 20, 2025",
//     desc1:"Uploaded untill Oct 20, 2025",
//     desc2:"Uploaded untill Oct 20, 2025",
//     desc3:"Uploaded untill Oct 20, 2025",
//     status: "Expires Soon",
//   },
//   {
//     title: "Certification",
//     file: "Pharmacist_Cert.pdf",
//     desc: "Validate until Oct 20, 2025",
//     status: "Validated",
//   },
//   {
//     title: "Insurance ID",
//     file: "98231-HDS",
//     desc: "Expiration date: Valid until 31/12/2026",
//     status: "Pending",
//   },
// ];

// const DocumentsInfo = () => {
//   return (
//     <div className='space-y-5 bg-white rounded-xl p-8'>

//       {documents.map((doc, i) => (
//         <div
//           key={i}
//           className='bg-white rounded-xl flex justify-between items-center px-3 py-5 shadow-[0_0_10px_rgba(0,0,0,0.1)]'
//         >
//           {/* LEFT SIDE */}
//           <div className='space-y-2'>
//             <Typography className='font-bold'>{doc.title}</Typography>
//             <Typography className='font-semibold'>{doc.file}</Typography>
//             <Typography className='text-desc-color'>{doc.desc}</Typography>
//           </div>

//           {/* STATUS BADGE */}
//           <div
//             className={`px-3 py-2 cursor-pointer h-[30px] rounded-full flex items-center justify-center ${getStatusClasses(
//               doc.status
//             )}`}
//           >
//             <Typography className='text-white'>{doc.status}</Typography>
//           </div>
//         </div>
//       ))}

//     </div>
//   );
// };

// export default DocumentsInfo;

"use client";

import { Typography } from "@/components/shared/typography";
import React from "react";

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Expires Soon":
      return "bg-red text-white";
    case "Validated":
      return "bg-secondary-color text-white";
    case "Pending":
      return "bg-[#F2994A] text-white";
    default:
      return "bg-gray-300 text-gray-700";
  }
};

const documents = [
  {
    title: "License",
    file: "License_2025.pdf",
    uploaded: "Oct 20, 2025",
    verifiedBy: "Admin",
    verificationDate: "20/12/2025",
    expiration: "20/09/2024",
    status: "Expires Soon",
  },
  {
    title: "Certification",
    file: "Pharmacist_Cert.pdf",
    uploaded: "Oct 20, 2025",
    verifiedBy: "Admin",
    verificationDate: "20/12/2025",
    expiration: "20/09/2024",
    status: "Validated",
  },
  {
    title: "Insurance ID",
    file: "98231-HDS",
    uploaded: "Oct 20, 2025",
    verifiedBy: "Admin",
    verificationDate: "20/12/2025",
    expiration: "20/09/2024",
    status: "Pending",
  },
];

const DocumentsInfo = () => {
  return (
    <div className="space-y-6">
      {documents.map((doc, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] flex justify-between"
        >
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-1">
            <Typography className="font-bold text-[18px]">
              {doc.title}
            </Typography>

            <Typography className="font-semibold">{doc.file}</Typography>

            <Typography className="text-gray-500 text-sm">
              Uploaded on: {doc.uploaded}
            </Typography>

            <Typography className="text-gray-500 text-sm">
              Verified By: {doc.verifiedBy}
            </Typography>

            <Typography className="text-gray-500 text-sm">
              Verification Date: {doc.verificationDate}
            </Typography>

            <Typography className="text-gray-500 text-sm">
              Expiration: {doc.expiration}
            </Typography>

            {/* Links */}
            <div className="flex gap-4 pt-3 text-sm font-medium">
              <button className="text-primary-color hover:underline">
                Verify
              </button>
              <button className="text-primary-color hover:underline">
                Reject
              </button>
              <button className="text-primary-color hover:underline">
                Replace
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between items-end">
            {/* Status badge */}
            <span
              className={`${getStatusClasses(
                doc.status,
              )} px-4 py-2 rounded-full text-md font-semibold`}
            >
              {doc.status}
            </span>

            {/* Buttons */}
            <div className="flex gap-3 mt-16">
              <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 text-md font-medium">
                Download
              </button>

              <button className="px-4 py-2 bg-primary-color rounded-lg text-white text-md font-medium">
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsInfo;
