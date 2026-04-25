// "use client";
// import React, { useState } from "react";
// import { Typography } from "../typography";
// // import Progress from "./Progress";
// // import AssignedCaretaker from "./AssignedCaretaker";
// // import Invoices from "./Invoices";
// // import Overview from "./Overview";
// import { usePathname } from "next/navigation";
// // import Document from "./Document";
// // import AssignedClient from "./AssignedClient";
// // import TimeSheet from "./TimeSheet";
// // import Payroll from "./Payroll";
// // import { CalendarForm } from "../calendar";
// import { ChevronDownIcon } from "@radix-ui/react-icons";
// import Analytics from "../patient-details/analytics-pat";
// import Consultations from "../patient-details/appointment";
// import PaymentHistory from "../patient-details/payment-history";
// import AnalyticsPat from "../patient-details/analytics-pat";
// import AnalyticsDoc from "../doctor-details/analytics-doc";
// import Documents from "../doctor-details/documents";
// import DocPatients from "../doctor-details/doc-patients";
// import SubscriptionDetail from "../doctor-details/subs-details";
// import PatientMedicalSummary from "../patient-details/medical-data";
// import Appointments from "../patient-details/appointment";
// import Prescriptions from "../patient-details/prescriptions";
// import DocConsultations from "../doctor-details/doc-consultations";

// // Type for tabs
// export interface Tab {
//   label: string; // identifier used internally
//   value: string; // display text
// }

// // Type for options inside dropdown
// interface Option {
//   key: string;
//   label: string;
// }

// // Props for CustomTabs
// interface CustomTabsProps {
//   tabs: Tab[];
//   client?: Record<string, unknown>; // You can replace with a proper Client type if available
// }

// const CustomTabs: React.FC<CustomTabsProps> = ({ tabs = [], client }) => {
//   const pathname = usePathname();
//   const [selectedOption, setSelectedOption] = useState<string>("All");

//   const [activeTab, setActiveTab] = useState<string>(
//     pathname.startsWith("/patients/details")
//       ? "analyticsp"
//       : pathname.startsWith("/doctors/details")
//         ? "analyticsd"
//         : "document"
//   );

//   const options: Option[] = [
//     { key: "pending", label: "Pending" },
//     { key: "approved", label: "Approved" },
//     { key: "rejected", label: "Rejected" },
//   ];

//   const returnComponent = (label: string): React.ReactNode => {
//     switch (label) {
//       case "analyticsp":
//         return <AnalyticsPat />;
//       case "analyticsd":
//         return <AnalyticsDoc />;
//       case "appointments":
//         return <Appointments />;
//          case "patient":
//         return <PatientMedicalSummary />;
//         case "Prescriptions":
//           return <Prescriptions />
//       case "payment_history":
//         return <PaymentHistory />;
//       case "documents":
//         return <Documents />;
//       case "patients":
//         return <DocPatients />;
//         case "consultations":
//         return <DocConsultations />;
//       case "subscription":
//         return <SubscriptionDetail />;
//       //   case "document":
//       //     return <Document />;
//       //   case "assignedClient":
//       //     return <AssignedClient />;
//       //   case "timesheet":
//       //     return <TimeSheet />;
//       //   case "payroll":
//       //     return <Payroll />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {/* Tabs */}
//       <div className="flex max-md:flex-col gap-7">
//         {tabs.map((tab, i) => (
//           <div
//             className="relative"
//             key={i}
//             onClick={() => setActiveTab(tab.label)}
//           >
//             <Typography
//               className={`text-h6 font-bold cursor-pointer ${
//                 activeTab === tab.label
//                   ? "text-primary-color after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-3.5 after:z-10 after:h-[2px] after:mx-auto after:bg-primary-color after:translate-y-6"
//                   : "text-desc-color"
//               }`}
//             >
//               {tab.value}
//             </Typography>
//           </div>
//         ))}
//       </div>

//       {/* Divider */}
//       <hr className="my-2 bg-[#F2F1F2] text-[#F2F1F2] h-[5px]" />

//       {/* Filters for specific tabs */}
//       {["timesheet", "progress", "payroll"].includes(activeTab) && (
//         <div className="flex justify-end gap-6 items-center pr-16 max-md:pr-0 max-md:justify-between">
//           {/* <CalendarForm /> */}
//           {activeTab === "payroll" ? null : (
//             <div className="relative group inline-block w-[138px]">
//               <div className="cursor-pointer h-12 px-4 py-2 border rounded-md bg-[#e5eff1] shadow-sm hover:bg-white transition flex justify-between gap-2">
//                 {selectedOption}
//                 <ChevronDownIcon className="h-6 w-6 text-[#002446]" />
//               </div>

//               <div
//                 className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 opacity-0 scale-95 invisible
//                 group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out"
//               >
//                 <ul className="py-1 text-sm text-gray-700">
//                   {options.map((opt) => (
//                     <li
//                       key={opt.key}
//                       onClick={() => setSelectedOption(opt.label)}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {opt.label}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Active tab content */}
//       <div className="overflow-y-auto h-[calc(60vh-90px)]">
//         {returnComponent(activeTab)}
//       </div>
//     </div>
//   );
// };

// export default CustomTabs;

"use client";
import React, { useState } from "react";
import { Typography } from "../typography";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import AnalyticsPat from "../patient-details/analytics-pat";
import Note from "../patient-details/patient-note";
import AnalyticsDoc from "../doctor-details/analytics-doc";
import Documents from "../doctor-details/documents";
import DocPatients from "../doctor-details/doc-patients";
import SubscriptionDetail from "../doctor-details/subs-details";
import PatientMedicalSummary from "../patient-details/medical-data";
import Appointments from "../patient-details/appointment";
import Prescriptions from "../patient-details/prescriptions";
import DocConsultations from "../doctor-details/doc-consultations";
import PaymentHistory from "../patient-details/payment-history";
import DocotorPrescription from "../doctor-details/doc-prescription";
import DoctorPayment from "../doctor-details/doc-payment";
import Reports from "../patient-details/Reports";
import Consent from "../patient-details/patient-consent";
import Timeline from "../patient-details/timeline";
import { Icon } from "@iconify/react";

export interface Tab {
  label: string;
  value: string;
  lock?: boolean;
}

interface Option {
  key: string;
  label: string;
}

interface CustomTabsProps {
  tabs: Tab[];
  client?: Record<string, unknown>;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs = [], client }) => {
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const [activeTab, setActiveTab] = useState<string>(
    pathname.startsWith("/patients/details")
      ? "analyticsp"
      : pathname.startsWith("/doctors/details")
        ? "analyticsd"
        : "document",
  );

  const options: Option[] = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  const returnComponent = (label: string): React.ReactNode => {
    switch (label) {
      case "analyticsp":
        return <AnalyticsPat />;
      case "timeline":
        return <Timeline />;
      case "Notes":
        return <Note />;
      case "Consent":
        return <Consent />;
      case "analyticsd":
        return <AnalyticsDoc />;
      case "Reports":
        return <Reports />;
      case "appointments":
        return <Appointments />;
      case "patient":
        return <PatientMedicalSummary />;
      case "Prescriptions":
        return <Prescriptions />;
      case "doctorPrescription":
        return <DocotorPrescription />;
      case "payment_history":
        return <PaymentHistory />;
      case "payment_historyd":
        return <DoctorPayment />;
      case "documents":
        return <Documents />;
      case "patients":
        return <DocPatients />;
      case "consultations":
        return <DocConsultations />;
      case "subscription":
        return <SubscriptionDetail />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex max-md:flex-col gap-5 mb-4">
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(tab.label)}
            className="relative flex items-center gap-1"
          >
            {tab?.lock && (
              <Icon
                icon="ic:baseline-lock"
                width="14"
                height="14"
                className={`${activeTab === tab.label ? "text-primary-color" : "text-desc-color"}`}
              />
            )}
            <Typography
              className={`text-sm 2xl:text-md font-medium cursor-pointer relative inline-block ${
                activeTab === tab.label
                  ? "text-primary-color after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-full after:bg-primary-color after:rounded-full"
                  : "text-desc-color"
              }`}
            >
              {tab.value}
            </Typography>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-2 bg-[#ece8ec] text-[#F2F1F2] h-[2px] " />

      {/* Filters for specific tabs */}
      {["timesheet", "progress", "payroll"].includes(activeTab) && (
        <div className="flex justify-end gap-6 items-center pr-16 max-md:pr-0 max-md:justify-between">
          <div className="relative group inline-block w-[138px]">
            <div className="cursor-pointer h-12 px-4 py-2 border rounded-md bg-[#e5eff1] shadow-sm hover:bg-white transition flex justify-between gap-2">
              {selectedOption}
              <ChevronDownIcon className="h-6 w-6 text-[#002446]" />
            </div>

            <div
              className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 opacity-0 scale-95 invisible 
              group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out"
            >
              <ul className="py-1 text-sm text-gray-700">
                {options.map((opt) => (
                  <li
                    key={opt.key}
                    onClick={() => setSelectedOption(opt.label)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Active tab content */}
      <div className="overflow-y-auto h-[calc(60vh-90px)]">
        {returnComponent(activeTab)}
      </div>
    </div>
  );
};

export default CustomTabs;
