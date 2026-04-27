"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

import ContainerCard from "@/components/shared/container/container-card";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";
import InputPhoneField from "@/components/shared/input-fields/input-phone-field";
import InputDateField from "@/components/shared/input-fields/input-date-field";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { getError } from "@/utils/form-helpers";
import { Icon } from "@iconify/react";

/* =========================
   FORM STATE (LOCAL)
========================= */

const initialValues = {
  fullName: "",
  dob: "",
  phone: "",
  gender: "",
  idType: "",
  idNumber: "",
  expiryDate: "",
  nationalIdentifier: "",
  city: "",
  area: "",
  address: "",
  languages: [] as string[],
  aboutMe: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  dob: Yup.string().required("Date of birth is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  idType: Yup.string().required("ID type is required"),
  idNumber: Yup.string().required("ID number is required"),
  expiryDate: Yup.string().required("Expiry date is required"),
  city: Yup.string().required("City is required"),
  area: Yup.string().required("Area is required"),
  address: Yup.string().required("Address is required"),
  languages: Yup.array().min(1, "Select at least one language"),
  aboutMe: Yup.string().required("About me is required"),
});

/* =========================
   COMPONENT
========================= */

const DemographicInfo = ({ onNext }: { onNext: () => void }) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onNext,
  });

  return (
    <ContainerCard cardHeading="Demographic info" headingAlign="left">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex justify-start">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
            <Icon
              icon="solar:user-outline"
              width="48"
              height="48"
              className="text-primary-color"
            />
          </div>
        </div>

        {/* BASIC */}
        <Typography size="h5" className="font-bold">
          Basic
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputTextField
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("fullName", touched, errors)}
          />

          <InputDateField
            name="dob"
            label="Date of Birth"
            value={values.dob}
            onChange={handleChange}
            error={getError("dob", touched, errors)}
          />

          <InputTextField
            name="phone"
            label="Phone Number"
            value={values.phone}
            onChange={handleChange}
            error={getError("phone", touched, errors)}
          />

          <InputDropdown
            name="gender"
            label="Gender"
            options={[
              { label: "Male", value: "Johar Town" },
              { label: "Femal", value: "DHA" },
            ]}
            value={values.gender}
            onSelect={(v) => setFieldValue("gender", v)}
            error={getError("gender", touched, errors)}
          />
        </div>

        {/* IDENTITY */}
        <Typography size="h5" className="font-bold">
          Identity
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDropdown
            name="idType"
            label="ID Type"
            options={[
              { label: "National Id", value: "Johar Town" },
              { label: "Password", value: "DHA" },
            ]}
            value={values.idType}
            onSelect={(v) => setFieldValue("idType", v)}
            error={getError("idType", touched, errors)}
          />

          <InputTextField
            name="idNumber"
            label="ID Number"
            value={values.idNumber}
            onChange={handleChange}
            error={getError("idNumber", touched, errors)}
          />

          <InputDateField
            name="expiryDate"
            label="Expiry date"
            value={values.expiryDate}
            onChange={handleChange}
            error={getError("expiryDate", touched, errors)}
          />

          <InputTextField
            name="nationalIdentifier"
            label="National identifier (Optional)"
            value={values.nationalIdentifier}
            onChange={handleChange}
          />
        </div>

        {/* ADDRESS */}
        <Typography size="h5" className="font-bold">
          Address
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDropdown
            name="city"
            label="City"
            options={[
              { label: "Johar Town", value: "Johar Town" },
              { label: "DHA", value: "DHA" },
            ]}
            value={values.city}
            onSelect={(v) => setFieldValue("city", v)}
            error={getError("city", touched, errors)}
          />

          <InputDropdown
            name="area"
            label="Area"
            options={[
              { label: "Lahore", value: "Johar Town" },
              { label: "Multan", value: "DHA" },
            ]}
            value={values.area}
            onSelect={(v) => setFieldValue("area", v)}
            error={getError("area", touched, errors)}
          />
        </div>

        <InputTextField
          name="address"
          label="Address"
          value={values.address}
          onChange={handleChange}
          error={getError("address", touched, errors)}
        />

        {/* LANGUAGES */}
        <InputDropdown
          name="languages"
          label="Spoken languages"
          //   multiple
          options={[
            { label: "English", value: "english" },
            { label: "Urdu", value: "urdu" },
          ]}
          value={values.languages}
          onSelect={(v) => setFieldValue("languages", v)}
          error={getError("languages", touched, errors)}
        />

        {/* ABOUT */}
        <InputTextField
          name="aboutMe"
          label="About Me"
          multiline
          value={values.aboutMe}
          onChange={handleChange}
          error={getError("aboutMe", touched, errors)}
        />
      </form>
    </ContainerCard>
  );
};

export default DemographicInfo;
