// import React from "react";
// import { Typography } from "../../typography";
// import Image from "next/image";

// const docs = [
//   // {
//   //   title: "Doctor Picture",
//   //   img: "/assets/svg/doctor.svg",
//   // },
//   // {
//   //   title: "Medical License",
//   //   img: "/assets/svg/mLicense.svg",
//   // },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
// ];

// const docs1 = [
//   // {
//   //   title: "Doctor Picture",
//   //   img: "/assets/svg/doctor.svg",
//   // },
//   // {
//   //   title: "Medical License",
//   //   img: "/assets/svg/mLicense.svg",
//   // },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
// ];

// const docs2 = [
//   // {
//   //   title: "Doctor Picture",
//   //   img: "/assets/svg/doctor.svg",
//   // },
//   // {
//   //   title: "Medical License",
//   //   img: "/assets/svg/mLicense.svg",
//   // },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
// ];

// const Documents = () => {
//   return (
//     <div className="p-8 bg-white rounded-xl  max-md:h-auto">
//       <div className="">
//         <div className="space-y-2">
//         <Typography size='h5' className="">Identity Doc</Typography>
//          <div className="flex flex-wrap gap-5">
//          {docs.map((doc, i) => (
//         <div
//           key={i}
//           className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[240px]  max-md:h-full rounded-2xl p-4 space-y-6 max-sm:w-full"
//         >
//           <Typography className="font-semibold">{doc.title}</Typography>
//           <Image src={doc.img} width={200} height={80} alt={doc.title} />
//           <div className="space-y-2">
//             <Typography className="text-desc-color">{doc.date}</Typography>
//             <Typography  className="text-desc-color">{doc.exp}</Typography>
//             <Typography  className="text-desc-color">{doc.update}</Typography>
//             <Typography className="text-primary-color underline">View Full Document</Typography>
//           </div>
//         </div>
//       ))}
//       </div>
//       </div>
//       <div className="space-y-2">
//         <Typography size='h5' className="">Identity Doc1</Typography>
//          <div className="flex flex-wrap gap-5">
//          {docs1.map((doc, i) => (
//         <div
//           key={i}
//           className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[240px]  max-md:h-full rounded-2xl p-4 space-y-6 max-sm:w-full"
//         >
//           <Typography className="font-semibold">{doc.title}</Typography>
//           <Image src={doc.img} width={200} height={80} alt={doc.title} />
//           <div className="space-y-2">
//             <Typography className="text-desc-color">{doc.date}</Typography>
//             <Typography  className="text-desc-color">{doc.exp}</Typography>
//             <Typography  className="text-desc-color">{doc.update}</Typography>
//             <Typography className="text-primary-color underline">View Full Document</Typography>
//           </div>
//         </div>
//       ))}
//       </div>
//       </div>
//       <div className="space-y-2">
//         <Typography size='h5' className="">Identity Doc2</Typography>
//          <div className="flex flex-wrap gap-5">
//          {docs2.map((doc, i) => (
//         <div
//           key={i}
//           className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[240px]  max-md:h-full rounded-2xl p-4 space-y-6 max-sm:w-full"
//         >
//           <Typography className="font-semibold">{doc.title}</Typography>
//           <Image src={doc.img} width={200} height={80} alt={doc.title} />
//           <div className="space-y-2">
//             <Typography className="text-desc-color">{doc.date}</Typography>
//             <Typography  className="text-desc-color">{doc.exp}</Typography>
//             <Typography  className="text-desc-color">{doc.update}</Typography>
//             <Typography className="text-primary-color underline">View Full Document</Typography>
//           </div>
//         </div>
//       ))}
//       </div>
//       </div>
//       </div>

//     </div>
//   );
// };

// export default Documents;
// 'use client'
// import React from "react";
// import { Typography } from "../../typography";
// import Image from "next/image";

// const docs = [
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     date:"Validation Date : 12 Feb 2025 ",
//     exp:"Expiration Date : 31 Mar 2025",
//     update:"Last Updated By : Admin"
//   },
//   // {
//   //   title: "National ID",
//   //   img: "/assets/svg/license.svg",
//   //   date:"Validation Date : 12 Feb 2025 ",
//   //   exp:"Expiration Date : 31 Mar 2025",
//   //   update:"Last Updated By : Admin"
//   // },
// ];

// const docs1 = [...docs];
// const docs2 = [...docs];

// const Documents = () => {
//   return (
//     <div className="p-8 bg-white rounded-xl max-md:h-auto">

//       {/* Flex wrapper for all 3 sections */}
//       <div className="flex flex-wrap gap-5">

//         {/* BLOCK 1 */}
//         <div className="w-[48%] min-w-[320px] space-y-2">
//           <Typography size="h5">Identity Doc</Typography>

//           <div className="flex flex-wrap gap-10">
//             {docs.map((doc, i) => (
//               <div
//                 key={i}
//                 className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[240px] rounded-2xl p-4 space-y-6"
//               >
//                 <Typography className="font-semibold">{doc.title}</Typography>
//                 <Image src={doc.img} width={200} height={80} alt={doc.title} />
//                 <div className="space-y-2">
//                   <Typography className="text-desc-color">{doc.date}</Typography>
//                   <Typography className="text-desc-color">{doc.exp}</Typography>
//                   <Typography className="text-desc-color">{doc.update}</Typography>
//                   <Typography className="text-primary-color underline">
//                     View Full Document
//                   </Typography>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* BLOCK 2 */}
//         <div className="w-[48%] min-w-[320px] space-y-2">
//           <Typography size="h5">Insurance Docs</Typography>

//           <div className="flex flex-wrap gap-5">
//             {docs1.map((doc, i) => (
//               <div
//                 key={i}
//                 className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[240px] rounded-2xl p-4 space-y-6"
//               >
//                 <Typography className="font-semibold">{doc.title}</Typography>
//                 <Image src={doc.img} width={200} height={80} alt={doc.title} />
//                 <div className="space-y-2">
//                   <Typography className="text-desc-color">{doc.date}</Typography>
//                   <Typography className="text-desc-color">{doc.exp}</Typography>
//                   <Typography className="text-desc-color">{doc.update}</Typography>
//                   <Typography className="text-primary-color underline">
//                     View Full Document
//                   </Typography>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* BLOCK 3 → auto comes down */}
//         <div className="w-[48%] min-w-[320px] space-y-2">
//           <Typography size="h5">Medical Licensing Docs</Typography>

//           <div className="flex flex-wrap gap-5">
//             {docs2.map((doc, i) => (
//               <div
//                 key={i}
//                 className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[240px] rounded-2xl p-4 space-y-6"
//               >
//                 <Typography className="font-semibold">{doc.title}</Typography>
//                 <Image src={doc.img} width={200} height={80} alt={doc.title} />
//                 <div className="space-y-2">
//                   <Typography className="text-desc-color">{doc.date}</Typography>
//                   <Typography className="text-desc-color">{doc.exp}</Typography>
//                   <Typography className="text-desc-color">{doc.update}</Typography>
//                   <Typography className="text-primary-color underline">
//                     View Full Document
//                   </Typography>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Documents;
// import React, { useState } from "react";
// import Image from "next/image";
// //import { Card, CardContent } from "@/components/ui/card";
// //import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";

// const docData = [
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     validated: true,
//     validationDate: "12 Feb 2025",
//     expiryDate: "31 Mar 2025",
//     updatedBy: "Admin",
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     validated: true,
//     validationDate: "12 Feb 2025",
//     expiryDate: "31 Mar 2025",
//     updatedBy: "Admin",
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     validated: true,
//     validationDate: "12 Feb 2025",
//     expiryDate: "31 Mar 2025",
//     updatedBy: "Admin",
//   },
//   {
//     title: "National ID",
//     img: "/assets/svg/license.svg",
//     validated: true,
//     validationDate: "12 Feb 2025",
//     expiryDate: "31 Mar 2025",
//     updatedBy: "Admin",
//   },
// ];

// const Section = ({ title }) => {
//   return (
//     <h2 className="text-xl font-semibold mb-4 mt-8">{title}</h2>
//   );
// };

// const DocCard = ({ item }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Card className="rounded-2xl shadow-sm w-full max-w-xs">
//       <CardContent className="p-4 space-y-3">
//         {/* Top Title + Menu */}
//         <div className="flex justify-between items-center">
//           <p className="font-medium">{item.title}</p>

//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <button className="p-1 hover:bg-gray-100 rounded-full">
//                 •••
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-40">
//               <DropdownMenuItem>Validate</DropdownMenuItem>
//               <DropdownMenuItem>Reject</DropdownMenuItem>
//               <DropdownMenuItem>Request Document</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Image */}
//         <div className="rounded-xl overflow-hidden w-full h-40 bg-gray-200">
//           <Image
//             src="https://via.placeholder.com/300"
//             alt="doc image"
//             width={300}
//             height={300}
//             className="object-cover w-full h-full"
//           />
//         </div>

//         {/* Status */}
//         <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
//           <span>✓</span> Validated
//         </div>

//         {/* Info */}
//         <div className="text-sm text-gray-600 space-y-1">
//           <p>Validation Date: {item.validationDate}</p>
//           <p>Expiration Date: {item.expiryDate}</p>
//           <p>Last Updated By: {item.updatedBy}</p>
//         </div>

//         {/* Button */}
//         <Button variant="link" className="text-blue-600 p-0 text-sm">
//           View Full Document
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default function DocumentCards() {
//   return (
//     <div className="p-6">
//       <Section title="Identity Doc" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {docData.map((item, idx) => (
//           <DocCard item={item} key={idx} />
//         ))}
//       </div>

//       <Section title="Insurance Docs" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {docData.map((item, idx) => (
//           <DocCard item={item} key={idx} />
//         ))}
//       </div>

//       <Section title="Medical Licensing Docs" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {docData.map((item, idx) => (
//           <DocCard item={item} key={idx} />
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import Image from "next/image";

const docData = [
  {
    title: "National ID",
    img: "/assets/svg/license.svg",
    validated: true,
    validationDate: "12 Feb 2025",
    expiryDate: "31 Mar 2025",
    updatedBy: "Admin",
  },
  {
    title: "National ID",
    img: "/assets/svg/license.svg",
    validated: true,
    validationDate: "12 Feb 2025",
    expiryDate: "31 Mar 2025",
    updatedBy: "Admin",
  },
  {
    title: "National ID",
    img: "/assets/svg/license.svg",
    validated: true,
    validationDate: "12 Feb 2025",
    expiryDate: "31 Mar 2025",
    updatedBy: "Admin",
  },
  {
    title: "National ID",
    img: "/assets/svg/license.svg",
    validated: true,
    validationDate: "12 Feb 2025",
    expiryDate: "31 Mar 2025",
    updatedBy: "Admin",
  },
];

const Section = ({ title }: any) => {
  return <h2 className="text-xl font-semibold mb-4 mt-8">{title}</h2>;
};

// ⭐ Custom Dropdown Component
const SimpleMenu = ({ open, setOpen }: any) => {
  return (
    <div className="relative">
      <button
        className="p-1 hover:bg-gray-100 rounded-full"
        onClick={() => setOpen(!open)}
      >
        •••
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md border z-20">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Validate
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Reject
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Request Document
          </div>
        </div>
      )}
    </div>
  );
};

// ⭐ Document Card (No shadcn)
const DocCard = ({ item }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl shadow-sm border bg-white w-full max-w-xs">
      <div className="p-4 space-y-3">
        {/* Top Title + Menu */}
        <div className="flex justify-between items-center">
          <p className="font-medium">{item.title}</p>
          <SimpleMenu open={open} setOpen={setOpen} />
        </div>

        {/* Image */}
        <div className="rounded-xl overflow-hidden w-full h-40 bg-gray-200">
          <Image
            // src="https://via.placeholder.com/300"
            src={item.img}
            alt="doc image"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
          <span>✓</span> Validated
        </div>

        {/* Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>Validation Date: {item.validationDate}</p>
          <p>Expiration Date: {item.expiryDate}</p>
          <p>Last Updated By: {item.updatedBy}</p>
        </div>

        {/* Link */}
        <button className="text-blue-600 text-sm underline">
          View Full Document
        </button>
      </div>
    </div>
  );
};

export default function DocumentCards() {
  return (
    <div className="p-8 bg-white rounded-2xl">
      <Section title="Identity Doc" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {docData.map((item, idx) => (
          <DocCard item={item} key={idx} />
        ))}
      </div>

      <Section title="Insurance Docs" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {docData.map((item, idx) => (
          <DocCard item={item} key={idx} />
        ))}
      </div>

      <Section title="Medical Licensing Docs" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {docData.map((item, idx) => (
          <DocCard item={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
