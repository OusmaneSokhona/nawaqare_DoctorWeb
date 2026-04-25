"use client";

import { useFormik } from "formik";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import { Typography } from "@/components/shared/typography";
import { newPasswordForm } from "@/formik/forms/auth";
import { newPasswordSchema } from "@/formik/validations/auth";
import { useRouter } from "next/navigation";

const NewPassword = () => {
  const router = useRouter();
  const {
    formFields: { currentPassword, newPassword, confirmPassword },
  } = newPasswordForm;

  const {
    values,
    touched,
    errors,
    dirty,
    isValid,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: newPasswordSchema,
    onSubmit: () => {},
  });

  return (
    <div className="flex flex-col gap-5 w-[60%] max-lg:w-[80%] max-sm:w-full bg-background-color2 shadow-lg rounded-2xl p-10">
      <div className="flex justify-start items-center gap-2 w-fit group">
        <Iconify
          icon="ic:baseline-arrow-back-ios-new"
          width={15}
          className="text-black group-hover:text-light-blue"
        />
        <Link href={"/dashboard"}>
          <Typography
            size={"lg"}
            className="text-black font-bold group-hover:text-light-blue"
          >
            Back
          </Typography>
        </Link>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center">
        <Typography size={"h3"} className="text-black">
          Change Password
        </Typography>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[20px] w-full">
            <InputPasswordField
              isAuth
              onBlur={handleBlur}
              textColor="text-black"
              strengthChecker={true}
              onChange={handleChange}
              name={currentPassword.name}
              styling="bg-white shadow-sm"
              label={currentPassword.label}
              value={values.currentPassword}
              placeholder={currentPassword.placeholder}
              labelStyles="bg-transparent"
              error={
                touched.currentPassword && errors.currentPassword
                  ? errors.currentPassword
                  : ""
              }
            />
            <InputPasswordField
              isAuth
              onBlur={handleBlur}
              textColor="text-black"
              strengthChecker={true}
              onChange={handleChange}
              name={newPassword.name}
              styling="bg-white shadow-sm"
              label={newPassword.label}
              value={values.newPassword}
              placeholder={newPassword.placeholder}
              labelStyles="bg-transparent"
              error={
                touched.newPassword && errors.newPassword
                  ? errors.newPassword
                  : ""
              }
            />
            <InputPasswordField
              isAuth
              onBlur={handleBlur}
              textColor="text-black"
              styling="bg-white shadow-sm"
              onChange={handleChange}
              name={confirmPassword.name}
              label={confirmPassword.label}
              value={values.confirmPassword}
              labelStyles="bg-transparent"
              placeholder={confirmPassword.placeholder}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
            />
            <div className="flex justify-end items-center gap-8 pt-4">
              {/* <Button
                variant={"primary"}
                className="w-full"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Save
              </Button> */}
              <Typography className="underline underline-offset-2 font-bold text-xl text-secondary-color">
                Cancel
              </Typography>
              <Button
                // disabled={isSubmitting || !dirty || !isValid}
                type="submit"
                // variant="primary"
                className="text-white rounded-xl bg-primary-color "
              >
                Change Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
