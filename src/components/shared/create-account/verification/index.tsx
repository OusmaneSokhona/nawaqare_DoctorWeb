// import { CheckCircle2, ChevronDown } from "lucide-react";

// const VerificationSummary = () => {
//   const sections = [
//     "Demographic info",
//     "Professional Info",
//     "Identity Documents",
//     "Credentials",
//     "Legal",
//     "Payment",
//   ];

//   return (
//     <div className="bg-white rounded-xl border divide-y">
//       {sections.map((title, i) => (
//         <div key={i} className="p-4 flex justify-between items-center">
//           <div>
//             <p className="font-semibold text-gray-800">{title}</p>
//             <p className="flex items-center gap-1 text-green-600 text-sm">
//               <CheckCircle2 size={16} /> Uploaded
//             </p>
//           </div>
//           <ChevronDown className="text-gray-500" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VerificationSummary;
// "use client";

// import { useState, ReactNode } from "react";
// import { CheckCircle2, ChevronDown, Pencil } from "lucide-react";

// /* =======================
//    TYPES
// ======================= */

// interface SectionProps {
//   title: string;
//   children?: ReactNode; // ✅ optional (important)
//   defaultOpen?: boolean;
// }

// interface SubItemProps {
//   title: string;
// }

// /* =======================
//    SECTION COMPONENT
// ======================= */

// const Section = ({
//   title,
//   children,
//   defaultOpen = true,
// }: SectionProps) => {
//   const [open, setOpen] = useState<boolean>(defaultOpen);

//   return (
//     <div className="bg-white rounded-xl border mb-3">
//       {/* Header */}
//       <div
//         className="flex items-center justify-between px-4 py-3 cursor-pointer"
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         <div>
//           <p className="font-semibold text-gray-800">{title}</p>
//           <div className="flex items-center gap-1 text-sm text-green-600">
//             <CheckCircle2 size={16} />
//             Uploaded
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <Pencil size={16} className="text-blue-600" />
//           <ChevronDown
//             size={18}
//             className={`transition-transform duration-200 ${
//               open ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//       </div>

//       {/* Body */}
//       {open && children && (
//         <div className="px-4 pb-3 space-y-2">{children}</div>
//       )}
//     </div>
//   );
// };

// /* =======================
//    SUB ITEM
// ======================= */

// const SubItem = ({ title }: SubItemProps) => {
//   return (
//     <div className="flex items-center justify-between py-1">
//       <div>
//         <p className="text-sm text-gray-700">{title}</p>
//         <div className="flex items-center gap-1 text-xs text-green-600">
//           <CheckCircle2 size={14} />
//           Uploaded
//         </div>
//       </div>
//       <Pencil size={14} className="text-blue-600" />
//     </div>
//   );
// };

// /* =======================
//    MAIN COMPONENT
// ======================= */

// const VerificationSummary = () => {
//   return (
//     <div className="">
//       {/* MAIN SECTIONS */}
//       <Section title="Demographic info" />

//       <Section title="Professional Info" />

//       <Section title="Supporting Documents">
//         <SubItem title="Identity Documents" />
//         <SubItem title="Credentials" />
//         <SubItem title="Legal" />
//         <SubItem title="Payment" />
//       </Section>

//       {/* CONFIRMATION CHECKBOXES */}
//       <div className="mt-4 space-y-3 text-sm text-gray-700">
//         <label className="flex gap-2">
//           <input type="checkbox" className="mt-1" />
//           <span>I confirm the information provided is accurate</span>
//         </label>

//         <label className="flex gap-2">
//           <input type="checkbox" className="mt-1" />
//           <span>
//             I consent to the processing of my personal data for verification
//           </span>
//         </label>

//         <label className="flex gap-2">
//           <input type="checkbox" className="mt-1" />
//           <span>
//             By submitting, you consent to the processing of your data for
//             professional verification purposes. Your information is securely
//             handled under GDPR and HDS standards.
//           </span>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default VerificationSummary;
"use client";

import { useState, ReactNode } from "react";
import { CheckCircle2, ChevronDown, Pencil, Upload } from "lucide-react";
import { Icon } from "@iconify/react";

/* =======================
   TYPES
======================= */

interface SectionProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

interface UploadItemProps {
  title: string;
}

/* =======================
   SECTION COMPONENT
======================= */

const Section = ({ title, children, defaultOpen = false }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border mb-3">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-4 cursor-pointer"
      >
        <div>
          <p className="font-semibold text-gray-800 mb-2">{title}</p>
          <div className="flex items-center gap-1 text-md text-green-600">
            <Icon
              icon="mdi:checkbox-marked"
              className="text-green-600"
              width={18}
              height={18}
            />
            <span className="text-gray-400">Uploaded</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Pencil size={16} className="text-primary-color" />
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Body */}
      {open && <div className="px-4 pb-3 space-y-3">{children}</div>}
    </div>
  );
};

/* =======================
   UPLOAD ITEM
======================= */

const UploadItem = ({ title }: UploadItemProps) => {
  return (
    <div className="flex items-center justify-between p-3">
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <span className="text-xs text-green-600 flex items-center gap-1">
          <CheckCircle2 size={12} />
          Uploaded
        </span>
      </div>

      <button className="flex items-center gap-1 text-sm text-blue-600">
        {/* <Upload size={14} /> */}
        <Pencil size={16} className="text-primary-color" />
        {/* Replace */}
      </button>
    </div>
  );
};

/* =======================
   MAIN COMPONENT
======================= */

const VerificationSummary = () => {
  return (
    <div className="space-y-2">
      {/* DEMOGRAPHIC INFO */}
      <Section title="Demographic Info">
        <UploadItem title="CNIC / National ID" />
        <UploadItem title="Date of Birth Proof" />
        <UploadItem title="Address Verification" />
      </Section>

      {/* PROFESSIONAL INFO */}
      <Section title="Professional Info">
        <UploadItem title="Resume / CV" />
        <UploadItem title="Experience Letter" />
        <UploadItem title="Education Certificates" />
      </Section>

      {/* SUPPORTING DOCUMENTS */}
      <Section title="Supporting Documents">
        <UploadItem title="Identity Documents" />
        <UploadItem title="Credentials" />
        <UploadItem title="Legal Documents" />
        <UploadItem title="Payment Proof" />
      </Section>

      {/* CONFIRMATION */}
      <div className="mt-4 space-y-3 text-md font-semibold px-3 text-gray-700">
        <label className="flex gap-2">
          <input
            type="checkbox"
            className="
    h-5 w-5
    appearance-none
    rounded-sm
    border-2 border-primary-color
    bg-white
    cursor-pointer
    checked:bg-primary-color
    checked:border-primary-color
    checked:before:content-['✓']
    checked:before:text-white
    checked:before:flex
    checked:before:items-center
    checked:before:justify-center
  "
          />
          <span>"I confirm the information provided is accurate"</span>
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            className="
    h-5 w-5
    appearance-none
    rounded-sm
    border-2 border-primary-color
    bg-white
    cursor-pointer
    checked:bg-primary-color
    checked:border-primary-color
    checked:before:content-['✓']
    checked:before:text-white
    checked:before:flex
    checked:before:items-center
    checked:before:justify-center
  "
          />

          <span>
            “I consent to the processing of my personal data for verification"
          </span>
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            className="
    h-5 w-5
    appearance-none
    rounded-sm
    border-2 border-primary-color
    bg-white
    cursor-pointer
    checked:bg-primary-color
    checked:border-primary-color
    checked:before:content-['✓']
    checked:before:text-white
    checked:before:flex
    checked:before:items-center
    checked:before:justify-center
  "
          />
          <span>
            "By submitting, you consent to secure processing under GDPR & HDS
            standards."
          </span>
        </label>
        <label className="flex gap-2">
          <input
            type="checkbox"
            className="
    h-5 w-5
    appearance-none
    rounded-sm
    border-2 border-primary-color
    bg-white
    cursor-pointer
    checked:bg-primary-color
    checked:border-primary-color
    checked:before:content-['✓']
    checked:before:text-white
    checked:before:flex
    checked:before:items-center
    checked:before:justify-center
  "
          />
          <span>
            "By submitting, you consent to the processing of your data for
            professional verification purposes. <br /> Your information is
            securely handled under GDPR and HDS standards."
          </span>
        </label>
      </div>
    </div>
  );
};

export default VerificationSummary;
