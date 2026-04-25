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

const MainContact = () => {
  const router = useRouter();

  const { countryNames } = content;
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
    <ContainerCard cardHeading="Main Contact" headingAlign="left">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="w-full sm:w-[50%]">
            <InputTextField
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
            />
          </div>
          <div className="w-full sm:w-[50%]">
            <InputTextField
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
            />
          </div>
        </div>
        <InputTextField
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
        />
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

        <InputDropdown
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
        />
        <InputTextField
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
        />

        <div className="flex justify-center items-center pt-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full"
            disabled={!(isValid && dirty)}
          >
            Next
          </Button>
        </div>
      </form>
    </ContainerCard>
  );
};

export default MainContact;
