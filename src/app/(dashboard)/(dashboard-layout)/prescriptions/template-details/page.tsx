// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import React from "react";

// const TemplateDetails = () => {
//   return (
//     <div>
//       <Typography size="h3" as="h3" className="">
//         Template
//       </Typography>
//       <div className="bg-white p-8 rounded-xl mt-5">
//         <div className="">
//           <Typography size='h5' as='h5'>Hypertension Basic Set</Typography>
//           <Typography className="text-desc-color">Amoxicillin 500mg capsule</Typography>
//         </div>

//         <div className="flex justify-between items-center">
//           {/* <div>
//              <Typography>Foam:</Typography>
//              <Typography>Route of Administration:</Typography>
//              <Typography>Quantity to Dispense:</Typography>
//              <Typography>Refill:</Typography>
//              <Typography>Category:</Typography>
//             </div>
//             <div>
//                 <Typography>Tablet</Typography>
//                 <Typography>Oral</Typography>
//                 <Typography>15 Tblets</Typography>
//                 <Typography>12 June</Typography>
//                 <Typography>Cardiology</Typography>
//             </div> */}
//           <div className=" basis-[33%] max-md:basis-full">
//             <Typography size="h6" className="font-bold underline pt-4">
//               Template Details
//             </Typography>
//             <div className="flex justify-between pt-3">
//               <div className="space-y-1">
//                 <Typography className="font-medium text-[16px] text-[#4F4F4F] ">
//                   Foam:
//                 </Typography>
//                 <Typography className="font-medium text-[16px] text-[#4F4F4F]">
//                   Route of Administration:
//                 </Typography>
//                 <Typography className="font-medium text-[16px] text-[#4F4F4F]">
//                   Quantity to Dispense:
//                 </Typography>
//                 <Typography className="font-medium text-[16px] text-[#4F4F4F]">
//                   Refill:
//                 </Typography>
//                 <Typography className="font-medium text-[16px] text-[#4F4F4F]">
//                   Category:
//                 </Typography>
//               </div>
//               <div className="space-y-1">
//                 <Typography className="font-medium text-desc-color">
//                   Tablet
//                 </Typography>
//                 <Typography className="font-medium text-desc-color">
//                   Oral
//                 </Typography>
//                 <Typography className="font-medium text-desc-color">
//                   15 Tblets
//                 </Typography>
//                 <Typography className="font-medium text-desc-color">
//                   12 June
//                 </Typography>
//                 <Typography className="font-medium text-desc-color">
//                   Cardiology
//                 </Typography>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="pt-2">
//             <Typography size="h6" className="font-bold underline pt-4">
//               Dosage
//             </Typography>
//             <Typography className="text-desc-color font-medium p-4 border rounded-xl mt-4 mb-4">1 capsule every 8 hours</Typography>
//         </div>
//         <div className="pt-2">
//             <Typography size="h6" className="font-bold underline">
//               Special Instructions
//             </Typography>
//             <Typography className="text-desc-color font-medium p-4 border rounded-xl mt-4 mb-4">Hypertension follow-up. Blood pressure stable, continue medicatio</Typography>
//         </div>
//         <div className="flex justify-end gap-2 pt-3">
//             <Button className="bg-[#EDEDED] text rounded-xl w-[150px] h-[48px] flex items-center justify-center">Cancel</Button>
//             <Button className="bg-primary-color text-white rounded-xl">Apply Template</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateDetails;
"use client";

import SignatureModal from "@/components/shared/model-template/page";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function HypertensionTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen p-6">
      <div className=" space-y-6">
        {/* ================= HEADER ================= */}
        <div className="w-full">
          {" "}
          {/* Parent container set to full width */}
          <div className="flex justify-between items-start w-full">
            {/* Left Side: Title and Details */}
            <div>
              <h1 className="text-xl font-bold text-[#2c2c2c]">
                Hypertension Basic Set
              </h1>

              <div className="flex items-center gap-2 mt-1 text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Active</span>
                <span>| Created 15/08/2024</span>
              </div>

              <p className="font-semibold mt-2 cursor-pointer underline">
                Template Details
              </p>

              <div className="mt-3 text-gray-600 space-y-1 text-sm w-64">
                {" "}
                {/* Added width for alignment */}
                <div className="flex justify-between">
                  <span className="font-semibold font-gray-700">Used:</span>
                  <span>47 times</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold font-gray-700">
                    Last used:
                  </span>
                  <span>10/10/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold font-gray-700">
                    Specialty:
                  </span>
                  <span>Cardiology</span>
                </div>
              </div>
            </div>

            {/* Right Side: Icons - Ye ab extreme end par jayenge */}
            <div className="flex items-center gap-3">
              <Icon
                icon="lucide:upload"
                className="text-primary-color cursor-pointer"
                width="22"
              />
              <Icon
                icon="bxs:edit"
                className="text-primary-color cursor-pointer"
                width="22"
              />
              <div className="bg-[#EF4444] rounded-full p-1 flex items-center justify-center cursor-pointer">
                <Icon
                  icon="ic:baseline-minus"
                  className="text-white"
                  width="14"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= INFO BANNER ================= */}

        {/* ================= TEMPLATE DETAILS ================= */}
        <div className="bg-white rounded-xl border  p-6 space-y-4">
          <div className="bg-[#FFF3C4] text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <Icon icon="material-symbols:info" className="text-yellow-600" />
            This will create: 1 medication / duration / quantity.
          </div>

          <h2 className="font-bold text-[#2c2c2c] underline">
            Template Details
          </h2>

          {/* <div className="grid grid-cols-2 gap-y-3 text">
            <p className="text-gray-500">Template name:</p>
            <p>Hypertension Basic Set</p>

            <p className="text-gray-500">Description:</p>
            <p>Template for initial treatment of uncomplicated hypertension</p>

            <p className="text-gray-500">Specialty:</p>
            <p>Cardiology</p>

            <p className="text-gray-500">Indication:</p>
            <p>• I10 - Essential hypertension <br /> • I11 - Hypertensive heart disease</p>

            <p className="text-gray-500">Recommended prescription type:</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" checked readOnly />
                Standard
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" readOnly />
                ALD
              </label>
            </div>
          </div> */}

          {/* <div className="flex flex-col gap-3">
 
  <div className="flex flex-col md:flex-row md:gap-2">
    <p className="md:w-1/3 text-gray-500">Template name:</p>
    <p className="md:w-2/3">Hypertension Basic Set</p>
  </div>


  <div className="flex flex-col md:flex-row md:gap-6">
    <p className="md:w-1/3 text-gray-500">Description:</p>
    <p className="md:w-2/3">
      Template for initial treatment of uncomplicated hypertension
    </p>
  </div>


  <div className="flex flex-col md:flex-row md:gap-6">
    <p className="md:w-1/3 text-gray-500">Specialty:</p>
    <p className="md:w-2/3">Cardiology</p>
  </div>


  <div className="flex flex-col md:flex-row md:gap-6">
    <p className="md:w-1/3 text-gray-500">Indication:</p>
    <p className="md:w-2/3">
      • I10 - Essential hypertension <br />
      • I11 - Hypertensive heart disease
    </p>
  </div>


  <div className="flex flex-col md:flex-row md:gap-6">
    <p className="md:w-1/3 text-gray-500">
      Recommended prescription type:
    </p>

    <div className="md:w-2/3 flex gap-4">
      <label className="flex items-center gap-1">
        <input type="radio"  readOnly />
        Standard
      </label>
      <label className="flex items-center gap-1">
        <input type="radio" readOnly />
        ALD
      </label>
    </div>
  </div>
</div> */}

          <div className="flex flex-col gap-3 text-sm text-gray-500">
            {/* Row 1 */}
            <div className="flex">
              <p className="w-48 text-gray-700 font-semibold">Template name:</p>
              <p>Hypertension Basic Set</p>
            </div>

            {/* Row 2 */}
            <div className="flex">
              <p className="w-48 text-gray-700 font-semibold">Description:</p>
              <p>
                Template for initial treatment of uncomplicated hypertension
              </p>
            </div>

            {/* Row 3 */}
            <div className="flex">
              <p className="w-48 text-gray-700 font-semibold">Specialty:</p>
              <p>Cardiology</p>
            </div>

            {/* Row 4 */}
            <div className="flex">
              <p className="w-48 text-gray-700 font-semibold">Indication:</p>
              <p>
                • I10 - Essential hypertension <br />• I11 - Hypertensive heart
                disease
              </p>
            </div>

            {/* Row 5 */}
            <div className="flex">
              <p className="w-48 text-gray-700 font-semibold">
                Recommended <br /> prescription type:
              </p>

              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input type="radio" readOnly />
                  Standard
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" readOnly />
                  ALD
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MEDICATIONS ================= */}
        <div className="bg-white shadow-sm border rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <Typography
              size="h5"
              className="font-bold text-[#2c2c2c] px-5 pt-3"
            >
              MEDICATIONS
            </Typography>
            <div className="flex items-center gap-2 p-4">
              <Icon icon="bxs:edit" className="text-primary-color" width="25" />{" "}
              <div className="bg-[#EF4444] rounded-full p-1 flex items-center justify-center">
                <Icon
                  icon="ic:baseline-minus"
                  className="text-white"
                  width="15"
                />
              </div>{" "}
            </div>
          </div>

          <div className=" px-5 pb-5 flex max-md:flex-col gap-8">
            {/* LEFT */}
            <div className="basis-1/2 space-y-3 ">
              <h4 className="font-semibold underline">MEDICATION 1</h4>

              <div className="grid grid-cols-2 text-gray-500 gap-y-2 text-sm">
                <p className="text-gray-700 font-semibold">INN:</p>
                <p>Amlodipine</p>

                <p className="text-gray-700 font-semibold">Form:</p>
                <p>Tablet</p>

                <p className="text-gray-700 font-semibold">Dosage:</p>
                <p>5 mg</p>

                <p className="text-gray-700 font-semibold">Route:</p>
                <p>Oral</p>

                <p className="text-gray-700 font-semibold">
                  🏥 LNMPE 2022AMLO-005::
                </p>
                <p>✓ Essential medicine</p>
                <p className="text-gray-700 font-semibold">Level:</p>
                <p>Primary care</p>
              </div>

              <div className="pt-3 max-w-sm">
                {" "}
                {/* max-w-sm size control karne ke liye */}
                <p className="font-bold underline text-sm mb-4 uppercase tracking-wide">
                  Duration
                </p>
                <div className="space-y-3 text-sm text-gray-700">
                  {/* DURATION Row */}
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">
                      Duration:
                    </span>
                    <span className="text-gray-500">30 days (adjustable)</span>
                  </div>

                  {/* QUANTITY Row */}
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">
                      Quantity:
                    </span>
                    <span className="text-gray-500">30 tablets (1 box)</span>
                  </div>

                  {/* SUBSTITUTION Row */}
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">
                      Substitution:
                    </span>
                    <span className="text-gray-500">Allowed</span>
                  </div>

                  {/* REFILLS Row */}
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">
                      Refills:
                    </span>
                    <span className="text-gray-500">11 times (1 year)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="basis-1/2 space-y-3 text-gray-500">
              <h3 className="font-bold underline text-gray-700">
                DOSAGE INSTRUCTIONS:
              </h3>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p className="text-gray-700 font-semibold">Dose:</p>
                <p>1 tablet</p>

                <p className="text-gray-700 font-semibold">Frequency:</p>
                <p>once daily</p>

                <p className="text-gray-700 font-semibold">Timing:</p>
                <p>Morning</p>

                <p className="text-gray-700 font-semibold">
                  With/without meals:
                </p>
                <p>Any</p>
                <p className="text-gray-700 font-semibold"> Summary</p>
                <p>“1 tablet, once daily, morning”</p>
              </div>

              <div className="pt-4">
                <h4 className="font-bold underline text-gray-700">
                  PATIENT INSTRUCTIONS:
                </h4>
                <p className="mt-2">
                  “Take 1 tablet every morning at the same time. Do not stop
                  without medical advice.”
                </p>
                <p className="mt-1">✓ Wolof translation available</p>
              </div>
            </div>
          </div>
        </div>

        {/* NOTES SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-sm underline mb-3">Clinical Notes</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-600 italic">
              "Initial hypertension treatment. Reassess after 4 weeks. If BP
              uncontrolled: increase to 10mg or add diuretic."
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm underline mb-3">Pharmacy Notes</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-600 italic">
              "Check absence of contraindications. Advise home BP monitoring.
              Inform about possible side effects (ankle edema)."
            </div>
          </div>
        </div>

        {/* MONITORING & FOLLOW-UP */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-bold text-lg mb-4 uppercase tracking-wide">
            Monitoring & Follow-up
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-sm underline mb-3">
                Follow-up consultation:
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon
                  icon="solar:check-square-bold"
                  className="text-green-500"
                  width="20"
                />
                <span>Recommended after 4 weeks</span>
              </div>
              <h3 className="font-bold text-sm underline mt-4 mb-2">
                Patient warning signs:
              </h3>
              <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                <li>Persistent ankle edema</li>
                <li>Significant dizziness</li>
                <li>Palpitations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm underline mb-3">
                Tests to plan:
              </h3>
              <div className="space-y-2">
                {[
                  "Blood pressure measurement",
                  "Blood chemistry (ionogram)",
                  "ECG",
                ].map((test) => (
                  <div
                    key={test}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Icon
                      icon="solar:check-square-bold"
                      className="text-green-500"
                      width="20"
                    />
                    <span>{test}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-4 h-4 border border-gray-300 rounded-sm" />
                  <span>Serum creatinine</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* USAGE STATISTICS */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-20">
          <h2 className="font-bold text-lg mb-6 uppercase tracking-wide">
            Usage Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20 text-sm">
            <div className="space-y-4">
              <h3 className="font-bold underline flex items-center gap-2">
                <Icon icon="flat-color-icons:neutral-trading" width="18" />{" "}
                USAGE STATISTICS
              </h3>
              <div className="flex justify-between text-gray-500">
                <span>Used:</span> <span>47 times</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Last use:</span> <span>10/10/2025</span>
              </div>

              <div className="mt-6">
                <h3 className="font-bold underline mb-3 uppercase text-xs">
                  Patient Instructions:
                </h3>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Reported side effects:
                </p>
                <ul className="space-y-1 text-gray-600 ml-2">
                  <li>• Ankle edema: 15% (7 cases)</li>
                  <li>• Dizziness: 8% (4 cases)</li>
                  <li>• None: 77% (36 cases)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold underline">Reported effectiveness:</h3>
              <div className="flex justify-between text-gray-500">
                <span>Refill rate:</span> <span>89%</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Average treatment duration:</span> <span>8.5 months</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="">
          <div className="flex justify-end gap-3">
            <button className="px-8 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              Archive
            </button>
            <button className="px-8 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300">
              Duplicate
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:bg-blue-600"
            >
              Use this template
            </button>
          </div>
        </div>
      </div>
      <SignatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(data) => console.log("Final Signature Done", data)}
        prescriptionData={{}} // Yahan apna data pass karein
      />
    </div>
  );
}
