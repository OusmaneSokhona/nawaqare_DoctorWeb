// "use client";

// import React, { useState } from "react";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// const DocumentUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState({});

//   const handleFileUpload = (documentId:any) => {
//     // Handle file upload logic here
//     console.log(`Uploading file for ${documentId}`);
//   };

//   const documentSections = [
//     {
//       title: "Identity Documents",
//       documents: [
//         {
//           id: "national_id",
//           label: "National Identity Document",
//           required: true,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//         {
//           id: "passport",
//           label: "Passport or ID Proof",
//           required: false,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//       ],
//     },
//     {
//       title: "Credentials",
//       documents: [
//         {
//           id: "medical_license",
//           label: "Medical License",
//           required: true,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//         {
//           id: "diploma",
//           label: "Diploma / Certification",
//           required: false,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//       ],
//     },
//     {
//       title: "Legal",
//       documents: [
//         {
//           id: "liability_insurance",
//           label: "Liability Insurance Proof",
//           required: false,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//         {
//           id: "compliance_form",
//           label: "CMRO / GDPR Forms",
//           required: false,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//       ],
//     },
//     {
//       title: "Payment",
//       documents: [
//         {
//           id: "bank_verification",
//           label: "Bank Verification Letter",
//           required: false,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//         {
//           id: "payment_authorization",
//           label: "Payment Authorization",
//           required: false,
//           accepted: "PDF, JPEG, max 5MB",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {documentSections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="mb-8">
//           {/* Section Title */}
//           <Typography size="h4" className="text-[#2C2C2C] font-semibold mb-4">
//             {section.title}
//           </Typography>

//           {/* Documents Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {section.documents.map((doc, docIndex) => (
//               <div
//                 key={doc.id}
//                 className="bg-white rounded-xl border-2 border-[#E5E7EB] p-6 hover:border-primary-color transition-all duration-300 hover:shadow-lg group"
//               >
//                 {/* Document Label */}
//                 <div className="mb-4">
//                   <Typography className="text-[#2C2C2C] font-semibold text-sm mb-1">
//                     {doc.label}{" "}
//                     {doc.required && (
//                       <span className="text-red-500">*</span>
//                     )}
//                     {!doc.required && (
//                       <span className="text-[#9CA3AF] text-xs ml-1">
//                         (Optional)
//                       </span>
//                     )}
//                   </Typography>
//                 </div>

//                 {/* Upload Button */}
//                 <button
//                   onClick={() => handleFileUpload(doc.id)}
//                   className="w-full bg-[#F8FAFB] border-2 border-dashed border-[#D1D5DB] rounded-lg py-8 px-4 hover:bg-[#EFF6FF] hover:border-primary-color transition-all duration-300 group-hover:scale-[1.02] flex flex-col items-center justify-center gap-3"
//                 >
//                   <div className="w-12 h-12 rounded-full bg-primary-color/10 flex items-center justify-center group-hover:bg-primary-color/20 transition-colors">
//                     <Icon
//                       icon="mdi:cloud-upload-outline"
//                       width="24"
//                       height="24"
//                       className="text-primary-color"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <Typography className="text-primary-color font-semibold text-sm mb-1">
//                       {docIndex === 0 && sectionIndex === 0
//                         ? "Upload your Document"
//                         : docIndex === 1 && sectionIndex === 0
//                         ? "Upload front side"
//                         : docIndex === 0 && sectionIndex === 1
//                         ? "Upload your valid license"
//                         : docIndex === 1 && sectionIndex === 1
//                         ? "Upload diploma or transcript"
//                         : docIndex === 0 && sectionIndex === 2
//                         ? "Upload insurance document"
//                         : docIndex === 1 && sectionIndex === 2
//                         ? "Attach compliance form"
//                         : docIndex === 0 && sectionIndex === 3
//                         ? "Upload bank confirmation"
//                         : "Attach signed form"}
//                     </Typography>
//                   </div>
//                 </button>

//                 {/* Accepted Formats */}
//                 <Typography className="text-[#9CA3AF] text-xs mt-3 text-center">
//                   Accepted file: {doc.accepted}
//                 </Typography>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DocumentUpload;
// "use client";

// import React from "react";
// import { useFormik } from "formik";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// // import { documentUploadForm } from "@/formik/forms/auth/documentUploadForm";
// // import { documentUploadInitialValues } from "@/formik/initial-values/auth/documentUploadInitialValues";
// // import { documentUploadSchema } from "@/formik/validations/auth/documentUploadSchema";
// import { getError } from "@/utils/form-helpers";
// import { documentUploadForm } from "@/formik/forms/auth";
// import { documentUploadInitialValues } from "@/formik/initial-values/auth";
// import { documentUploadSchema } from "@/formik/validations/auth";

// const DocumentUpload = () => {
//   const { formFields } = documentUploadForm;

//   const {
//     values,
//     errors,
//     touched,
//     setFieldValue,
//   } = useFormik({
//     initialValues: documentUploadInitialValues,
//     validationSchema: documentUploadSchema,
//     onSubmit: () => {},
//   });

//   const handleFileUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     fieldName: string
//   ) => {
//     if (e.target.files?.[0]) {
//       setFieldValue(fieldName, e.target.files[0]);
//     }
//   };

//   const documentSections = [
//     {
//       title: "Identity Documents",
//       documents: [
//         { id: "national_id", required: true },
//         { id: "passport", required: false },
//       ],
//     },
//     {
//       title: "Credentials",
//       documents: [
//         { id: "medical_license", required: true },
//         { id: "diploma", required: false },
//       ],
//     },
//     {
//       title: "Legal",
//       documents: [
//         { id: "liability_insurance", required: false },
//         { id: "compliance_form", required: false },
//       ],
//     },
//     {
//       title: "Payment",
//       documents: [
//         { id: "bank_verification", required: false },
//         { id: "payment_authorization", required: false },
//       ],
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {documentSections.map((section) => (
//         <div key={section.title} className="mb-8">
//           <Typography size="h4" className="font-semibold mb-4">
//             {section.title}
//           </Typography>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {section.documents.map((doc) => {
//               const field = formFields[doc.id];

//               return (
//                 <div
//                   key={doc.id}
//                   className="bg-white rounded-xl border-2 p-6"
//                 >
//                   <Typography className="font-semibold text-sm mb-2">
//                     {field.label}
//                     {doc.required && <span className="text-red-500">*</span>}
//                   </Typography>

//                   <label className="cursor-pointer">
//                     <input
//                       type="file"
//                       hidden
//                       onChange={(e) =>
//                         handleFileUpload(e, field.name)
//                       }
//                     />

//                     <div className="border-2 border-dashed rounded-lg py-8 flex flex-col items-center gap-3">
//                       <Icon
//                         icon="mdi:cloud-upload-outline"
//                         width="24"
//                         className="text-primary-color"
//                       />
//                       <Typography className="text-primary-color text-sm">
//                         {values[field.name]
//                           ? "File selected"
//                           : "Upload document"}
//                       </Typography>
//                     </div>
//                   </label>

//                   {getError(field.name, touched, errors) && (
//                     <Typography className="text-red-500 text-xs mt-2">
//                       {getError(field.name, touched, errors)}
//                     </Typography>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DocumentUpload;
// "use client";

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useRouter } from "next/navigation";

// import ContainerCard from "@/components/shared/container/container-card";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";
// import { documentUploadForm } from "@/formik/forms/auth";
// import { documentUploadInitialValues } from "@/formik/initial-values/auth";
// import { documentUploadSchema } from "@/formik/validations/auth";

// // import { documentUploadForm } from "@/formik/forms/auth/documentUploadForm";
// // import { documentUploadInitialValues } from "@/formik/initial-values/auth/documentUploadInitialValues";
// // import { documentUploadSchema } from "@/formik/validations/auth/documentUploadSchema";

// const DocumentUpload = () => {
//   const router = useRouter();

//   // Extract form fields
//   const {
//     national_id,
//     passport,
//     medical_license,
//     diploma,
//     liability_insurance,
//     compliance_form,
//     bank_verification,
//     payment_authorization,
//   } = documentUploadForm.formFields;

//   const formFields = {
//     national_id,
//     passport,
//     medical_license,
//     diploma,
//     liability_insurance,
//     compliance_form,
//     bank_verification,
//     payment_authorization,
//   };

//   const formik = useFormik({
//     initialValues: documentUploadInitialValues,
//     validationSchema: documentUploadSchema,
//     onSubmit: (values) => {
//       console.log("Uploaded Files 👉", values);
//       router.push("/next-step"); // go to next page
//     },
//   });

//   // Helper to handle file selection
//   const handleFileChange = (fieldName: keyof typeof documentUploadInitialValues, file: File) => {
//     formik.setFieldValue(fieldName, file);
//   };

//   return (
//     <ContainerCard cardHeading="Upload Documents" headingAlign="left">
//       <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
//         {Object.keys(formFields).map((key) => {
//           const field = formFields[key as keyof typeof formFields];
//           return (
//             <div key={field.name} className="flex flex-col gap-2">
//               <Typography className="text-[#2C2C2C] font-semibold">
//                 {field.label}{" "}
//                 {field.errMsgs.required && <span className="text-red-500">*</span>}
//               </Typography>

//               <input
//                 type="file"
//                 name={field.name}
//                 onBlur={formik.handleBlur}
//                 onChange={(e) => {
//                   if (e.currentTarget.files && e.currentTarget.files[0]) {
//                     handleFileChange(field.name as keyof typeof documentUploadInitialValues, e.currentTarget.files[0]);
//                   }
//                 }}
//                 className="border border-gray-300 rounded-md p-2"
//               />

//               {formik.touched[field.name as keyof typeof formik.touched] &&
//                 formik.errors[field.name as keyof typeof formik.errors] && (
//                   <Typography className="text-red-500 text-sm">
//                     {formik.errors[field.name as keyof typeof formik.errors] as string}
//                   </Typography>
//                 )}

//               {/* Show uploaded file name */}
//               {formik.values[field.name as keyof typeof formik.values] &&
//                 typeof formik.values[field.name as keyof typeof formik.values] !== "string" && (
//                   <Typography className="text-green-600 text-sm">
//                     {(formik.values[field.name as keyof typeof formik.values] as File).name} uploaded
//                   </Typography>
//                 )}
//             </div>
//           );
//         })}

//         <div className="pt-4">
//           <Button
//             type="submit"
//             variant="primary"
//             size="medium"
//             className="w-full"
//             disabled={!formik.isValid || !formik.dirty}
//           >
//             Next
//           </Button>
//         </div>
//       </form>
//     </ContainerCard>
//   );
// };

// export default DocumentUpload;
"use client";

import React from "react";
import { useFormik, FormikErrors } from "formik";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import { Button } from "@/components/shared/button";
import {
  documentUploadInitialValues,
  DocumentUploadValues,
} from "@/formik/initial-values/auth";
import { documentUploadSchema } from "@/formik/validations/auth";
import { documentUploadForm } from "@/formik/forms/auth";

// import { documentUploadForm } from "@/formik/forms/auth/documentUploadForm";
// import {
//   documentUploadInitialValues,
//   DocumentUploadValues,
// } from "@/formik/initial-values/auth/documentUploadInitialValues";
// import { documentUploadSchema } from "@/formik/validations/auth/documentUploadSchema";

const DocumentUpload = () => {
  const router = useRouter();

  const formik = useFormik<DocumentUploadValues>({
    initialValues: documentUploadInitialValues,
    validationSchema: documentUploadSchema,
    onSubmit: (values) => {
      console.log("Uploaded Documents:", values);
      router.push("/next-step");
    },
  });

  const handleFileChange = (
    fieldName: keyof DocumentUploadValues,
    file: File,
  ) => {
    formik.setFieldValue(fieldName, file);
  };

  const documentSections = [
    {
      title: "Identity Documents",
      documents: [
        documentUploadForm.formFields.national_id,
        documentUploadForm.formFields.passport,
      ],
    },
    {
      title: "Credentials",
      documents: [
        documentUploadForm.formFields.medical_license,
        documentUploadForm.formFields.diploma,
      ],
    },
    {
      title: "Legal",
      documents: [
        documentUploadForm.formFields.liability_insurance,
        documentUploadForm.formFields.compliance_form,
      ],
    },
    {
      title: "Payment",
      documents: [
        documentUploadForm.formFields.bank_verification,
        documentUploadForm.formFields.payment_authorization,
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
        {documentSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <Typography size="h4" className="text-[#2C2C2C] font-semibold mb-4">
              {section.title}
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.documents.map((doc) => {
                const fieldName = doc.name as keyof DocumentUploadValues;
                const error = formik.errors[fieldName] as string | undefined;

                return (
                  <div
                    key={doc.name}
                    className="transition-all duration-300 group"
                  >
                    <Typography className="text-[#2C2C2C] font-semibold text-md mb-2">
                      {doc.label}{" "}
                      {/* {doc.errMsgs.required && <span className="text-red-500">*</span>} */}
                    </Typography>

                    <label className="w-full bg-white border-2 border-dashed border-[#D1D5DB] rounded-lg py-8 px-4 hover:bg-[#EFF6FF] hover:border-primary-color transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-primary-color/10 flex items-center justify-center group-hover:bg-primary-color/20 transition-colors">
                        <Icon
                          icon="mdi:cloud-upload-outline"
                          width="24"
                          height="24"
                          className="text-primary-color"
                        />
                      </div>
                      <Typography className="text-gray-500 font-semibold text-lg mb-1">
                        {formik.values[fieldName] instanceof File
                          ? (formik.values[fieldName] as File).name
                          : "Click to upload"}
                      </Typography>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (
                            e.currentTarget.files &&
                            e.currentTarget.files[0]
                          ) {
                            handleFileChange(
                              fieldName,
                              e.currentTarget.files[0],
                            );
                          }
                        }}
                      />
                    </label>

                    {error && (
                      <Typography className="text-red-500 text-xs mt-2">
                        {error}
                      </Typography>
                    )}

                    <Typography className="text-[#9CA3AF] text-xs mt-1 text-left">
                      Accepted file: PDF, JPEG, max 5MB
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* <div className="flex justify-end mt-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            disabled={!formik.isValid || !formik.dirty}
          >
            Next
          </Button>
        </div> */}
      </form>
    </div>
  );
};

export default DocumentUpload;

// "use client";

// import React from "react";
// import { useFormik } from "formik";
// import { useRouter } from "next/navigation";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/shared/button";
// import {
//   documentUploadInitialValues,
//   DocumentUploadValues,
// } from "@/formik/initial-values/auth";
// import { documentUploadSchema } from "@/formik/validations/auth";
// import { documentUploadForm } from "@/formik/forms/auth";

// const DocumentUpload = () => {
//   const router = useRouter();

//   const formik = useFormik<DocumentUploadValues>({
//     initialValues: documentUploadInitialValues,
//     validationSchema: documentUploadSchema,
//     onSubmit: (values) => {
//       console.log("Uploaded Documents:", values);
//       router.push("/next-step");
//     },
//   });

//   const handleFileChange = (
//     fieldName: keyof DocumentUploadValues,
//     file: File
//   ) => {
//     formik.setFieldValue(fieldName, file);
//   };

//   const documentSections = [
//     {
//       title: "Identity Documents",
//       documents: [
//         documentUploadForm.formFields.national_id,
//         documentUploadForm.formFields.passport,
//       ],
//     },
//     {
//       title: "Credentials",
//       documents: [
//         documentUploadForm.formFields.medical_license,
//         documentUploadForm.formFields.diploma,
//       ],
//     },
//     {
//       title: "Legal",
//       documents: [
//         documentUploadForm.formFields.liability_insurance,
//         documentUploadForm.formFields.compliance_form,
//       ],
//     },
//     {
//       title: "Payment",
//       documents: [
//         documentUploadForm.formFields.bank_verification,
//         documentUploadForm.formFields.payment_authorization,
//       ],
//     },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
//         {documentSections.map((section, sectionIndex) => (
//           <div key={sectionIndex}>
//             <Typography size="h5" className="font-semibold mb-4">
//               {section.title}
//             </Typography>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {section.documents.map((doc) => {
//                 const fieldName = doc.name as keyof DocumentUploadValues;
//                 const value = formik.values[fieldName];
//                 const error = formik.errors[fieldName] as string | undefined;

//                 return (
//                   <div key={doc.name} className="flex flex-col gap-1">
//                     <Typography className="text-sm font-semibold text-[#2C2C2C]">
//                       {doc.label}
//                     </Typography>

//                     {/* CARD */}
//                     <label className="w-full bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between hover:border-primary-color transition cursor-pointer">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-primary-color/10 flex items-center justify-center">
//                           <Icon
//                             icon="mdi:file-document-outline"
//                             width={22}
//                             className="text-primary-color"
//                           />
//                         </div>

//                         <div>
//                           <Typography className="text-sm font-semibold">
//                             {value instanceof File
//                               ? value.name
//                               : "Upload your document"}
//                           </Typography>
//                           <Typography className="text-xs text-gray-400">
//                             PDF, JPEG — max 5MB
//                           </Typography>
//                         </div>
//                       </div>

//                       <Icon
//                         icon="mdi:cloud-upload-outline"
//                         width={22}
//                         className="text-primary-color"
//                       />

//                       <input
//                         type="file"
//                         hidden
//                         onChange={(e) => {
//                           if (e.currentTarget.files?.[0]) {
//                             handleFileChange(
//                               fieldName,
//                               e.currentTarget.files[0]
//                             );
//                           }
//                         }}
//                       />
//                     </label>

//                     {/* STATUS */}
//                     {value instanceof File && !error && (
//                       <Typography className="text-green-600 text-xs flex items-center gap-1">
//                         <Icon icon="mdi:check-circle" width={14} />
//                         Uploaded
//                       </Typography>
//                     )}

//                     {error && (
//                       <Typography className="text-red-500 text-xs flex items-center gap-1">
//                         <Icon icon="mdi:close-circle" width={14} />
//                         {error}
//                       </Typography>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}

//         {/* PROGRESS */}
//         <div className="mt-4">
//           <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-primary-color transition-all"
//               style={{
//                 width: `${
//                   (Object.values(formik.values).filter(
//                     (v) => v instanceof File
//                   ).length /
//                     Object.keys(formik.values).length) *
//                   100
//                 }%`,
//               }}
//             />
//           </div>

//           <Typography className="text-xs text-gray-500 mt-1">
//             Required documents uploaded
//           </Typography>
//         </div>

//         {/* CONTINUE */}
//         <Button
//           type="submit"
//           className="bg-primary-color text-white w-full py-3 rounded-lg mt-4"
//           disabled={!formik.isValid}
//         >
//           Continue
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default DocumentUpload;
