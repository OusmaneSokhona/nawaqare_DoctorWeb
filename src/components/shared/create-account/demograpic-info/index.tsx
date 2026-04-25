"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/shared/button";
import ContainerCard from "@/components/shared/container/container-card";
import InputDropdown from "@/components/shared/input-fields/input-dropdown";
import InputNumberField from "@/components/shared/input-fields/input-number-field";
import InputPhoneField from "@/components/shared/input-fields/input-phone-field";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import { content } from "@/data";
import { mainContactForm } from "@/formik/forms/auth";
import { mainContactInitialValues } from "@/formik/initial-values/auth";
import { mainContactSchema } from "@/formik/validations/auth";
import { getError, getTouched } from "@/utils/form-helpers";
import InputDateField from "../../input-fields/input-date-field";
import { Typography } from "../../typography";

const MainContact = () => {
  const router = useRouter();

  const feeOptions = [
    { label: "Clinic", value: "clinic" },
    { label: "Hospital", value: "hospital" },
    { label: "Home", value: "home" },
  ];

  const {
    countryNames,
    cardiologyOptions,
    medicationOptions,
    clinicOptions,
    cityOptions,
  } = content;
  const {
    first_name,
    last_name,
    company_name,
    registration_no,
    address,
    region,
    post_code,
    company_register_in,
    vat_registration_no,
    phone_no,
    registration_date,
    cardiology,
    medication,
    clinic,
    city,
    facilityName,
  } = mainContactForm.formFields;

  const {
    values,
    touched,
    isValid,
    errors,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: mainContactInitialValues,
    validationSchema: mainContactSchema,
    onSubmit: () => {
      resetForm();
      router.push("/license-fee");
    },
  });

  return (
    <ContainerCard cardHeading="Registration" headingAlign="left">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="w-full sm:w-[50%]">
            {/* <InputTextField
              name={first_name.name}
              required={true}
              label={first_name.label}
              value={values.first_name}
              textColor="text-primary-text"
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              placeholder={first_name.placeholder}
              onBlur={handleBlur}
              onChange={handleChange}
              error={getError(first_name.name, touched, errors)}
            /> */}
            <InputTextField
              required={true}
              name={registration_no.name}
              label={registration_no.label}
              textColor="text-primary-text"
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              placeholder={registration_no.placeholder}
              value={values.registration_no}
              onBlur={handleBlur}
              onChange={handleChange}
              error={getError(registration_no.name, touched, errors)}
            />
          </div>
          <div className="w-full sm:w-[50%]">
            {/* <InputTextField
              required={true}
              name={last_name.name}
              label={last_name.label}
              textColor="text-primary-text"
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              placeholder={last_name.placeholder}
              value={values.last_name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={getError(last_name.name, touched, errors)}
            /> */}
            <InputDateField
              required
              name={registration_date.name}
              label={registration_date.label}
              placeholder={registration_date.placeholder}
              value={values.registration_date}
              onBlur={handleBlur}
              onChange={handleChange}
              textColor="text-primary-text"
              labelStyles="text-primary-text !font-bold"
              styling="bg-transparent"
              error={getError(registration_date.name, touched, errors)}
            />
          </div>
        </div>
        {/* <InputTextField
          required={true}
          name={company_name.name}
          label={company_name.label}
          textColor="text-primary-text"
          labelStyles={`text-primary-text !font-bold`}
          styling="bg-transparent"
          placeholder={company_name.placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.company_name}
          error={getError(company_name.name, touched, errors)}
        /> */}
        {/* <InputTextField
          required={true}
          name={registration_no.name}
          label={registration_no.label}
          textColor="text-primary-text"
          labelStyles={`text-primary-text !font-bold`}
          styling="bg-transparent"
          placeholder={registration_no.placeholder}
          value={values.registration_no}
          onBlur={handleBlur}
          onChange={handleChange}
          error={getError(registration_no.name, touched, errors)}
        /> */}
        {/* <InputTextField
          required={true}
          name={address.name}
          label={address.label}
          value={values.address}
          textColor="text-primary-text"
          labelStyles={`text-primary-text !font-bold`}
          styling="bg-transparent"
          placeholder={address.placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          error={getError(address.name, touched, errors)}
        /> */}
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="w-full sm:w-[50%]">
            <InputTextField
              name={region.name}
              required={true}
              label={region.label}
              value={values.region}
              textColor="text-primary-text"
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              placeholder={region.placeholder}
              onBlur={handleBlur}
              onChange={handleChange}
              error={getError(region.name, touched, errors)}
            />
          </div>
          <div className="w-full sm:w-[50%]">
            <InputNumberField
              required={true}
              name={post_code.name}
              label={post_code.label}
              textColor="text-primary-text"
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              placeholder={post_code.placeholder}
              value={values.post_code}
              onBlur={handleBlur}
              onChange={handleChange}
              error={getError(post_code.name, touched, errors)}
            />
          </div>
        </div>

        {/* <InputDropdown
          name={company_register_in.name}
          label={company_register_in.label}
          placeholder={company_register_in.placeholder}
          selectedTextColor="#312d2d"
          className="rounded-xl "
          height="h-[3.85rem]"
          required
          options={countryNames}
          value={values.company_register_in}
          onSelect={(selected) => {
            setFieldValue(company_register_in.name, selected);
          }}
          onBlur={handleBlur}
          touched={getTouched(company_register_in.name, touched, errors)}
          error={getError(company_register_in.name, touched, errors)}
        /> */}
        <div>
          <Typography size="h4" className="text-[#2C2C2C]">
            Specialty
          </Typography>
          <div className="flex flex-col sm:flex-row justify-between mt-3 gap-5">
            <div className="w-full sm:w-[50%]">
              <InputDropdown
                name={cardiology.name}
                label={cardiology.label}
                placeholder={cardiology.placeholder}
                required
                options={cardiologyOptions}
                value={values.cardiology}
                onSelect={(val) => setFieldValue(cardiology.name, val)}
                onBlur={handleBlur}
                touched={getTouched(cardiology.name, touched, errors)}
                error={getError(cardiology.name, touched, errors)}
              />
            </div>
            <div className="w-full sm:w-[50%]">
              <InputDropdown
                name={medication.name}
                label={medication.label}
                placeholder={medication.placeholder}
                required
                options={medicationOptions}
                value={values.medication}
                onSelect={(val) => setFieldValue(medication.name, val)}
                onBlur={handleBlur}
                touched={getTouched(medication.name, touched, errors)}
                error={getError(medication.name, touched, errors)}
              />
            </div>
          </div>
        </div>
        <div>
          <Typography size="h4" className="text-[#2C2C2C]">
            Practice location
          </Typography>
          <div className="flex flex-col sm:flex-row justify-between mt-3 gap-5">
            <div className="w-full sm:w-[50%]">
              <InputDropdown
                name={clinic.name}
                label={clinic.label}
                placeholder={clinic.placeholder}
                required
                options={clinicOptions}
                value={values.clinic}
                onSelect={(val) => setFieldValue(clinic.name, val)}
                onBlur={handleBlur}
                touched={getTouched(clinic.name, touched, errors)}
                error={getError(clinic.name, touched, errors)}
              />
            </div>
            <div className="w-full sm:w-[50%]">
              <InputDropdown
                name={city.name}
                label={city.label}
                placeholder={city.placeholder}
                required
                options={cityOptions}
                value={values.city}
                onSelect={(val) => setFieldValue(city.name, val)}
                onBlur={handleBlur}
                touched={getTouched(city.name, touched, errors)}
                error={getError(city.name, touched, errors)}
              />
            </div>
          </div>
        </div>
        <InputTextField
          required={true}
          name={facilityName.name}
          label={facilityName.label}
          value={values.facilityName}
          textColor="text-primary-text"
          labelStyles={`text-primary-text !font-bold`}
          styling="bg-transparent"
          placeholder={facilityName.placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          error={getError(facilityName.name, touched, errors)}
        />
        <InputTextField
          required={true}
          name={address.name}
          label={address.label}
          value={values.address}
          textColor="text-primary-text"
          labelStyles={`text-primary-text !font-bold`}
          styling="bg-transparent"
          placeholder={address.placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          error={getError(address.name, touched, errors)}
        />
        <Typography
          size="h5"
          className="underline text-primary-color font-bold"
        >
          Add another location
        </Typography>
        {/* <InputTextField
          required={true}
          name={vat_registration_no.name}
          label={vat_registration_no.label}
          textColor="text-primary-text"
          labelStyles={`text-primary-text !font-bold`}
          styling="bg-transparent"
          placeholder={vat_registration_no.placeholder}
          value={values.vat_registration_no}
          onBlur={handleBlur}
          onChange={handleChange}
          error={getError(vat_registration_no.name, touched, errors)}
        />
        <InputPhoneField
          name={phone_no.name}
          position={true}
          value={values.phone_no}
          required
          label={phone_no.label}
          placeholder={phone_no.placeholder}
          labelStyles="text-secandary-text font-semibold text-md"
          onBlur={handleBlur}
          onChange={handleChange}
          onCountryChange={(country) => {
            setFieldValue("country", country);
          }}
          error={getError(phone_no.name, touched, errors)}
        /> */}

        {/* <div className="flex justify-center items-center pt-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full"
            disabled={!(isValid && dirty)}
          >
            Next
          </Button>
        </div> */}

        <Typography size="h4">Consultation types</Typography>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={values.consultationTypes.video}
              onChange={(e) =>
                setFieldValue("consultationTypes.video", e.target.checked)
              }
            />
            Video consultation
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={values.consultationTypes.inPerson}
              onChange={(e) =>
                setFieldValue("consultationTypes.inPerson", e.target.checked)
              }
            />
            In-person consultation
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Home visit
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Home visit ( Coming Lates)
          </label>
        </div>

        <Typography size="h4">Pricing</Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputDropdown
            name="videoFee"
            label="Video fee"
            placeholder="Select video fee"
            options={feeOptions}
            value={values.videoFee}
            onSelect={(val) => setFieldValue("videoFee", val)}
            onBlur={handleBlur}
            touched={getTouched("videoFee", touched, errors)}
            error={getError("videoFee", touched, errors)}
          />

          <InputDropdown
            name="inPersonFee"
            label="In-person fee"
            placeholder="Select in-person fee"
            options={feeOptions}
            value={values.inPersonFee}
            onSelect={(val) => setFieldValue("inPersonFee", val)}
            onBlur={handleBlur}
            touched={getTouched("inPersonFee", touched, errors)}
            error={getError("inPersonFee", touched, errors)}
          />

          <InputTextField
            name="homeVisitFee"
            label="Home visit fee"
            value={values.homeVisitFee}
            onChange={handleChange}
          />
        </div>

        <Typography size="md" className="text-gray-500">
          *You can adjust later in settings
        </Typography>
      </form>
    </ContainerCard>
  );
};

export default MainContact;

// "use client";

// import { useFormik } from "formik";
// import ContainerCard from "@/components/shared/container/container-card";
// import InputTextField from "@/components/shared/input-fields/input-text-field";
// import InputDropdown from "@/components/shared/input-fields/input-dropdown";
// import InputPhoneField from "@/components/shared/input-fields/input-phone-field";
// import InputDateField from "@/components/shared/input-fields/input-date-field";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";

// import { getError } from "@/utils/form-helpers";
// import { demographicInitialValues } from "@/formik/initial-values/auth";
// import { demographicSchema } from "@/formik/validations/auth";
// import { demographicForm } from "@/formik/forms/auth";

// const DemographicInfo = ({ onNext }: { onNext: () => void }) => {
//   const { formFields } = demographicForm;

//   const {
//     values,
//     touched,
//     errors,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     setFieldValue,
//   } = useFormik({
//     initialValues: demographicInitialValues,
//     validationSchema: demographicSchema,
//     onSubmit: onNext,
//   });

//   return (
//     <ContainerCard cardHeading="Demographic info" headingAlign="left">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-6">

//         {/* BASIC */}
//         <Typography size="h5" className="font-bold">Basic</Typography>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputTextField
//             {...formFields.fullName}
//             value={values.fullName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={getError("fullName", touched, errors)}
//           />

//           <InputDateField
//             {...formFields.dob}
//             value={values.dob}
//             onChange={handleChange}
//             error={getError("dob", touched, errors)}
//           />

//           <InputPhoneField
//             name="phone"
//             label="Phone Number"
//             value={values.phone}
//             onChange={handleChange}
//             error={getError("phone", touched, errors)}
//           />

//           <InputDropdown
//             name="gender"
//             label="Gender"
//             options={["Male", "Female"]}
//             value={values.gender}
//             onSelect={(v) => setFieldValue("gender", v)}
//             error={getError("gender", touched, errors)}
//           />
//         </div>

//         {/* IDENTITY */}
//         <Typography size="h5" className="font-bold">Identity</Typography>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputDropdown
//             name="idType"
//             label="ID Type"
//             options={["National ID", "Passport"]}
//             value={values.idType}
//             onSelect={(v) => setFieldValue("idType", v)}
//             error={getError("idType", touched, errors)}
//           />

//           <InputTextField
//             name="idNumber"
//             label="ID Number"
//             value={values.idNumber}
//             onChange={handleChange}
//             error={getError("idNumber", touched, errors)}
//           />

//           <InputDateField
//             name="expiryDate"
//             label="Expiry date"
//             value={values.expiryDate}
//             onChange={handleChange}
//             error={getError("expiryDate", touched, errors)}
//           />

//           <InputTextField
//             name="nationalIdentifier"
//             label="National identifier (Optional)"
//             value={values.nationalIdentifier}
//             onChange={handleChange}
//           />
//         </div>

//         {/* ADDRESS */}
//         <Typography size="h5" className="font-bold">Address</Typography>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <InputDropdown
//             name="demoCity"
//             label="City"
//             options={["Lahore", "Karachi"]}
//             value={values.demoCity}
//             onSelect={(v) => setFieldValue("demoCity", v)}
//             error={getError("demoCity", touched, errors)}
//           />

//           <InputDropdown
//             name="area"
//             label="Area"
//             options={["Johar Town", "DHA"]}
//             value={values.area}
//             onSelect={(v) => setFieldValue("area", v)}
//             error={getError("area", touched, errors)}
//           />
//         </div>

//         <InputTextField
//           name="demoAddress"
//           label="Address"
//           value={values.demoAddress}
//           onChange={handleChange}
//           error={getError("demoAddress", touched, errors)}
//         />

//         {/* LANGUAGES */}
//         <InputDropdown
//           name="languages"
//           label="Spoken languages"
//           multiple
//           options={["Urdu", "English"]}
//           value={values.languages}
//           onSelect={(v) => setFieldValue("languages", v)}
//           error={getError("languages", touched, errors)}
//         />

//         {/* ABOUT */}
//         <InputTextField
//           name="aboutMe"
//           label="About Me"
//           multiline
//           value={values.aboutMe}
//           onChange={handleChange}
//           error={getError("aboutMe", touched, errors)}
//         />

//         <Button type="submit" className="bg-primary-color text-white w-full">
//           Continue
//         </Button>
//       </form>
//     </ContainerCard>
//   );
// };

// export default DemographicInfo;
