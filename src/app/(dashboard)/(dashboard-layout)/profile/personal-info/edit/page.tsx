"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

/* =========================
   VALIDATION
========================= */
const validationSchema = Yup.object({
  licenseNumber: Yup.string().required("License number required"),
  registrationDate: Yup.string().required("Required"),
  issuingAuthority: Yup.string().required("Required"),
  expiryDate: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  primarySpecialty: Yup.string().required("Required"),
  experience: Yup.number().min(0).required("Required"),
  placeOfPractice: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  consultationType: Yup.string().required("Required"),
  fee: Yup.string().required("Required"),
  secondarySpecialty: Yup.string(),
});

export default function EditProfessionalInfo() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      licenseNumber: "MA-PK-457621",
      registrationDate: "2018-03-15",
      issuingAuthority: "Government",
      expiryDate: "2018-03-15",
      status: "pending",
      primarySpecialty: "Cardiology",
      secondarySpecialty: "Cardiology, Pediatrics",
      experience: 7,
      placeOfPractice: "Allied Hospital, Faisalabad",
      location: "Allied Hospital, Faisalabad",
      consultationType: "In person",
      fee: "30$",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      router.push("/profile/personal-info");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-5xl space-y-6">
      <h2 className="text-xl font-semibold">Edit Professional Information</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LICENSE */}
        <Field label="License number" name="licenseNumber" formik={formik} />

        <DateField
          label="Date of Registration"
          name="registrationDate"
          formik={formik}
        />

        <Field
          label="Issuing authority"
          name="issuingAuthority"
          formik={formik}
        />

        <DateField label="Expiry date" name="expiryDate" formik={formik} />

        <SelectField
          label="Status"
          name="status"
          options={["pending", "approved"]}
          formik={formik}
        />

        <SelectField
          label="Specialty (primary)"
          name="primarySpecialty"
          options={["Cardiology", "Dermatology"]}
          formik={formik}
        />

        <SelectField
          label="Secondary specialties"
          name="secondarySpecialty"
          options={["Cardiology, Pediatrics", "General Medicine", "Neurology"]}
          formik={formik}
        />

        <Field
          label="Years of experience"
          name="experience"
          type="number"
          formik={formik}
        />

        <SelectField
          label="Place of Practice"
          name="placeOfPractice"
          options={["Allied Hospital, Faisalabad"]}
          formik={formik}
        />

        <Field label="Location" name="location" formik={formik} />

        <SelectField
          label="Consultation types"
          name="consultationType"
          options={["In person", "Online"]}
          formik={formik}
        />
      </div>

      {/* FEES */}
      <Field label="Fees per type" name="fee" formik={formik} />
      <p className="text-xs text-gray-500">
        These fees are displayed on your public profile.
      </p>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 rounded-lg text-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-primary-color text-white rounded-lg text-md"
        >
          Update
        </button>
      </div>
    </form>
  );
}

/* =========================
   REUSABLE FIELDS
========================= */

const Field = ({ label, name, type = "text", formik }: any) => (
  <div>
    <label className="text-md font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      className="w-full border rounded-lg px-3 py-2 mt-1"
    />
  </div>
);

const DateField = ({ label, name, formik }: any) => (
  <div>
    <label className="text-md font-semibold">{label}</label>
    <div className="relative">
      <input
        type="date"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        className="w-full border rounded-lg px-3 py-2 mt-1 pr-10 appearance-none"
      />
      <Icon
        icon="uil:calender"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-color"
      />
    </div>
  </div>
);

const SelectField = ({ label, name, options, formik }: any) => (
  <div>
    <label className="text-md font-semibold">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        className="w-full border rounded-lg px-3 py-2 mt-1 pr-10 appearance-none"
      >
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <Icon
        icon="mdi:chevron-down"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  </div>
);
