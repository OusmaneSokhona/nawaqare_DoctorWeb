// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import { Duration, servicePricingCards } from "@/data";
// import { Icon } from "@iconify/react";
// import React from "react";

// const ServicePricing = () => {
//   return (
//     <div>
//       <div className="flex justify-between">
//         <div>
//           <Typography size="h3" as="h3">
//             Services & pricing
//           </Typography>
//           <Typography size="lg" className="text-desc-color">
//             This is a preview of the patient’s booking view
//           </Typography>
//         </div>
//         <Button className="bg-primary-color text-white rounded-xl h-[50px]">
//           Add Service
//         </Button>
//       </div>
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Availability per Service
//         </Typography>
//         <div className="space-y-5 pt-3">
//           {servicePricingCards.map((d, i) => (
//             <div
//               key={i}
//               className="bg-white flex justify-between shadow-md rounded-xl px-4 py-5"
//             >
//               <div className="space-y-[5px]">
//                 <Typography size="lg" className="font-semibold text-[#1F2A37]">
//                   {d.title}
//                 </Typography>
//                 <div className="flex gap-1 items-center">
//                   <Icon
//                     className="text-primary-color"
//                     icon={d.icon}
//                     width="24"
//                     height="24"
//                   />
//                   <Typography size="md" className="text-[#2C2C2C] font-medium">
//                     {d.desc}
//                   </Typography>
//                 </div>
//                 <div className="flex gap-1">
//                   <Typography className="text-[#4F4F4F] font-bold">
//                     {d.subTitle}:
//                   </Typography>
//                   <Typography className="text-desc-color font-medium">
//                     {d.type}
//                   </Typography>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                   <Icon
//                     className="text-primary-color"
//                     icon={d.icon2}
//                     width="24"
//                     height="24"
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     {d.day}
//                   </Typography>
//                 </div>
//               </div>
//               <Icon
//                 className="text-primary-color"
//                 icon="flowbite:edit-outline"
//                 width="24"
//                 height="24"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Duration & Pricing
//         </Typography>
//         <div className="space-y-5 pt-3">
//           {Duration.map((d, i) => (
//             <div
//               key={i}
//               className="bg-white flex justify-between shadow-md rounded-xl px-4 py-5"
//             >
//               <div className="space-y-[5px]">
//                 <Typography size="lg" className="font-semibold text-[#1F2A37]">
//                   {d.title}
//                 </Typography>
//                 <div className="flex gap-1 items-center">
//                   <Typography className="text-[#4F4F4F] font-bold">
//                     {d.subTilte}:
//                   </Typography>
//                   <Typography className="text-desc-color font-medium">
//                     {d.price}
//                   </Typography>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                   <Icon
//                     className="text-primary-color"
//                     icon={d.icon}
//                     width="24"
//                     height="24"
//                   />
//                   <Typography className="font-medium">{d.time}</Typography>
//                 </div>
//               </div>
//               <Icon
//                 className="text-primary-color"
//                 icon="flowbite:edit-outline"
//                 width="24"
//                 height="24"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Global Policies
//         </Typography>
//         <div className="pt-4">
//             <Typography className="pb-2 font-semibold">Minimum booking notice</Typography>
//             <div className="bg-white rounded-xl px-2 py-3">
//                 <Typography className="text-[#4F4F4F] font-medium">2 hours</Typography>
//             </div>
//         </div>
//         <div className="pt-4">
//             <Typography className="pb-2 font-semibold">buffer time</Typography>
//             <div className="bg-white rounded-xl px-2 py-3">
//                 <Typography className="text-[#4F4F4F] font-medium">10 mint</Typography>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicePricing;
// "use client";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import { Duration, servicePricingCards } from "@/data";
// import { Icon } from "@iconify/react";
// import React, { useState } from "react";

// const ServicePricing = () => {
//   const [openPolicy, setOpenPolicy] = useState<string | null>(null); // which policy is open
//   const [selectedPolicy, setSelectedPolicy] = useState<Record<string, string>>({}); // selected data

//   const policies = [
//     { key: "minimumBooking", title: "Minimum booking notice", options: ["2 hours", "4 hours", "6 hours"] },
//     { key: "bufferTime", title: "Buffer time", options: ["10 min", "15 min", "30 min"] },
//   ];

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between">
//         <div>
//           <Typography size="h3" as="h3">
//             Services & Pricing
//           </Typography>
//           <Typography size="lg" className="text-desc-color">
//             This is a preview of the patient’s booking view
//           </Typography>
//         </div>
//         <Button className="bg-primary-color text-white rounded-xl h-[50px]">
//           Add Service
//         </Button>
//       </div>

//       {/* Availability per Service */}
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Availability per Service
//         </Typography>
//         <div className="space-y-7 pt-5">
//           {servicePricingCards.map((d, i) => (
//             <div
//               key={i}
//               className="bg-white flex justify-between shadow rounded-xl px-4 py-5 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
//             >
//               <div className="space-y-[5px]">
//                 <Typography size="lg" className="font-semibold text-[#1F2A37]">
//                   {d.title}
//                 </Typography>
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={d.icon} width="24" height="24" />
//                   <Typography size="md" className="text-[#2C2C2C] font-medium">
//                     {d.desc}
//                   </Typography>
//                 </div>
//                 <div className="flex gap-1">
//                   <Typography className="text-[#4F4F4F] font-bold">{d.subTitle}:</Typography>
//                   <Typography className="text-desc-color font-medium">{d.type}</Typography>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={d.icon2} width="24" height="24" />
//                   <Typography className="text-[#2C2C2C] font-medium">{d.day}</Typography>
//                 </div>
//               </div>
//               <Icon className="text-primary-color" icon="flowbite:edit-outline" width="24" height="24" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Duration & Pricing */}
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Duration & Pricing
//         </Typography>
//         <div className="space-y-7 pt-5">
//           {Duration.map((d, i) => (
//             <div
//               key={i}
//               className="bg-white flex justify-between shadow rounded-xl px-4 py-5 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
//             >
//               <div className="space-y-[5px]">
//                 <Typography size="lg" className="font-semibold text-[#1F2A37]">
//                   {d.title}
//                 </Typography>
//                 <div className="flex gap-1 items-center">
//                   <Typography className="text-[#4F4F4F] font-bold">{d.subTilte}:</Typography>
//                   <Typography className="text-desc-color font-medium">{d.price}</Typography>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={d.icon} width="24" height="24" />
//                   <Typography className="font-medium">{d.time}</Typography>
//                 </div>
//               </div>
//               <Icon className="text-primary-color" icon="flowbite:edit-outline" width="24" height="24" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Global Policies */}
//       <div className="pt-6 pb-4">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Global Policies
//         </Typography>

//         <div className="pt-4 space-y-3">
//           {policies.map((p) => {
//             const isOpen = openPolicy === p.key;
//             return (
//               <div key={p.key}>
//                 <div
//                   className="bg-white rounded-xl px-3 py-3 flex justify-between items-center cursor-pointer"
//                   onClick={() => setOpenPolicy(isOpen ? null : p.key)}
//                 >
//                   <Typography className="font-semibold">{p.title}</Typography>
//                   <Icon
//                     icon="material-symbols:keyboard-arrow-down"
//                     width="24"
//                     height="24"
//                     className={`text-primary-color transition-transform duration-300 ${
//                       isOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </div>

//                 {/* Dropdown */}
//                 {isOpen && (
//                   <div className="bg-white mt-1 rounded-xl shadow-md px-3 py-2 space-y-2">
//                     {p.options.map((opt) => (
//                       <div
//                         key={opt}
//                         className={`px-2 py-1 rounded cursor-pointer ${
//                           selectedPolicy[p.key] === opt ? "bg-primary-color text-white" : "hover:bg-gray-200"
//                         }`}
//                         onClick={() =>
//                           setSelectedPolicy((prev) => ({ ...prev, [p.key]: opt }))
//                         }
//                       >
//                         {opt}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicePricing;
// "use client";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import { Duration, servicePricingCards } from "@/data";
// import { Icon } from "@iconify/react";
// import React, { useState } from "react";

// const ServicePricing = () => {
//   const [openPolicy, setOpenPolicy] = useState<string | null>(null); // currently open policy
//   const [selectedPolicy, setSelectedPolicy] = useState<Record<string, string>>({}); // selected option per policy

//   const policies = [
//     {
//       key: "minimumBooking",
//       title: "Minimum booking notice",
//       options: ["2 hours", "4 hours", "6 hours"],
//     },
//     { key: "bufferTime", title: "Buffer time", options: ["10 min", "15 min", "30 min"] },
//   ];

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between">
//         <div>
//           <Typography size="h3" as="h3">
//             Services & Pricing
//           </Typography>
//           <Typography size="lg" className="text-desc-color">
//             This is a preview of the patient’s booking view
//           </Typography>
//         </div>
//         <Button className="bg-primary-color text-white rounded-xl h-[50px]">
//           Add Service
//         </Button>
//       </div>

//       {/* Availability per Service */}
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Availability per Service
//         </Typography>
//         <div className="space-y-7 pt-5">
//           {servicePricingCards.map((d, i) => (
//             <div
//               key={i}
//               className="bg-white flex justify-between shadow rounded-xl px-4 py-5 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
//             >
//               <div className="space-y-[5px]">
//                 <Typography size="lg" className="font-semibold text-[#1F2A37]">
//                   {d.title}
//                 </Typography>
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={d.icon} width="24" height="24" />
//                   <Typography size="md" className="text-[#2C2C2C] font-medium">
//                     {d.desc}
//                   </Typography>
//                 </div>
//                 <div className="flex gap-1">
//                   <Typography className="text-[#4F4F4F] font-bold">{d.subTitle}:</Typography>
//                   <Typography className="text-desc-color font-medium">{d.type}</Typography>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={d.icon2} width="24" height="24" />
//                   <Typography className="text-[#2C2C2C] font-medium">{d.day}</Typography>
//                 </div>
//               </div>
//               <Icon className="text-primary-color" icon="flowbite:edit-outline" width="24" height="24" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Duration & Pricing */}
//       <div className="pt-6">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Duration & Pricing
//         </Typography>
//         <div className="space-y-7 pt-5">
//           {Duration.map((d, i) => (
//             <div
//               key={i}
//               className="bg-white flex justify-between shadow rounded-xl px-4 py-5 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
//             >
//               <div className="space-y-[5px]">
//                 <Typography size="lg" className="font-semibold text-[#1F2A37]">
//                   {d.title}
//                 </Typography>
//                 <div className="flex gap-1 items-center">
//                   <Typography className="text-[#4F4F4F] font-bold">{d.subTilte}:</Typography>
//                   <Typography className="text-desc-color font-medium">{d.price}</Typography>
//                 </div>
//                 <div className="flex gap-1 items-center">
//                   <Icon className="text-primary-color" icon={d.icon} width="24" height="24" />
//                   <Typography className="font-medium">{d.time}</Typography>
//                 </div>
//               </div>
//               <Icon className="text-primary-color" icon="flowbite:edit-outline" width="24" height="24" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Global Policies */}
//       <div className="pt-6 pb-4">
//         <Typography size="h4" className="font-semibold text-[#2C2C2C]">
//           Global Policies
//         </Typography>

//         <div className="pt-4 space-y-3">
//           {policies.map((p) => {
//             const isOpen = openPolicy === p.key;
//             return (
//               <div key={p.key}>
//                 {/* Policy Row */}
//                 <div>
//                     <Typography className="font-semibold">{p.title}</Typography>
//                 <div
//                   className=" bg-white rounded-xl px-3 py-3 flex justify-between items-center cursor-pointer mt-2"
//                   onClick={() => setOpenPolicy(isOpen ? null : p.key)}
//                 >

//                   <Typography className="text-[#4F4F4F] font-medium">
//                     {selectedPolicy[p.key] || p.options[0]}
//                   </Typography>
//                   <Icon
//                     icon="material-symbols:keyboard-arrow-down"
//                     width="24"
//                     height="24"
//                     className={`text transition-transform duration-300 ${
//                       isOpen ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </div>
//                </div>
//                 {/* Dropdown */}
//                 {isOpen && (
//                   <div className="bg-white mt-1 rounded-xl shadow-md px-3 py-2 space-y-2">
//                     {p.options.map((opt) => (
//                       <div
//                         key={opt}
//                         className="px-2 py-1 rounded cursor-pointer hover:bg-gray-200"
//                         onClick={() => {
//                           setSelectedPolicy((prev) => ({ ...prev, [p.key]: opt }));
//                           setOpenPolicy(null); // close dropdown after selection
//                         }}
//                       >
//                         {opt}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicePricing;
// "use client";

// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import { useState } from "react";

// export default function CreateConsultation() {
//   const [mode, setMode] = useState("tele");
//   const [priceType, setPriceType] = useState("free");
//   const [status, setStatus] = useState("active");

//   return (
//     <div>
//       <div className="flex items-center max-md:flex-col max-md:gap-3 justify-between pt-4 ">
//               <div>
//                 <Typography size="h3" as="h3">
//                   Configure a Service
//                 </Typography>
//                 <Typography size="lg" className="text-desc-color">
//                   Allow the doctor to customize the organization, not the medical aspects.
//                 </Typography>
//               </div>
//               <Button className=" flex items-center justify-center py-2 font-bold rounded-xl bg-primary-color">
//                 <Typography className="text-white">Add Service</Typography>
//               </Button>
//             </div>
//       <div className=" flex justify-center py-5">

//       <div className="w-full  bg-white rounded-xl shadow-sm p-6 space-y-6">
//         {/* Patient-visible information */}
//         <Section title="Patient-visible information">
//           <label className="text-lg font-medium">Consultation reason</label>
//           <input
//             type="text"
//             placeholder="General consultation"
//             className="input ml-4 py-3 rounded-xl border outline-none px-3"
//           />
//           <p className="text text-gray-500">
//             This label is displayed to patients during appointment booking.
//           </p>
//         </Section>

//         {/* Consultation mode */}
//         <Section title="Consultation mode">
//           <Radio
//             label="Tele consultation"
//             checked={mode === "tele"}
//             onChange={() => setMode("tele")}
//           />
//           <Radio
//             label="In person visit"
//             checked={mode === "person"}
//             onChange={() => setMode("person")}
//           />
//           <Radio
//             label="Home visit"
//             checked={mode === "home"}
//             onChange={() => setMode("home")}
//             hint="Only one mode allowed per service"
//           />
//         </Section>

//         {/* Consultation framework */}
//         <Section title="Consultation framework">
//           <label className="text-lg font-medium">Consultation type</label>
//           <input
//             type="text"
//             placeholder="Initial consultation"
//             className="input border rounded-xl py-3 px-2 outline-none ml-4"
//           />
//           <p className="text text-gray-500">
//             Defined by the platform, not editable.
//           </p>
//         </Section>

//         {/* Organization */}
//         <Section title="Organization">
//           {["15 minutes", "30 minutes", "45 minutes"].map((t) => (
//             <Radio key={t} label={t} />
//           ))}
//           <p className="text text-gray-500">
//             Minimum booking gap: 0–2 hours
//           </p>
//         </Section>

//         {/* Pricing */}
//         <Section title="Pricing">
//           <div className="grid grid-cols-3 gap-4">
//             <input type="number" placeholder="50" className="input border py-3 outline-none rounded-xl px-2" />
//             <select className="input border py-3 rounded-xl outline-none px-2">
//               <option>USD</option>
//               <option>PKR</option>
//             </select>
//             <div />
//           </div>

//           <Radio
//             label="Free consultation"
//             checked={priceType === "free"}
//             onChange={() => setPriceType("free")}
//           />
//           <Radio
//             label="Paid consultation"
//             checked={priceType === "paid"}
//             onChange={() => setPriceType("paid")}
//           />
//           <Radio label="No insurance network here" />
//         </Section>

//         {/* Status */}
//         <Section title="Status">
//           <Radio
//             label="Active"
//             checked={status === "active"}
//             onChange={() => setStatus("active")}
//           />
//           <Radio
//             label="Inactive"
//             checked={status === "inactive"}
//             onChange={() => setStatus("inactive")}
//           />
//           <Radio label="No insurance network here" />
//         </Section>

//         {/* Footer */}
//         <div className="flex justify-end  gap-3 pt-4">
//           <button className="px-5 py-2 bg-[#DEDCE7] rounded-lg border text">
//             Cancel
//           </button>
//           <button className="px-5 py-2 rounded-lg bg-primary-color text-white text">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// /* ================== Reusable Components ================== */

// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="border rounded-lg p-4 space-y-3">
//       <h3 className="text- font-semibold text-gray-800">{title}</h3>
//       {children}
//     </div>
//   );
// }

// function Radio({
//   label,
//   checked,
//   onChange,
//   hint,
// }: {
//   label: string;
//   checked?: boolean;
//   onChange?: () => void;
//   hint?: string;
// }) {
//   return (
//     <label className="flex items-start gap-2 text-sm cursor-pointer">
//       <input
//         type="radio"
//         checked={checked}
//         onChange={onChange}
//         className="mt-1 accent-blue-600"
//       />
//       <div>
//         <p>{label}</p>
//         {hint && <p className="text-xs text-gray-500">{hint}</p>}
//       </div>
//     </label>
//   );
// }

"use client";

import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { useRef, useState } from "react";
import { axiosClient } from "@/api/base";

export default function CreateConsultation() {
  const [mode, setMode] = useState("tele");
  const [priceType, setPriceType] = useState("paid");
  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const reasonRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between py-6">
        <div>
          <Typography size="h3" as="h3" className="font-bold text-[#1F2A37]">
            Configure a Service
          </Typography>
          <Typography size="lg" className="text-gray-500 font-medium">
            Allow The Doctor To Customize The Organization, Not The Medical
            Aspects.
          </Typography>
        </div>
        <Button className="px-6 py-2 font-bold rounded-lg bg-[#3b82f6] hover:bg-blue-600 transition-colors">
          <Typography className="text-white text-sm">Add Service</Typography>
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Patient-visible information */}
        <Section title="Patient-visible information">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#374151]">
              Consultation reason
            </label>
            <input
              type="text"
              ref={reasonRef}
              defaultValue="General consultation"
              className="w-full py-3 px-4 rounded-xl bg-[#F9FAFB] border border-gray-100 outline-none text-gray-700"
            />
            <p className="text-[12px] text-gray-400">
              This label is displayed to patients during appointment booking.
            </p>
          </div>
        </Section>

        {/* Consultation mode */}
        <Section title="Consultation mode">
          <div className="space-y-3">
            <Radio
              label="Teleconsultation"
              checked={mode === "tele"}
              onChange={() => setMode("tele")}
            />
            <Radio
              label="In-person"
              checked={mode === "person"}
              onChange={() => setMode("person")}
            />
            <Radio
              label="Home visit"
              checked={mode === "home"}
              onChange={() => setMode("home")}
            />
            <div className="flex items-center gap-1 text-gray-500 text-[11px] font-bold mt-1">
              <span className="text-sm">📌</span> Only one mode allowed per
              service (V1).
            </div>
          </div>
        </Section>

        {/* Consultation framework */}
        <Section title="Consultation framework">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#374151]">
              Consultation type
            </label>
            <input
              type="text"
              defaultValue="Initial consultation"
              readOnly
              className="w-full py-3 px-4 rounded-xl bg-[#F9FAFB] border border-gray-100 outline-none text-gray-400 cursor-not-allowed"
            />
            <p className="text-[12px] text-gray-400">
              Defined by the platform, not editable.
            </p>
          </div>
        </Section>

        {/* Organization */}
        <Section title="Organization">
          <div className="space-y-3">
            <Radio label="15 minutes" name="time" />
            <Radio label="20 minutes" name="time" />
            <Radio label="30 minutes" name="time" defaultChecked />
            <p className="text-[12px] text-gray-400 mt-2">
              Minimum booking delay (e.g., 2 hours)
            </p>
          </div>
        </Section>

        {/* Pricing */}
        <Section title="Pricing">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <select className="w-full py-3 px-4 rounded-xl bg-white border border-gray-200 outline-none appearance-none font-medium">
                <option>50</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>
            <div className="relative flex-1">
              <select className="w-full py-3 px-4 rounded-xl bg-white border border-gray-200 outline-none appearance-none font-medium">
                <option>USD</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Radio
              label="Free consultation"
              checked={priceType === "free"}
              onChange={() => setPriceType("free")}
            />
            <Radio
              label="Paid consultation"
              checked={priceType === "paid"}
              onChange={() => setPriceType("paid")}
            />
            <div className="flex items-center gap-1 text-gray-300 text-[11px] font-bold">
              <span className="text-sm">📌</span> No insurance mention here.
            </div>
          </div>
        </Section>

        {/* Status */}
        <Section title="Status">
          <div className="space-y-3">
            <Radio
              label="Active"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />
            <Radio
              label="Inactive"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
            />
            <div className="flex items-center gap-1 text-gray-300 text-[11px] font-bold">
              <span className="text-sm">📌</span> No insurance mention here.
            </div>
          </div>
        </Section>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Notify affected patients
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Refund policy still applied
          </label>
        </div>

        {saved && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            Service configuration saved.
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            className="px-10 py-2 bg-[#E5E7EB] text-[#374151] font-bold rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => setSaved(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-10 py-2 bg-[#3b82f6] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:opacity-60"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              setSaved(false);
              try {
                await axiosClient.post("/api/v1/doctors/me/services", {
                  reason: reasonRef.current?.value ?? "General consultation",
                  mode,
                  price_type: priceType,
                  status,
                });
              } catch (_) {}
              setSaved(true);
              setSaving(false);
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================== Reusable Components ================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-50 p-6 space-y-4">
      <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
      {children}
    </div>
  );
}

function Radio({ label, checked, onChange, name, defaultChecked }: any) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          defaultChecked={defaultChecked}
          className="peer appearance-none w-5 h-5 border-2 border-blue-500 rounded-full checked:bg-white transition-all cursor-pointer"
        />
        <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
      </div>
      <span className="group-hover:text-blue-600 transition-colors">
        {label}
      </span>
    </label>
  );
}
