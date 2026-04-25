// "use client";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useRouter } from "next/navigation";
// import { Icon } from "@iconify/react";
// import { Typography } from "@/components/shared/typography";

// export default function EditPersonalInformation() {
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       fullName: "Mr. Alex Martin",
//       dob: "15 March 2018",
//       email: "Abc@gmail.com",
//       city: "Lahore",
//       phone: "+1 234 567 890",
//       gender: "Male",
//       idNumber: "NID-SN-98374521",
//       idType: "Numeric",
//       expiryDate: "15 March 2018",
//       nationality: "Islam",
//       about: "Dr. David Patel, a dedicated cardiologist...",
//       area: "Johr town",
//       address: "32 Example St",
//     },
//     onSubmit: (values) => {
//       console.log("SUBMITTED:", values);
//     },
//   });

//   const inputClass =
//     "w-full border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300";
//   const labelClass = "block text-[12px] font-bold text-gray-700 mb-1";
//   const subLabelClass = "text-[10px] text-gray-400 mt-1";

//   return (
//     <div className="">
//       <Typography size="h4" className="font-bold mb-8 text-gray-800">
//         Edit Personal Information
//       </Typography>

//       {/* Profile Avatar Section */}
//       <div className="mb-8 relative w-20 h-20 bg-[#F4F7FE] rounded-full flex items-center justify-center">
//         <Icon icon="solar:user-bold" width="40" className="text-[#BCC6D8]" />
//         <div className="absolute bottom-0 right-0 bg-white rounded-md shadow-md border border-gray-100 p-1 cursor-pointer">
//           <Icon
//             icon="solar:camera-add-bold"
//             width="16"
//             className="text-primary-color"
//           />
//         </div>
//       </div>

//       <form onSubmit={formik.handleSubmit} className="space-y-6">
//         {/* Row 1: Name & DOB (Corrected Spread) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className={labelClass}>Full Name</label>
//             <input
//               {...formik.getFieldProps("fullName")}
//               className={inputClass}
//             />
//             <p className={subLabelClass}>Changes require verification</p>
//           </div>
//           <div>
//             <label className={labelClass}>Date Of Birth</label>
//             <div className="relative">
//               <input {...formik.getFieldProps("dob")} className={inputClass} />
//               <Icon
//                 icon="solar:calendar-bold"
//                 className="absolute right-4 top-3.5 text-primary-color"
//                 width="18"
//               />
//             </div>
//             <p className={subLabelClass}>Changes require verification</p>
//           </div>
//         </div>

//         {/* Row 2: Email & City */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className={labelClass}>Email</label>
//             <input {...formik.getFieldProps("email")} className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>City</label>
//             <input {...formik.getFieldProps("city")} className={inputClass} />
//           </div>
//         </div>

//         {/* Row 3: Phone & Gender */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className={labelClass}>Phone</label>
//             <div className="relative">
//               <select
//                 {...formik.getFieldProps("phone")}
//                 className={`${inputClass} appearance-none`}
//               >
//                 <option value="+1 234 567 890">+1 234 567 890</option>
//               </select>
//               <Icon
//                 icon="tabler:chevron-down"
//                 className="absolute right-4 top-3.5 text-gray-400"
//                 width="18"
//               />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Gender</label>
//             <div className="relative">
//               <select
//                 {...formik.getFieldProps("gender")}
//                 className={`${inputClass} appearance-none`}
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               <Icon
//                 icon="tabler:chevron-down"
//                 className="absolute right-4 top-3.5 text-gray-400"
//                 width="18"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Row 4: ID Number & ID Type */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className={labelClass}>ID Number</label>
//             <input
//               {...formik.getFieldProps("idNumber")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className={labelClass}>ID Type</label>
//             <div className="relative">
//               <select
//                 {...formik.getFieldProps("idType")}
//                 className={`${inputClass} appearance-none`}
//               >
//                 <option value="Numeric">Numeric</option>
//               </select>
//               <Icon
//                 icon="tabler:chevron-down"
//                 className="absolute right-4 top-3.5 text-gray-400"
//                 width="18"
//               />
//             </div>
//             <p className={subLabelClass}>Changes require verification</p>
//           </div>
//         </div>

//         {/* About Me */}
//         <div>
//           <label className={labelClass}>About Me</label>
//           <textarea
//             {...formik.getFieldProps("about")}
//             rows={3}
//             className={`${inputClass} resize-none`}
//           />
//         </div>

//         <Typography
//           size="h5"
//           className="font-bold pt-4 text-gray-800 border-t border-gray-50"
//         >
//           Address
//         </Typography>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className={labelClass}>Area</label>
//             <input {...formik.getFieldProps("area")} className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Address</label>
//             <input
//               {...formik.getFieldProps("address")}
//               className={inputClass}
//             />
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-4 pt-6">
//           <button
//             type="button"
//             className="px-12 py-3 rounded-xl bg-[#EAE8ED] font-bold text-gray-700 text-sm"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-12 py-3 rounded-xl bg-[#3b82f6] text-white font-bold text-sm shadow-sm hover:bg-blue-600 transition-colors"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import React, { useState } from "react";

// Toggle component for Profile Display
const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: () => void;
}) => (
  <div
    onClick={onChange}
    className={`w-9 h-5 rounded-full relative transition cursor-pointer ${
      checked ? "bg-blue-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
        checked ? "right-0.5" : "left-0.5"
      }`}
    />
  </div>
);

export default function EditPersonalInformation() {
  const router = useRouter();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      fullName: "Dr. Daniel Lee",
      dob: "02/Sep/2025",
      idNumber: "NID-SN-98374521",
      idType: "Numeric",
      expiryDate: "12/Sep/2022",
      email: "Abc@gmail.com",
      phone: "+1 234 567 890",
      whatsApp: "+1 234 567 890",
      city: "Lahore",
      area: "Johar Town",
      address: "67 avenue de Paris, 75000 Paris",
      gender: "Female",
      nationality: "Islam",
      about: "Dr. David Patel, a dedicated cardiologist...",
      profileDisplay: {
        male: true,
        female: false,
        publicProfile: true,
      },
      languages: ["Urdu", "English"],
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: (values) => {
      console.log("SUBMITTED:", values);
      // You can replace this with API call
    },
  });

  const inputClass =
    "w-full border-2 border-border-color rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300";
  const labelClass = "block text-[12px] font-bold text-gray-700 mb-1";
  const subLabelClass = "text-[10px] text-gray-400 mt-1";

  const [languages, setLanguages] = useState<string[]>(formik.values.languages);

  const toggleLanguage = (lang: string) => {
    const newLanguages = languages.includes(lang)
      ? languages.filter((l) => l !== lang)
      : [...languages, lang];
    setLanguages(newLanguages);
    formik.setFieldValue("languages", newLanguages);
  };

  return (
    <div className="">
      <Typography size="h4" className="font-bold mb-8 text-gray-800">
        Edit Personal Information
      </Typography>

      {/* Profile Avatar */}
      <div className="mb-8 relative w-20 h-20 bg-[#F4F7FE] rounded-full flex items-center justify-center">
        <Icon icon="solar:user-bold" width="40" className="text-[#BCC6D8]" />
        <div className="absolute bottom-0 right-0 bg-white rounded-md shadow-md border border-gray-100 p-1 cursor-pointer">
          <Icon
            icon="solar:camera-add-bold"
            width="16"
            className="text-primary-color"
          />
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Identity */}
        <Typography size="h5" className="font-bold text-gray-800">
          Identity
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              {...formik.getFieldProps("fullName")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Date of Birth</label>
            <div className="relative">
              <input {...formik.getFieldProps("dob")} className={inputClass} />
              <Icon
                icon="solar:calendar-bold"
                className="absolute right-4 top-3.5 text-primary-color"
                width="18"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>ID Number</label>
            <input
              {...formik.getFieldProps("idNumber")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>ID Type</label>
            <input {...formik.getFieldProps("idType")} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Expiry Date</label>
          <input
            {...formik.getFieldProps("expiryDate")}
            className={inputClass}
          />
        </div>

        {/* Contact */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Contact
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Email</label>
            <input {...formik.getFieldProps("email")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input {...formik.getFieldProps("phone")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input
              {...formik.getFieldProps("whatsApp")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input {...formik.getFieldProps("city")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Area</label>
            <input {...formik.getFieldProps("area")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input
              {...formik.getFieldProps("address")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Demographics */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Demographics
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Gender</label>
            <select
              {...formik.getFieldProps("gender")}
              className={`${inputClass} appearance-none`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Nationality</label>
            <input
              {...formik.getFieldProps("nationality")}
              className={inputClass}
            />
          </div>
        </div>

        {/* About Me */}
        <div>
          <label className={labelClass}>About Me</label>
          <textarea
            {...formik.getFieldProps("about")}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Profile Display */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Profile Display
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
            <span>Male</span>
            <Toggle
              checked={formik.values.profileDisplay.male}
              onChange={() =>
                formik.setFieldValue(
                  "profileDisplay.male",
                  !formik.values.profileDisplay.male,
                )
              }
            />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
            <span>Female</span>
            <Toggle
              checked={formik.values.profileDisplay.female}
              onChange={() =>
                formik.setFieldValue(
                  "profileDisplay.female",
                  !formik.values.profileDisplay.female,
                )
              }
            />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 text-md text-gray-400">
            <span>Public Profile</span>
            <Toggle
              checked={formik.values.profileDisplay.publicProfile}
              onChange={() =>
                formik.setFieldValue(
                  "profileDisplay.publicProfile",
                  !formik.values.profileDisplay.publicProfile,
                )
              }
            />
          </div>
        </div>

        {/* Language */}
        <Typography size="h5" className="font-bold text-gray-800 pt-4">
          Language Spoken
        </Typography>
        <div className="flex flex-wrap gap-2">
          {["Urdu", "English", "French"].map((lang) => (
            <span
              key={lang}
              className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                languages.includes(lang)
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-400"
              }`}
              onClick={() => toggleLanguage(lang)}
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            className="px-12 py-3 rounded-xl bg-gray-300 text-gray-700 font-bold text-sm"
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => router.push("/profile")}
            className="px-12 py-3 rounded-xl bg-primary-color text-white font-bold text-sm hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
