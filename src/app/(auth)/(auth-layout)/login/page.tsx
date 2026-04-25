// 'use client';

// import { useFormik } from 'formik';
// import { NextPage } from 'next';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// import { Button } from '@/components/shared/button';
// import ContainerCard from '@/components/shared/container/container-card';
// import InputPasswordField from '@/components/shared/input-fields/input-password-field';
// import InputTextField from '@/components/shared/input-fields/input-text-field';
// import { Typography } from '@/components/shared/typography';
// import { logInForm } from '@/formik/forms/auth';
// import { signInitialValues } from '@/formik/initial-values/auth';
// import { loginSchema } from '@/formik/validations/auth';

// const Login: NextPage = () => {
//   const [captchaValue, setCaptchaValue] = useState<string>('');
//   const [captchaExpired, setCaptchaExpired] = useState<string>('false');
//   const router = useRouter();

//   const {
//     formFields: { email, password },
//   } = logInForm;

//   const { values, touched, isValid, errors, dirty, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues: signInitialValues,
//     onSubmit: () => {
//       if (!captchaValue) {
//         toast.error('Please complete the reCAPTCHA verification.');
//         return;
//       }
//     },
//     validationSchema: loginSchema,
//   });
//   return (
//     <ContainerCard cardHeading="Pharmacy Login">
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-5 w-full">
//           <InputTextField
//             name={email.name}
//             onBlur={handleBlur}
//             value={values.email}
//             label={email.label}
//             textColor="text-primary-text"
//             onChange={handleChange}
//             labelStyles={`text-primary-text !font-bold`}
//             styling="bg-transparent"
//             placeholder={email.placeholder}
//             error={touched.email && errors.email ? errors.email : ''}
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
//             placeholder={password.placeholder}
//             error={touched.password && errors.password ? errors.password : ''}
//           />
//         </div>
//         <div className="flex justify-start pt-2">
//           <Typography size="lg" as="p" className="text-primary-dark hover:text-primary-light font-semibold ">
//             <Link href={'/reset-password'}>Forgot Password?</Link>
//           </Typography>
//         </div>
//         <div className="flex items-start justify-start py-5">
//           {/*<ReCaptchaComponent
//             onValueChange={(token) => setCaptchaValue(token ?? '')}
//             onExpiredChange={setCaptchaExpired}
//             captchaExpired={captchaExpired}
//           />*/}
//         </div>
//         <div className="flex justify-center items-center">
//           <Button
//             variant="primary"
//             size="medium"
//             onClick={() => router.push('/')}
//             className="w-full"
//             disabled={
//               !(
//                 (isValid && dirty)
//                 // && captchaValue && captchaExpired === 'false'
//               )
//             }
//           >
//             Log In
//           </Button>
//         </div>
//         <div className="flex justify-center items-center gap-1 pt-8">
//           <div className="text-dark-gray">
//             <Typography size={'md'}>Don’t Have an Account?</Typography>
//           </div>

//           <Link href={'/sign-up'} className="text-primary-light underline">
//             <Typography size={'md'}>Signup</Typography>
//           </Link>
//         </div>
//       </form>
//     </ContainerCard>
//   );
// };

// export default Login;
// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'

// const steps = [
//   'Personal Info',
//   'Demographic Info',
//   'Professional Info',
//   'Supporting Docs',
//   'Review'
// ]

// export default function CreateAccount() {
//   const [step, setStep] = useState(0)

//   return (
//     <div className="">
//       <div className=" bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
//         {/* LEFT IMAGE PANEL */}
//         <div className="relative hidden lg:block">
//           <Image
//             src="/assets/svg/loginImg.svg" // apni image yahan rakhna
//             alt="Welcome"
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-blue-600/70 p-10 flex flex-col justify-between text-white">
//             <div>
//               <h2 className="text-3xl font-bold">Welcome to Nawacare</h2>
//               <p className="mt-2 text-sm opacity-90">
//                 Your central workspace to manage patients, appointments, and care.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold">Efficient Care, Simplified</h3>
//               <p className="text-sm opacity-90 mt-1">
//                 Manage consultations, prescriptions, and follow-ups with ease.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT FORM PANEL */}
//         <div className="p-8 lg:p-12">
//           <div className="flex justify-center mb-6">
//             <h1 className="text-2xl font-bold text-blue-600">Create Account</h1>
//           </div>

//           {/* STEPS */}
//           <div className="flex items-center justify-between mb-8">
//             {steps.map((label, i) => (
//               <div key={i} className="flex-1 flex items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
//                     i <= step ? 'bg-blue text-white' : 'bg-gray-200 text-gray-500'
//                   }`}
//                 >
//                   {String(i + 1).padStart(2, '0')}
//                 </div>
//                 {i !== steps.length - 1 && (
//                   <div className="flex-1 h-[2px] bg-gray-200 mx-2">
//                     <div
//                       className={`h-full ${i < step ? 'bg-blue-600' : ''}`}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* FORM CONTENT */}
//           {step === 0 && <PersonalInfo />}
//           {step === 1 && <Placeholder title="Demographic Information" />}
//           {step === 2 && <Placeholder title="Professional Information" />}
//           {step === 3 && <Placeholder title="Supporting Documents" />}
//           {step === 4 && <Placeholder title="Review & Submit" />}

//           {/* ACTIONS */}
//           <div className="mt-8 flex justify-between">
//             <button
//               disabled={step === 0}
//               onClick={() => setStep(step - 1)}
//               className="px-4 py-2 text-sm rounded-md border disabled:opacity-40"
//             >
//               Back
//             </button>
//             <button
//               onClick={() => setStep(step + 1)}
//               disabled={step === steps.length - 1}
//               className="px-6 py-2 text-sm rounded-md bg-blue-600 text-white disabled:opacity-40"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function PersonalInfo() {
//   return (
//     <div className="space-y-4">
//       <Input label="Full Name" placeholder="Saima Tahir" />
//       <Input label="Email" placeholder="saima@email.com" />
//       <Input label="Password" type="password" />

//       <div className="text-xs text-gray-500 space-y-1">
//         <p>✓ At least 8 characters</p>
//         <p>✓ 1 uppercase letter</p>
//         <p>✓ 1 special character</p>
//       </div>

//       <label className="flex items-center gap-2 text-sm">
//         <input type="checkbox" />
//         I agree to the <span className="text-blue-600">Terms & Privacy Policy</span>
//       </label>
//     </div>
//   )
// }

// function Placeholder({ title }) {
//   return (
//     <div className="h-64 flex items-center justify-center border rounded-lg text-gray-400">
//       {title} Screen
//     </div>
//   )
// }

// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <input
//         {...props}
//         className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   )
// }
// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'

// const steps = [
//   'Personal Info',
//   'Demographic Info',
//   'Professional Info',
//   'Supporting Docs',
//   'Review'
// ]

// export default function CreateAccount() {
//   const [step, setStep] = useState(0)

//   return (
//     <div>
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

//         {/* LEFT */}
//         <div className="relative hidden lg:block">
//           <Image
//             src="/assets/svg/loginImg.svg"
//             alt="Welcome"
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-blue-600/70 p-10 text-white">
//             <h2 className="text-3xl font-bold">Welcome to Nawacare</h2>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="p-8 lg:p-12">
//           <h1 className="text-2xl font-bold text-blue text-center mb-6">
//             Create Account
//           </h1>

//           {step === 0 && <PersonalInfo />}

//           <div className="mt-8 flex justify-between">
//             <button
//               disabled={step === 0}
//               onClick={() => setStep(step - 1)}
//               className="px-4 py-2 border rounded disabled:opacity-40"
//             >
//               Back
//             </button>
//             <button
//               onClick={() => setStep(step + 1)}
//               className="px-6 py-2 bg-blue text-white rounded"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ============================= */
// /* PERSONAL INFO + PASSWORD LOGIC */
// /* ============================= */

// function PersonalInfo() {
//   const [password, setPassword] = useState('')

//   const rules = [
//     { label: 'At least 8 characters', valid: password.length >= 8 },
//     { label: '1 uppercase letter', valid: /[A-Z]/.test(password) },
//     { label: '1 special character', valid: /[^A-Za-z0-9]/.test(password) },
//   ]

//   const completed = rules.filter(r => r.valid).length
//   const progress = (completed / rules.length) * 100

//   const progressColor =
//     progress === 100 ? 'bg-green-500'
//     : progress >= 66 ? 'bg-yellow-500'
//     : progress > 0 ? 'bg-red-500'
//     : 'bg-gray-300'

//   return (
//     <div className="space-y-4">
//       <Input label="Full Name" placeholder="Saima Tahir" />
//       <Input label="Email" placeholder="saima@email.com" />

//       <Input
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {/* PROGRESS BAR */}
//       {password && (
//         <>
//           <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full transition-all duration-300 ${progressColor}`}
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           {/* RULE LIST */}
//           <div className="text-xs space-y-1">
//             {rules.map((rule) => (
//               <p
//                 key={rule.label}
//                 className={`flex items-center gap-2 ${
//                   rule.valid ? 'text-green-600' : 'text-gray-400'
//                 }`}
//               >
//                 <span>{rule.valid ? '✓' : '•'}</span>
//                 {rule.label}
//               </p>
//             ))}
//           </div>
//         </>
//       )}

//       <label className="flex items-center gap-2 text-sm">
//         <input type="checkbox" />
//         I agree to the <span className="text-blue-600">Terms & Privacy Policy</span>
//       </label>
//     </div>
//   )
// }

// /* ============================= */
// /* INPUT COMPONENT */
// /* ============================= */

// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <input
//         {...props}
//         className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   )
// }
// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import { Typography } from '@/components/shared/typography'
// import { loginSchema } from '@/formik/validations/auth'
// import { useFormik } from 'formik'
// import { signInitialValues } from '@/formik/initial-values/auth'

// const steps = [
//   'Personal Info',
//   'Demographic Info',
//   'Professional Info',
//   'Supporting Docs',
//   'Review'
// ]

//  // ✅ Formik setup
//   const {
//     values,
//     touched,
//     isValid,
//     errors,
//     dirty,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//   } = useFormik({
//     initialValues: signInitialValues,
//     validationSchema: loginSchema,
//     onSubmit: async (formValues) => {
//       // handleLogin({
//       //   email: formValues.email,
//       //   password: formValues.password,
//       //   role: "admin",
//       // });
//     },
//   });

// export default function CreateAccount() {
//   const [step, setStep] = useState(0)
//   const [password, setPassword] = useState('')

//   /* PASSWORD RULES */
//   const rules = [
//     { label: 'At least 8 characters', valid: password.length >= 8 },
//     { label: '1 uppercase letter', valid: /[A-Z]/.test(password) },
//     { label: '1 special character', valid: /[^A-Za-z0-9]/.test(password) },
//   ]

//   const completed = rules.filter(r => r.valid).length
//   const progress = (completed / rules.length) * 100

//   const canContinue = step !== 0 || progress === 100

//   return (
//     <div className="bg-[#F5F5F5] px-2 py-4 rounded-2xl w-[60%] h-[660px] max-md:w-full max-md:h-auto shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

//       {/* LEFT IMAGE */}
//       <div className="relative hidden lg:block">
//         <Image
//           src="/assets/svg/loginImg.svg"
//           alt="Welcome"
//           fill
//           className="object-cover rounded-xl"
//         />
//         <div className="absolute inset-0 bg-blue-600/70 p-10 text-white">
//           <Typography size='h3' className=" font-bold">Welcome to Nawacare</Typography>
//           <div className='flex items-center  pl-5'>
//            <Typography className='font-medium w-[70%] text-center'>Your central workspace to manage patients, appointments, and care.</Typography>
//           </div>

//         </div>
//         <div className="absolute bottom-0  bg-blue-600/70 p-10 text-white">
//           <Typography size='h3' className=" font-semibold">Efficient Care, Simplified</Typography>
//           <div className='flex items-center  pl-5'>
//            <Typography className=' w-[70%] text-center'>Manage consultations, prescriptions, and follow-ups with ease.</Typography>
//           </div>

//         </div>
//       </div>

//       {/* RIGHT FORM */}
//       <div className="p-6 lg:p-10">
//         <Image
//           src="/assets/svg/logoNawa.svg"
//           alt="Welcome"
//           width={129}
//           height={106}
//           className=""
//         />
//         <Typography className="text-2xl font-bold text-blue-600 text-center mb-6">
//           Create Account
//         </Typography>

//         {/* STEPPER */}
//         <div className="flex items-center justify-between mb-8">
//           {steps.map((label, i) => (
//             <div key={i} className="flex-1 flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//                   ${i <= step ? 'bg-primary-color text-white' : 'bg-gray-200 text-gray-500'}
//                 `}
//               >
//                 {i + 1}
//               </div>
//               {i !== steps.length - 1 && (
//                 <div className="flex-1 h-[2px] bg-gray-200 mx-2">
//                   <div className={`h-full ${i < step ? 'bg-primary-color' : ''}`} />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ================= STEP CONTENT ================= */}

//         {step === 0 && (
//           <div className="space-y-4">
//             <Input label="Full Name" className='' placeholder="Saima Tahir" />
//             <Input label="Email" placeholder="saima@email.com" />

//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e:any) => setPassword(e.target.value)}
//             />

//             {/* PASSWORD PROGRESS */}
//             {password && (
//               <>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all ${
//                       progress === 100
//                         ? 'bg-green-500'
//                         : progress >= 66
//                         ? 'bg-yellow-500'
//                         : 'bg-red-500'
//                     }`}
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 <div className="text-xs space-y-1">
//                   {rules.map(rule => (
//                     <p
//                       key={rule.label}
//                       className={`flex items-center gap-2 ${
//                         rule.valid ? 'text-green-600' : 'text-gray-400'
//                       }`}
//                     >
//                       <span>{rule.valid ? '✓' : '•'}</span>
//                       {rule.label}
//                     </p>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {step === 1 && (
//           <div className="space-y-4">
//             <Input label="Gender" placeholder="Female" />
//             <Input label="Date of Birth" type="date" />
//             <Input label="City" placeholder="Lahore" />
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <Input label="Specialization" placeholder="Cardiologist" />
//             <Input label="Experience (Years)" type="number" />
//             <Input label="Hospital / Clinic" />
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4">
//             <Input label="Upload License" type="file" />
//             <Input label="Upload Degree" type="file" />
//           </div>
//         )}

//         {step === 4 && (
//           <div className="p-4 border rounded-lg text-sm text-gray-600">
//             <p>✔ Review your information</p>
//             <p>✔ Submit for verification</p>
//             <p className="mt-2 text-green-600 font-semibold">
//               Ready to create account 🎉
//             </p>
//           </div>
//         )}

//         {/* ACTION BUTTONS */}
//         <div className="mt-8 flex justify-between">
//           <button
//             disabled={step === 0}
//             onClick={() => setStep(step - 1)}
//             className="px-4 py-2 border rounded disabled:opacity-40"
//           >
//             Back
//           </button>

//           <button
//             disabled={!canContinue || step === steps.length - 1}
//             onClick={() => setStep(step + 1)}
//             className="px-6 py-2 bg-blue text-white rounded disabled:opacity-40"
//           >
//             {step === steps.length - 1 ? 'Finish' : 'Continue'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* INPUT */
// function Input({ label, ...props }:any) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <input
//         {...props}
//         className="w-full border rounded-md px-3 py-2 outline-none"
//       />
//     </div>
//   )
// }
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useFormik } from "formik";
// import { Typography } from "@/components/shared/typography";
// import InputTextField from "@/components/shared/input-fields/input-text-field";
// import InputPasswordField from "@/components/shared/input-fields/input-password-field";
// // import { signInitialValues } from '@/formik/initial-values/auth'
// import { loginSchema } from "@/formik/validations/auth";
// import { Button } from "@/components/shared/button";
// import { logInitialValues } from "@/formik/initial-values/auth";
// import { logInForm } from "@/formik/forms/auth";
// import { getError, getTouched } from "@/utils/form-helpers";
// import MainContact from "@/components/shared/create-account/demograpic-info";
// import DocumentUpload from "@/components/shared/create-account/professional-info";
// import { Icon } from "@iconify/react";
// import VerificationSummary from "@/components/shared/create-account/verification";

// const steps = [
//   "Personal Info",
//   "Demographic Info",
//   "Professional Info",
//   "Supporting Docs",
//   "Review",
// ];

// export default function CreateAccount() {
//   const [step, setStep] = useState(0);

//   /* ================= FORMIK ================= */
//   const { firstName, email, password, ConfirmPassword } = logInForm.formFields;
//   const {
//     values,
//     touched,
//     errors,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     isValid,
//     dirty,
//   } = useFormik({
//     initialValues: logInitialValues,
//     validationSchema: loginSchema,
//     onSubmit: async (formValues) => {
//       console.log("FORM DATA 👉", formValues);
//       // API call yahan ayegi
//     },
//   });

//   /* ================= PASSWORD RULES ================= */
//   const rules = [
//     { label: "At least 8 characters", valid: values.password.length >= 8 },
//     { label: "1 uppercase letter", valid: /[A-Z]/.test(values.password) },
//     {
//       label: "1 special character",
//       valid: /[^A-Za-z0-9]/.test(values.password),
//     },
//   ];

//   const completed = rules.filter((r) => r.valid).length;
//   const progress = (completed / rules.length) * 100;
//   const canContinue = step !== 0 || progress === 100;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-[#F5F5F5] w-full px-2 py-4  max-md:w-full shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2"
//     >
//       {/* ================= LEFT IMAGE ================= */}
//       <div className="relative max-md:hidden lg:auto">
//         <Image
//           src="/assets/svg/loginImg.svg"
//           alt="Welcome"
//           fill
//           className="object-cover rounded-xl"
//         />

//         <div className="absolute inset-0 bg-blue-600/70 p-6 lg:p-10 text-white flex flex-col justify-between">
//           <div>
//             <Typography size="h3" className=" font-bold text-center">
//               Welcome to Nawacare
//             </Typography>
//             <div className="flex items-center justify-center">
//               <Typography className="font-medium w-[70%] text-center">
//                 Your central workspace to manage patients, appointments, and
//                 care.
//               </Typography>
//             </div>
//           </div>

//           <div>
//             <Typography size="h3" className=" text-center font-semibold">
//               Efficient Care, Simplified
//             </Typography>
//             <div className="flex items-center justify-center">
//               <Typography className=" w-[70%] text-center">
//                 Manage consultations, prescriptions, and follow-ups with ease.
//               </Typography>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= RIGHT FORM ================= */}
//       <div className="p-6 lg:p-10">
//         <div className="flex gap-2 items-center">
//           <div className="border border-primary-color rounded-lg px-4 py-3">
//             <Icon
//               icon="ic:twotone-arrow-back-ios-new"
//               width="24"
//               height="24"

//               onClick={() => setStep(step - 1)}
//               className="border bg-gray-400 rounded"
//             />
//           </div>

//           <Image
//             src="/assets/svg/logoNawa.svg"
//             alt="Logo"
//             width={129}
//             height={106}
//           />
//         </div>

//         <div className="mt-3">
//           <Typography size="h3" className=" font-bold">
//             Create Account
//           </Typography>
//           <Typography className="text-desc-color ">
//             Create your verified medical profile to start offering consultations
//           </Typography>
//         </div>

//         {/* ================= STEPPER ================= */}
//         <div className="flex items-center justify-between mb-8 mt-7">
//           {steps.map((_, i) => (
//             <div key={i} className="flex-1 flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//                   ${i <= step ? "bg-primary-color text-white" : "bg-gray-200 text-gray-500"}
//                 `}
//               >
//                 {i + 1}
//               </div>
//               {i !== steps.length - 1 && (
//                 <div className="flex-1 h-[2px] bg-gray-200 mx-2">
//                   <div
//                     className={`h-full ${i < step ? "bg-primary-color" : ""}`}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ================= STEP 0 ================= */}
//         {step === 0 && (
//           <div className="space-y-4">
//             <InputTextField
//               name={firstName.name}
//               required={true}
//               label={firstName.label}
//               value={values.firstName}
//               textColor="text-primary-text"
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               placeholder={firstName.placeholder}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               error={getError(firstName.name, touched, errors)}
//             />

//             <InputTextField
//               name={email.name}
//               value={values.email}
//               label={email.label}
//               textColor="text-primary-text"
//               onChange={handleChange}
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               placeholder={email.placeholder}
//               onBlur={handleBlur}
//               error={getError(email.name, touched, errors)}
//             />
//             <InputPasswordField
//               name={password.name}
//               label={password.label}
//               onBlur={handleBlur}
//               textColor="text-primary-text"
//               value={values.password}
//               onChange={handleChange}
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               strengthChecker={true}
//               placeholder={password.placeholder}
//               error={getError(password.name, touched, errors)}
//             />
//             <InputPasswordField
//               // isAuth
//               onBlur={handleBlur}
//               textColor="text-black"
//               styling="bg-white shadow-sm"
//               onChange={handleChange}
//               name={ConfirmPassword.name}
//               label={ConfirmPassword.label}
//               value={values.ConfirmPassword}
//               labelStyles="bg-transparent"
//               placeholder={ConfirmPassword.placeholder}
//               error={
//                 touched.ConfirmPassword && errors.ConfirmPassword
//                   ? errors.ConfirmPassword
//                   : ""
//               }
//             />

//             {/* PASSWORD PROGRESS */}
//             {/* {values.password && (
//               <>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all ${
//                       progress === 100
//                         ? 'bg-green-500'
//                         : progress >= 66
//                         ? 'bg-yellow-500'
//                         : 'bg-red-500'
//                     }`}
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 <div className="text-xs space-y-1">
//                   {rules.map(rule => (
//                     <p
//                       key={rule.label}
//                       className={`flex items-center gap-2 ${
//                         rule.valid ? 'text-green-600' : 'text-gray-400'
//                       }`}
//                     >
//                       <span>{rule.valid ? '✓' : '•'}</span>
//                       {rule.label}
//                     </p>
//                   ))}
//                 </div>
//               </>
//             )} */}
//           </div>
//         )}

//         {/* ================= OTHER STEPS (UI ONLY) ================= */}
//         {/* {step > 0 && step < 4 && (
//           <div className="text-sm text-gray-500">
//             <MainContact/>
//           </div>

//         )} */}
//         {step === 1 && (
//           <div className="text-sm text-gray-500">
//             <MainContact />
//           </div>
//         )}
//         {/* {step > 1 && step < 4 && (
//           <div>
//             <DocumentUpload/>
//           </div>
//         )} */}
//         {step === 2 && (
//           <div>
//             <DocumentUpload />
//           </div>
//         )}
//         {step === 3 && (
//           <div>
//             <VerificationSummary />
//           </div>
//         )}

//         {step === 4 && (
//           <div className="p-4 border rounded-lg text-sm text-gray-600">
//             <p>✔ Review your information</p>
//             <p>✔ Submit for verification</p>
//             <p className="mt-2 text-green-600 font-semibold">
//               Ready to create account 🎉
//             </p>
//           </div>
//         )}

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className=" mt-8 ">
//           <div className="bg-primary-color flex items-center justify-center py-2 rounded-xl">
//             <Button
//               type="button"
//               disabled={!canContinue}
//               onClick={() => setStep(step + 1)}
//               className=" rounded text-white cursor-pointer"
//             >
//               Continue
//             </Button>
//           </div>
//           <Typography className="text-desc-color font-medium mt-2 text-center">
//             Already have an account?{" "}
//             <span className="text-primary-color font-bold cursor-pointer">
//               Sign In
//             </span>{" "}
//             .
//           </Typography>
//         </div>

//         {/* <div className="mt-8 flex justify-between">
//           <Button
//             type="button"
//             disabled={step === 0}
//             onClick={() => setStep(step - 1)}
//             className="border bg-gray-400 rounded"
//           >
//             Back
//           </Button>

//           {step === steps.length - 1 ? (
//             <Button
//               type="submit"
//               disabled={!dirty || !isValid}
//               className="bg-blue text-white"
//             >
//               Finish
//             </Button>
//           ) : (
//             <Button
//               type="button"
//               disabled={!canContinue}
//               onClick={() => setStep(step + 1)}
//               className="bg-primary-color rounded text-white cursor-pointer"
//             >
//               Continue
//             </Button>
//           )}
//         </div> */}
//       </div>
//     </form>
//   );
// }
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useFormik } from "formik";
// import { Typography } from "@/components/shared/typography";
// import InputTextField from "@/components/shared/input-fields/input-text-field";
// import InputPasswordField from "@/components/shared/input-fields/input-password-field";
// import { loginSchema } from "@/formik/validations/auth";
// import { Button } from "@/components/shared/button";
// import { logInitialValues } from "@/formik/initial-values/auth";
// import { logInForm } from "@/formik/forms/auth";
// import { getError, getTouched } from "@/utils/form-helpers";
// import MainContact from "@/components/shared/create-account/demograpic-info";
// import DocumentUpload from "@/components/shared/create-account/professional-info";
// import { Icon } from "@iconify/react";
// import VerificationSummary from "@/components/shared/create-account/verification";
// import { useRouter } from "next/navigation";

// const steps = [
//   "Personal Info",
//   "Demographic Info",
//   "Professional Info",
//   "Supporting Docs",
//   "Review",
// ];

// export default function CreateAccount() {
//   const [step, setStep] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   /* ================= FORMIK ================= */
//   const { firstName, email, password, ConfirmPassword } = logInForm.formFields;

//   const {
//     values,
//     touched,
//     errors,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     isValid,
//     dirty,
//   } = useFormik({
//     initialValues: logInitialValues,
//     validationSchema: loginSchema,
//     onSubmit: async (formValues) => {
//       console.log("FORM DATA 👉", formValues);
//       alert("Form Submitted Successfully!");
//       // API call goes here
//     },
//   });

//   const router = useRouter();

//   /* ================= PASSWORD RULES ================= */
//   const rules = [
//     { label: "At least 8 characters", valid: values.password.length >= 8 },
//     { label: "1 uppercase letter", valid: /[A-Z]/.test(values.password) },
//     { label: "1 special character", valid: /[^A-Za-z0-9]/.test(values.password) },
//   ];

//   const completed = rules.filter((r) => r.valid).length;
//   const progress = (completed / rules.length) * 100;

//   const isStepZeroValid = isValid && dirty && progress === 100;
//   const canContinue = step === 0 ? isStepZeroValid : true;

//   /* ================= STEP NAVIGATION ================= */
//   const nextStep = () => {
//     if (step < steps.length - 1) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 0) setStep(step - 1);
//   };

//   const handleVerificationClick = () => {
//     // Open modal on verification step
//     setIsModalOpen(true);
//   };

//   const handleConfirmVerification = () => {
//     setIsModalOpen(false);
//     // alert("Verification Submitted!");
//     setStep(step + 1); // move to final step
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-[#F5F5F5] min-h-screen w-full px-2 py-4 max-md:w-full shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2"
//     >
//       {/* ================= LEFT IMAGE ================= */}
//       <div className="relative max-md:hidden lg:auto">
//         <Image
//           src="/assets/svg/loginImg.svg"
//           alt="Welcome"
//           fill
//           className="object-cover rounded-xl"
//         />

//         <div className="absolute inset-0 bg-blue-600/70 p-6 lg:p-10 text-white flex flex-col justify-between">
//           <div>
//             <Typography size="h3" className=" font-bold text-center">
//               Welcome to Nawacare
//             </Typography>
//             <div className="flex items-center justify-center">
//               <Typography className="font-medium w-[70%] text-center">
//                 Your central workspace to manage patients, appointments, and care.
//               </Typography>
//             </div>
//           </div>

//           <div>
//             <Typography size="h3" className=" text-center font-semibold">
//               Efficient Care, Simplified
//             </Typography>
//             <div className="flex items-center justify-center">
//               <Typography className=" w-[70%] text-center">
//                 Manage consultations, prescriptions, and follow-ups with ease.
//               </Typography>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= RIGHT FORM ================= */}
//       <div className="p-6 lg:p-10">
//         <div className="flex gap-2 items-center mb-3">
//           {step > 0 && (
//             <div className="border border-primary-color rounded-lg px-4 py-3 cursor-pointer">
//               <Icon
//                 icon="ic:twotone-arrow-back-ios-new"
//                 width="24"
//                 height="24"
//                 onClick={prevStep}
//               />
//             </div>
//           )}

//           <Image
//             src="/assets/svg/logoNawa.svg"
//             alt="Logo"
//             width={129}
//             height={106}
//           />
//         </div>

//         <div className="mt-3">
//           <Typography size="h3" className=" font-bold">
//             Create Account
//           </Typography>
//           <Typography className="text-desc-color ">
//             Create your verified medical profile to start offering consultations
//           </Typography>
//         </div>

//         {/* ================= STEPPER ================= */}
//         {/* <div className="flex items-center justify-between mb-8 mt-7">
//           {steps.map((_, i) => (
//             <div key={i} className="flex-1 flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//                   ${i <= step ? "bg-primary-color text-white" : "bg-gray-200 text-gray-500"}
//                 `}
//               >
//                 {i + 1}
//               </div>
//               {i !== steps.length - 1 && (
//                 <div className="flex-1 h-[2px] bg-gray-200 mx-2">
//                   <div
//                     className={`h-full ${i < step ? "bg-primary-color" : ""}`}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div> */}

//         {/* ================= STEP CONTENT ================= */}

//           <div className="space-y-8">
//             {/* <InputTextField
//               name={firstName.name}
//               required
//               label={firstName.label}
//               value={values.firstName}
//               textColor="text-primary-text"
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               placeholder={firstName.placeholder}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               error={getError(firstName.name, touched, errors)}
//             /> */}
//              <div className="mt-12 space-y-12">
//                <InputTextField
//               name={email.name}
//               value={values.email}
//               label={email.label}
//               textColor="text-primary-text"
//               onChange={handleChange}
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               placeholder={email.placeholder}
//               onBlur={handleBlur}
//               error={getError(email.name, touched, errors)}
//             />

//             <InputPasswordField
//               name={password.name}
//               label={password.label}
//               onBlur={handleBlur}
//               textColor="text-primary-text"
//               value={values.password}
//               onChange={handleChange}
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               strengthChecker
//               placeholder={password.placeholder}
//               error={getError(password.name, touched, errors)}
//             />
//              </div>

//             <div className="pt-12">
//              <Button
//                 type="button"
//                 disabled={!canContinue}
//                 onClick={()=> router.push('/dashboard')}
//                 className="bg-primary-color cursor-pointer !py-4 rounded text-white w-full"
//               >
//                 Continue
//               </Button>
//             </div>

//             {/* <InputPasswordField
//               name={password.name}
//               label={password.label}
//               onBlur={handleBlur}
//               textColor="text-primary-text"
//               value={values.password}
//               onChange={handleChange}
//               labelStyles={`text-primary-text !font-bold`}
//               styling="bg-transparent"
//               strengthChecker
//               placeholder={password.placeholder}
//               error={getError(password.name, touched, errors)}
//             />

//             <InputPasswordField
//               name={ConfirmPassword.name}
//               label={ConfirmPassword.label}
//               onBlur={handleBlur}
//               textColor="text-black"
//               styling="bg-white shadow-sm"
//               value={values.ConfirmPassword}
//               onChange={handleChange}
//               labelStyles="bg-transparent"
//               placeholder={ConfirmPassword.placeholder}
//               error={
//                 touched.ConfirmPassword && errors.ConfirmPassword
//                   ? errors.ConfirmPassword
//                   : ""
//               }
//             /> */}

//             {/* PASSWORD PROGRESS */}
//             {/* {values.password && (
//               <>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
//                   <div
//                     className={`h-full transition-all ${
//                       progress === 100
//                         ? "bg-green-500"
//                         : progress >= 66
//                         ? "bg-yellow-500"
//                         : "bg-red-500"
//                     }`}
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 <div className="text-xs space-y-1 mt-1">
//                   {rules.map((rule) => (
//                     <p
//                       key={rule.label}
//                       className={`flex items-center gap-2 ${
//                         rule.valid ? "text-green-600" : "text-gray-400"
//                       }`}
//                     >
//                       <span>{rule.valid ? "✓" : "•"}</span>
//                       {rule.label}
//                     </p>
//                   ))}
//                 </div>
//               </>
//             )} */}
//           </div>

//         {/* {step === 1 && <MainContact />}
//         {step === 2 && <DocumentUpload />}
//         {step === 3 && <VerificationSummary />}
//         {step === 4 && (
//           <div className="p-4 border rounded-lg text-sm text-gray-600">
//             <p>✔ Review your information</p>
//             <p>✔ Submit for verification</p>
//             <p className="mt-2 text-green-600 font-semibold">
//               Ready to create account 🎉
//             </p>
//           </div>
//         )} */}

//         {/* ================= ACTION BUTTONS ================= */}
//         {/* <div className="mt-10 flex flex-col gap-3">
//           {step < steps.length - 1 ? (
//             step === 3 ? (
//               <Button
//                 type="button"
//                 onClick={handleVerificationClick}
//                 className="bg-primary-color rounded text-white w-full"
//               >
//                 Submit for Verification
//               </Button>
//             ) : (
//               <Button
//                 type="button"
//                 disabled={!canContinue}
//                 onClick={nextStep}
//                 className="bg-primary-color rounded text-white w-full"
//               >
//                 Continue
//               </Button>
//             )
//           ) : (
//             <Button
//               type="submit"
//               disabled={!dirty || !isValid}
//               className="bg-green-600 rounded text-white w-full"
//               onClick={()=> router.push('/sign-up')}
//             >
//               Finish
//             </Button>
//           )}

//           <Typography className="text-desc-color font-medium mt-2 text-center">
//             Already have an account?{" "}
//             <span className="text-primary-color font-bold cursor-pointer">
//               Sign In
//             </span>
//             .
//           </Typography>
//         </div> */}

//         {/* ================= VERIFICATION MODAL ================= */}
//         {/* {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//             <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
//               <Typography size="h5" className="font-bold mb-4">
//                 Confirm Verification
//               </Typography>
//               <Typography className="mb-6">
//                 Are you sure you want to submit your verification?
//               </Typography>
//               <div className="flex justify-end gap-4">
//                 <Button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="border rounded text-gray-700"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={handleConfirmVerification}
//                   className="bg-primary-color text-white rounded"
//                 >
//                   Confirm
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )} */}
//       </div>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { Typography } from "@/components/shared/typography";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import InputPasswordField from "@/components/shared/input-fields/input-password-field";
import { loginSchema } from "@/formik/validations/auth";
import { Button } from "@/components/shared/button";
import { logInitialValues } from "@/formik/initial-values/auth";
import { logInForm } from "@/formik/forms/auth";
import { getError } from "@/utils/form-helpers";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import EmailVerificationModal from "@/components/shared/email";
import ForgotPasswordModal from "@/components/shared/forget-model";

const steps = [
  "Personal Info",
  "Demographic Info",
  "Professional Info",
  "Supporting Docs",
  "Review",
];

export default function CreateAccount() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [openForgot, setOpenForgot] = useState(false);
  const [openEmailOtp, setOpenEmailOtp] = useState(false);

  const { email, Password } = logInForm.formFields;

  /* ================= FORMIK ================= */
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
    setTouched,
  } = useFormik({
    initialValues: logInitialValues,
    validationSchema: loginSchema,
    validateOnMount: true,
    onSubmit: async (formValues) => {
      console.log("FORM DATA 👉", formValues);
    },
  });

  /* ================= PASSWORD RULES ================= */
  const rules = [
    { label: "At least 8 characters", valid: values.Password.length >= 8 },
    { label: "1 uppercase letter", valid: /[A-Z]/.test(values.Password) },
    {
      label: "1 special character",
      valid: /[^A-Za-z0-9]/.test(values.Password),
    },
  ];

  const completed = rules.filter((r) => r.valid).length;
  const progress = (completed / rules.length) * 100;

  /* ================= CONTINUE LOGIC ================= */
  const isStepZeroValid = isValid && dirty && progress === 100;
  const canContinue = step === 0 ? isStepZeroValid : true;

  const handleContinue = () => {
    if (!canContinue) {
      setTouched({
        email: true,
        Password: true,
      });
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F5F5F5] min-h-screen w-full px-2 py-4 shadow-lg grid grid-cols-1 lg:grid-cols-2"
    >
      {/* ================= LEFT IMAGE ================= */}
      <div className="relative max-md:hidden">
        <Image
          src="/assets/svg/loginImg.svg"
          alt="Welcome"
          fill
          className="object-cover rounded-xl"
        />

        {/* <div className="absolute inset-0 bg-blue-600/70 p-10 text-white flex flex-col justify-between">
          <Typography size="h3" className="font-bold text-center">
            Welcome to Nawacare
          </Typography>
          <Typography className="text-center">
            Manage patients, appointments, and care with ease.
          </Typography>
        </div> */}
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
      <div className="p-6 lg:p-10">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/assets/svg/logoNawa.svg"
            alt="Logo"
            width={129}
            height={106}
          />
        </div>

        <Typography size="h3" className="font-bold">
          Sign In
        </Typography>
        <Typography className="text-desc-color mb-8 mt-1">
          Access your secure medical account
        </Typography>

        <div className="space-y-8">
          <InputTextField
            name={email.name}
            value={values.email}
            label={email.label}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={email.placeholder}
            icon="mdi:email-outline"
            styling="bg-transparent"
            labelStyles="!font-bold"
            error={getError(email.name, touched, errors)}
          />

          <InputPasswordField
            name={Password.name}
            label={Password.label}
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={Password.placeholder}
            styling="bg-transparent"
            icon="mdi:lock-outline"
            strengthChecker
            labelStyles="!font-bold"
            error={getError(Password.name, touched, errors)}
          />
        </div>

        <div className="flex justify-end mt-2">
          <span
            className="text-md font-semibold text-primary-color cursor-pointer underline"
            onClick={() => setOpenForgot(true)}
          >
            Forgot password?
          </span>
        </div>

        <div className="pt-12">
          <Button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className={`!py-4 rounded-lg w-full text-white
              ${canContinue ? "bg-primary-color" : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            Sign In
          </Button>
        </div>
        <Typography className="text-desc-color font-medium mt-2 text-center">
          Don't have an account{" "}
          <span
            className="text-primary-color font-semibold cursor-pointer underline"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </span>
          .
        </Typography>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <ForgotPasswordModal
        open={openForgot}
        onClose={() => setOpenForgot(false)}
        onEmailVerify={() => {
          setOpenForgot(false);
          setOpenEmailOtp(true);
        }}
      />

      {/* EMAIL OTP VERIFICATION MODAL */}
      <EmailVerificationModal
        open={openEmailOtp}
        email={values.email || "doctor@nawacare.com"}
        onClose={() => setOpenEmailOtp(false)}
        onVerify={(code) => {
          console.log("EMAIL OTP:", code);
          setOpenEmailOtp(false);
          router.push("/reset-password"); // or dashboard
        }}
        onResend={() => {
          console.log("Resend email OTP");
        }}
      />
    </form>
  );
}

// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import { Typography } from '@/components/shared/typography'

// const steps = [
//   'Personal Info',
//   'Demographic Info',
//   'Professional Info',
//   'Supporting Docs',
//   'Review'
// ]

// export default function CreateAccount() {
//   const [step, setStep] = useState(0)
//   const [password, setPassword] = useState('')

//   /* PASSWORD RULES */
//   const rules = [
//     { label: 'At least 8 characters', valid: password.length >= 8 },
//     { label: '1 uppercase letter', valid: /[A-Z]/.test(password) },
//     { label: '1 special character', valid: /[^A-Za-z0-9]/.test(password) },
//   ]

//   const completed = rules.filter(r => r.valid).length
//   const progress = (completed / rules.length) * 100
//   const canContinue = step !== 0 || progress === 100

//   return (
//     <div className="
//       bg-[#F5F5F5]
//       px-2 py-4
//       rounded-2xl
//       w-[60%]
//       max-md:w-full
//       shadow-lg
//       overflow-hidden
//       grid grid-cols-1 lg:grid-cols-2
//     ">

//       {/* ================= LEFT IMAGE ================= */}
//       <div className="relative h-[200px] sm:h-[240px] lg:h-auto">
//         <Image
//           src="/assets/svg/loginImg.svg"
//           alt="Welcome"
//           fill
//           priority
//           className="object-cover"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-blue-600/70 p-5 lg:p-10 text-white flex flex-col justify-between">
//           <div className="text-center lg:text-left">
//             <Typography size="h3" className="font-bold">
//               Welcome to Nawacare
//             </Typography>
//             <Typography className="mt-2 text-sm lg:text-base">
//               Your central workspace to manage patients, appointments, and care.
//             </Typography>
//           </div>

//           {/* Desktop only */}
//           <div className="hidden lg:block">
//             <Typography size="h3" className="font-semibold">
//               Efficient Care, Simplified
//             </Typography>
//             <Typography className="text-sm">
//               Manage consultations, prescriptions, and follow-ups with ease.
//             </Typography>
//           </div>
//         </div>
//       </div>

//       {/* ================= RIGHT FORM ================= */}
//       <div className="p-5 sm:p-8 lg:p-12">
//         <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
//           Create Account
//         </h1>

//         {/* ================= STEPPER ================= */}
//         <div className="flex items-center justify-between mb-8">
//           {steps.map((_, i) => (
//             <div key={i} className="flex-1 flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//                   ${i <= step ? 'bg-primary-color text-white' : 'bg-gray-200 text-gray-500'}
//                 `}
//               >
//                 {i + 1}
//               </div>

//               {i !== steps.length - 1 && (
//                 <div className="flex-1 h-[2px] bg-gray-200 mx-2">
//                   <div className={`h-full ${i < step ? 'bg-primary-color' : ''}`} />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ================= STEP CONTENT ================= */}
//         {step === 0 && (
//           <div className="space-y-4">
//             <Input label="Full Name" placeholder="Saima Tahir" />
//             <Input label="Email" placeholder="saima@email.com" />

//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e:any) => setPassword(e.target.value)}
//             />

//             {password && (
//               <>
//                 {/* Progress */}
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full transition-all ${
//                       progress === 100
//                         ? 'bg-green-500'
//                         : progress >= 66
//                         ? 'bg-yellow-500'
//                         : 'bg-red-500'
//                     }`}
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 {/* Rules */}
//                 <div className="text-xs space-y-1">
//                   {rules.map(rule => (
//                     <p
//                       key={rule.label}
//                       className={`flex items-center gap-2 ${
//                         rule.valid ? 'text-green-600' : 'text-gray-400'
//                       }`}
//                     >
//                       <span>{rule.valid ? '✓' : '•'}</span>
//                       {rule.label}
//                     </p>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {step === 1 && (
//           <div className="space-y-4">
//             <Input label="Gender" placeholder="Female" />
//             <Input label="Date of Birth" type="date" />
//             <Input label="City" placeholder="Lahore" />
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <Input label="Specialization" placeholder="Cardiologist" />
//             <Input label="Experience (Years)" type="number" />
//             <Input label="Hospital / Clinic" />
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4">
//             <Input label="Upload License" type="file" />
//             <Input label="Upload Degree" type="file" />
//           </div>
//         )}

//         {step === 4 && (
//           <div className="p-4 border rounded-lg text-sm text-gray-600">
//             <p>✔ Review your information</p>
//             <p>✔ Submit for verification</p>
//             <p className="mt-2 text-green-600 font-semibold">
//               Ready to create account 🎉
//             </p>
//           </div>
//         )}

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="mt-8 flex justify-between">
//           <button
//             disabled={step === 0}
//             onClick={() => setStep(step - 1)}
//             className="px-4 py-2 border rounded disabled:opacity-40"
//           >
//             Back
//           </button>

//           <button
//             disabled={!canContinue || step === steps.length - 1}
//             onClick={() => setStep(step + 1)}
//             className="px-6 py-2 bg-blue text-white rounded disabled:opacity-40"
//           >
//             {step === steps.length - 1 ? 'Finish' : 'Continue'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ================= INPUT ================= */
// function Input({ label, ...props }: any) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-1">{label}</label>
//       <input
//         {...props}
//         className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   )
// }
