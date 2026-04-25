"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

interface EditPharmacyProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    pharmacyName: string,
    Patient: string,
    responsible: string,
    location: string,
    status: string,
  ) => void;
  mode: "add" | "edit";
  title?: string;
  initialPharmacyName?: string;
  initialPatient?: string;
  initialResponsible?: string;
  initialLocation?: string;
  initialStatus?: string;
}

const EditPharmacyModal: React.FC<EditPharmacyProps> = ({
  isOpen,
  onClose,
  onSave,
  mode,
  title,
  initialPatient = "",
  initialPharmacyName = "",
  initialResponsible = "",
  initialLocation = "",
  initialStatus = "Active",
}) => {
  const [Patient, setPatient] = useState(initialPatient);
  const [pharmacyName, setPharmacyName] = useState(initialPharmacyName);
  const [responsible, setResponsible] = useState(initialResponsible);
  const [location, setLocation] = useState(initialLocation);
  const [status, setStatus] = useState(initialStatus);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPatient(initialPatient);
      setPharmacyName(initialPharmacyName);
      setResponsible(initialResponsible);
      setLocation(initialLocation);
      setStatus(initialStatus);
    }
  }, [
    isOpen,
    initialPharmacyName,
    initialResponsible,
    initialLocation,
    initialStatus,
    initialPatient,
  ]);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!pharmacyName.trim() || !responsible.trim() || !location.trim()) return;
  //     onSave(pharmacyName, responsible, location, status);
  //     onClose();
  //   };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!Patient || !pharmacyName || !responsible || !location) return;

    onSave(Patient, pharmacyName, responsible, location, status);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      title={mode === "edit" ? "Edit Pharmacy" : "Add Pharmacy"}
      titleStyling="text-left"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        <div>
          <Typography className="pb-2 font-semibold">Patient ID</Typography>
          <input
            type="text"
            className="px-3 py-4 bg-white outline-none w-full rounded"
            placeholder="Enter Patient ID"
            value={Patient}
            onChange={(e) => setPatient(e.target.value)}
          />
        </div>
        {/* Pharmacy Name */}
        <div>
          <Typography className="pb-2 font-semibold">Pharmacy Name</Typography>
          <input
            type="text"
            className="px-3 py-4 bg-white outline-none w-full rounded"
            placeholder="Enter pharmacy name"
            value={pharmacyName}
            onChange={(e) => setPharmacyName(e.target.value)}
          />
        </div>

        {/* Responsible */}
        <div>
          <Typography className="pb-2 font-semibold">Responsible</Typography>
          <input
            type="text"
            className="px-3 py-4 bg-white outline-none w-full rounded"
            placeholder="Enter responsible person"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <Typography className="pb-2 font-semibold">Location</Typography>
          <input
            type="text"
            className="px-3 py-4 bg-white outline-none w-full rounded"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <Typography className="pb-2 font-semibold">Status</Typography>
          <div className="relative">
            <div
              className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
              onClick={() => setStatusOpen(!statusOpen)}
            >
              <span>{status}</span>
              <Icon
                icon="uim:angle-down"
                width="24"
                height="24"
                className={`transition-transform ${
                  statusOpen
                    ? "rotate-180 text-secondary-color"
                    : "text-secondary-color"
                }`}
              />
            </div>
            {statusOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
                <div
                  className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
                  onClick={() => {
                    setStatus("Active");
                    setStatusOpen(false);
                  }}
                >
                  Active
                </div>
                <div
                  className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
                  onClick={() => {
                    setStatus("Inactive");
                    setStatusOpen(false);
                  }}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
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
            size="medium"
            className="w-full bg-primary-color rounded-xl text-white"
          >
            {mode === "edit" ? "Update & Save" : "Add Pharmacy"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditPharmacyModal;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// interface EditPharmacyProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (
//     pharmacyName: string,
//     Patient: string,
//     responsible: string,
//     location: string,
//     status: string
//   ) => void;
//   mode: "add" | "edit";
//   title?: string;
//   initialPharmacyName?: string;
//   initialPatient?: string;
//   initialResponsible?: string;
//   initialLocation?: string;
//   initialStatus?: string;
// }

// const EditPharmacyModal: React.FC<EditPharmacyProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   mode,
//   title,
//   initialPatient = "",
//   initialPharmacyName = "",
//   initialResponsible = "",
//   initialLocation = "",
//   initialStatus = "Active",
// }) => {
//   const [Patient, setPatient] = useState(initialPatient);
//   const [pharmacyName, setPharmacyName] = useState(initialPharmacyName);
//   const [responsible, setResponsible] = useState(initialResponsible);
//   const [location, setLocation] = useState(initialLocation);
//   const [status, setStatus] = useState(initialStatus);
//   const [statusOpen, setStatusOpen] = useState(false);

//   // NEW FIELDS
//   const [pharmacyId, setPharmacyId] = useState("");
//   const [internalId, setInternalId] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [city, setCity] = useState("");
//   const [pharmacyType, setPharmacyType] = useState("Hospital");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [licenseExpiration, setLicenseExpiration] = useState("");
//   const [validationStatus, setValidationStatus] = useState("");
//   const [deliveryMethod, setDeliveryMethod] = useState("");
//   const [openingHours, setOpeningHours] = useState("");
//   const [missingDoc, setMissingDoc] = useState<File | null>(null);

//   useEffect(() => {
//     if (isOpen) {
//       setPatient(initialPatient);
//       setPharmacyName(initialPharmacyName);
//       setResponsible(initialResponsible);
//       setLocation(initialLocation);
//       setStatus(initialStatus);
//     }
//   }, [
//     isOpen,
//     initialPharmacyName,
//     initialResponsible,
//     initialLocation,
//     initialStatus,
//     initialPatient,
//   ]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!Patient || !pharmacyName || !responsible || !location) return;

//     onSave(Patient, pharmacyName, responsible, location, status);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWrapper
//       title={mode === "edit" ? "Edit Pharmacy" : "Add Pharmacy"}
//       titleStyling="text-left"
//       onClose={onClose}
//       isOpen={isOpen}
//     >
//       <form onSubmit={handleSubmit} className="space-y-6 pt-3">

//         {/* GRID 2 COLUMNS */}
//         <div className="grid grid-cols-2 gap-5">

//           {/* Pharmacy Name */}
//           <div>
//             <Typography className="pb-2 font-semibold">Pharmacy Name</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="Enter pharmacy name"
//               value={pharmacyName}
//               onChange={(e) => setPharmacyName(e.target.value)}
//             />
//           </div>

//           {/* Pharmacy ID */}
//           <div>
//             <Typography className="pb-2 font-semibold">Pharmacy ID</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="#1234#234"
//               value={Patient}
//               onChange={(e) => setPharmacyId(e.target.value)}
//             />
//           </div>

//           {/* Internal ID */}
//           <div>
//             <Typography className="pb-2 font-semibold">Internal ID</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="1256789"
//               value={internalId}
//               onChange={(e) => setInternalId(e.target.value)}
//             />
//           </div>

//           {/* Pharmacy Type */}
//           <div>
//             <Typography className="pb-2 font-semibold">Pharmacy Type</Typography>
//             <select
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               value={pharmacyType}
//               onChange={(e) => setPharmacyType(e.target.value)}
//             >
//               <option>Hospital</option>
//               <option>Retail</option>
//               <option>Wholesale</option>
//             </select>
//           </div>

//           {/* Email */}
//           <div>
//             <Typography className="pb-2 font-semibold">Email</Typography>
//             <input
//               type="email"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="abc@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <Typography className="pb-2 font-semibold">Phone</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="+923456789032"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           {/* Country/City */}
//           <div>
//             <Typography className="pb-2 font-semibold">Country / City</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="Lahore"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </div>

//           {/* Pharmacy Status */}
//           <div>
//             <Typography className="pb-2 font-semibold">Pharmacy Status</Typography>
//             <select
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>
//           </div>

//           {/* License Number */}
//           <div>
//             <Typography className="pb-2 font-semibold">Pharmacy License Number</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="#ph23456790"
//               value={licenseNumber}
//               onChange={(e) => setLicenseNumber(e.target.value)}
//             />
//           </div>

//           {/* License Expiration */}
//           <div>
//             <Typography className="pb-2 font-semibold">License Expiration Date</Typography>
//             <input
//               type="date"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               value={licenseExpiration}
//               onChange={(e) => setLicenseExpiration(e.target.value)}
//             />
//           </div>

//           {/* Validation Status */}
//           <div>
//             <Typography className="pb-2 font-semibold">Validation Status</Typography>
//             <select
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               value={validationStatus}
//               onChange={(e) => setValidationStatus(e.target.value)}
//             >
//               <option>Temporarily Suspended</option>
//               <option>Verified</option>
//               <option>Rejected</option>
//             </select>
//           </div>

//           {/* Delivery Method */}
//           <div>
//             <Typography className="pb-2 font-semibold">Associated Delivery Method</Typography>
//             <select
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               value={deliveryMethod}
//               onChange={(e) => setDeliveryMethod(e.target.value)}
//             >
//               <option>Own courier</option>
//               <option>Partner delivery</option>
//               <option>Pickup only</option>
//             </select>
//           </div>

//           {/* Opening Hours */}
//           <div>
//             <Typography className="pb-2 font-semibold">Opening Hours</Typography>
//             <input
//               type="text"
//               className="px-3 py-3 bg-white outline-none w-full rounded"
//               placeholder="9am to 5pm"
//               value={openingHours}
//               onChange={(e) => setOpeningHours(e.target.value)}
//             />
//           </div>

//           {/* Missing Documents */}
//           <div className="col-span-2">
//             <Typography className="pb-2 font-semibold">Missing Documents</Typography>

//             <label className="w-full flex flex-col justify-center items-center border border-gray-300 rounded-lg p-5 cursor-pointer">
//               <Icon icon="solar:upload-linear" className="text-3xl text-gray-500" />
//               <span className="mt-1 text-gray-500">Upload your document</span>
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => setMissingDoc(e.target.files?.[0] || null)}
//               />
//             </label>
//           </div>

//         </div>

//         {/* BUTTONS */}
//         <div className="flex items-center justify-between gap-4 pt-4">
//           <Button
//             variant="outlined"
//             size="medium"
//             className="w-full text-secondary-color"
//             onClick={onClose}
//           >
//             Cancel
//           </Button>

//           <Button
//             type="submit"
//             size="medium"
//             className="w-full bg-primary-color rounded-xl text-white"
//           >
//             Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default EditPharmacyModal;
