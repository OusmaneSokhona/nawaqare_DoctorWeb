// 'use client';

// import { useFormik } from 'formik';
// import { NextPage } from 'next';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// import { Button } from '@/components/shared/button';
// import ContainerCard from '@/components/shared/container/container-card';
// import Iconify from '@/components/shared/iconify';
// import InputTextField from '@/components/shared/input-fields/input-text-field';
// import { Typography } from '@/components/shared/typography';
// import { resetPasswordForm } from '@/formik/forms/auth';
// import { forgotPasswordSchema } from '@/formik/validations/auth';
// import { getError } from '@/utils/form-helpers';

// const ResetPassword: NextPage = () => {
//   const router = useRouter();

//   const {
//     formFields: { email },
//   } = resetPasswordForm;

//   const { values, touched, errors, dirty, isValid, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues: {
//       email: '',
//     },
//     validationSchema: forgotPasswordSchema,
//     onSubmit: () => {
//       router.push('/otp-verification');
//     },
//   });
//   return (
//     <ContainerCard cardHeading=" Reset Password">
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-7">
//           <InputTextField
//             isAuth
//             name={email.name}
//             onBlur={handleBlur}
//             value={values.email}
//             label={email.label}
//             textColor="text-primary-text"
//             onChange={handleChange}
//             labelStyles="text-primary-text"
//             styling="bg-transparent"
//             placeholder={email.placeholder}
//             error={getError(email.name, touched, errors)}
//           />
//           <div className="flex flex-col gap-4">
//             <Button variant="primary" className="w-full" disabled={!dirty || !isValid || isSubmitting}>
//               Reset Password
//             </Button>
//             <div className="flex space-x-1 items-center justify-center ">
//               <div className="flex justify-center items-center gap-2 text-center group">
//                 <Iconify
//                   icon="material-symbols:arrow-back-rounded"
//                   className="text-dark-gray group-hover:text-primary-light cursor-pointer"
//                 />
//                 <Link href={'/login'} className="text-dark-gray group-hover:text-primary-light text-center">
//                   <Typography size={'md'}>Back to Login</Typography>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </ContainerCard>
//   );
// };

// export default ResetPassword;

"use client";

import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import { Typography } from "@/components/shared/typography";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import { Button } from "@/components/shared/button";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function ResetPassword() {
  const router = useRouter();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: () => {
      router.push("/login");
    },
  });

  /* ================= PASSWORD RULES ================= */

  const rules = [
    {
      label: "At least 8 characters",
      valid: values.password.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(values.password),
    },
    {
      label: "At least one number",
      valid: /\d/.test(values.password),
    },
    {
      label: "At least one special character",
      valid: /[^A-Za-z0-9]/.test(values.password),
    },
  ];

  const allValid = rules.every((r) => r.valid);

  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 p-2">
      {/* LEFT IMAGE */}
      <div className="relative hidden lg:block rounded-xl overflow-hidden">
        <Image
          src="/assets/svg/loginImg.svg"
          alt="Reset Password"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/70 p-10 text-white flex flex-col justify-between">
          <div>
            <Typography size="h3" className="font-bold text-center">
              Welcome to Nawacare <br />
            </Typography>
            <p className="text-center">
              Your central workspace to manage patients, appointments, and care.
            </p>
          </div>
          <Typography className="text-center">
            Efficient Care, Simplified
          </Typography>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="flex items-center justify-center w-full px-4">
        <div className=" w-full p-8">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => router.back()}
              className="
    w-10 h-10
    flex items-center justify-center
    border-2 border-[#2F80ED]
    rounded-lg
    text-[#2F80ED]
    hover:bg-[#2F80ED]/10
    transition
  "
            >
              <Icon icon="mdi:chevron-left" width={22} />
            </button>
            <Typography size="h3" className="font-bold">
              Reset Password
            </Typography>
          </div>

          <Typography className="text-gray-500 mb-6">
            Set a new password to secure your account
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputPasswordField
              name="password"
              label="New Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="mdi:lock-outline"
              error={touched.password ? errors.password : ""}
            />

            {/* PASSWORD RULES */}
            {values.password && (
              <div className="space-y-1 text-sm">
                {rules.map((rule) => (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-2 ${
                      rule.valid ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <Icon
                      icon={
                        rule.valid
                          ? "mdi:checkbox-marked"
                          : "mdi:checkbox-blank-circle-outline"
                      }
                    />
                    {rule.label}
                  </div>
                ))}

                {/* STRONG PASSWORD */}
                {allValid && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold mt-2">
                    <Icon icon="mdi:checkbox-marked" />
                    Strong password
                  </div>
                )}
              </div>
            )}

            <InputPasswordField
              name="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              icon="mdi:lock-check-outline"
              error={touched.confirmPassword ? errors.confirmPassword : ""}
            />

            <Button
              type="submit"
              disabled={!dirty || !isValid || !allValid}
              className="w-full bg-primary-color text-white !py-4 rounded-md"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
