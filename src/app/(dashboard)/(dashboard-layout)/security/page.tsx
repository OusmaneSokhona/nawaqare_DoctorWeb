"use client";

import { useFormik } from "formik";
import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import { Typography } from "@/components/shared/typography";
import { Security } from "@/data";
import { securityForm } from "@/formik/forms/dashboard";
import { securityInitialValues } from "@/formik/initial-values/dashboard";
import { securityFormSchema } from "@/formik/validations/dashboard";
import { getError } from "@/utils/form-helpers";
import { changePassword } from "@/api/service/auth";

const SecurityPage = () => {
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);

  const {
    formFields: { old_password, new_password, confirm_password },
  } = securityForm;

  const {
    values,
    touched,
    isValid,
    errors,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: securityInitialValues,
    onSubmit: async (vals, { setSubmitting }) => {
      setApiError("");
      setApiSuccess(false);
      try {
        await changePassword({
          old_password: vals.old_password,
          new_password: vals.new_password,
        });
        setApiSuccess(true);
        resetForm();
      } catch (err: any) {
        setApiError(
          err?.response?.data?.message ?? "Failed to update password."
        );
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: securityFormSchema,
  });

  const loginHistory = Security?.loginHistory;

  return (
    <div className="flex flex-col gap-5 overflow-x-hidden">
      <div className="flex gap-5 items-baseline">
        <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row sm:items-end justify-between w-full">
          <div className="flex gap-5 flex-col sm:flex-row sm:items-baseline">
            <div>
              <Typography
                size={"h3"}
                as={"h3"}
                className="text-primary-dark font-bold pt-3"
              >
                Security
              </Typography>
              <Typography size={"md"} as={"p"} className="text-dark-gray">
                Update your password here
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2 h-full">
            <Container styling="overflow-hidden h-full space-y-5">
              <div className="px-5 sm:px-6 md:px-10 py-5 md:py-10 pb-7">
                <Typography as="h5" size="h5" className="text-primary-dark">
                  Change Password
                </Typography>
                {apiSuccess && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    Password updated successfully!
                  </div>
                )}
                {apiError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {apiError}
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 pt-6 md:pt-8"
                >
                  <div className="flex flex-col gap-5 w-full">
                    <InputPasswordField
                      name={old_password.name}
                      label={old_password.label}
                      onBlur={handleBlur}
                      textColor="text-primary-text"
                      value={values.old_password}
                      onChange={handleChange}
                      labelStyles={`text-primary-text !font-bold`}
                      styling="bg-transparent"
                      placeholder={old_password.placeholder}
                      error={getError(old_password.name, touched, errors)}
                    />
                    <InputPasswordField
                      name={new_password.name}
                      label={new_password.label}
                      onBlur={handleBlur}
                      textColor="text-primary-text"
                      value={values.new_password}
                      onChange={handleChange}
                      labelStyles={`text-primary-text !font-bold`}
                      styling="bg-transparent"
                      strengthChecker={true}
                      placeholder={new_password.placeholder}
                      error={getError(new_password.name, touched, errors)}
                    />
                    <InputPasswordField
                      name={confirm_password.name}
                      label={confirm_password.label}
                      onBlur={handleBlur}
                      textColor="text-primary-text"
                      value={values.confirm_password}
                      onChange={handleChange}
                      labelStyles={`text-primary-text !font-bold`}
                      styling="bg-transparent"
                      placeholder={confirm_password.placeholder}
                      error={getError(confirm_password.name, touched, errors)}
                    />
                  </div>

                  <div className="flex justify-center items-center pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={!(isValid && dirty) || isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </div>
            </Container>
          </div>
          <div className="-order-1 lg:order-none col-span-1">
            <Container styling="overflow-hidden h-fit py-5 pb-7 md:py-10 px-5 sm:px-6 md:px-10 space-y-5">
              <div>
                <Typography as="h5" size="h5" className="text-primary-dark">
                  Login History
                </Typography>
              </div>
              <hr className="border-t border-light-gray" />
              <div className="flex flex-col gap-7">
                <div className="flex justify-between text-left lg:grid grid-cols-2 gap-5">
                  <Typography
                    as="p"
                    size="md"
                    className="sm:w-1/4 lg:w-auto text-dark-gray"
                  >
                    Time
                  </Typography>
                  <Typography
                    as="p"
                    size="md"
                    className="sm:w-1/4 lg:w-auto text-dark-gray"
                  >
                    Date
                  </Typography>
                </div>
                <div className="flex flex-col gap-5">
                  {loginHistory.map((item, idx) => (
                    <div
                      className="flex justify-between text-left lg:grid grid-cols-2 gap-5"
                      key={idx}
                    >
                      <Typography
                        as="p"
                        size="md"
                        className="sm:w-1/4 lg:w-auto font-medium text-secondary-primary-text"
                      >
                        {item.time}
                      </Typography>
                      <Typography
                        as="p"
                        size="md"
                        className="sm:w-1/4 lg:w-auto font-medium text-secondary-primary-text"
                      >
                        {item.date}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
