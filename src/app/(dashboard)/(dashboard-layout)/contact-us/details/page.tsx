// "use client";

// import React, { useState } from "react";
// import { Typography } from "@/components/shared/typography";
// import { contactusTable } from "@/data";
// import { ContactUs } from "@/types/dashboard";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/shared/button";
// import CustomDropdown from "@/components/shared/custom-dropdown";

// const ContactUsDetailsPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const contact = (contactusTable.rowsData as ContactUs[]).find(
//     (item) => item?.id?.toString() === id
//   );

//   const [assignedTo, setAssignedTo] = useState("Billing Team");

//   if (!contact)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
//         <Typography as="h3" size="h3">
//           No Data Found
//         </Typography>
//         <Button onClick={() => router.back()}>Go Back</Button>
//       </div>
//     );

//   return (
//     <div className="flex flex-col gap-8">
//       {/* Header */}
//       <div className="flex justify-between max-md:flex-col max-md:gap-3 items-start">
//         <div>
//           <Typography as="h2" size="h3" className="font-bold text-gray-900">
//             Ticket #{contact.Ticket} — {contact.title}
//           </Typography>
//           <Typography as="p" size="md" className="text-gray-500 mt-1">
//             Detailed Inquiry And Status Management
//           </Typography>
//         </div>
//         <div
//           className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
//             contact.Status?.toLowerCase() === "resolved"
//               ? "bg-green-500"
//               : contact.Status?.toLowerCase() === "in progress"
//               ? "bg-orange-400"
//               : "bg-gray-400"
//           }`}
//         >
//           {contact.Status}
//         </div>
//       </div>

//       {/* White Section */}
//       <div className="bg-white p-8 h-[100vh] rounded-xl shadow-sm flex flex-col gap-6">
//         {/* Assign To */}
//         <div>
//           <Typography as="p" className="mb-2 font-medium text-gray-700">
//             Assign to
//           </Typography>
//           {/* <CustomDropdown
//             placeholder="Select team"
//             value={assignedTo}
//             options={["Billing Team", "Support Team", "Technical Team"]}
//             onChange={(val: string) => setAssignedTo(val)}
//           /> */}

//         </div>

//         {/* Billing + Message Boxes */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Billing Box */}
//           <div className="border border-gray-200 rounded-xl p-6 bg-white">
//             <div className="flex justify-between">
//               <div>
//                 <Typography as="h5" className="font-semibold text-gray-800">
//                   Billing
//                 </Typography>
//                 <Typography
//                   as="p"
//                   className="text-gray-500 text-sm mt-1"
//                 >{`Received: ${contact.Date} — 10:30 AM`}</Typography>
//                 <Typography as="p" className="text-gray-500 text-sm">
//                   Assigned To: {assignedTo}
//                 </Typography>
//               </div>
//               <div>
//                 <Typography as="p" className="text-gray-800 font-semibold text-sm">
//                 ID: {contact.Ticket}
//               </Typography>
//                <div className="mt-2">
//               <span className="bg-gray-100 px-3 py-1 rounded text-xs font-medium text-gray-700">
//                 💳 Visa Card
//               </span>
//               </div>

//             </div>

//             </div>
//           </div>

//           {/* Message Box */}
//           <div className="border border-gray-200 rounded-xl p-6 bg-white">
//             <Typography as="h5" className="font-semibold text-gray-800 mb-2">
//               Message
//             </Typography>
//             <Typography as="p" className="text-gray-600 text-sm leading-relaxed">
//               {contact.desc?.length > 200
//                 ? contact.desc.slice(0, 200) + "..."
//                 : contact.desc}
//               {contact.desc?.length > 200 && (
//                 <span className="text-primary-color ml-1 cursor-pointer">
//                   View More
//                 </span>
//               )}
//             </Typography>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 pt-4">
//           <button
//             // variant="secondary"
//             className="bg-gray-200  hover:bg-gray-300 w-[180px] flex items-center justify-center rounded-lg py-3"
//             onClick={() => router.back()}
//           >
//             Close
//           </button>
//           <button
//             // variant="primary"
//             className="bg-primary-color text-white hover:opacity-90 px-6 flex items-center justify-center rounded-lg py-3"
//           >
//             Mark as Resolved
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUsDetailsPage;

"use client";

import React, { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { contactusTable } from "@/data";
import { ContactUs } from "@/types/dashboard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/button";
import CustomDropdown from "@/components/shared/custom-dropdown";
import ContactCard from "@/components/shared/contact/contact-card";
import ActivityLogStepper from "@/components/shared/contact/stepper";
import BillingStatusDemo from "@/components/shared/contact/billing";

const ContactUsDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const contact = (contactusTable.rowsData as ContactUs[]).find(
    (item) => item?.id?.toString() === id,
  );

  const [assignedTo, setAssignedTo] = useState("Billing Team");
  const [message, setMessage] = useState(contact?.desc || ""); // Initialize with contact desc for editing

  if (!contact)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Typography as="h3" size="h3">
          No Data Found
        </Typography>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );

  // Function to get status color class dynamically
  const getStatusClass = (status: string) => {
    const lowerStatus = status?.toLowerCase().trim();
    if (lowerStatus === "resolved") return "bg-secondary-color";
    if (lowerStatus === "in progress" || lowerStatus === "in-progress")
      return "bg-orange-400";
    if (lowerStatus === "archived") return "bg-red";
    if (lowerStatus === "open") return "bg-primary-color";
    return "bg-gray-400"; // Default for any unmatched status
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between max-md:flex-col max-md:gap-3 items-start">
        <div>
          <Typography as="h2" size="h3" className="font-bold text-gray-900">
            {/* Ticket #{contact.Ticket} — {contact.title} */}
            Ticket #SUP-1023 — Payment Not Processed
          </Typography>
          <Typography as="p" size="md" className="text-gray-500 mt-1">
            Detailed Inquiry And Status Management
          </Typography>
        </div>
        <div
          className={`px-4 py-2 rounded-full text-lg font-medium text-white ${getStatusClass(contact.Status)}`}
        >
          {contact.Status}
        </div>
      </div>

      {/* White Section */}
      <div className="bg-white p-8  rounded-xl shadow-sm flex flex-col gap-6">
        {/* Assign To */}
        <div>
          <Typography as="p" className="mb-2 font-medium text-gray-700">
            Assign to
          </Typography>
          <BillingStatusDemo />
          {/* <CustomDropdown
            placeholder="Select team"
            value={assignedTo}
            options={["Billing Team", "Support Team", "Technical Team"]}
            onChange={(val: string) => setAssignedTo(val)}
          /> */}
        </div>

        {/* Billing + Message Boxes */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <div className="flex justify-between">
              <div>
                <Typography as="h5" className="font-semibold text-gray-800">
                  Billing
                </Typography>
                <Typography
                  as="p"
                  className="text-gray-500 text-sm mt-1"
                >{`Received: ${contact.Date} — 10:30 AM`}</Typography>
                <Typography as="p" className="text-gray-500 text-sm">
                  Assigned To: {assignedTo}
                </Typography>
              </div>
              <div>
                <Typography
                  as="p"
                  className="text-gray-800 font-semibold text-sm"
                >
                  ID: {contact.Ticket}
                </Typography>
                <div className="mt-2">
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs font-medium text-gray-700">
                    💳 Visa Card
                  </span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <Typography as="h5" className="font-semibold text-gray-800 mb-2">
              Message
            </Typography>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md text-sm text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="Type your message here..."
            />
          </div>
        </div> */}
        <div className="flex max-md:flex-col max-md:gap-10 gap-[160px]">
          <div className=" basis-[33%]">
            <Typography size="h6" className="font-bold underline pt-4">
              Complain Details
            </Typography>
            <div className="flex justify-between pt-3">
              <div className="space-y-1">
                <Typography className="font-bold text-md ">
                  Requester Name
                </Typography>
                <Typography className="font-bold text-md ">
                  User Type
                </Typography>
                <Typography className="font-bold text-md ">
                  Internal User ID
                </Typography>
                <Typography className="font-bold text-md ">Email</Typography>
                <Typography className="font-bold text-md ">Phone</Typography>
                <Typography className="font-bold text-md ">
                  Country / City
                </Typography>
              </div>
              <div className="space-y-1">
                <Typography className="font-semibold text-desc-color">
                  2 Dec 2025 – 14:42
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  Patient{" "}
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  41 min
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  MedFast Logistics
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  TRK-88-002341
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  Delivered intact
                </Typography>
              </div>
            </div>
          </div>
          <div className="basis-[33%]">
            <Typography size="h6" className="font-bold underline pt-4">
              Business Context
            </Typography>
            <div className="flex justify-between pt-3">
              <div className="space-y-1">
                <Typography className="font-bold text-md ">
                  Payment ID
                </Typography>
                <Typography className="font-bold text-md ">
                  Booking ID
                </Typography>
                <Typography className="font-bold text-md ">
                  Prescription ID
                </Typography>
                <Typography className="font-bold text-md ">
                  Consultation ID
                </Typography>
              </div>
              <div className="space-y-1">
                <Typography className="font-semibold text-desc-color">
                  #12**4589
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  Alexis J.
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  41 Year
                </Typography>
                <Typography className="font-semibold text-desc-color">
                  Male
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Typography size="h6" className="font-bold underline pt-4 pb-2">
            Messages
          </Typography>
          <ContactCard />
        </div>
        <div>
          <Typography size="h6" className="font-bold underline pt-4 pb-2">
            Internal Notes
          </Typography>
          <div className="border px-4 py-5 rounded-xl space-y-1">
            <Typography className="font-bold">Notes</Typography>
            <Typography className="text-desc-color font-medium">
              For questions about ourFor questions about our For questions about
              ourFor questions about ourFor questions about our.
            </Typography>
            <Typography className="text-primary-color underline font-semibold">
              Add Notes
            </Typography>
          </div>
        </div>
        <div>
          <ActivityLogStepper />
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            className="bg-gray-200 hover:bg-gray-300 w-[180px] flex items-center justify-center rounded-lg py-3"
            onClick={() => router.back()}
          >
            Close
          </Button>
          <Button className="bg-primary-color text-white hover:opacity-90 px-6 flex items-center justify-center rounded-lg py-3">
            Complain Resolved
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsDetailsPage;
