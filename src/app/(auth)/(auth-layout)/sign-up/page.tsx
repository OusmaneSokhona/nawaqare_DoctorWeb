// 'use client';

// import { useFormik } from 'formik';
// import { NextPage } from 'next';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// import { Button } from '@/components/shared/button';
// import ContainerCard from '@/components/shared/container/container-card';
// import InputPasswordField from '@/components/shared/input-fields/input-password-field';
// import InputTextField from '@/components/shared/input-fields/input-text-field';
// import { signUpForm } from '@/formik/forms/auth';
// import { signUpInitialValues } from '@/formik/initial-values/auth';
// import { signUpSchema } from '@/formik/validations/auth';
// import { getError } from '@/utils/form-helpers';

// const SignUpPage: NextPage = () => {
//   const router = useRouter();
//   const {
//     formFields: { email, new_password: password, confirm_password },
//   } = signUpForm;

//   const { values, touched, isValid, errors, dirty, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues: signUpInitialValues,
//     validationSchema: signUpSchema,
//     onSubmit: () => {},
//   });
//   return (
//     <ContainerCard cardHeading="Signup">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pt-2">
//         <div className="flex flex-col gap-5 w-full">
//           <InputTextField
//             name={email.name}
//             value={values.email}
//             label={email.label}
//             textColor="text-primary-text"
//             onChange={handleChange}
//             labelStyles={`text-primary-text !font-bold`}
//             styling="bg-transparent"
//             placeholder={email.placeholder}
//             onBlur={handleBlur}
//             error={getError(email.name, touched, errors)}
//           />
//           <InputPasswordField
//             name={password.name}
//             label={password.label}
//             onBlur={handleBlur}
//             textColor="text-primary-text"
//             value={values.password}
//             onChange={handleChange}
//             labelStyles={`text-primary-text !font-bold`}
//             styling="bg-transparent"
//             strengthChecker={true}
//             placeholder={password.placeholder}
//             error={getError(password.name, touched, errors)}
//           />
//           <InputPasswordField
//             name={confirm_password.name}
//             label={confirm_password.label}
//             onBlur={handleBlur}
//             textColor="text-primary-text"
//             value={values.confirm_password}
//             onChange={handleChange}
//             labelStyles={`text-primary-text !font-bold`}
//             styling="bg-transparent"
//             placeholder={confirm_password.placeholder}
//             error={getError(confirm_password.name, touched, errors)}
//           />
//         </div>

//         <div className="flex justify-center items-center pt-4">
//           <Button
//             type="submit"
//             variant="primary"
//             className="w-full"
//             disabled={!(isValid && dirty)}
//             onClick={() => router.push('/main-contact')}
//           >
//             Sign Up
//           </Button>
//         </div>
//       </form>
//     </ContainerCard>
//   );
// };

// export default SignUpPage;
"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { Typography } from "@/components/shared/typography";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import { loginSchema, signUpSchema } from "@/formik/validations/auth";
import { Button } from "@/components/shared/button";
import { signUpInitialValues } from "@/formik/initial-values/auth";
import { logInForm, signUpForm } from "@/formik/forms/auth";
import { getError, getTouched } from "@/utils/form-helpers";
import MainContact from "@/components/shared/create-account/demograpic-info";
import DocumentUpload from "@/components/shared/create-account/professional-info";
import { Icon } from "@iconify/react";
import VerificationSummary from "@/components/shared/create-account/verification";
import { useRouter } from "next/navigation";
import DemographicInfo from "@/components/shared/create-account/demo-info";

const steps = [
  "Personal Info",
  "Demographic Info",
  "Professional Info",
  "Supporting Docs",
  "Review",
];

export default function CreateAccount() {
  const [step, setStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= FORMIK ================= */
  const { firstName, email, password, ConfirmPassword } = signUpForm.formFields;

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpSchema,
    onSubmit: async (formValues) => {
      console.log("FORM DATA 👉", formValues);
      alert("Form Submitted Successfully!");
      // API call goes here
    },
  });

  const router = useRouter();

  /* ================= PASSWORD RULES ================= */
  const rules = [
    { label: "At least 8 characters", valid: values.password.length >= 8 },
    { label: "1 uppercase letter", valid: /[A-Z]/.test(values.password) },
    {
      label: "1 special character",
      valid: /[^A-Za-z0-9]/.test(values.password),
    },
  ];

  const completed = rules.filter((r) => r.valid).length;
  const progress = (completed / rules.length) * 100;

  const isStepZeroValid = isValid && dirty && progress === 100;
  const canContinue = step === 0 ? isStepZeroValid : true;

  /* ================= STEP NAVIGATION ================= */
  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleVerificationClick = () => {
    // Open modal on verification step
    setIsModalOpen(true);
  };

  const handleConfirmVerification = () => {
    setIsModalOpen(false);
    // alert("Verification Submitted!");
    router.push("/login");
    setStep(step + 1); // move to final step
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F5F5F5] min-h-screen w-full px-2 py-4 max-md:w-full shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2"
    >
      {/* ================= LEFT IMAGE ================= */}
      <div className="relative max-md:hidden lg:auto">
        <Image
          src="/assets/svg/loginImg.svg"
          alt="Welcome"
          fill
          className="object-cover rounded-xl"
        />

        <div className="absolute inset-0 bg-blue-600/70 p-6 lg:p-10 text-white flex flex-col justify-between">
          <div>
            <Typography size="h3" className=" font-bold text-center">
              Welcome to Nawacare
            </Typography>
            <div className="flex items-center justify-center">
              <Typography className="font-medium w-[70%] text-center">
                Your central workspace to manage patients, appointments, and
                care.
              </Typography>
            </div>
          </div>

          <div>
            <Typography size="h3" className=" text-center font-semibold">
              Efficient Care, Simplified
            </Typography>
            <div className="flex items-center justify-center">
              <Typography className=" w-[70%] text-center">
                Manage consultations, prescriptions, and follow-ups with ease.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT FORM ================= */}
      <div className="p-5 lg:p-10">
        <div className="flex gap-2 items-center mb-3">
          {step > 0 && (
            <div className="border border-primary-color rounded-lg px-4 py-3 cursor-pointer">
              <Icon
                icon="ic:twotone-arrow-back-ios-new"
                width="24"
                height="24"
                onClick={prevStep}
              />
            </div>
          )}

          <Image
            src="/assets/svg/logoNawa.svg"
            alt="Logo"
            width={129}
            height={106}
          />
        </div>

        <div className="mt-3">
          <Typography size="h3" className=" font-bold">
            Create Account
          </Typography>
          <Typography className="text-desc-color ">
            Create your verified medical profile to start offering consultations
          </Typography>
        </div>

        {/* ================= STEPPER ================= */}
        {/* <div className="flex items-center justify-between mb-8 mt-7">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${i <= step ? "bg-primary-color text-white" : "bg-white text-gray-500"}
                `}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

             
              <span
                className={`mt-2 text-xs font-semibold text-center
      ${i <= step ? "text-primary-color" : "text-gray-400"}
    `}
              >
                {steps[i]}
              </span>

             

              
            </div>
          ))}
        </div> */}

        {/*
         */}

        <div className="flex items-center justify-between mb-8 mt-7 w-full">
          {steps.map((label, i) => {
            const isCompleted = i < step;
            const isActive = i === step;

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center relative"
              >
                {/* STEP CIRCLE */}
                <div
                  className={`z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
            ${
              isCompleted
                ? "bg-green-500 text-white"
                : isActive
                  ? "bg-primary-color text-white"
                  : "bg-white text-gray-400 border"
            }
          `}
                >
                  {isCompleted ? (
                    <Icon icon="mdi:check" width="22" height="22" />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </div>

                {/* CONNECTOR LINE */}
                {i !== steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-full h-[2px] bg-gray-300">
                    <div
                      className={`h-full ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                )}

                {/* STEP LABEL */}
                <span
                  className={`mt-4 text-sm font-semibold text-center
            ${
              isCompleted
                ? "text-green-600"
                : isActive
                  ? "text-primary-color"
                  : "text-gray-400"
            }
          `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ================= STEP CONTENT ================= */}
        {step === 0 && (
          <div className="space-y-4">
            <InputTextField
              name={firstName.name}
              required
              label={firstName.label}
              value={values.firstName}
              textColor="text-primary-text"
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              icon="mdi:account-outline"
              placeholder={firstName.placeholder}
              onBlur={handleBlur}
              onChange={handleChange}
              error={getError(firstName.name, touched, errors)}
            />

            <InputTextField
              name={email.name}
              value={values.email}
              label={email.label}
              textColor="text-primary-text"
              onChange={handleChange}
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              icon="mdi:email-outline"
              placeholder={email.placeholder}
              onBlur={handleBlur}
              error={getError(email.name, touched, errors)}
            />

            <InputPasswordField
              name={password.name}
              label={password.label}
              onBlur={handleBlur}
              textColor="text-primary-text"
              value={values.password}
              onChange={handleChange}
              labelStyles={`text-primary-text !font-bold`}
              styling="bg-transparent"
              icon="mdi:lock-outline"
              strengthChecker
              placeholder={password.placeholder}
              error={getError(password.name, touched, errors)}
            />

            <InputPasswordField
              name={ConfirmPassword.name}
              label={ConfirmPassword.label}
              onBlur={handleBlur}
              textColor="text-black"
              styling="bg-white shadow-sm"
              value={values.ConfirmPassword}
              onChange={handleChange}
              labelStyles="bg-transparent"
              icon="mdi:lock-check-outline"
              placeholder={ConfirmPassword.placeholder}
              error={
                touched.ConfirmPassword && errors.ConfirmPassword
                  ? errors.ConfirmPassword
                  : ""
              }
            />

            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={values.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-primary-color cursor-pointer"
              />

              <Typography className="text-sm font-semibold mt-1 text-gray-600">
                I agree to{" "}
                <span
                  className="text-primary-color font-semibold cursor-pointer"
                  onClick={() => router.push("/terms")}
                >
                  Terms
                </span>{" "}
                &{" "}
                <span
                  className="text-primary-color font-semibold cursor-pointer"
                  onClick={() => router.push("/privacy-policy")}
                >
                  Privacy Policy
                </span>
                .
              </Typography>
            </div>

            {/* ERROR */}
            {touched.agreeTerms && errors.agreeTerms && (
              <Typography className="text-red text-sm mt-1">
                {errors.agreeTerms}
              </Typography>
            )}

            {/* PASSWORD PROGRESS */}
            {/* {values.password && (
              <>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full transition-all ${
                      progress === 100
                        ? "bg-green-500"
                        : progress >= 66
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="text-xs space-y-1 mt-1">
                  {rules.map((rule) => (
                    <p
                      key={rule.label}
                      className={`flex items-center gap-2 ${
                        rule.valid ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <span>{rule.valid ? "✓" : "•"}</span>
                      {rule.label}
                    </p>
                  ))}
                </div>
              </>
            )} */}
          </div>
        )}

        {step === 1 && <DemographicInfo onNext={nextStep} />}

        {step === 2 && <MainContact />}

        {step === 3 && <DocumentUpload />}
        {step === 4 && <VerificationSummary />}
        {/* {step === 4 && (
          <div className="p-4 border rounded-lg text-sm text-gray-600">
            <p>✔ Review your information</p>
            <p>✔ Submit for verification</p>
            <p className="mt-2 text-green-600 font-semibold">
              Ready to create account 🎉
            </p>
          </div>
        )} */}

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mt-10 flex flex-col gap-3">
          {step < steps.length - 1 ? (
            step === 3 ? (
              //   <Button
              //   type="submit"
              //   disabled={!dirty || !isValid}
              //   className="bg-green-600 rounded-md text-white w-full"
              //   onClick={() => router.push("/login")}
              // >
              //   Finish
              // </Button>

              <Button
                type="button"
                disabled={!canContinue}
                onClick={nextStep}
                className="bg-primary-color rounded-md text-white w-full"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!canContinue}
                onClick={nextStep}
                className="bg-primary-color rounded-md text-white w-full"
              >
                Continue
              </Button>
            )
          ) : (
            <Button
              type="button"
              onClick={handleVerificationClick}
              className="bg-primary-color rounded text-white w-full"
            >
              Submit for Verification
            </Button>
          )}

          <Typography className="text-desc-color text-md font-semibold mt-2 text-center">
            Already have an account?{" "}
            <span
              className="text-primary-color font-bold cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Sign In
            </span>
            .
          </Typography>
        </div>

        {/* ================= VERIFICATION MODAL ================= */}
        {/* {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">

              
              <Typography size="h5" className="font-bold mb-4">
                Confirm Verification
              </Typography>
              <Typography className="mb-6">
                Are you sure you want to submit your verification?
              </Typography>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border rounded text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirmVerification}
                  className="bg-primary-color text-white rounded"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )} */}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-xl relative flex flex-col items-center text-center shadow-xl">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-primary-color hover:text-blue-700"
              >
                <Icon icon="ic:baseline-cancel" width="32" />
              </button>

              {/* Main Illustration (Iconify) */}
              <div className="relative mb-6">
                {/* The Clipboard Icon */}
                <Icon
                  icon="fluent-emoji-flat:clipboard"
                  className="text-primary-color"
                  width="100"
                />
                {/* The Stethoscope overlaid */}
                <Icon
                  icon="mdi:stethoscope"
                  className="absolute -bottom-2 -right-4 text-blue-500 bg-white rounded-full p-1 text-primary-color"
                  width="50"
                />
              </div>

              {/* Text Content */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Submit For Verification
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                "Your verification request has been received. Expected
                verification time: 48-72 hours. You'll receive an email
                confirmation and can track your status in your profile."
              </p>

              {/* Circular Progress Loader */}
              <div
                className="relative flex items-center justify-center w-24 h-24"
                onClick={handleConfirmVerification}
              >
                {/* Background Circle */}
                <div className="absolute w-full h-full border-8 border-blue-100 rounded-full"></div>
                {/* Progress Spinner */}
                <div className="absolute w-full h-full border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-gray-700">
                  Verifying
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
