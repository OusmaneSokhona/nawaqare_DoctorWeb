// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import React from "react";
// import { paymentTable, pharmacyTable } from "@/data";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";

// type pharmacy = {
//   id?: string;
//   Patient: string;
//   Date: string;
//   Method: string;
//   Order: string;
//   Amount: string;
//   Status: string;
// };

// const PharmacyDetails = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   // ✅ Use a compatible inline type
//   const pharmacy = (pharmacyTable.rowsData as pharmacy[]).find(
//     (item) => item?.id?.toString() === id
//   );

//   if (!pharmacy) return <p>No data found</p>;

//   return (
//     <div className="mt-5">
//       <div className="flex max-md:flex-col max-md:gap-3 justify-between mb-8">
//         <div>
//           <Typography size="h3" as="h3" className="font-bold">
//             Transaction Details
//           </Typography>
//           <Typography className="text-desc-color1 font-medium">
//             “Detailed payment and refund record
//           </Typography>
//         </div>
//         <div>
//           <Button className="flex items-center gap-2 font-bold bg-primary-dark rounded-xl w-[190px] h-[45px] text-white">
//             Download Receipt
//           </Button>
//         </div>
//       </div>
//       <div className="bg-white h-[100vh] p-10 rounded-xl shadow-md space-y-4">
//         <div className="flex max-md:flex-col gap-6">
//           <div className="flex justify-between border border-border-color items-center rounded-lg  w-[450px] max-md:w-full px-6 py-6">
//             <div className="space-y-1">
//               <Typography className="text-md font-semibold">
//                 <strong>Consultation Payment</strong>
//               </Typography>
//               <Typography>Date: {pharmacy.Date}</Typography>
//               <Typography>Dr. Emily Carter</Typography>
//             </div>
//             <div className="space-y-2">
//               <Typography>ID:PAY-88912</Typography>
//               <Typography className="bg-desc-color1 px-2 py-2 flex items-center justify-center rounded">
//                 {/* {payment.Method} */}
//               </Typography>
//             </div>
//           </div>
//           <div className="flex justify-between border border-border-color items-center rounded-lg  w-[450px] max-md:w-full px-6 py-6">
//             <div className="space-y-1">
//               <Typography className="text-md font-semibold">
//                 <strong>Patient:</strong> {pharmacy.Patient}
//               </Typography>
//               <Typography>Refund Date: {pharmacy.Date}</Typography>
//               <Typography>Handled By: Admin (Musfiq)</Typography>
//             </div>
//             <div className="space-y-2">
//               <Typography>ID:PAY-88912</Typography>
//               <Typography className="bg-[#F2994A33] text-secondary-color2 px-2 py-2 flex items-center justify-center rounded">
//                 {pharmacy.Status}
//               </Typography>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetails;
// "use client";

// import { useSearchParams } from "next/navigation";
// import React from "react";
// import { pharmacyTable } from "@/data";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";
// import Image from "next/image";

// // ✅ Correct type matching your pharmacyTable structure
// type Pharmacy = {
//   id: string;
//   Patient: string;
//   Date: string;
//   img: string;
//   Activity: string;
//   Description: string;
//   dsc: string;
//   Pharmacy: string;
//   Responsible: string[];
//   Location: string;
//   Total: string;
//   Acceptance: string;
//   Status: string;
// };

// const PharmacyDetails = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   // ✅ Safe cast using `unknown as Pharmacy[]`
//   const pharmacy = (pharmacyTable.rowsData as unknown as Pharmacy[]).find(
//     (item) => item?.id?.toString() === id
//   );

//   if (!pharmacy) return <p>No data found</p>;

//   const getStatusClasses = (status: string) => {
//     switch (status) {
//       case "Inactive":
//         return "bg-red text-white";
//       case "Active":
//         return "bg-secondary-color text-white";
//       case "Awaiting Pharmacy":
//         return "bg-[#F2994A] text-white";
//       case "Delivered":
//         return "bg-[#E0F3FF] text-[#2F80ED]";
//       default:
//         return "bg-[#F2F2F2] text-[#4F4F4F]";
//     }
//   };

//   return (
//     <div className="mt-5">
//       {/* Header */}
//       <div className="flex max-md:flex-col max-md:gap-3 justify-between mb-8">
//         <div className="flex gap-2 items-center">
//             <Image src='/assets/svg/pharmacyImg.svg' width={86} height={82} alt="prof"/>
//           <Typography size="h6" as="h6" className="font-bold">
//             Al Noor Pharmacy
//           </Typography>
//         </div>
//         {/* <div>
//           <button className="flex items-center justify-center gap-2 font-bold bg-primary-dark rounded-full w-[90px] h-[30px] text-white">
//             {pharmacy.Status}
//           </button>
//         </div> */}
//          <div>
//           <button
//             className={`px-8 py-3 font-bold rounded-full ${getStatusClasses(
//               pharmacy.Status
//             )}`}
//           >
//             {pharmacy.Status}
//           </button>
//         </div>
//       </div>

//       {/* Details */}
//       <div >
//                 <div className="flex flex-wrap gap-10">
//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Email
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       {/* {pharmacy.email} */}
//                       ali@gmail.com
//                     </Typography>
//                   </div>

//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Phone No
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       {/* {pharmacy.Responsible} */}
//                       +92 3001234567
//                     </Typography>
//                   </div>
//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Responsible Person
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       {/* {pharmacy.age} */}
//                       24
//                     </Typography>
//                   </div>

//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Created on
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       {/* {pharmacy.gender} */}
//                       12/Sep/2023
//                     </Typography>
//                   </div>

//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Last Active
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       Oct 10, 2025 – 8:30 AM
//                     </Typography>
//                   </div>
//                   {/* <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Last Login
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       Oct 10, 2025 – 8:30 AM
//                     </Typography>
//                   </div> */}
//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Address
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       {/* {pharmacy.address} */}
//                       subtle gray line separating header
//                     </Typography>
//                   </div>
//                   <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
//                     <Typography size="h5" as="h5">
//                       Validation Status
//                     </Typography>
//                     <Typography className="text-h6 font-medium text-[#818181]">
//                       Awaiting Review
//                     </Typography>
//                   </div>
//                 </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetails;

"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { pharmacyTable } from "@/data";
import { Typography } from "@/components/shared/typography";
import Image from "next/image";
import { Icon } from "@iconify/react";
import PatientRetentionRate from "../patient-stats/page";
import PrescriptionVolumeChart from "../prescription-chart/page";
import DocumentsPharmacy from "@/components/shared/pharmacy/document";
import DocotorPrescription from "@/components/shared/doctor-details/doc-prescription";
import PrescriptionPharmacy from "@/components/shared/pharmacy/prescription-pharmacy";
import Timeline from "@/components/shared/pharmacy/work-flow";
import IncidentsOverviewChart from "../patient-stats/page";
import ValidationFlow from "@/components/shared/pharmacy/work-flow/validation-flow";

const stats = [
  {
    icon: "mingcute:time-fill",
    stat: "85%",
    title: "Average delivery time",
  },
  {
    icon: "icon-park-solid:prescription",
    stat: "1,060",
    title: "Prescriptions delivered late",
  },
  {
    icon: "solar:delivery-bold",
    stat: "185",
    title: "Expired prescriptions",
  },
  {
    icon: "mingcute:time-line",
    stat: "3.2h",
    title: "Avg Validation Time",
  },
  {
    icon: "mdi:tick-circle",
    stat: "12/183",
    title: "Internal leaderboard",
  },
];

type Pharmacy = {
  id: string;
  Patient: string;
  Date: string;
  img: string;
  Activity: string;
  Description: string;
  dsc: string;
  Pharmacy: string;
  Responsible: string[];
  Location: string;
  Total: string;
  Acceptance: string;
  Status: string;
  Type: string;
};

const pharmacyTabs = [
  { title: "Activity", label: "Activity & Performance Metrics" },
  { title: "Legal Verification", label: "Compliance & Legal Verification" },
  { title: "Prescriptions", label: "Prescriptions" },
  { title: "Workflow", label: "Validation Workflow" },
  { title: "Validation", label: "Validation" },
];

const PharmacyDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const pharmacy = (pharmacyTable.rowsData as unknown as Pharmacy[]).find(
    (item) => item?.id?.toString() === id,
  );

  const [activeTab, setActiveTab] = useState(0);

  if (!pharmacy) return <p>No data found</p>;

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Inactive":
        return "bg-red text-white";
      case "Active":
        return "bg-secondary-color text-white";
      case "Awaiting Pharmacy":
        return "bg-[#F2994A] text-white";
      case "Delivered":
        return "bg-[#E0F3FF] text-[#2F80ED]";
      default:
        return "bg-[#F2F2F2] text-[#4F4F4F]";
    }
  };

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex max-md:flex-col max-md:gap-5 justify-between mb-8">
        <div className="flex gap-2 items-center">
          <Image
            src="/assets/svg/pharmacyImg.svg"
            width={86}
            height={82}
            alt="prof"
          />
          <div className="space-y-1">
            <Typography size="h6" as="h6" className="font-bold">
              {pharmacy.Pharmacy}
            </Typography>
            <Typography className="px-4 py-2 rounded-xl bg-[#EAEEF7]">
              Awaiting Documents
            </Typography>
          </div>
        </div>

        <div>
          <button
            className={`px-8 py-3 font-bold rounded-full ${getStatusClasses(
              pharmacy.Status,
            )}`}
          >
            {pharmacy.Status}
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-8">
          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Email
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              ali@gmail.com
            </Typography>
          </div>
          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Pharmacy ID
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              {pharmacy.Patient}
            </Typography>
          </div>
          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Pharmacy Type
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              {pharmacy.Type}
            </Typography>
          </div>

          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Phone No
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              +92 3001234567
            </Typography>
          </div>

          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Responsible Person
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              24
            </Typography>
          </div>

          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Created on
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              12/Sep/2023
            </Typography>
          </div>
          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              License / Contract
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              Yes / No
            </Typography>
          </div>
          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Internal ID
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              Oct 10, 2025 – 8:30 AM
            </Typography>
          </div>

          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Last Active
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              Oct 10, 2025 – 8:30 AM
            </Typography>
          </div>

          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Address
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              {pharmacy.Location}
            </Typography>
          </div>

          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Validation Status
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              Awaiting Review
            </Typography>
          </div>
          <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Contr Expiration date
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              Pending Validation
            </Typography>
          </div>
        </div>
      </div>
      {/* Dynamic Heading */}
      <div className="mt-10">
        <Typography size="h5" as="h5" className="font-bold">
          {pharmacyTabs[activeTab].label}
        </Typography>
      </div>
      {/* Tabs */}
      <div className="flex max-md:flex-col gap-10 max-md:gap-5 max-md:items-start items-center pt-5 pb-5 border-b border-gray-200">
        {pharmacyTabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(i)}
            className="cursor-pointer relative"
          >
            <Typography
              as="p"
              className={`font-semibold whitespace-nowrap relative inline-block transition-all ${
                activeTab === i
                  ? "text-primary-color after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-primary-color"
                  : "text-[#666]"
              }`}
            >
              {tab.title}
            </Typography>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 0 && (
          <div className="bg-white rounded-xl p-8">
            <div className="pt-5 flex flex-wrap gap-5 items-center">
              {stats.map((activity, i) => (
                <div
                  key={i}
                  className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[190px] h-[170px] max-md:h-auto rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
                >
                  <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
                    <Icon
                      icon={activity.icon}
                      width="24"
                      height="24"
                      className="text-white"
                    />
                  </div>
                  <Typography size="h4" as="h4">
                    {activity.stat}
                  </Typography>
                  <Typography>{activity.title}</Typography>
                </div>
              ))}
            </div>
            <div className="flex gap-5 items-center pt-10 max-md:flex-col">
              <PrescriptionVolumeChart />
              {/* <PatientRetentionRate/> */}
              <IncidentsOverviewChart />
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className=" pt-8">
            <div>
              <DocumentsPharmacy />
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className=" pt-8">
            <PrescriptionPharmacy />
          </div>
        )}

        {activeTab === 3 && (
          <div className="pt-8">
            <Timeline />
          </div>
        )}
        {activeTab === 4 && (
          <div className="pt-8">
            <ValidationFlow />
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetails;
