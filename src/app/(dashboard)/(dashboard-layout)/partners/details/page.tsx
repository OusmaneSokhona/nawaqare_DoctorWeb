// 'use client'

// import React, { useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import Image from 'next/image'
// import { Icon } from '@iconify/react'

// import { consultation, partnerTable } from '@/data'
// import { Typography } from '@/components/shared/typography'
// import DocumentsPharmacy from '@/components/shared/pharmacy/document'
// import PrescriptionPharmacy from '@/components/shared/pharmacy/prescription-pharmacy'
// import Timeline from '@/components/shared/pharmacy/work-flow'
// import ValidationFlow from '@/components/shared/pharmacy/work-flow/validation-flow'
// import ConsultationGraph from '@/components/shared/consultation'
// import Subscriber from '@/components/shared/consultation/subscriber'
// import { Partner } from '@/types/dashboard'

// /* -------------------- TYPES -------------------- */
// type ConsultationRow = {
//   id: string
//   Name: string
//   Period: string
//   consultationType: string
//   Qty: string
//   Price: string
//   Status: string
//   Specialty: string
//   Renewal: string
//   On: string
// }

// /* -------------------- CONSTANTS -------------------- */
// const pharmacyTabs = [
//   { title: 'Activity', label: 'Activity & Performance Metrics' },
//   { title: 'Legal Verification', label: 'Compliance & Legal Verification' },
//   { title: 'Prescriptions', label: 'Prescriptions' },
//   { title: 'Workflow', label: 'Validation Workflow' },
//   { title: 'Validation', label: 'Validation' },
// ]

// const stats = [
//   { icon: 'mingcute:time-fill', stat: '85%', title: 'Average delivery time' },
//   { icon: 'icon-park-solid:prescription', stat: '1,060', title: 'Prescriptions delivered late' },
//   { icon: 'solar:delivery-bold', stat: '185', title: 'Expired prescriptions' },
//   { icon: 'mingcute:time-line', stat: '3.2h', title: 'Avg Validation Time' },
//   { icon: 'mdi:tick-circle', stat: '12/183', title: 'Internal leaderboard' },
// ]

// /* -------------------- COMPONENT -------------------- */
// const PharmacyDetails = () => {
//   const searchParams = useSearchParams()
//   const id = searchParams.get('id')

//   const [activeTab, setActiveTab] = useState(0)

// //   const pharmacy = partnerTable.RowsData.find(
// //     (item: Partner) => item.id === id
// //   )
// const pharmacy = partnerTable.rowsData.find(
//   (item: Partner) => item.id === id
// )

//   if (!pharmacy) {
//     return <div className="p-10 text-center">No data found</div>
//   }

//   const getStatusClasses = (status: string) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-500 text-white'
//       case 'Inactive':
//         return 'bg-red text-white'
//       default:
//         return 'bg-gray-200 text-gray-700'
//     }
//   }

//   return (
//     <div className="mt-5">

//       {/* ---------------- HEADER ---------------- */}
//       <div className="flex items-start max-md:flex-col justify-between gap-5 mb-8">
//         <div className="flex gap-3 items-center">
//           {/* <Image
//             src="/assets/svg/pharmacyImg.svg"
//             width={86}
//             height={82}
//             alt="pharmacy"
//           /> */}
//           <div>
//             <Typography size="h6" as="h6" className="font-bold">
//               {pharmacy.Name}
//             </Typography>
//             <Typography className="text-desc-color">
//              Last Updated: 03 March 2025, 14:20
//             </Typography>
//           </div>
//         </div>

//         <button
//           className={`px-6 py-2 rounded-full font-bold ${getStatusClasses(
//             pharmacy.Status
//           )}`}
//         >
//           {pharmacy.Status}
//         </button>
//       </div>

//       {/* ---------------- DETAILS ---------------- */}
//       <div className="flex flex-wrap gap-8 mb-10">
//         <Detail label="Type" value={pharmacy.consultationType} />
//         <Detail label="Specialty" value={pharmacy.Specialty} />
//         <Detail label="Quantity" value={pharmacy.Qty} />
//         <Detail label="Price" value={pharmacy.Price} />
//         <Detail label="Renewal" value={pharmacy.Renewal} />
//         <Detail label="Created On" value={pharmacy.On} />
//       </div>

//       {/* ---------------- TABS ---------------- */}
//       <Typography size="h5" as="h5" className="font-bold mt-10">
//         {pharmacyTabs[activeTab].label}
//       </Typography>

//       <div className="flex gap-10 border-b mt-5 pb-4">
//         {pharmacyTabs.map((tab, index) => (
//           <div
//             key={index}
//             onClick={() => setActiveTab(index)}
//             className={`cursor-pointer font-semibold ${
//               activeTab === index
//                 ? 'text-primary-color border-b-2 border-primary-color'
//                 : 'text-gray-500'
//             }`}
//           >
//             {tab.title}
//           </div>
//         ))}
//       </div>

//       {/* ---------------- TAB CONTENT ---------------- */}
//       <div className="mt-8">
//         {activeTab === 0 && (
//           <div className="flex flex-wrap gap-5">
//             {stats.map((item, i) => (
//               <div
//                 key={i}
//                 className="w-[190px] h-[170px] shadow rounded-xl p-4 space-y-3"
//               >
//                 <div className="w-11 h-11 rounded-full bg-primary-color flex items-center justify-center">
//                   <Icon icon={item.icon} className="text-white" width={22} />
//                 </div>
//                 <Typography size="h4">{item.stat}</Typography>
//                 <Typography>{item.title}</Typography>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 1 && <DocumentsPharmacy />}
//         {activeTab === 2 && <PrescriptionPharmacy />}
//         {activeTab === 3 && <Timeline />}
//         {activeTab === 4 && <ValidationFlow />}
//       </div>

//       <div className='mt-10'>
//         <div className='p-8 bg-white rounded-xl'>
//            <ConsultationGraph/>
//            <div className='mt-5'>
//             <Typography size='h5' className='font-bold'>Subscriber List</Typography>
//             <div className='shadow-[0_0_10px_rgba(0,0,0,0.15)] mt-3 rounded-xl'>
//               <Subscriber/>
//             </div>
//            </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PharmacyDetails

// /* -------------------- REUSABLE DETAIL -------------------- */
// const Detail = ({ label, value }: { label: string; value: string }) => (
//   <div className="basis-[22%] max-md:basis-[45%] max-sm:basis-full space-y-2">
//     <Typography size="h6">{label}</Typography>
//     <Typography className="text-[#818181]">{value}</Typography>
//   </div>
// )
// 'use client'

// import React, { useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { Typography } from '@/components/shared/typography'
// import ConsultationGraph from '@/components/shared/consultation'
// import Subscriber from '@/components/shared/consultation/subscriber'
// import { partnerTable } from '@/data'
// import { Icon } from '@iconify/react'
// import DocumentsPharmacy from '@/components/shared/pharmacy/document'
// import PrescriptionPharmacy from '@/components/shared/pharmacy/prescription-pharmacy'
// import Timeline from '@/components/shared/pharmacy/work-flow'
// import ValidationFlow from '@/components/shared/pharmacy/work-flow/validation-flow'
// import InternalContacts from '@/components/shared/partner'
// import CoverageArea from '@/components/shared/partner/coverage'

// /* -------------------- TYPES -------------------- */
// type PartnerRow = {
//   id: string
//   Partner: string
//   title: string
//   Primary: string[]
//   Deliveries: string
//   Last: string
//   Status: string
// }

// /* -------------------- CONSTANTS -------------------- */
// const pharmacyTabs = [
//   { title: ' Internal Contacts', label: 'Activity & Performance Metrics' },
//   { title: 'Coverage Area', label: 'Compliance & Legal Verification' },
//   { title: ' Delivery History', label: 'Prescriptions' },
// //   { title: 'Workflow', label: 'Validation Workflow' },
// //   { title: 'Validation', label: 'Validation' },
// ]

// const stats = [
//   { icon: 'mingcute:time-fill', stat: '85%', title: 'Average delivery time' },
//   { icon: 'icon-park-solid:prescription', stat: '1,060', title: 'Prescriptions delivered late' },
//   { icon: 'solar:delivery-bold', stat: '185', title: 'Expired prescriptions' },
//   { icon: 'mingcute:time-line', stat: '3.2h', title: 'Avg Validation Time' },
//   { icon: 'mdi:tick-circle', stat: '12/183', title: 'Internal leaderboard' },
// ]

// /* -------------------- REUSABLE DETAIL -------------------- */
// const Detail = ({ label, value }: { label: string; value: string }) => (
//   <div className="basis-[22%] max-md:basis-[45%] max-sm:basis-full space-y-2">
//     <Typography size="h6">{label}</Typography>
//     <Typography className="text-[#818181]">{value}</Typography>
//   </div>
// )

// /* -------------------- COMPONENT -------------------- */
// const PharmacyDetails = () => {
//   const searchParams = useSearchParams()
//   const id = searchParams.get('id')

//   const [activeTab, setActiveTab] = useState(0)

//   // ✅ Correct type
//   const pharmacy = partnerTable.rowsData.find(
//     (item: PartnerRow) => item.id === id
//   )

//   if (!pharmacy) {
//     return <div className="p-10 text-center">No data found</div>
//   }

//   const getStatusClasses = (status: string) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-500 text-white'
//       case 'Inactive':
//         return 'bg-red text-white'
//       default:
//         return 'bg-gray-200 text-gray-700'
//     }
//   }

//   return (
//     <div className="mt-5">

//       {/* ---------------- HEADER ---------------- */}
//       <div className="flex items-start max-md:flex-col justify-between gap-5 mb-8">
//         <div className="flex gap-3 items-center">
//           <div>
//             <Typography size="h6" as="h6" className="font-bold">
//               {pharmacy.title}
//             </Typography>
//             <Typography className="text-desc-color">
//               Last Updated: 03 March 2025, 14:20
//             </Typography>
//           </div>
//         </div>

//         <button
//           className={`px-6 py-2 rounded-full font-bold ${getStatusClasses(
//             pharmacy.Status
//           )}`}
//         >
//           {pharmacy.Status}
//         </button>
//       </div>

//       {/* ---------------- DETAILS ---------------- */}
//       <div className="flex flex-wrap gap-8 mb-10">
//         <Detail label="Partner ID" value={pharmacy.Partner} />
//         <Detail label="Deliveries Completed" value={pharmacy.Deliveries} />
//         <Detail label="Last Activity" value={pharmacy.Last} />
//         <Detail label="Address" value="subtle gray line separating header" />
//       </div>

//       {/* ---------------- TABS ---------------- */}
//       {/* <Typography size="h5" as="h5" className="font-bold mt-10">
//         {pharmacyTabs[activeTab].label}
//       </Typography> */}

//       <div className="flex gap-10 border-b mt-5 pb-4">
//         {pharmacyTabs.map((tab, index) => (
//           <div
//             key={index}
//             onClick={() => setActiveTab(index)}
//             className={`cursor-pointer font-semibold ${
//               activeTab === index
//                 ? 'text-primary-color border-b-2 border-primary-color'
//                 : 'text-gray-500'
//             }`}
//           >
//             {tab.title}
//           </div>
//         ))}
//       </div>

//       {/* ---------------- TAB CONTENT ---------------- */}
//       <div className="mt-8">
//         {activeTab === 0 && (
//         //   <div className="flex flex-wrap gap-5">
//         //     {stats.map((item, i) => (
//         //       <div
//         //         key={i}
//         //         className="w-[190px] h-[170px] shadow rounded-xl p-4 space-y-3"
//         //       >
//         //         <div className="w-11 h-11 rounded-full bg-primary-color flex items-center justify-center">
//         //           <Icon icon={item.icon} className="text-white" width={22} />
//         //         </div>
//         //         <Typography size="h4">{item.stat}</Typography>
//         //         <Typography>{item.title}</Typography>
//         //       </div>
//         //     ))}
//         //   </div>
//         ''
//         )}

//         {activeTab === 1 && <CoverageArea />}
//         {activeTab === 2 && <PrescriptionPharmacy />}
//         {activeTab === 3 && <Timeline />}
//         {activeTab === 4 && <ValidationFlow />}
//       </div>

//       {/* ---------------- GRAPH & SUBSCRIBER ---------------- */}
//       <div className="mt-10">
//         <div className="p-8 bg-white rounded-xl">

//           <div className="mt-5">

//             <div className="shadow-[0_0_10px_rgba(0,0,0,0.15)] mt-3 rounded-xl">

//               <InternalContacts/>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PharmacyDetails
"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Typography } from "@/components/shared/typography";
import { partnerTable } from "@/data";
import DocumentsPharmacy from "@/components/shared/pharmacy/document";
import PrescriptionPharmacy from "@/components/shared/pharmacy/prescription-pharmacy";
import Timeline from "@/components/shared/pharmacy/work-flow";
import ValidationFlow from "@/components/shared/pharmacy/work-flow/validation-flow";
import InternalContacts from "@/components/shared/partner";
import CoverageArea from "@/components/shared/partner/coverage";
import DelivereyHistory from "@/components/shared/partner/delivery-history";

/* -------------------- TYPES -------------------- */
type PartnerRow = {
  id: string;
  Partner: string;
  title: string;
  Primary: string[];
  Deliveries: string;
  Last: string;
  Status: string;
  Address?: string; // optional, agar data available ho
};

/* -------------------- CONSTANTS -------------------- */
const pharmacyTabs = [
  { title: "Internal Contacts", label: "Activity & Performance Metrics" },
  { title: "Coverage Area", label: "Compliance & Legal Verification" },
  { title: "Delivery History", label: "Prescriptions" },
  // { title: 'Workflow', label: 'Validation Workflow' },
  // { title: 'Validation', label: 'Validation' },
];

/* -------------------- REUSABLE DETAIL -------------------- */
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="basis-[22%] max-md:basis-[45%] max-sm:basis-full space-y-2">
    <Typography size="h6">{label}</Typography>
    <Typography className="text-[#818181]">{value}</Typography>
  </div>
);

/* -------------------- COMPONENT -------------------- */
const PharmacyDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [activeTab, setActiveTab] = useState(0);

  const pharmacy = partnerTable.rowsData.find(
    (item: PartnerRow) => item.id === id,
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
          <div>
            <Typography size="h6" as="h6" className="font-bold">
              {pharmacy.title}
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
        <Detail label="Partner ID" value={pharmacy.Partner} />
        <Detail label="Deliveries Completed" value={pharmacy.Deliveries} />
        <Detail label="Last Activity" value={pharmacy.Last} />
        <Detail label="Address" value="subtle gray line separating header" />
      </div>

      {/* ---------------- TABS ---------------- */}
      {/* <div className="flex max-md:flex-col gap-10 border-b mt-5 pb-4">
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
      {/* ---------------- TABS ---------------- */}
      <div className="flex max-md:flex-col gap-6 mt-5">
        {pharmacyTabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className="text-left"
          >
            <span
              className={`
          inline-flex w-fit pb-2 font-semibold transition-all
          ${
            activeTab === index
              ? "text-primary-color border-b-2 border-primary-color"
              : ""
          }
        `}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* ---------------- TAB CONTENT ---------------- */}
      <div className="mt-8">
        {activeTab === 0 && (
          <div className="bg-white rounded-xl">
            <InternalContacts />
          </div>
        )}

        {activeTab === 1 && (
          <div className="bg-white h-[50vh] max-md:h-auto p-8 mt-3 rounded-xl">
            <CoverageArea />
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-white mt-3 rounded-xl p-4">
            <DelivereyHistory />
          </div>
        )}

        {/* {activeTab === 3 && (
          <div className="shadow-[0_0_10px_rgba(0,0,0,0.15)] mt-3 rounded-xl p-4">
            <Timeline />
          </div>
        )}

        {activeTab === 4 && (
          <div className="shadow-[0_0_10px_rgba(0,0,0,0.15)] mt-3 rounded-xl p-4">
            <ValidationFlow />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PharmacyDetails;

// 'use client'

// import React, { useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { Typography } from '@/components/shared/typography'
// import ConsultationGraph from '@/components/shared/consultation'
// import Subscriber from '@/components/shared/consultation/subscriber'
// import { partnerTable } from '@/data'

// /* -------------------- TYPES -------------------- */
// type PartnerRow = {
//   id: string
//   Partner: string
//   title: string
//   Primary: string[]
//   Deliveries: string
//   Last: string
//   Status: string
// }

// /* -------------------- REUSABLE DETAIL -------------------- */
// const Detail = ({ label, value }: { label: string; value: string }) => (
//   <div className="basis-[22%] max-md:basis-[45%] max-sm:basis-full space-y-2">
//     <Typography size="h6">{label}</Typography>
//     <Typography className="text-[#818181]">{value}</Typography>
//   </div>
// )

// /* -------------------- COMPONENT -------------------- */
// const PharmacyDetails = () => {
//   const searchParams = useSearchParams()
//   const id = searchParams.get('id')

//   const [activeTab, setActiveTab] = useState(0)

//   // Find pharmacy row from JSON
//   const pharmacy = partnerTable.rowsData.find((item) => item.id === id)

//   if (!pharmacy) {
//     return <div className="p-10 text-center">No data found</div>
//   }

//   const getStatusClasses = (status: string) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-500 text-white'
//       case 'Inactive':
//         return 'bg-red text-white'
//       default:
//         return 'bg-gray-200 text-gray-700'
//     }
//   }

//   return (
//     <div className="mt-5">

//       {/* ---------------- HEADER ---------------- */}
//       <div className="flex items-start max-md:flex-col justify-between gap-5 mb-8">
//         <div className="flex gap-3 items-center">
//           <div>
//             <Typography size="h6" as="h6" className="font-bold">
//               {pharmacy.title}
//             </Typography>
//             <Typography className="text-desc-color">
//               Last Updated: 03 March 2025, 14:20
//             </Typography>
//           </div>
//         </div>

//         <button
//           className={`px-6 py-2 rounded-full font-bold ${getStatusClasses(
//             pharmacy.Status
//           )}`}
//         >
//           {pharmacy.Status}
//         </button>
//       </div>

//       {/* ---------------- DETAILS ---------------- */}
//       <div className="flex flex-wrap gap-8 mb-10">
//         <Detail label="Partner ID" value={pharmacy.Partner} />
//         <Detail label="Deliveries" value={pharmacy.Deliveries} />
//         <Detail label="Last Activity" value={pharmacy.Last} />
//       </div>

//       {/* ---------------- PRIMARY CONTACT ---------------- */}
//       <div className="mb-10">
//         <Typography size="h6" className="font-bold mb-2">
//           Primary Contact
//         </Typography>
//         <div className="flex flex-col gap-1 text-desc-color">
//           {pharmacy.Primary.map((contact, idx) => (
//             <span key={idx}>{contact}</span>
//           ))}
//         </div>
//       </div>

//       <hr />

//       {/* ---------------- GRAPH & SUBSCRIBER ---------------- */}
//       <div className="mt-10">
//         <div className="p-8 bg-white rounded-xl">
//           <ConsultationGraph />
//           <div className="mt-5">
//             <Typography size="h5" className="font-bold">
//               Subscriber List
//             </Typography>
//             <div className="shadow-[0_0_10px_rgba(0,0,0,0.15)] mt-3 rounded-xl">
//               <Subscriber />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PharmacyDetails
