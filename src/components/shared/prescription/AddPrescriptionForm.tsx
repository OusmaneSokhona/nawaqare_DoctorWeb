// "use client";

// import React from "react";
// import { Icon } from "@iconify/react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";

// // Validation Schema
// const PrescriptionSchema = Yup.object().shape({
//   patient: Yup.string().required("Required"),
//   diagnosis: Yup.string().required("Required"),
//   validUntil: Yup.string().required("Required"),
//   // Medication input validation (current input field)
//   tempMedName: Yup.string(),
// });

// interface Medicine {
//   id: string;
//   medName: string;
//   dosage: string;
//   duration: string;
//   quantity: string;
//   substitution: string;
// }

// export default function AddPrescriptionForm({
//   mode,
//   initialData,
// }: {
//   mode: "add" | "edit";
//   initialData?: any;
// }) {
//   const isEdit = mode === "edit";

//   const initialValues = {
//     patient: initialData?.patient || "john smith (id:54321)",
//     consultation: initialData?.consultation || "consultation #1234 | follow up",
//     diagnosis: initialData?.diagnosis || "",
//     validUntil: initialData?.validUntil || "12/sep/2025",
//     medicines: (initialData?.medicines as Medicine[]) || [],
//     // Ye temporary fields hain niche wale inputs ke liye
//     tempMedName: "",
//     tempDuration: "15 days",
//     tempDosage: "Morning/Evening",
//     tempQuantity: "",
//     tempSubstitution: "no",
//     tempRefillLimit: "3",
//     tempInstruction: "",
//     tempNotes: "",
//   };

//   return (
//     <div className="p-4">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={PrescriptionSchema}
//         onSubmit={(values) => {
//           // Final Submit logic
//           const {
//             tempMedName,
//             tempDuration,
//             tempDosage,
//             tempQuantity,
//             ...finalData
//           } = values;
//           console.log("Form Submitted:", finalData);
//           //   alert("Data submitted to console!");
//         }}
//       >
//         {({ values, setFieldValue, handleChange }) => (
//           <Form className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex justify-between">
//               <h1 className="text-xl font-bold text-gray-800 mb-6">
//                 {isEdit
//                   ? "Edit prescription detail"
//                   : "Add new prescription detail"}
//               </h1>

//               <span className="text-primary-color underline">
//                 view consultation
//               </span>
//             </div>

//             {/* TOP SELECTORS */}
//             <div className="grid grid-cols-2 gap-6 mb-6">
//               <div className="flex flex-col">
//                 <label className="text-xs font-semibold text-black mb-1 uppercase tracking-tight">
//                   Select patient
//                 </label>
//                 <div className="relative">
//                   <Field
//                     as="select"
//                     name="patient"
//                     className="w-full text-gray-400 border border-gray-200 p-2.5 rounded-lg appearance-none bg-white outline-none"
//                   >
//                     <option value="john smith (id:54321)">
//                       john smith (id:54321)
//                     </option>
//                   </Field>
//                   <Icon
//                     icon="mdi:chevron-down"
//                     className="absolute right-3 top-3 text-gray-400 w-5 h-5"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-xs font-semibold text-black mb-1 uppercase tracking-tight">
//                   Select consultation
//                 </label>
//                 <div className="relative">
//                   <Field
//                     as="select"
//                     name="consultation"
//                     className="w-full border text-gray-400 border-gray-200 p-2.5 rounded-lg appearance-none bg-white outline-none"
//                   >
//                     <option value="consultation #1234 | follow up">
//                       consultation #1234 | follow up
//                     </option>
//                   </Field>
//                   <Icon
//                     icon="mdi:chevron-down"
//                     className="absolute right-3 top-3 text-gray-400 w-5 h-5"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-xs font-semibold text-black mb-1 uppercase tracking-tight">
//                   Indication / Diagnosis
//                 </label>
//                 <div className="relative">
//                   <Field
//                     as="select"
//                     name="diagnosis"
//                     className="w-full border text-gray-400 border-gray-200 p-2.5 rounded-lg appearance-none bg-white outline-none"
//                   >
//                     <option value="">Select diagnosis</option>
//                     <option value="Hypertension">Hypertension</option>
//                     <option value="Diabetes">Diabetes</option>
//                   </Field>
//                   <Icon
//                     icon="mdi:chevron-down"
//                     className="absolute right-3 top-3 text-gray-400 w-5 h-5"
//                   />
//                 </div>
//                 <ErrorMessage
//                   name="diagnosis"
//                   component="div"
//                   className="text-red-500 text-[10px] mt-1"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-xs font-semibold text-black mb-1 uppercase tracking-tight">
//                   Valid Until
//                 </label>
//                 <div className="relative">
//                   <Field
//                     name="validUntil"
//                     type="text"
//                     className="w-full border text-gray-400 border-gray-200 p-2.5 rounded-lg outline-none bg-white"
//                   />
//                   <Icon
//                     icon="mdi:calendar-month-outline"
//                     className="absolute right-3 top-3 text-primary-color w-5 h-5"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* ALERTS */}
//             <div className="bg-[#edd5d5] border border-red-100 rounded-lg p-4 mb-8 space-y-2 text-xs font-medium text-orange-600">
//               <div className="flex items-center">
//                 <Icon
//                   icon="mdi:alert-circle-outline"
//                   className="mr-2 w-4 h-4"
//                 />
//                 <span>
//                   Allergies :{" "}
//                   <span className="font-bold text-gray-800">penicillin</span>{" "}
//                   (severe reaction)
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Icon
//                   icon="mdi:alert-circle-outline"
//                   className="mr-2 w-4 h-4"
//                 />
//                 <span>
//                   Interaction :{" "}
//                   <span className="text-gray-800">Caution with NSAIDS</span>
//                 </span>
//               </div>
//             </div>

//             {/* MEDICATION SECTION */}
//             <FieldArray name="medicines">
//               {({ push, remove }) => (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-gray-800 mb-4">
//                     Medication
//                   </h2>

//                   {/* Headers */}
//                   <div className="grid grid-cols-5 text-[10px] font-bold text-gray-400 uppercase mb-2 px-1 border-b pb-1">
//                     <span>Medication</span>
//                     <span>Dosage</span>
//                     <span>Duration</span>
//                     <span>Quantity</span>
//                     <span>Substitution</span>
//                   </div>

//                   {/* List of Added Medicines */}
//                   {values.medicines.map((med, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-5 text-[11px] text-gray-600 py-2 px-1 border-b border-gray-50 italic relative group"
//                     >
//                       <span className="font-semibold text-blue-600 not-italic">
//                         {med.medName}
//                       </span>
//                       <span>{med.dosage}</span>
//                       <span>{med.duration}</span>
//                       <span>{med.quantity}</span>
//                       <div className="flex justify-between items-center">
//                         <span>{med.substitution}</span>
//                         <button
//                           type="button"
//                           onClick={() => remove(index)}
//                           className="hidden group-hover:block text-red-500"
//                         >
//                           <Icon icon="mdi:close-circle" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}

//                   {/* ADD MEDICINE BUTTON - Logic to move temp to list */}
//                   <button
//                     type="button"
//                     className="mt-4 text-[#3b82f6] text-xs font-bold flex items-center hover:underline"
//                     onClick={() => {
//                       //   if (!values.tempMedName) return alert("Enter medicine name");
//                       push({
//                         id: Date.now().toString(),
//                         medName: values.tempMedName,
//                         dosage: values.tempDosage,
//                         duration: values.tempDuration,
//                         quantity: values.tempQuantity,
//                         substitution: values.tempSubstitution,
//                       });
//                       // Reset temp fields
//                       setFieldValue("tempMedName", "");
//                       setFieldValue("tempQuantity", "");
//                     }}
//                   >
//                     <Icon icon="mdi:plus" className="mr-1" /> Add Medicine
//                   </button>

//                   {/* INPUT FIELDS (DATA ENTRY) */}
//                   <div className="mt-6 space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="flex flex-col">
//                         <label className="text-[11px] font-bold text-gray-700 mb-1">
//                           Medication Name
//                         </label>
//                         <Field
//                           name="tempMedName"
//                           placeholder="Type name..."
//                           className="border border-gray-100 p-3 rounded-lg outline-none text-sm"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <label className="text-[11px] font-bold text-gray-700 mb-1">
//                           Duration
//                         </label>
//                         <Field
//                           as="select"
//                           name="tempDuration"
//                           className="border border-gray-100 p-3 rounded-lg outline-none text-sm"
//                         >
//                           <option value="15 days">15 days</option>
//                           <option value="30 days">30 days</option>
//                         </Field>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="flex flex-col">
//                         <label className="text-[11px] font-bold text-gray-700 mb-1">
//                           Dosage
//                         </label>
//                         <Field
//                           as="select"
//                           name="tempDosage"
//                           className="border border-gray-100 p-3 rounded-lg outline-none text-sm"
//                         >
//                           <option value="Morning/Evening">
//                             Morning/Evening
//                           </option>
//                           <option value="Once Daily">Once Daily</option>
//                         </Field>
//                       </div>
//                       <div className="flex flex-col">
//                         <label className="text-[11px] font-bold text-gray-700 mb-1">
//                           Quantity
//                         </label>
//                         <Field
//                           name="tempQuantity"
//                           placeholder="e.g. 20"
//                           className="border border-gray-100 p-3 rounded-lg outline-none text-sm"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="flex flex-col">
//                         <label className="text-[11px] font-bold text-gray-700 mb-1">
//                           Substitution
//                         </label>
//                         <Field
//                           name="tempSubstitution"
//                           className="border border-gray-100 p-3 rounded-lg outline-none text-sm"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <label className="text-[11px] font-bold text-gray-700 mb-1">
//                           Refill limit
//                         </label>
//                         <Field
//                           name="tempRefillLimit"
//                           className="border border-gray-100 p-3 rounded-lg outline-none text-sm"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-col">
//                       <label className="text-[11px] font-bold text-gray-700 mb-1">
//                         Patient instruction
//                       </label>
//                       <Field
//                         as="textarea"
//                         name="tempInstruction"
//                         rows={2}
//                         className="border border-gray-100 p-3 rounded-lg outline-none text-sm resize-none"
//                       />
//                     </div>

//                     <div className="flex flex-col">
//                       <label className="text-[11px] font-bold text-gray-700 mb-1">
//                         Notes
//                       </label>
//                       <Field
//                         as="textarea"
//                         name="tempNotes"
//                         rows={2}
//                         className="border border-gray-100 p-3 rounded-lg outline-none text-sm resize-none"
//                       />
//                     </div>
//                   </div>
//                 </section>
//               )}
//             </FieldArray>

//             {/* FOOTER */}
//             <div className="flex justify-end gap-4 border-t pt-6">
//               <button
//                 type="button"
//                 className="px-10 py-2.5 bg-[#ebe8ef] text-gray-700 font-bold rounded-lg text-sm transition hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-10 py-2.5 bg-[#3b82f6] text-white font-bold rounded-lg text-sm shadow-md transition hover:bg-blue-600"
//               >
//                 {isEdit ? "Update Prescription" : "Add Prescription"}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const PrescriptionSchema = Yup.object().shape({
  patient: Yup.string().required("Patient is required"),
  consultation: Yup.string().required("Consultation required"),
  diagnosis: Yup.string().required("Diagnosis required"),
  clinicalJustification: Yup.string().required("Required"),
  medicationName: Yup.string().required("Medication required"),
  strength: Yup.string().required("Strength required"),
  dose: Yup.string().required("Dose required"),
  frequency: Yup.string().required("Frequency required"),
  treatmentDuration: Yup.string().required("Duration required"),
  quantity: Yup.string().required("Quantity required"),
  prescriptionType: Yup.string().required("Select prescription type"),
});

export default function AddPrescriptionForm({
  mode,
  initialData,
}: {
  mode: "add" | "edit";
  initialData?: any;
}) {
  const isEdit = mode === "edit";

  const initialValues = {
    prescriptionType: "Standard",

    /* ================= PATIENT ================= */
    patient: "",
    age: "",
    cmu: "",
    status: "Active",
    weight: "",
    gender: "Male",

    /* ================= CONSULTATION ================= */
    consultation: "",
    date: "",
    type: "Teleconsultation",
    emergency: false,

    /* ================= DIAGNOSIS ================= */
    diagnosis: "",
    clinicalJustification: "",

    /* ================= MEDICATION ================= */
    medicationName: "",
    unipef: "",
    strength: "",
    route: "Oral",
    form: "",
    caseLevel: "Primary care",

    /* ================= DOSAGE ================= */
    dose: "",
    frequency: "",
    timingMorning: false,
    timingNoon: false,
    timingEvening: false,
    timingNight: false,
    relation: "Before meals",

    /* ================= DURATION ================= */
    treatmentDuration: "",
    quantity: "",
    startDate: "",
    endDate: "",
    packaging: "",

    /* ================= SUBSTITUTION ================= */
    substitutionAllowed: false,
    noSubstitution: false,
    pharmacistJustification: "",

    /* ================= RENEWALS ================= */
    allowRenewals: false,
    refillFrequency: "",
    refillNumber: "",
    consultationRequired: false,
    labRequired: false,
    endDateRenewal: "",

    /* ================= NOTES ================= */
    patientInstruction: "",
    clinicalNotes: "",
    pharmacyNotes: "",
  };

  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={PrescriptionSchema}
        onSubmit={(values) => {
          console.log("FINAL DATA:", values);
        }}
      >
        {({ values }) => (
          <Form className="bg-white p-8 rounded-xl shadow-sm border space-y-10">
            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">
                {isEdit
                  ? "Edit prescription detail"
                  : "Add new prescription detail"}
              </h1>

              <button
                type="button"
                className="bg-primary-color text-white px-4 py-1 rounded-lg text-sm"
              >
                Apply a template
              </button>
            </div>
            {/* ===================================================== */}
            {/* PRESCRIPTION TYPE */}
            {/* ===================================================== */}

            <section className="space-y-4">
              <Field name="prescriptionType">
                {({ field, form }: any) => (
                  <div className="space-y-4">
                    {[
                      {
                        label:
                          "Standard (common medications – validity 3 months)",
                        value: "Standard",
                      },
                      {
                        label:
                          "Secured (controlled substances – validity 7–28 days max)",
                        value: "Secured",
                      },
                      {
                        label:
                          "Chronic Disease (ALD / Bi-zone) – validity 12 months",
                        value: "Chronic",
                      },
                      {
                        label:
                          "Exception (special medications – prior authorization required)",
                        value: "Exception",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        {/* Custom Radio */}
                        <div className="relative mt-1">
                          <input
                            type="radio"
                            {...field}
                            value={option.value}
                            checked={field.value === option.value}
                            onChange={() =>
                              form.setFieldValue(
                                "prescriptionType",
                                option.value,
                              )
                            }
                            className="peer sr-only"
                          />

                          <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-blue-600">
                            {field.value === option.value && (
                              <div className="w-2.5 h-2.5 bg-primary-color rounded-full" />
                            )}
                          </div>
                        </div>

                        <span className="text-gray-800 text-base font-medium leading-relaxed">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </Field>
            </section>

            {/* ===================================================== */}
            {/* PATIENT SECTION */}
            {/* ===================================================== */}

            <div></div>

            <section>
              <h2 className="font-semibold mb-4">Patient</h2>

              <div className="grid grid-cols-2 gap-6">
                <Select name="patient" label="Select patient" />
                <Input name="age" label="Age" />
                <Input name="cmu" label="CMU" />
                <Select name="status" label="Status" />
                <Input name="weight" label="Weight" />
                <Select name="gender" label="Gender" />
              </div>
            </section>

            {/* ===================================================== */}
            {/* CONSULTATION */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Consultation</h2>

              <div className="grid grid-cols-2 gap-6">
                <Input name="consultation" label="Consultation" />
                <Input name="date" label="Date" type="datetime-local" />
                <Select name="type" label="Type" />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Field type="checkbox" name="emergency" />
                <span className="text-sm">
                  Emergency prescription without consult
                </span>
              </div>
            </section>

            {/* ===================================================== */}
            {/* DIAGNOSIS */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Diagnosis</h2>

              <div className="grid grid-cols-2 gap-6">
                <Input name="diagnosis" label="Diagnosis (ICD-10)" />
                <Select
                  name="clinicalJustification"
                  label="Clinical justification"
                />
              </div>
            </section>

            {/* ===================================================== */}
            {/* MEDICATION */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Medication</h2>

              <div className="grid grid-cols-2 gap-6">
                <Input name="medicationName" label="Medication Name" />
                <Input name="unipef" label="UNIPEF reference" />
                <Input name="strength" label="Strength" />
                <Select name="route" label="Route" />
                <Input name="form" label="Form" />
                <Select name="caseLevel" label="Case level" />
              </div>
            </section>

            {/* ===================================================== */}
            {/* DOSAGE */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Dosage</h2>

              <div className="grid grid-cols-2 gap-6">
                <Select name="dose" label="Dose" />
                <Select name="frequency" label="Frequency" />
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-sm font-medium">Time of intake</p>

                <div className="flex gap-6 text-sm">
                  <Checkbox name="timingMorning" label="Morning" />
                  <Checkbox name="timingNoon" label="Noon" />
                  <Checkbox name="timingEvening" label="Evening" />
                  <Checkbox name="timingNight" label="Night" />
                </div>
              </div>

              <div className="mt-4">
                <Select name="relation" label="Relation to meals" />
              </div>
            </section>

            {/* ===================================================== */}
            {/* DURATION & QUANTITY */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Duration & Quantity</h2>

              <div className="grid grid-cols-2 gap-6">
                <Input name="treatmentDuration" label="Treatment duration" />
                <Input name="quantity" label="Quantity" />
                <Input name="startDate" label="Start date" type="date" />
                <Input name="endDate" label="End date" type="date" />
                <Select name="packaging" label="Standard packaging" />
              </div>
            </section>

            {/* ===================================================== */}
            {/* SUBSTITUTION */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Substitution</h2>

              <div className="flex gap-6 text-sm">
                <Checkbox
                  name="substitutionAllowed"
                  label="Substitution allowed"
                />
                <Checkbox name="noSubstitution" label="No substitution" />
              </div>

              <div className="mt-4">
                <Input
                  name="pharmacistJustification"
                  label="Pharmacist justification"
                />
              </div>
            </section>

            {/* ===================================================== */}
            {/* RENEWALS */}
            {/* ===================================================== */}

            <section>
              <h2 className="font-semibold mb-4">Renewals</h2>

              <Checkbox name="allowRenewals" label="Allow renewals" />

              <div className="grid grid-cols-2 gap-6 mt-4">
                <Select name="refillFrequency" label="Refill frequency" />
                <Input name="refillNumber" label="Number" />
                <Checkbox
                  name="consultationRequired"
                  label="Consultation required each time"
                />
                <Checkbox name="labRequired" label="Lab tests required" />
                <Input name="endDateRenewal" label="End date" type="date" />
              </div>
            </section>

            {/* ===================================================== */}
            {/* NOTES */}
            {/* ===================================================== */}

            <section className="space-y-6">
              <Textarea name="patientInstruction" label="Patient instruction" />
              <Textarea name="clinicalNotes" label="Clinical notes" />
              <Textarea name="pharmacyNotes" label="Pharmacy notes" />
            </section>

            {/* ===================================================== */}
            {/* FOOTER */}
            {/* ===================================================== */}

            <div className="flex justify-end gap-4 border-t pt-6">
              <button
                type="button"
                className="px-8 py-2 bg-gray-200 rounded-lg"
              >
                Save draft
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-primary-color text-white rounded-lg"
              >
                {isEdit ? "Update prescription" : "Create prescription"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

/* ===================================================== */
/* REUSABLE COMPONENTS */
/* ===================================================== */

const Input = ({ name, label, type = "text" }: any) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold mb-1">{label}</label>
    <Field
      name={name}
      type={type}
      className="border p-2.5 rounded-lg outline-none"
    />
  </div>
);

const Select = ({ name, label }: any) => (
  <div className="flex flex-col relative">
    <label className="text-xs font-semibold mb-1">{label}</label>
    <Field
      as="select"
      name={name}
      className="border p-2.5 rounded-lg appearance-none"
    >
      <option value="">Select</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </Field>
    <Icon
      icon="mdi:chevron-down"
      className="absolute right-3 top-9 text-gray-400"
    />
  </div>
);

const Checkbox = ({ name, label }: any) => (
  <label className="flex items-center gap-2">
    <Field type="checkbox" name={name} />
    <span>{label}</span>
  </label>
);

const Textarea = ({ name, label }: any) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold mb-1">{label}</label>
    <Field
      as="textarea"
      name={name}
      rows={3}
      className="border p-2.5 rounded-lg outline-none resize-none"
    />
  </div>
);
