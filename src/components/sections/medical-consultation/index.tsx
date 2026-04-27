import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";
// import Image from "next/image";
import React, { useState } from "react";
// import { createPortal } from "react-dom";

const Consultation = () => {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [globalStatus, setGlobalStatus] = useState("Active");

  //   const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  //   const [globalStatus, setGlobalStatus] = useState("Active");
  //   const dropdownRef = useRef<HTMLDivElement>(null);
  return (
    <div className="pt-4 px-5">
      <hr className="mt-5" />
      <div className="pt-5 space-y-2">
        <Typography className=" font-bold">Overview</Typography>
        <Typography className="text-dark-gray w-[65%]">
          <Typography>Definition:  </Typography>
          Fever is a temporary rise in body temperature, usually above 38°C
          (100.4°F), often caused by an infection or inflammation. It is not a
          disease itself but a symptom of an underlying condition.
          <Typography> Why it happens:  </Typography>
          The body increases its temperature to help the immune system fight off
          bacteria, viruses, or other pathogens.
        </Typography>
      </div>
      <hr className="mt-5" />
      <div className="pt-5 space-y-2">
        <Typography className=" font-bold">Common Symptoms</Typography>
        <Typography>
          <Typography className="text-dark-gray w-[75%]">
            Although wellness exams are preventive and not symptom-driven, they
            help identify early signs of silent or developing conditions.
            Patients may mention vague or overlooked symptoms like fatigue, poor
            sleep, anxiety, irregular bowel habits, minor aches, or weight
            fluctuations. Telehealth providers are trained to evaluate subtle
            patterns that might indicate early hypertension, diabetes, thyroid
            dysfunction, mental health issues, or nutritional deficiencies.
            Standard health checks include:
          </Typography>
          <Typography className="text-dark-gray w-[80%]">
            <div className="ml-5 pt-2">
              <li>Vital history review (previous diagnoses, allergies)</li>
              <li>Medication and supplement use</li>
              <li>Diet and physical activity habits </li>
              <li>Tobacco, alcohol, and drug use</li>
              <li>Mood, stress, and sleep screening</li>
              <li>Sexual health and contraception counseling</li>
              <li>Review of recent vaccinations and preventive screenings</li>
              <li>
                If needed, patients are guided to schedule in-person tests
                (e.g., blood pressure, BMI, bloodwork) through local labs or
                clinics.
              </li>
              <li> Mood, stress, and sleep screening</li>
              <li>Sexual health and contraception counseli</li>
              <li>Mood, stress, and sleep screen</li>
            </div>
          </Typography>
        </Typography>
      </div>
      <hr className="mt-5" />
      <div className="pt-5 space-y-2">
        <Typography className="font-bold">Treatment Symptoms</Typography>
        <Typography className="text-dark-gray w-[75%]">
          {" "}
          General Management of Fever Rest – Allow the body to fight off the
          underlying cause. Hydration – Drink plenty of fluids (water, oral
          rehydration solutions, clear soups) to prevent dehydration. Light
          clothing & cool environment – Helps regulate body temperature.
          Fever-reducing medicines (antipyretics): Paracetamol (acetaminophen) –
          first-line for most patients. Ibuprofen – may be used if not
          contraindicated (avoid in stomach ulcers, kidney issues). Cold
          compresses / lukewarm sponging – To provide comfort (avoid very cold
          water or alcohol rubs). 🔹 When to Seek Medical Care Fever ≥ 39–40°C
          (102–104°F) Lasting more than 3 days without improvement Severe
          headache, stiff neck, breathing problems, chest pain Rash, seizures,
          or confusion In infants under 3 months with fever ≥ 38°C (100.4°F) 🔹
          Treating the Underlying Cause Viral infections (common cold, flu):
          Supportive care only. Bacterial infections: May require antibiotics
          (prescribed by doctor). Malaria, typhoid, dengue, COVID-19, etc.: Need
          specific targeted treatments based on diagnosis.
        </Typography>
      </div>
    </div>
  );
};

export default Consultation;

// "use client";
// import { Typography } from "@/components/shared/typography";
// import EditMedicalModel from "@/components/ui/modals/medical-model/edit-medical";
// import { Icon } from "@iconify/react";
// import React, { useState } from "react";
// // import EditMedicalModel from "@/components/ui/modals/medical-model"; // reuse your modal

// const Consultation = () => {
//   const [overview, setOverview] = useState(
//     "Fever is a temporary rise in body temperature, usually above 38°C (100.4°F), often caused by an infection or inflammation. It is not a disease itself but a symptom of an underlying condition."
//   );

//   const [commonSymptoms, setCommonSymptoms] = useState(
//     "Although wellness exams are preventive and not symptom-driven, they help identify early signs of silent or developing conditions. Patients may mention vague or overlooked symptoms like fatigue, poor sleep, anxiety, irregular bowel habits, minor aches, or weight fluctuations."
//   );

//   // Modal state
//   const [isEditingOverview, setIsEditingOverview] = useState(false);
//   const [isEditingSymptoms, setIsEditingSymptoms] = useState(false);

//   return (
//     <div className="pt-4 px-5">
//       {/* Overview Section */}
//       <hr className="mt-5" />
//       <div className="pt-5 space-y-2 relative">
//         <Typography className="font-bold flex justify-between items-center">
//           Overview
//           <Icon
//             icon="fa7-regular:pen-to-square"
//             className="text-primary-dark cursor-pointer"
//             onClick={() => setIsEditingOverview(true)}
//           />
//         </Typography>
//         <Typography className="text-dark-gray w-[80%]">{overview}</Typography>
//       </div>

//       {/* Common Symptoms Section */}
//       <hr className="mt-5" />
//       <div className="pt-5 space-y-2 relative">
//         <Typography className="font-bold flex justify-between items-center">
//           Common Symptoms
//           <Icon
//             icon="fa7-regular:pen-to-square"
//             className="text-primary-dark cursor-pointer"
//             onClick={() => setIsEditingSymptoms(true)}
//           />
//         </Typography>
//         <Typography className="text-dark-gray w-[80%]">
//           {commonSymptoms}
//         </Typography>
//       </div>

//       {/* Edit Overview Modal */}
//       {isEditingOverview && (
//         <EditMedicalModel
//           isOpen={isEditingOverview}
//           onClose={() => setIsEditingOverview(false)}
//           title="Edit Overview"
//           onSave={(title, desc) => {
//             setOverview(desc); // store description only
//             setIsEditingOverview(false);
//           }}
//           initialTitle="Overview"
//           initialDesc={overview}
//         />
//       )}

//       {isEditingSymptoms && (
//         <EditMedicalModel
//           isOpen={isEditingSymptoms}
//           onClose={() => setIsEditingSymptoms(false)}
//           title="Edit Common Symptoms"
//           onSave={(title, desc) => {
//             setCommonSymptoms(desc);
//             setIsEditingSymptoms(false);
//           }}
//           initialTitle="Common Symptoms"
//           initialDesc={commonSymptoms}
//         />
//       )}
//     </div>
//   );
// };

// export default Consultation;
