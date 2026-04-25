// // "use client";
// // import React, { useState } from "react";
// // import { medicalHistory } from "@/data";
// // import { Typography } from "../../typography";
// // import { Icon } from "@iconify/react";

// // interface MedicalHistoryItem {
// //   title: string;
// //   desc: string;
// // }

// // const MedicalHistory: React.FC = () => {
// //   const [openFaq, setOpenFaq] = useState<number | null>(null);

// //   const toggleFaq = (index: number) => {
// //     setOpenFaq(openFaq === index ? null : index);
// //   };

// //   return (
// //     <div className="flex flex-col gap-3 rounded-xl bg-white p-8 max-md:p-5">
// //       {medicalHistory.map((item: MedicalHistoryItem, index: number) => (
// //         <div key={index} className="w-[50%] max-lg:w-full">
// //           <div
// //             className={`rounded border px-5 py-3 max-sm:p-3 transition-all duration-300 ${
// //               openFaq === index ? "h-auto" : "h-12 overflow-hidden"
// //             }`}
// //           >
// //             <div
// //               onClick={() => toggleFaq(index)}
// //               className="flex items-center justify-between gap-2 cursor-pointer"
// //             >
// //               <Typography className="font-bold">
// //                 {item.title}
// //               </Typography>
// //               <Icon
// //                 icon="fe:arrow-up"
// //                 width="24"
// //                 height="24"
// //                 className={`transition-transform duration-300 text-primary-color ${
// //                   openFaq === index ? "rotate-0" : "rotate-180"
// //                 }`}
// //               />
// //             </div>
// //             {openFaq === index && (
// //               <Typography className="pt-3 font-bold text-desc-color">
// //                 {item.desc}
// //               </Typography>
// //             )}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MedicalHistory;
// "use client";
// import React from "react";
// import { medicalHistory } from "@/data";
// import { Typography } from "../../typography";

// interface MedicalHistoryItem {
//   title: string;
//   desc: string;
// }

// const MedicalHistory: React.FC = () => {
//   return (
//     <div>
//       <Typography className="mb-4 mt-[-15px] font-medium text-desc-color">Read-only medical background for audit or traceability purposes</Typography>
//     <div className="flex flex-col gap-2 rounded-xl bg-white p-8 max-md:p-5">

//       <Typography size='h4' as='h4'>Patient Symptoms</Typography>
//       <Typography className="text-desc-color w-[80%] text-[16px]">Patient reports persistent headaches, mild nausea, and dizziness. Symptoms occur mostly in the morning. No prior medication taken.Patient reports persistent headaches, mild nausea, and dizziness. Symptoms occur mostly in the morning. No prior medication taken.Patient reports persistent headaches, mild nausea, and dizziness. Symptoms occur mostly in the morning. No prior medication taken</Typography>
//     </div>
//     </div>
//   );
// };

// export default MedicalHistory;
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";

const documents = [
  {
    id: 1,
    title: "Blood Test Report",
    date: "20/Sep/2025",
    status: "Uploaded",
    source: "Patient",
    author: "Admin",
  },
  {
    id: 2,
    title: "X-Ray Report",
    date: "18/Sep/2025",
    status: "Pending",
    source: "Patient",
    author: "Admin",
  },
  {
    id: 3,
    title: "MRI Scan",
    date: "15/Sep/2025",
    status: "Uploaded",
    source: "Patient",
    author: "Admin",
  },
];

export default function SymptomsAccordion() {
  const [openSection, setOpenSection] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Uploaded":
        return "bg-[#F2994A] text-white";
      case "Pending":
        return "bg-red text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className=" rounded-xl py-8 space-y-6">
      <div className="p-4 bg-white rounded-xl">
        <div className="border bg-white rounded-xl px-6 py-6">
          {/* Header */}
          {/* <div className="flex items-center justify-between  ">
            <Typography size="h5" className="font-semibold text-[#2c2c2c]">
              Symptoms
            </Typography>
            <div className="flex items-center gap-3">
              <span className="bg-secondary-color text-white  px-3 py-1 rounded-full">
                Completed
              </span>
              <ChevronDown
                className={`transition-transform ${
                  openSection ? "rotate-180" : ""
                }`}
              />
            </div>
          </div> */}
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpenSection(!openSection)}
          >
            <Typography size="h6" className="text-[#2c2c2c]">
              What symptoms are you exeriencing?
            </Typography>
            <ChevronDown
              className={`transition-transform pr-2 text-primary-color ${
                openSection ? "rotate-180" : ""
              }`}
            />
          </div>
          {/* Section Body */}
          {openSection && (
            <div className="mt-5 space-y-4">
              {/* Question */}
              <div className="border rounded-lg bg-white">
                <button
                  onClick={() => setOpenQuestion(!openQuestion)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left"
                >
                  <span className=" text-gray-700">
                    How do I book a video consultation?
                  </span>
                  <ChevronDown
                    className={`transition-transform text-primary-color ${
                      openQuestion ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                {openQuestion && (
                  <div className="px-4 py-2 ml-10 mr-5 mb-5 border rounded-lg max-md:w-full font-medium text-gray-600">
                    How do I book a video consultation?
                  </div>
                )}
              </div>

              {/* Other Symptoms */}
              <div>
                <label className=" text-gray-600 font-semibold block mb-2">
                  Other Symptoms (optional)
                </label>
                <div className="border rounded-lg px-4 py-3 bg-white text-gray-700">
                  Increase blood pressure
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 space-y-3">
        <Typography size={"h5"}>📊 Pre-consultation summary</Typography>
        <Typography className="text-[#4F4F4F]">
          Main reason: Headaches + high blood pressure
        </Typography>
        <div>
          <Typography className="text-[#4F4F4F]">Severity: 6/10</Typography>
          <Typography className="text-[#4F4F4F]">Duration: 1 week</Typography>
          <Typography className="text-[#4F4F4F]">
            Associated symptoms: Fatigue, stress
          </Typography>
          <Typography className="text-primary-color underline underline-offset-2 cursor-pointer">
            View full questionnaire
          </Typography>
        </div>
      </div>
      <div className="flex items-stretch gap-5 max-md:flex-col">
        <div
          className="basis-[50%] max-md:basis-full transition-transform duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg shadow-[0_0_15px_rgba(0,0,0,0.08)] bg-white rounded-lg p-4"
        >
          <div className="flex justify-between items-start">
            <Typography size="h5" className="text-[#2C2C2C]">
              Uploaded Document
            </Typography>
            <div className="bg-secondary-color px-4 py-1 rounded-full">
              <Typography className="text-white font-medium">
                Completed
              </Typography>
            </div>
          </div>
          <div className="mt-10">
            <div className="space-y-6">
              {documents.map((item, index) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    {/* Left */}
                    <div className="flex gap-2 items-start">
                      <div className="w-[48px] h-[48px] bg-[#EAEEF7] rounded-lg flex items-center justify-center">
                        <Icon
                          className="text-primary-color"
                          icon="mingcute:pdf-line"
                          width="24"
                          height="24"
                        />
                      </div>

                      <div className="space-y-1">
                        <Typography
                          size="lg"
                          className="text-[#2c2c2c] font-semibold"
                        >
                          {item.title}
                        </Typography>
                        <Typography className="text-desc-color font-medium">
                          {item.date}
                        </Typography>
                        <Typography className="text-desc-color font-medium">
                          Source: {item.source}
                        </Typography>
                        <Typography className="text-desc-color font-medium">
                          Author: {item.author}
                        </Typography>
                        <div className="flex items-center gap-2">
                          <Typography className="text-primary-color cursor-pointer underline underline-offset-4">
                            Preview
                          </Typography>
                          <Typography className="text-desc-color cursor-pointer underline underline-offset-4">
                            Download
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={`px-4 py-1 rounded-full ${getStatusStyles(
                        item.status,
                      )}`}
                    >
                      <Typography className="font-medium">
                        {item.status}
                      </Typography>
                    </div>
                  </div>

                  {/* Divider */}
                  {index !== documents.length - 1 && <hr className="mt-6" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-[50%] max-md:basis-full space-y-5 ">
          <div
            className="transition-transform duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg shadow-[0_0_15px_rgba(0,0,0,0.08)] bg-white rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <Typography size="h5" className="text-[#2C2C2C]">
                Consent Preview
              </Typography>
              <div className="bg-[#F2994A] w-[164px] mt-4 flex items-center justify-center py-1 rounded-full">
                <Typography className="text-white font-medium">
                  Pending Signature
                </Typography>
              </div>
            </div>
            <div className="mt-5">
              <Typography size="lg" className="text-[#2c2c2c] font-bold">
                John Smith
              </Typography>
              <div className="mt-2 border rounded-lg px-3 py-5">
                <Typography size="lg" className="font-medium text-[#2c2c2c]">
                  Signature
                </Typography>
              </div>
              <div className="flex items-center gap-5 pt-5 max-sm:flex-col max-sm:items-start">
                <button className="h-10 px-4 rounded-xl bg-[#ebe6ec] text-desc-color text-lg font-medium ">
                  Call patient reminder
                </button>
                <button className="h-10 px-4 rounded-xl bg-primary-color text-white text-lg font-medium ">
                  Resend form patient
                </button>
              </div>
            </div>
          </div>
          <div
            className="transition-transform duration-300 ease-in-out space-y-1
                hover:-translate-y-2 hover:shadow-lg shadow-[0_0_15px_rgba(0,0,0,0.08)] bg-white rounded-lg p-6"
          >
            <Typography size="h5" className="text-[#2C2C2C]">
              ⚠️ Consultation
            </Typography>
            <Typography size={"h6"} as={"h6"}>
              The patient has not signed the mandatory teleconsultation consent
              form.
            </Typography>
            <div className="flex items-center gap-3">
              <Typography className="text-primary-color cursor-pointer underline underline-offset-4">
                Resend Form
              </Typography>
              <Typography className="text-desc-color cursor-pointer underline underline-offset-4">
                Cancel appointment
              </Typography>
              <Typography className="text-desc-color cursor-pointer underline underline-offset-4">
                Contact patient
              </Typography>
            </div>
            <button className="h-10 px-4 !mt-5 rounded-xl bg-primary-color text-white text-lg font-medium ">
              Join Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Warning Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Warning */}
        <div
          className="flex items-center gap-2 bg-[#eddad4] border border-[#E6CFC2] 
    text-[#F2994A] text-sm font-medium rounded-lg px-4 py-3 w-full"
        >
          <Icon icon="mdi:alert-circle-outline" width={18} />
          <span className="text-black">Blocked-missing pre consultation</span>
        </div>

        {/* Disabled Button */}
        <button
          disabled
          className="px-5 py-2 rounded-full bg-[#E5E7EB] text-[#9CA3AF] 
      text-sm font-semibold cursor-not-allowed whitespace-nowrap"
        >
          Join Consultation
        </button>
      </div>
    </div>
  );
}
