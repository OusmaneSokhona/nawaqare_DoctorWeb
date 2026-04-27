// "use client";
// import React, { useState } from "react";
// import { Typography } from "@/components/shared/typography";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (
//     medicalCondition: string,
//     Price: string,
//     Description: string,
//     Image: string,
//     Action: string
//   ) => void;
// };

// const EditMedicalConditionModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
//   const [medicalCondition, setMedicalCondition] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [action, setAction] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-[400px]">
//         <Typography size="h4">Add Medical Condition</Typography>

//         <input
//           className="border w-full mt-3 p-2 rounded"
//           placeholder="Condition Name"
//           value={medicalCondition}
//           onChange={(e) => setMedicalCondition(e.target.value)}
//         />
//         <input
//           className="border w-full mt-3 p-2 rounded"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           className="border w-full mt-3 p-2 rounded"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           className="border w-full mt-3 p-2 rounded"
//           placeholder="Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />

//         <div className="flex justify-end gap-3 mt-5">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-primary-dark text-white"
//             onClick={() => onSave(medicalCondition, price, description, image, action)}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditMedicalConditionModal;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";
// import Image from "next/image";

// // interface SpecialityData {
// //   title: string;
// //   desc: string;
// // }
// interface SpecialityData {
//   title: string;
//   desc: string;
//   Price: string;
//   image: string;
//   Action: string;
// }

// interface EditSpecialityProps {
//   isOpen: boolean;
//   onClose: () => void;
//   // onSave: (speciality: SpecialityData) => void;
//   onSave :(title: string, desc: string, Price: string, image: string, Action: string ,) => void;
//   title?: string;
//   initialTitle?: string;
//   initialDesc?: string;
// }

// const EditSpecialityModal: React.FC<EditSpecialityProps> = ({
//   onClose,
//   isOpen,
//   title,
//   onSave,
//   initialTitle = "",
//   initialDesc = "",
// }) => {
//   const [specialityTitle, setSpecialityTitle] = useState(initialTitle);
//   const [specialityDesc, setSpecialityDesc] = useState(initialDesc);
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [openspeciality, setOpenSpeciality] = useState<number | null>(null);
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [status, setStatus] = useState("");
//   const [specialityPrice, setSpecialityPrice] = useState("");   // NEW
//   const [specialityImage, setSpecialityImage] = useState("");   // NEW
//   const [specialityAction, setSpecialityAction] = useState(""); // NEW

//   // Prefill when editing
//   useEffect(() => {
//     setSpecialityTitle(initialTitle);
//     setSpecialityDesc(initialDesc);
//   }, [initialTitle, initialDesc]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!specialityTitle.trim() || !specialityDesc.trim()) return;
//     // onSave({ title: specialityTitle, desc: specialityDesc, });
//     onSave(
//   specialityTitle,
//   specialityDesc,
//   specialityPrice,
//   specialityImage,
//   specialityAction
// );

//     onClose();
//   };

//   return (
//     <ModalWrapper title={title} titleStyling="text-left" onClose={onClose} isOpen={isOpen}>
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">
//         {/* Profile Image */}
//         <div className="w-[150px] h-[150px] ml-[150px] max-md:ml-[80px] flex items-center justify-center border rounded bg-white relative overflow-hidden">
//           {profileImage ? (
//             <Image
//               src={URL.createObjectURL(profileImage)}
//               width={150}
//               height={150}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <Icon className="text-dark-gray" icon="iconamoon:profile-thin" width="62" height="70" />
//           )}
//           <label className="absolute bottom-0 right-0 bg-light-gray bg-opacity-50 rounded cursor-pointer w-[40px] h-[38px] flex items-center justify-center">
//             <Icon className="text-primary-dark" icon="streamline:user-add-plus" width="14" height="14" />
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   setProfileImage(e.target.files[0]);
//                 }
//               }}
//             />
//           </label>
//         </div>

//         {/* Title */}
//         {/* <div>
//           <Typography className="pb-2 text-primary-color font-semibold">Speciality Name</Typography>
//           <input
//             type="text"
//             value={specialityTitle}
//             onChange={(e) => setSpecialityTitle(e.target.value)}
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter speciality name"
//           />
//         </div> */}

//         <div>
//   <Typography className="pb-2 font-semibold">
//     Speciality Name
//   </Typography>

//   <div className="relative">
//     {/* Input-like dropdown */}
//     <div
//       className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//       onClick={() => setStatusOpen(!statusOpen)}
//     >
//       <span>{specialityTitle || ""}</span>
//       <Icon
//         icon="uim:angle-down"
//         width="24"
//         height="24"
//         className={`transition-transform ${
//           statusOpen ? "rotate-180 text-secondary-color" : "text-secondary-color"
//         }`}
//       />
//     </div>

//     {/* Dropdown options */}
//     {statusOpen && (
//       <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//         {[
//           "Primary Care",
//           "Chronic Care",
//           "Stress & Mental Health",
//           "Prescription",
//         ].map((item) => (
//           <div
//             key={item}
//             className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//             onClick={() => {
//               setSpecialityTitle(item); // set selected speciality
//               setStatusOpen(false);     // close dropdown
//             }}
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// </div>

//          {/* <div>
//           <Typography className="pb-2 text-primary-color font-semibold">
//             Speciality Name
//           </Typography>

//           <div className="relative">
//             <div
//               className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//               onClick={() => setStatusOpen(!statusOpen)}
//             >
//               <span>{status}</span>
//               <Icon
//                 icon="uim:angle-down"
//                 width="24"
//                 height="24"
//                 className={`transition-transform ${
//                   statusOpen
//                     ? "rotate-180 text-secondary-color"
//                     : "text-secondary-color"
//                 }`}
//               />
//             </div>
//             {statusOpen && (
//               <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Primary Care");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Primary Care
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Chronic Care");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Chronic Care
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Stress & Mental Health ");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Stress & Mental Health
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Prescription");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Prescription
//                 </div>
//               </div>
//             )}
//           </div>
//         </div> */}

//         {/* Description */}
//         <div>
//           <Typography className="pb-2 font-semibold">Description</Typography>
//           <textarea
//             className="px-3 py-4 bg-white outline-none w-full rounded resize-none placeholder:text-dark-gray"
//             placeholder="Add description"
//             rows={4}
//             value={specialityDesc}
//             onChange={(e) => setSpecialityDesc(e.target.value)}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
//           <Button variant="outlined" size="medium" className="w-full text-secondary-color" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="submit" variant="primary" size="medium" className="w-full">
//             Update & Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default EditSpecialityModal;

"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Typography } from "@/components/shared/typography";
// import ModalWrapper from "@/components/ui/modals/modal-wrapper";
// import { Button } from "@/components/ui/button";
import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";

interface EditMedicalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    desc: string,
    Price: string,
    image: string,
    Action: string,
  ) => void;
  title?: string;
  initialTitle?: string;
  initialDesc?: string;
  initialPrice?: string;
  initialImage?: string;
  initialAction?: string;
}

const AddMedicalModel: React.FC<EditMedicalProps> = ({
  onClose,
  isOpen,
  title,
  onSave,
  initialTitle = "",
  initialDesc = "",
  initialPrice = "",
  initialImage = "",
  initialAction = "",
}) => {
  const [medicalTitle, setMedicalTitle] = useState(initialTitle);
  const [medicalDesc, setMedicalDesc] = useState(initialDesc);
  const [medicalPrice, setMedicalPrice] = useState(initialPrice);
  const [medicalImage, setMedicalImage] = useState(initialImage);
  const [medicalAction, setMedicalAction] = useState(initialAction);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // predefined options for dropdown
  const options = [
    "Primary Care",
    "Chronic Care",
    "Stress & Mental Health",
    "Prescription",
  ];

  useEffect(() => {
    setMedicalTitle(initialTitle);
    setMedicalDesc(initialDesc);
    setMedicalPrice(initialPrice);
    setMedicalImage(initialImage);
    setMedicalAction(initialAction);
  }, [initialTitle, initialDesc, initialPrice, initialImage, initialAction]);

  useEffect(() => {
    if (profileImage) {
      setMedicalImage(URL.createObjectURL(profileImage));
    }
  }, [profileImage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicalTitle.trim() || !medicalDesc.trim()) return;

    onSave(
      medicalTitle,
      medicalDesc,
      medicalPrice,
      medicalImage,
      medicalAction,
    );
    onClose();
  };

  return (
    <ModalWrapper
      title={title}
      titleStyling="text-left"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        {/* Image Upload */}
        <div className="w-[150px] h-[150px] ml-[150px] max-md:ml-[80px] flex items-center justify-center border rounded bg-white relative overflow-hidden">
          {medicalImage ? (
            <Image
              src={medicalImage}
              width={150}
              height={150}
              alt="Medical"
              className="object-cover"
            />
          ) : (
            <Icon
              className="text-dark-gray"
              icon="iconamoon:profile-thin"
              width="62"
              height="70"
            />
          )}
          <label className="absolute bottom-0 right-0 bg-light-gray bg-opacity-50 rounded cursor-pointer w-[40px] h-[38px] flex items-center justify-center">
            <Icon
              className="text-primary-dark"
              icon="streamline:user-add-plus"
              width="14"
              height="14"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) setProfileImage(e.target.files[0]);
              }}
            />
          </label>
        </div>
        <div className="flex gap-2 items-center w-[100%]">
          {/* Dropdown for Title */}
          <div className="w-[50%]">
            <Typography className="pb-2 font-semibold">Medical Name</Typography>
            <div className="relative">
              <div
                className="px-3 py-4 bg-white rounded cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              >
                <span>{medicalTitle || ""}</span>
                <Icon icon="mdi:chevron-down" />
              </div>
              {isOpenDropdown && (
                <ul className="absolute w-full bg-white border rounded shadow-md mt-1 z-10">
                  {options.map((opt, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setMedicalTitle(opt);
                        setIsOpenDropdown(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Price Input */}
          <div className="w-[50%]">
            <Typography className="pb-2 font-semibold">Price</Typography>
            <input
              type="text"
              value={medicalPrice}
              onChange={(e) => setMedicalPrice(e.target.value)}
              className="px-3 py-3 bg-white outline-none w-full rounded"
              placeholder=""
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Typography className="pb-2 font-semibold">Description</Typography>
          <textarea
            className="px-3 py-4 bg-white outline-none w-full rounded resize-none"
            placeholder="Add description"
            rows={4}
            value={medicalDesc}
            onChange={(e) => setMedicalDesc(e.target.value)}
          />
        </div>
        <div>
          <Typography className="pb-2 font-semibold">Overview</Typography>
          <textarea
            className="px-3 py-4 bg-white outline-none w-full rounded resize-none"
            placeholder=""
            rows={6}
            value={medicalDesc}
            onChange={(e) => setMedicalDesc(e.target.value)}
          />
        </div>
        <div>
          <Typography className="pb-2 font-semibold">
            Common Symptoms
          </Typography>
          <textarea
            className="px-3 py-4 bg-white outline-none w-full rounded resize-none"
            placeholder=""
            rows={10}
            value={medicalDesc}
            onChange={(e) => setMedicalDesc(e.target.value)}
          />
        </div>
        <div>
          <Typography className="pb-2 font-semibold">Treatment</Typography>
          <textarea
            className="px-3 py-4 bg-white outline-none w-full rounded resize-none"
            placeholder=""
            rows={10}
            value={medicalDesc}
            onChange={(e) => setMedicalDesc(e.target.value)}
          />
        </div>

        {/* Save/Cancel */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
          <Button
            variant="outlined"
            size="medium"
            className="w-full text-secondary-color"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full"
          >
            Update & Save
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddMedicalModel;
