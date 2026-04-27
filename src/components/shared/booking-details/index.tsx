// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// // import { consultationTabs, overviewData } from "@/data";
// import { useRouter } from "next/navigation";
// import { Icon } from "@iconify/react";
// import { Typography } from "../typography";
// import { consultationTabs, overviewData } from "@/data";
// import MedicalHistory from "./medical-history";
// import EPrescription from "./e-prescription";
// import MedicalNotes from "./medical-notes";

// interface ConsultationTab {
//   title: string;
// }

// interface OverviewItem {
//   id: string;
//   title: string;
//   desc?: string;
// }

// const BookingDetails: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const router = useRouter();

//   return (
//     <div className="max-md:w-full mx-auto">
//       {/* Patient info */}
//       <div className="flex max-lg:flex-col gap-5 items-center justify-between max-lg:items-start">
//         <div className="flex items-center max-sm:flex-col gap-5">
//           <Image
//             src="/assets/svg/profile.svg"
//             width={100}
//             height={100}
//             alt="consultationImg"
//             className="max-sm:w-full"
//           />{" "}
//           <Typography size="h5" as="h5" className="font-bold">
//             Alexis John
//           </Typography>
//         </div>

//         <div className="flex gap-5 items-center">
//           <Typography className="h-[48px] bg-[#EEF6E3] flex gap-2 items-center justify-center rounded text-secondary-color px-3">
//             <Icon icon="tabler:video" width="24" height="24" />
//             Video Consultation
//           </Typography>
//           <div className="flex gap-2 items-center justify-center px-5 h-[48px] rounded bg-[#e7efed] cursor-pointer">
//             <Icon
//               icon="healthicons:fever-outline-24px"
//               width="24"
//               height="24"
//               className="text-primary-color"
//             />
//             <Typography className="text-primary-color ">Fever</Typography>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-10 items-center pt-10 pb-10">
//         {consultationTabs.map((tab: ConsultationTab, i: number) => (
//           <div
//             key={i}
//             onClick={() => setActiveTab(i)}
//             className="cursor-pointer relative"
//           >
//             <Typography
//               as="p"
//               className={`font-semibold whitespace-nowrap relative inline-block transition-all ${
//                 activeTab === i
//                   ? "text-primary-color after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-primary-color "
//                   : ""
//               }`}
//             >
//               {tab.title}
//             </Typography>
//           </div>
//         ))}
//       </div>

//       {/* Tab content */}
//       {activeTab === 0 && (
//         <div className="bg-white rounded-xl p-8 max-md:p-5 flex justify-center gap-10">
//           {/* Left overview */}
//           <div className="space-y-10">
//             {overviewData.map((over: OverviewItem, i: number) => (
//               <div key={i} className="flex gap-5 mb-5">
//                 <div className="flex-shrink-0 text-white flex justify-center items-center rounded-full bg-primary-color h-11 w-11">
//                   {over.id}
//                 </div>
//                 <div>
//                   <Typography className="font-bold">{over.title}</Typography>
//                   {over.desc && (
//                     <Typography className="pt-2 text-desc-color w-[85%] leading-[26px]">
//                       {over.desc}
//                     </Typography>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right overview status */}
//           {/* <div className="w-[65%] flex flex-col space-y-6">
//             <Typography
//               size="h6"
//               as="h6"
//               className="font-bold text-secondary-color"
//             >
//               Request has been accepted.
//             </Typography>
//             <Typography size="h6" as="h6" className="text-desc-color">
//               Awaiting for patient booking & payment.
//             </Typography>
//           </div> */}
//         </div>
//       )}
//       {activeTab === 1 && <MedicalHistory />}
//       {activeTab === 2 && <EPrescription />}
//       {activeTab === 3 && <MedicalNotes />}
//     </div>
//   );
// };

// export default BookingDetails;
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Typography } from "../typography";
import { consultationTabs } from "@/data";
import MedicalHistory from "./medical-history";
import EPrescription from "./e-prescription";
import MedicalNotes from "./medical-notes";
import { toast } from "react-toastify";
import MedicalReports from "./medical-report";
import BookingTimeline from "./booking-timeline";
import ClinicalNote from "./clinical-note";
import BillingPayment from "./billing";
import Review from "./review";
import CustomMultiCheckbox from "./../input-fields/custom-multi-checkbox";
import { Button } from "../button";

interface Step {
  id: string;
  title: string;
  desc: string;
}

const overviewSteps: Step[] = [
  {
    id: "1",
    title: "Request Received",
    desc: "The system administrator initiates the pharmacy registration and assigns an ID. Initial setup details and temporary credentials are generated automatically.",
  },
  {
    id: "2",
    title: "Booking & Payment",
    desc: "The pharmacy representative logs in to fill out essential information, upload documents.  All submitted data remains pending until admin validation.",
  },
  {
    id: "3",
    title: "Video Call with Patient",
    desc: "Once validated, the pharmacy gains full access to its dashboard and prescription management     Activity logs are updated with activation date and admin details.",
  },
  {
    id: "4",
    title: "Review Received",
    desc: "Once validated, the pharmacy gains full access to its dashboard and prescription management.  Activity logs are updated with activation date and admin details.",
  },
  {
    id: "5",
    title: "Prescription Sent to Pharmacy",
    desc: "Once validated, the pharmacy gains full access to its dashboard and prescription management.  Activity logs are updated with activation date and admin details.",
  },
  {
    id: "6",
    title: "Completed",
    desc: "Once validated, the pharmacy gains full access to its dashboard and prescription management.  Activity logs are updated with activation date and admin details.",
  },
];

const FEATURES = [
  "Review blood test results (uploaded yesterday)",
  "Check blood pressure trend",
  "Discuss medication side effects",
  "Plan next follow-up",
];

const BookingDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const [featu, setFeatures] = useState<string[]>(FEATURES);

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(stepNumber);

    if (stepNumber === overviewSteps.length && !completed) {
      setCompleted(true);
      toast.success("🎉 Consultation process completed!");
    }
  };

  return (
    <div className="max-md:w-full mx-auto">
      {/* Patient info */}
      <div className="flex max-lg:flex-col gap-5 items-center justify-between max-lg:items-start">
        <div className="flex items-center gap-5">
          <Image
            src="/assets/svg/profile.svg"
            width={70}
            height={70}
            alt="consultationImg"
            className="max-sm:w-full"
          />
          <div className="space-y-1">
            <Typography size="h5" as="h5" className="font-bold">
              Alexis John
            </Typography>
            {/* <div className="flex gap-5 items-center rounded-lg"> */}
            <Typography className="h-[25px] bg-[#D9DFF6] flex gap-2 items-center justify-center rounded-lg text-primary-color px-3">
              <Icon icon="tabler:video" width="16" height="16" />
              Remote
            </Typography>
            {/* </div> */}
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <Typography
            size="sm"
            className="text-desc-color font-semibold underline cursor-pointer"
          >
            Refer Patient
          </Typography>
          <Typography
            size="lg"
            className="py-2 px-3 bg-primary-color cursor-pointer flex gap-2 items-center justify-center text-white font-medium rounded-full"
          >
            {/* <Icon icon="tabler:video" width="24" height="24" /> */}
            Patient Record
          </Typography>
        </div>
      </div>
      <div className="mb-6 mt-6">
        <div className="flex flex-wrap gap-2">
          <div className="space-y-2 basis-[22%] max-md:basis-[45%]">
            <Typography size="h5" as="h5">
              Doctor Name
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              Dr.Ali Shah
            </Typography>
          </div>

          <div className="space-y-2 basis-[22%] max-md:basis-[45%]">
            <Typography size="h5" as="h5">
              Date
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              12/sep/2023
            </Typography>
          </div>

          <div className="space-y-2 basis-[22%] max-md:basis-[45%]">
            <Typography size="h5" as="h5">
              Duration
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              15 mint
            </Typography>
          </div>

          <div className="space-y-2 basis-[22%] max-md:basis-[45%]">
            <Typography size="h5" as="h5">
              Fee
            </Typography>
            <Typography className="text-h6 font-medium text-[#818181]">
              $20
            </Typography>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-5 items-center pt-6 pb-6 overflow-x-auto overflow-hidden">
        {consultationTabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(i)}
            className="cursor-pointer relative"
          >
            <Typography
              className={`text-[#2C2C2C] text-md whitespace-nowrap font-semibold relative inline-block transition-all ${
                activeTab === i
                  ? "text-primary-color after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-primary-color"
                  : ""
              }`}
            >
              {tab.title}
            </Typography>
          </div>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 0 && (
        // <div className="">
        //    <Typography className="mb-4 mt-[-15px] font-medium text-desc-color">Detailed view of the appointment process and related data</Typography>
        // <div className="bg-white rounded-xl p-8 max-md:p-5 flex  gap-10">
        //   {/* Left overview (interactive timeline style) */}
        //   <div className="relative pl-8 space-y-10">
        //     {overviewSteps.map((step, index) => {
        //       const stepNumber = index + 1;
        //       const isCompleted =
        //         stepNumber < activeStep ||
        //         (completed && stepNumber === overviewSteps.length);
        //       const isActive = stepNumber === activeStep;
        //       const isLast = stepNumber === overviewSteps.length;

        //       return (
        //         <div key={index} className="relative flex gap-5 items-start">
        //           {!isLast && (
        //             <div
        //               className={`absolute left-[21px] top-[45px] w-[3px] h-[calc(100%+20px)] rounded-full ${
        //                 isCompleted
        //                   ? "bg-primary-color"
        //                   : isActive
        //                   ? "bg-secondary-color"
        //                   : "bg-gray-300"
        //               }`}
        //             />
        //           )}

        //           <div
        //             className={`flex-shrink-0 z-10 flex justify-center items-center rounded-full h-11 w-11 transition-all duration-300 cursor-pointer ${
        //               isCompleted
        //                 ? "bg-primary-color text-white"
        //                 : isActive
        //                 ? "bg-secondary-color text-white"
        //                 : "bg-gray-300 text-gray-700"
        //             }`}
        //             onClick={() => handleStepClick(stepNumber)}
        //           >
        //             {isCompleted ? (
        //               <Icon icon="mdi:check" width={20} height={20} />
        //             ) : (
        //               stepNumber
        //             )}
        //           </div>

        //           <div>
        //             <Typography className="font-bold">{step.title}</Typography>
        //             <Typography className="pt-2 text-desc-color w-[85%] leading-[26px]">
        //               {step.desc}
        //             </Typography>
        //           </div>
        //         </div>
        //       );
        //     })}
        //   </div>
        // </div>
        // </div>
        <div className="bg-white rounded-lg px-5 py-8">
          <div className="border pb-12 max-md:flex-col items-start rounded-lg px-5 py-8">
            <div className=" flex justify-between gap-3">
              <div>
                <div className="flex gap-1 items-center">
                  <Icon
                    className="text-secondary-color"
                    icon="gridicons:notice-outline"
                    width={24}
                    height={24}
                  />
                  <Typography
                    size="h6"
                    className="font-semibold text-[#2C2C2C]"
                  >
                    Compliance status:{" "}
                    <span className="text-secondary-color font-semibold">
                      Ready to start
                    </span>{" "}
                  </Typography>
                </div>

                <div className="mt-3 flex max-md:flex-col max-md:gap-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-secondary-color"
                        icon="solar:check-square-bold"
                        width="20"
                        height="20"
                      />
                      <Typography className="font-semibold text-[#4F4F4F]">
                        Consent received
                      </Typography>
                    </div>
                    <Typography className="text-[#4F4F4F]">
                      Signed: 10 Sep 2023, 14:30
                    </Typography>
                    <Typography className="text-[#4F4F4F]">
                      Version: v2.1
                    </Typography>
                    <Typography className="text-primary-color font-medium cursor-pointer underline underline-offset-4">
                      View Document
                    </Typography>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-secondary-color"
                        icon="solar:check-square-bold"
                        width="20"
                        height="20"
                      />
                      <Typography className="font-semibold text-[#4F4F4F]">
                        Payment Confirmed
                      </Typography>
                    </div>
                    <Typography className="text-[#4F4F4F]">
                      Method: Orange Money
                    </Typography>
                    <Typography className="text-[#4F4F4F]">
                      Amount: 10,000 FCFA
                    </Typography>
                    <Typography className="text-primary-color font-medium cursor-pointer underline underline-offset-4">
                      View Receipt
                    </Typography>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-secondary-color"
                        icon="solar:check-square-bold"
                        width="20"
                        height="20"
                      />
                      <Typography className="font-semibold text-[#4F4F4F]">
                        Document completed
                      </Typography>
                    </div>
                    <Typography className="text-[#4F4F4F]">
                      Pre-consultation questionnaire
                    </Typography>
                    <Typography className="text-[#4F4F4F]">
                      Blood test results
                    </Typography>
                    <Typography className="text-[#4F4F4F]">
                      Previous prescription
                    </Typography>
                    <Typography className="text-primary-color font-medium cursor-pointer underline underline-offset-4">
                      View All
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="bg-primary-color h-10 px-3 py-2 rounded-full">
                <Typography className="text-white font-semibold">
                  Join Consultation
                </Typography>
              </div>
            </div>
            <div className="space-y-2">
              <Typography size={"h6"} as={"h6"}>
                💡 Consultation Preparation
              </Typography>
              <div>
                <CustomMultiCheckbox
                  // label="Which features are you interested in?"
                  name="features"
                  options={featu}
                  // values={formik.values.features}
                  onChange={setFeatures}
                  // onBlur={() => formik.setFieldTouched("features", true)}
                  // touched={formik.touched.features}
                  // error={formik.errors.features}
                />
              </div>
              <div>
                <Typography className="text-desc-color">
                  Last Consultation: 15 Aug (Dr. Sow)
                </Typography>
                <Typography className="text-desc-color">
                  Diagnosis: Controlled hypertension
                </Typography>
              </div>
              <div>
                <Typography className="text-primary-color font-semibold underline underline-offset-4">
                  Notes:
                </Typography>
                <Typography className="text-desc-color">
                  Diagnosis: Controlled hypertension
                </Typography>
              </div>
            </div>
          </div>
          <div className="border flex justify-between max-md:flex-col max-md:gap-4 items-start mt-6 rounded-lg px-5 py-6">
            <div>
              <div className="flex gap-1 items-center">
                <Typography size="h6" className="text-[#2C2C2C]">
                  Appointment Information
                </Typography>
              </div>

              <div className="mt-2 pl-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Typography className="font-semibold text-[#4F4F4F]">
                    44 years . Male . Lahore
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    className="text-primary-color"
                    icon="mdi:clock-outline"
                    width="20"
                    height="20"
                  />
                  <Typography className="font-semibold text-[#4F4F4F]">
                    11;30 Am - 12:00 Am Routine Checkup
                  </Typography>
                </div>
                <div className="bg-secondary-color cursor-pointer mt-2 py-1 w-[90px] flex items-center justify-center rounded-full">
                  <Typography className="font-bold text-white">
                    Ready
                  </Typography>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-primary-color"
                  icon="mdi:clock-outline"
                  width="20"
                  height="20"
                />
                <Typography className="font-semibold text-[#4F4F4F]">
                  Start in 10 mint
                </Typography>
              </div>
              <div className="bg-primary-color px-3 py-2 rounded-full">
                <Typography className="text-white font-semibold">
                  Patient Record
                </Typography>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-5 bg-[#f9e5e7] space-y-1 mt-6">
            <div className="flex items-center gap-2 text-[#EB4824] pb-3">
              <Icon icon="akar-icons:info" width="24" height="24" />
              <Typography>Important Alerts</Typography>
            </div>
            <Typography>🔴 Allergy: Penicillin (critical)</Typography>
            <Typography>🟠 Current treatment: Amlodipine 5 mg</Typography>
            <Typography>
              📅 Last consultation: August 15, 2023 (Dr. Sow)
            </Typography>
            <Typography>Diagnosis: Controlled hypertension</Typography>
          </div>
        </div>
      )}

      {activeTab === 1 && <MedicalHistory />}
      {activeTab === 2 && <MedicalReports />}
      {/* {activeTab === 3 && <EPrescription />}
      {activeTab === 4 && <MedicalNotes />} */}
      {activeTab === 3 && <BookingTimeline />}
      {activeTab === 4 && <ClinicalNote />}
      {activeTab === 5 && <BillingPayment />}
      {activeTab === 6 && <Review />}
    </div>
  );
};

export default BookingDetails;
