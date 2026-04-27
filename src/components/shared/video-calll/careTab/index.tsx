// "use client";

// import React, { useState } from "react";
// import { Typography } from "../../typography";
// import { Icon } from "@iconify/react";

// /* ================= TYPES ================= */

// type SectionKey =
//   | "carePlan"
//   | "diagnosis"
//   | "objectives"
//   | "treatment"
//   | "tests"
//   | "recommendations"
//   | "followup"
//   | "documents";

// interface Medication {
//   id: string;
//   name: string;
//   dose: string;
//   frequency: string;
//   duration: string;
//   instructions: string;
// }

// type DocumentStatus = "Draft" | "Signed" | "Send";

// interface DocumentItem {
//   title: string;
//   date: string;
//   status: DocumentStatus;
// }

// /* ================= STATUS CONFIG ================= */

// const statusConfig: Record<
//   DocumentStatus,
//   { badgeClass: string; actionText: string }
// > = {
//   Draft: {
//     badgeClass: "bg-[#F2994A] text-white",
//     actionText: "Add",
//   },
//   Signed: {
//     badgeClass: "bg-secondary-color text-white",
//     actionText: "Edit",
//   },
//   Send: {
//     badgeClass: "bg-primary-color text-white",
//     actionText: "View",
//   },
// };

// /* ================= MOCK DOCUMENTS ================= */

// const documents: DocumentItem[] = [
//   { title: "Medication prescription", date: "Jan 2025", status: "Draft" },
//   { title: "Tests / Exams", date: "Jan 2025", status: "Signed" },
//   { title: "Documents / Certificates", date: "Jan 2025", status: "Send" },
// ];

// /* ================= COMPONENT ================= */

// export default function CarePlan() {
//   const [openSections, setOpenSections] = useState<SectionKey[]>(["carePlan"]);

//   const [reason, setReason] = useState("");
//   const [primaryDiagnosis, setPrimaryDiagnosis] = useState("");
//   const [secondaryDiagnosis, setSecondaryDiagnosis] = useState("");
//   const [objectives, setObjectives] = useState("");

//   const [medications, setMedications] = useState<Medication[]>([
//     {
//       id: "1",
//       name: "",
//       dose: "",
//       frequency: "",
//       duration: "",
//       instructions: "",
//     },
//   ]);

//   const toggleSection = (key: SectionKey) => {
//     setOpenSections((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
//     );
//   };

//   const addMedication = () => {
//     setMedications((prev) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         name: "",
//         dose: "",
//         frequency: "",
//         duration: "",
//         instructions: "",
//       },
//     ]);
//   };

//   const updateMedication = (
//     id: string,
//     field: keyof Medication,
//     value: string,
//   ) => {
//     setMedications((prev) =>
//       prev.map((med) => (med.id === id ? { ...med, [field]: value } : med)),
//     );
//   };

//   const Section = ({
//     title,
//     sectionKey,
//     children,
//   }: {
//     title: string;
//     sectionKey: SectionKey;
//     children: React.ReactNode;
//   }) => {
//     const isOpen = openSections.includes(sectionKey);

//     return (
//       <div className="border rounded-xl p-4">
//         <div
//           onClick={() => toggleSection(sectionKey)}
//           className="flex justify-between items-center cursor-pointer"
//         >
//           <Typography className="font-semibold">{title}</Typography>
//           <Icon
//             icon="mdi:chevron-down"
//             width="22"
//             className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
//           />
//         </div>

//         {isOpen && <div className="mt-4 space-y-4">{children}</div>}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* ================= CARE PLAN ================= */}
//       <Section title="Clinical Context" sectionKey="carePlan">
//         <textarea
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           placeholder="Reason for visit, current symptoms..."
//           className="w-full border rounded-lg p-3"
//         />
//       </Section>

//       {/* ================= DIAGNOSIS ================= */}
//       <Section title="Diagnosis / Clinical Hypotheses" sectionKey="diagnosis">
//         <input
//           value={primaryDiagnosis}
//           onChange={(e) => setPrimaryDiagnosis(e.target.value)}
//           placeholder="Primary diagnosis"
//           className="w-full border rounded-lg p-3"
//         />
//         <input
//           value={secondaryDiagnosis}
//           onChange={(e) => setSecondaryDiagnosis(e.target.value)}
//           placeholder="Secondary diagnosis"
//           className="w-full border rounded-lg p-3"
//         />
//       </Section>

//       {/* ================= OBJECTIVES ================= */}
//       <Section title="Care Objectives" sectionKey="objectives">
//         <textarea
//           value={objectives}
//           onChange={(e) => setObjectives(e.target.value)}
//           placeholder="Define measurable objectives..."
//           className="w-full border rounded-lg p-3"
//         />
//       </Section>

//       {/* ================= PRESCRIBED TREATMENT ================= */}
//       <Section title="Prescribed Treatment" sectionKey="treatment">
//         {medications.map((med, index) => (
//           <div
//             key={med.id}
//             className="border rounded-lg p-4 space-y-3 bg-gray-50"
//           >
//             <Typography className="font-medium">
//               Medication {index + 1}
//             </Typography>

//             <input
//               placeholder="Medication name"
//               value={med.name}
//               onChange={(e) => updateMedication(med.id, "name", e.target.value)}
//               className="w-full border rounded-lg p-2"
//             />
//             <input
//               placeholder="Dose"
//               value={med.dose}
//               onChange={(e) => updateMedication(med.id, "dose", e.target.value)}
//               className="w-full border rounded-lg p-2"
//             />
//             <input
//               placeholder="Frequency"
//               value={med.frequency}
//               onChange={(e) =>
//                 updateMedication(med.id, "frequency", e.target.value)
//               }
//               className="w-full border rounded-lg p-2"
//             />
//             <input
//               placeholder="Duration"
//               value={med.duration}
//               onChange={(e) =>
//                 updateMedication(med.id, "duration", e.target.value)
//               }
//               className="w-full border rounded-lg p-2"
//             />
//             <textarea
//               placeholder="Instructions"
//               value={med.instructions}
//               onChange={(e) =>
//                 updateMedication(med.id, "instructions", e.target.value)
//               }
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//         ))}

//         <button
//           onClick={addMedication}
//           className="flex items-center gap-2 text-primary-color font-medium"
//         >
//           <Icon icon="mdi:plus-circle-outline" width="20" />
//           Add medication
//         </button>
//       </Section>

//       {/* ================= DOCUMENTS ================= */}
//       <Section title="Associated Documents" sectionKey="documents">
//         {documents.map((doc, i) => {
//           const config = statusConfig[doc.status];
//           return (
//             <div
//               key={i}
//               className="flex justify-between items-center border-b pb-3 last:border-0"
//             >
//               <div>
//                 <Typography className="font-medium">{doc.title}</Typography>
//                 <Typography className="text-sm text-gray-400">
//                   {doc.date}
//                 </Typography>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${config.badgeClass}`}
//                 >
//                   {doc.status}
//                 </span>
//                 <button className="text-primary-color font-medium">
//                   {config.actionText}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </Section>

//       {/* ================= VALIDATE BUTTON ================= */}
//       <div className="pt-6">
//         <button className="w-full bg-primary-color text-white py-4 rounded-xl font-semibold">
//           Validate & Lock care plan
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";

/* ================= TYPES ================= */

type SectionKey =
  | "carePlan"
  | "diagnosis"
  | "objectives"
  | "treatment"
  | "tests"
  | "recommendations"
  | "followup"
  | "documents";

interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
}

type DocumentStatus = "Draft" | "Signed" | "Send";

interface DocumentItem {
  title: string;
  date: string;
  status: DocumentStatus;
}

/* ================= STATUS CONFIG ================= */

const statusConfig: Record<
  DocumentStatus,
  { badgeClass: string; actionText: string }
> = {
  Draft: {
    badgeClass: "bg-[#F2994A] text-white",
    actionText: "Add",
  },
  Signed: {
    badgeClass: "bg-secondary-color text-white",
    actionText: "Edit",
  },
  Send: {
    badgeClass: "bg-primary-color text-white",
    actionText: "View",
  },
};

/* ================= MOCK DOCUMENTS ================= */

const documents: DocumentItem[] = [
  { title: "Medication prescription", date: "Jan 2025", status: "Draft" },
  { title: "Tests / Exams", date: "Jan 2025", status: "Signed" },
  { title: "Documents / Certificates", date: "Jan 2025", status: "Send" },
];

/* ================= COMPONENT ================= */

export default function CarePlan() {
  const [openSections, setOpenSections] = useState<SectionKey[]>(["carePlan"]);

  const [reason, setReason] = useState("");
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("");
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState("");
  const [objectives, setObjectives] = useState("");

  const [noRecommendations, setNoRecommendations] = useState(false);
  const [followUpRequired, setFollowUpRequired] = useState(false);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "",
      dose: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ]);

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const addMedication = () => {
    setMedications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        dose: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const updateMedication = (
    id: string,
    field: keyof Medication,
    value: string,
  ) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, [field]: value } : med)),
    );
  };

  const Section = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: SectionKey;
    children: React.ReactNode;
  }) => {
    const isOpen = openSections.includes(sectionKey);

    return (
      <div className="border rounded-xl p-4">
        <div
          onClick={() => toggleSection(sectionKey)}
          className="flex justify-between items-center cursor-pointer"
        >
          <Typography className="font-semibold">{title}</Typography>
          <Icon
            icon="mdi:chevron-down"
            width="22"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isOpen && <div className="mt-4 space-y-4">{children}</div>}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= CLINICAL CONTEXT ================= */}
      <Section title="Clinical Context" sectionKey="carePlan">
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for visit, current symptoms..."
          className="w-full border rounded-lg p-3"
        />
      </Section>

      {/* ================= DIAGNOSIS ================= */}
      <Section title="Diagnosis / Clinical Hypotheses" sectionKey="diagnosis">
        <input
          value={primaryDiagnosis}
          onChange={(e) => setPrimaryDiagnosis(e.target.value)}
          placeholder="Primary diagnosis"
          className="w-full border rounded-lg p-3"
        />
        <input
          value={secondaryDiagnosis}
          onChange={(e) => setSecondaryDiagnosis(e.target.value)}
          placeholder="Secondary diagnosis"
          className="w-full border rounded-lg p-3"
        />
      </Section>

      {/* ================= OBJECTIVES ================= */}
      <Section title="Care Objectives" sectionKey="objectives">
        <textarea
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder="Define measurable objectives..."
          className="w-full border rounded-lg p-3"
        />
      </Section>

      {/* ================= PRESCRIBED TREATMENT ================= */}
      <Section title="Prescribed Treatment" sectionKey="treatment">
        {medications.map((med, index) => (
          <div
            key={med.id}
            className="border rounded-lg p-4 space-y-3 bg-gray-50"
          >
            <Typography className="font-medium">
              Medication {index + 1}
            </Typography>

            <input
              placeholder="Medication name"
              value={med.name}
              onChange={(e) => updateMedication(med.id, "name", e.target.value)}
              className="w-full border rounded-lg p-2"
            />

            <input
              placeholder="Dose"
              value={med.dose}
              onChange={(e) => updateMedication(med.id, "dose", e.target.value)}
              className="w-full border rounded-lg p-2"
            />

            <input
              placeholder="Frequency"
              value={med.frequency}
              onChange={(e) =>
                updateMedication(med.id, "frequency", e.target.value)
              }
              className="w-full border rounded-lg p-2"
            />

            <input
              placeholder="Duration"
              value={med.duration}
              onChange={(e) =>
                updateMedication(med.id, "duration", e.target.value)
              }
              className="w-full border rounded-lg p-2"
            />

            <textarea
              placeholder="Instructions"
              value={med.instructions}
              onChange={(e) =>
                updateMedication(med.id, "instructions", e.target.value)
              }
              className="w-full border rounded-lg p-2"
            />
          </div>
        ))}

        <button
          onClick={addMedication}
          className="flex items-center gap-2 text-primary-color font-medium"
        >
          <Icon icon="mdi:plus-circle-outline" width="20" />
          Add medication
        </button>
      </Section>

      {/* ================= TESTS & ASSESSMENTS ================= */}
      <Section title="Tests & Assessments" sectionKey="tests">
        <div className="border rounded-lg p-4 text-gray-500">
          No tests required at this time.
        </div>
      </Section>

      {/* ================= MEDICAL RECOMMENDATIONS ================= */}
      <Section title="Medical Recommendations" sectionKey="recommendations">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={noRecommendations}
              onChange={() => setNoRecommendations(!noRecommendations)}
            />
            <span>No recommendations provided</span>
          </label>
        </div>
      </Section>

      {/* ================= FOLLOW-UP PLAN ================= */}
      <Section title="Follow-Up Plan" sectionKey="followup">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={followUpRequired}
              onChange={() => setFollowUpRequired(!followUpRequired)}
            />
            <span>Follow-up required</span>
          </label>
        </div>
      </Section>

      {/* ================= DOCUMENTS ================= */}
      {/* <Section title="Associated Documents" sectionKey="documents">
        {documents.map((doc, i) => {
          const config = statusConfig[doc.status];
          return (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div>
                <Typography className="font-medium">{doc.title}</Typography>
                <Typography className="text-sm text-gray-400">
                  {doc.date}
                </Typography>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${config.badgeClass}`}
                >
                  {doc.status}
                </span>
                <button className="text-primary-color font-medium">
                  {config.actionText}
                </button>
              </div>
            </div>
          );
        })}
      </Section> */}

      {/* ================= VALIDATE BUTTON ================= */}
      <div className="pt-6">
        <button className="w-full bg-primary-color text-white py-4 rounded-xl font-semibold">
          Validate & Lock care plan
        </button>
      </div>
    </div>
  );
}
