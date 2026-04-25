// 'use client'
// import { Typography } from '@/components/shared/typography'
// import { ConsultationType } from '@/types/dashboard'
// import Image from 'next/image'
// import { useSearchParams } from 'next/navigation'
// import React from 'react'

// const ConsultationDetails = () => {
//      const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const pharmacy = (consultation.rowsData as unknown as ConsultationType[]).find(
//     (item) => item?.id?.toString() === id
//   );
//   return (
//     <div>
//         <div className="flex max-md:flex-col max-md:gap-5 justify-between mb-8">
//                <div className="flex gap-2 items-center">
//                  <Image src="/assets/svg/pharmacyImg.svg" width={86} height={82} alt="prof" />
//                  <div className="space-y-1">
//                    <Typography size="h6" as="h6" className="font-bold">
//                    {pharmacy.Pharmacy}
//                  </Typography>
//                    <Typography className="px-4 py-2 rounded-xl bg-[#EAEEF7]">Awaiting Documents</Typography>
//                  </div>

//                </div>

//                <div>
//                  <button
//                    className={`px-8 py-3 font-bold rounded-full ${getStatusClasses(
//                      pharmacy.Status
//                    )}`}
//                  >
//                    {pharmacy.Status}
//                  </button>
//                </div>
//              </div>

//              {/* Details Section */}
//              <div className="mb-10">
//                <div className="flex flex-wrap gap-8">
//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Email
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      ali@gmail.com
//                    </Typography>
//                  </div>
//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Pharmacy ID
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      {pharmacy.Patient}
//                    </Typography>
//                  </div>
//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Pharmacy Type
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      {pharmacy.Type}
//                    </Typography>
//                  </div>

//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Phone No
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      +92 3001234567
//                    </Typography>
//                  </div>

//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Responsible Person
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      24
//                    </Typography>
//                  </div>

//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Created on
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      12/Sep/2023
//                    </Typography>
//                  </div>
//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      License / Contract
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      Yes / No
//                    </Typography>
//                  </div>
//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Internal ID
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      Oct 10, 2025 – 8:30 AM
//                    </Typography>
//                  </div>

//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Last Active
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      Oct 10, 2025 – 8:30 AM
//                    </Typography>
//                  </div>

//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Address
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      {pharmacy.Location}
//                    </Typography>
//                  </div>

//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Validation Status
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      Awaiting Review
//                    </Typography>
//                  </div>
//                  <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//                    <Typography size="h6" as="h6">
//                      Contr Expiration date
//                    </Typography>
//                    <Typography className="text-h6 font-medium text-[#818181]">
//                      Pending Validation
//                    </Typography>
//                  </div>
//                </div>
//              </div>
//     </div>
//   )
// }

// export default ConsultationDetails
// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'
// import { Typography } from '@/components/shared/typography'
// //import { consultation } from '@/data/consultation'
// import { ConsultationType } from '@/types/dashboard'
// import { consultation } from '@/data'

// const getStatusClasses = (status: string) => {
//   switch (status) {
//     case 'Validated':
//       return 'bg-green-500 text-white'
//     case 'Pending':
//       return 'bg-yellow-500 text-white'
//     default:
//       return 'bg-gray-300 text-black'
//   }
// }

// const ConsultationDetails = () => {
//   const { id } = useParams<{ id: string }>()

//   const pharmacy: ConsultationType | undefined =
//     consultation.RowsData.find(
//       (item: ConsultationType) => item.id.toString() === id
//     )

//   if (!pharmacy) {
//     return <div className="p-10 text-center">No Data Found</div>
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-8">
//         <Typography size="h6" as="h6" className="font-bold">
//           {pharmacy.Name}
//         </Typography>

//         <button
//           className={`px-8 py-3 rounded-full ${getStatusClasses(
//             pharmacy.Status
//           )}`}
//         >
//           {pharmacy.Status}
//         </button>
//       </div>

//       <Typography>{pharmacy.consultationType}</Typography>
//       <Typography>{pharmacy.Price}</Typography>
//       <Typography>{pharmacy.Qty}</Typography>
//     </div>
//   )
// }

// export default ConsultationDetails
// "use client";

// import { useSearchParams } from "next/navigation";
// import React, { useState } from "react";
// import { consultation, pharmacyTable } from "@/data";
// import { Typography } from "@/components/shared/typography";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// //import PatientRetentionRate from "../patient-stats/page";
// //import PrescriptionVolumeChart from "../prescription-chart/page";
// import DocumentsPharmacy from "@/components/shared/pharmacy/document";
// import DocotorPrescription from "@/components/shared/doctor-details/doc-prescription";
// import PrescriptionPharmacy from "@/components/shared/pharmacy/prescription-pharmacy";
// import Timeline from "@/components/shared/pharmacy/work-flow";
// //import IncidentsOverviewChart from "../patient-stats/page";
// import ValidationFlow from "@/components/shared/pharmacy/work-flow/validation-flow";
// import { ConsultationType } from "@/types/dashboard";

// const stats = [
//   {
//     icon: "mingcute:time-fill",
//     stat: "85%",
//     title: "Average delivery time",
//   },
//   {
//     icon: "icon-park-solid:prescription",
//     stat: "1,060",
//     title: "Prescriptions delivered late",
//   },
//   {
//     icon: "solar:delivery-bold",
//     stat: "185",
//     title: "Expired prescriptions",
//   },
//   {
//     icon: "mingcute:time-line",
//     stat: "3.2h",
//     title: "Avg Validation Time",
//   },
//     {
//     icon: "mdi:tick-circle",
//     stat: "12/183",
//     title: "Internal leaderboard",
//   },
// ];

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
//   Type: string
// };

// const pharmacyTabs = [
//   { title: "Activity", label: "Activity & Performance Metrics" },
//   { title: "Legal Verification", label: "Compliance & Legal Verification" },
//   { title: "Prescriptions", label: "Prescriptions" },
//   { title: "Workflow", label: "Validation Workflow" },
//   { title: "Validation", label: "Validation" },
// ];

// const PharmacyDetails = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const pharmacy = (consultation.rowsData as unknown as ConsultationType[]).find(
//     (item) => item?.id?.toString() === id
//   );

//   const [activeTab, setActiveTab] = useState(0);

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
//       <div className="flex max-md:flex-col max-md:gap-5 justify-between mb-8">
//         <div className="flex gap-2 items-center">
//           <Image src="/assets/svg/pharmacyImg.svg" width={86} height={82} alt="prof" />
//           <div className="space-y-1">
//             <Typography size="h6" as="h6" className="font-bold">
//             {pharmacy.Pharmacy}
//           </Typography>
//             <Typography className="px-4 py-2 rounded-xl bg-[#EAEEF7]">Awaiting Documents</Typography>
//           </div>

//         </div>

//         <div>
//           <button
//             className={`px-8 py-3 font-bold rounded-full ${getStatusClasses(
//               pharmacy.Status
//             )}`}
//           >
//             {pharmacy.Status}
//           </button>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="mb-10">
//         <div className="flex flex-wrap gap-8">
//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Email
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               ali@gmail.com
//             </Typography>
//           </div>
//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Pharmacy ID
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               {pharmacy.Patient}
//             </Typography>
//           </div>
//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Pharmacy Type
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               {pharmacy.Type}
//             </Typography>
//           </div>

//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Phone No
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               +92 3001234567
//             </Typography>
//           </div>

//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Responsible Person
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               24
//             </Typography>
//           </div>

//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Created on
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               12/Sep/2023
//             </Typography>
//           </div>
//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               License / Contract
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               Yes / No
//             </Typography>
//           </div>
//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Internal ID
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               Oct 10, 2025 – 8:30 AM
//             </Typography>
//           </div>

//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Last Active
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               Oct 10, 2025 – 8:30 AM
//             </Typography>
//           </div>

//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Address
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               {pharmacy.Location}
//             </Typography>
//           </div>

//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Validation Status
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               Awaiting Review
//             </Typography>
//           </div>
//           <div className="space-y-2 basis-[14%] max-md:basis-[45%] max-sm:basis-full">
//             <Typography size="h6" as="h6">
//               Contr Expiration date
//             </Typography>
//             <Typography className="text-h6 font-medium text-[#818181]">
//               Pending Validation
//             </Typography>
//           </div>
//         </div>
//       </div>
//        {/* Dynamic Heading */}
//       <div className="mt-10">
//         <Typography size="h5" as="h5" className="font-bold">
//           {pharmacyTabs[activeTab].label}
//         </Typography>
//       </div>
//       {/* Tabs */}
//       <div className="flex max-md:flex-col gap-10 max-md:gap-5 max-md:items-start items-center pt-5 pb-5 border-b border-gray-200">
//         {pharmacyTabs.map((tab, i) => (
//           <div
//             key={i}
//             onClick={() => setActiveTab(i)}
//             className="cursor-pointer relative"
//           >
//             <Typography
//               as="p"
//               className={`font-semibold whitespace-nowrap relative inline-block transition-all ${
//                 activeTab === i
//                   ? "text-primary-color after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-primary-color"
//                   : "text-[#666]"
//               }`}
//             >
//               {tab.title}
//             </Typography>
//           </div>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div>
//         {activeTab === 0 && (
//           <div className="bg-white rounded-xl p-8">
//              <div className="pt-5 flex flex-wrap gap-5 items-center">
//                     {stats.map((activity, i) => (
//                       <div
//                         key={i}
//                         className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[190px] h-[170px] max-md:h-auto rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
//                       >
//                         <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
//                           <Icon icon={activity.icon} width="24" height="24" className="text-white" />
//                         </div>
//                         <Typography size="h4" as="h4">
//                           {activity.stat}
//                         </Typography>
//                         <Typography>{activity.title}</Typography>
//                       </div>
//                     ))}
//                   </div>
//                <div className="flex gap-5 items-center pt-10 max-md:flex-col">
//                 {/* <PrescriptionVolumeChart/>

//               <IncidentsOverviewChart/> */}
//                </div>

//           </div>
//         )}

//         {activeTab === 1 && (
//           <div className=" pt-8">
//             <div>
//                 <DocumentsPharmacy/>
//             </div>
//           </div>
//         )}

//         {activeTab === 2 && (
//           <div className=" pt-8">
//             <PrescriptionPharmacy/>
//           </div>
//         )}

//         {activeTab === 3 && (
//           <div className="pt-8">
//             <Timeline/>
//           </div>
//         )}
//          {activeTab === 4 && (
//           <div className="pt-8">
//             <ValidationFlow/>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PharmacyDetails;
"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";

import { consultation } from "@/data";
import { Typography } from "@/components/shared/typography";
import DocumentsPharmacy from "@/components/shared/pharmacy/document";
import PrescriptionPharmacy from "@/components/shared/pharmacy/prescription-pharmacy";
import Timeline from "@/components/shared/pharmacy/work-flow";
import ValidationFlow from "@/components/shared/pharmacy/work-flow/validation-flow";
import ConsultationGraph from "@/components/shared/consultation";
import Subscriber from "@/components/shared/consultation/subscriber";

/* -------------------- TYPES -------------------- */
type ConsultationRow = {
  id: string;
  Name: string;
  Period: string;
  consultationType: string;
  Qty: string;
  Price: string;
  Status: string;
  Specialty: string;
  Renewal: string;
  On: string;
};

/* -------------------- CONSTANTS -------------------- */
const pharmacyTabs = [
  { title: "Activity", label: "Activity & Performance Metrics" },
  { title: "Legal Verification", label: "Compliance & Legal Verification" },
  { title: "Prescriptions", label: "Prescriptions" },
  { title: "Workflow", label: "Validation Workflow" },
  { title: "Validation", label: "Validation" },
];

const stats = [
  { icon: "mingcute:time-fill", stat: "85%", title: "Average delivery time" },
  {
    icon: "icon-park-solid:prescription",
    stat: "1,060",
    title: "Prescriptions delivered late",
  },
  { icon: "solar:delivery-bold", stat: "185", title: "Expired prescriptions" },
  { icon: "mingcute:time-line", stat: "3.2h", title: "Avg Validation Time" },
  { icon: "mdi:tick-circle", stat: "12/183", title: "Internal leaderboard" },
];

/* -------------------- COMPONENT -------------------- */
const PharmacyDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [activeTab, setActiveTab] = useState(0);

  const pharmacy = consultation.RowsData.find(
    (item: ConsultationRow) => item.id === id,
  );

  if (!pharmacy) {
    return <div className="p-10 text-center">No data found</div>;
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Inactive":
        return "bg-red text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="mt-5">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-start max-md:flex-col justify-between gap-5 mb-8">
        <div className="flex gap-3 items-center">
          {/* <Image
            src="/assets/svg/pharmacyImg.svg"
            width={86}
            height={82}
            alt="pharmacy"
          /> */}
          <div>
            <Typography size="h6" as="h6" className="font-bold">
              {pharmacy.Name}
            </Typography>
            <Typography className="text-desc-color">
              Last Updated: 03 March 2025, 14:20
            </Typography>
          </div>
        </div>

        <button
          className={`px-6 py-2 rounded-full font-bold ${getStatusClasses(
            pharmacy.Status,
          )}`}
        >
          {pharmacy.Status}
        </button>
      </div>

      {/* ---------------- DETAILS ---------------- */}
      <div className="flex flex-wrap gap-8 mb-10">
        <Detail label="Type" value={pharmacy.consultationType} />
        <Detail label="Specialty" value={pharmacy.Specialty} />
        <Detail label="Quantity" value={pharmacy.Qty} />
        <Detail label="Price" value={pharmacy.Price} />
        <Detail label="Renewal" value={pharmacy.Renewal} />
        <Detail label="Created On" value={pharmacy.On} />
      </div>

      {/* ---------------- TABS ---------------- */}
      {/* <Typography size="h5" as="h5" className="font-bold mt-10">
        {pharmacyTabs[activeTab].label}
      </Typography> */}

      {/* <div className="flex gap-10 border-b mt-5 pb-4">
        {pharmacyTabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer font-semibold ${
              activeTab === index
                ? 'text-primary-color border-b-2 border-primary-color'
                : 'text-gray-500'
            }`}
          >
            {tab.title}
          </div>
        ))}
      </div> */}

      {/* ---------------- TAB CONTENT ---------------- */}
      {/* <div className="mt-8">
        {activeTab === 0 && (
          <div className="flex flex-wrap gap-5">
            {stats.map((item, i) => (
              <div
                key={i}
                className="w-[190px] h-[170px] shadow rounded-xl p-4 space-y-3"
              >
                <div className="w-11 h-11 rounded-full bg-primary-color flex items-center justify-center">
                  <Icon icon={item.icon} className="text-white" width={22} />
                </div>
                <Typography size="h4">{item.stat}</Typography>
                <Typography>{item.title}</Typography>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && <DocumentsPharmacy />}
        {activeTab === 2 && <PrescriptionPharmacy />}
        {activeTab === 3 && <Timeline />}
        {activeTab === 4 && <ValidationFlow />}
      </div> */}
      <hr />
      <div className="mt-10">
        <div className="p-8 bg-white rounded-xl">
          <ConsultationGraph />
          <div className="mt-5">
            <Typography size="h5" className="font-bold">
              Subscriber List
            </Typography>
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.15)] mt-3 rounded-xl">
              <Subscriber />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetails;

/* -------------------- REUSABLE DETAIL -------------------- */
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="basis-[22%] max-md:basis-[45%] max-sm:basis-full space-y-2">
    <Typography size="h6">{label}</Typography>
    <Typography className="text-[#818181]">{value}</Typography>
  </div>
);
