// "use client";
// import React, { useState } from "react";
// import ModalWrapper from "@/components/shared/modal";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";

// interface SimpleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (title: string, description: string) => void;
// }

// const addModal: React.FC<SimpleModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
// }) => {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !desc) return;
//     onSave(title, desc);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWrapper title="New Message" onClose={onClose} isOpen={isOpen}>
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">

//         {/* Input */}
//         <div>
//           <Typography className="pb-2 font-semibold">Name</Typography>
//           <input
//             type="text"
//             className="px-3 py-3 w-full bg-white rounded outline-none"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div>
//           <Typography className="pb-2 font-semibold">Function</Typography>
//           <input
//             type="text"
//             className="px-3 py-3 w-full bg-white rounded outline-none"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <Typography className="pb-2 font-semibold">Phone</Typography>
//           <input
//             type="text"
//             className="px-3 py-3 w-full bg-white rounded outline-none"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <Typography className="pb-2 font-semibold">Email</Typography>
//           <input
//             type="text"
//             className="px-3 py-3 w-full bg-white rounded outline-none"
//             placeholder="Enter title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         {/* Textarea */}
//         {/* <div>
//           <Typography className="pb-2 font-semibold">Description</Typography>
//           <textarea
//             className="px-3 py-3 w-full bg-white rounded outline-none h-32 resize-none"
//             placeholder="Write something..."
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//         </div> */}

//         {/* Buttons */}
//         <div className="flex gap-2 pt-4">
//           <Button
//             variant="outlined"
//             className="w-full text-secondary-color"
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" className="w-full bg-primary-color rounded-xl text-white">
//             Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default addModal;
// "use client";
// import React, { useState } from "react";
// import ModalWrapper from "@/components/shared/modal";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";

// interface ContactData {
//   name: string;
//   function: string;
//   phone: string;
//   email: string;
// }

// interface AddContactModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (contactData: ContactData) => void;
// }

// const AddContactModal: React.FC<AddContactModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
// }) => {
//   // Separate states for each field
//   const [name, setName] = useState("");
//   const [functionRole, setFunctionRole] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   const functions = [
//     "Manager",
//     "Developer",
//     "Designer",
//     "Sales Representative",
//     "HR Manager",
//     "Marketing Specialist",
//     "CEO",
//     "CTO",
//     "Other"
//   ];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!name || !functionRole || !phone || !email) {
//       alert("Please fill all fields");
//       return;
//     }

//     // Save contact data
//     onSave({
//       name,
//       function: functionRole,
//       phone,
//       email,
//     });

//     // Reset all states
//     setName("");
//     setFunctionRole("");
//     setPhone("");
//     setEmail("");

//     onClose();
//   };

//   const handleClose = () => {
//     // Reset states when closing
//     setName("");
//     setFunctionRole("");
//     setPhone("");
//     setEmail("");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWrapper title="Add Contact" onClose={handleClose} isOpen={isOpen}>
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">

//         {/* Name Input */}
//         <div>
//           <Typography className="pb-2 font-semibold">Name</Typography>
//           <input
//             type="text"
//             className="px-3 py-3 w-full bg-white rounded outline-none border border-gray-200 focus:border-blue-500"
//             placeholder="e.g Bob Pharmacy"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         {/* Function Dropdown */}
//         <div>
//           <Typography className="pb-2 font-semibold">Function</Typography>
//           <div className="relative">
//             <select
//               className="px-3 py-3 w-full bg-white rounded outline-none border border-gray-200 focus:border-blue-500 appearance-none cursor-pointer"
//               value={functionRole}
//               onChange={(e) => setFunctionRole(e.target.value)}
//             >
//               <option value="" disabled>
//                 Select Function
//               </option>
//               {functions.map((func, index) => (
//                 <option key={index} value={func}>
//                   {func}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Phone Input */}
//         <div>
//           <Typography className="pb-2 font-semibold">Phone</Typography>
//           <input
//             type="tel"
//             className="px-3 py-3 w-full bg-white rounded outline-none border border-gray-200 focus:border-blue-500"
//             placeholder="03121234567"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>

//         {/* Email Input */}
//         <div>
//           <Typography className="pb-2 font-semibold">Email</Typography>
//           <input
//             type="email"
//             className="px-3 py-3 w-full bg-white rounded outline-none border border-gray-200 focus:border-blue-500"
//             placeholder="bob@mail.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2 pt-4">
//           <Button
//             variant="outlined"
//             className="w-full text-secondary-color"
//             onClick={handleClose}
//             type="button"
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             className="w-full bg-primary-color rounded-xl text-white"
//           >
//             Add Contact
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default AddContactModal;
"use client";
import React, { useState, useEffect } from "react";
import ModalWrapper from "@/components/shared/modal";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

interface ContactData {
  name: string;
  function: string;
  phone: string;
  email: string;
}

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contactData: ContactData) => void;
  mode: "add" | "edit"; // 👈 Mode prop
  initialData?: ContactData; // 👈 Edit ke liye initial data
}

const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  onSave,
  mode = "add",
  initialData,
}) => {
  // Separate states for each field
  const [name, setName] = useState("");
  const [functionRole, setFunctionRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const functions = [
    "Manager",
    "Developer",
    "Designer",
    "Sales Representative",
    "HR Manager",
    "Marketing Specialist",
    "CEO",
    "CTO",
    "Other",
  ];

  // 👇 Edit mode me data pre-fill karne ke liye
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name);
      setFunctionRole(initialData.function);
      setPhone(initialData.phone);
      setEmail(initialData.email);
    } else {
      // Add mode me reset
      setName("");
      setFunctionRole("");
      setPhone("");
      setEmail("");
    }
  }, [mode, initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !functionRole || !phone || !email) {
      alert("Please fill all fields");
      return;
    }

    // Save contact data
    onSave({
      name,
      function: functionRole,
      phone,
      email,
    });

    // Reset all states
    setName("");
    setFunctionRole("");
    setPhone("");
    setEmail("");

    onClose();
  };

  const handleClose = () => {
    // Reset states when closing
    setName("");
    setFunctionRole("");
    setPhone("");
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      title={mode === "add" ? "Add Contact" : "Edit Contact"} // 👈 Dynamic title
      onClose={handleClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        {/* Name Input */}
        <div>
          <Typography className="pb-2 font-semibold">Name</Typography>
          <input
            type="text"
            className="px-3 py-3 w-full bg-white rounded outline-none focus:border-blue-500"
            placeholder="e.g Bob Pharmacy"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Function Dropdown */}
        <div>
          <Typography className="pb-2 font-semibold">Function</Typography>
          <div className="relative">
            <select
              className="px-3 py-3 w-full bg-white rounded outline-none  focus:border-blue-500 appearance-none cursor-pointer"
              value={functionRole}
              onChange={(e) => setFunctionRole(e.target.value)}
            >
              <option value="" disabled>
                Select Function
              </option>
              {functions.map((func, index) => (
                <option key={index} value={func}>
                  {func}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <Typography className="pb-2 font-semibold">Phone</Typography>
          <input
            type="number"
            className="px-3 py-3 w-full bg-white rounded outline-none  focus:border-blue-500"
            placeholder="03121234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div>
          <Typography className="pb-2 font-semibold">Email</Typography>
          <input
            type="email"
            className="px-3 py-3 w-full bg-white rounded outline-none focus:border-blue-500"
            placeholder="bob@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outlined"
            className="w-full text-secondary-color"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full bg-primary-color rounded-xl text-white"
          >
            {mode === "add" ? "Add Contact" : "Save Changes"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddContactModal;
// import React, { useState } from 'react';

// export default function AddContactDemo() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//       >
//         Open Add Contact Modal
//       </button>

//       <AddContactModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={(data) => {
//           console.log('Contact saved:', data);
//           alert(`Contact added: ${data.name}`);
//         }}
//       />
//     </div>
//   );
// }

// interface ContactData {
//   name: string;
//   function: string;
//   phone: string;
//   email: string;
// }

// interface AddContactModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: ContactData) => void;
// }

// const AddContactModal: React.FC<AddContactModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
// }) => {
//   const [name, setName] = useState('');
//   const [functionRole, setFunctionRole] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');

//   const functions = [
//     'Manager',
//     'Developer',
//     'Designer',
//     'Sales Representative',
//     'HR Manager',
//     'Marketing Specialist',
//     'CEO',
//     'CTO',
//     'Other'
//   ];

//   const handleSubmit = () => {
//     if (!name || !functionRole || !phone || !email) {
//       alert('Please fill all fields');
//       return;
//     }

//     onSave({
//       name,
//       function: functionRole,
//       phone,
//       email,
//     });

//     // Reset
//     setName('');
//     setFunctionRole('');
//     setPhone('');
//     setEmail('');
//     onClose();
//   };

//   const handleClose = () => {
//     setName('');
//     setFunctionRole('');
//     setPhone('');
//     setEmail('');
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={handleClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Add Contact</h2>
//           <button
//             onClick={handleClose}
//             className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="px-6 py-5 space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
//               placeholder="e.g Bob Pharmacy"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           {/* Function */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Function
//             </label>
//             <div className="relative">
//               <select
//                 className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 appearance-none cursor-pointer"
//                 value={functionRole}
//                 onChange={(e) => setFunctionRole(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Manage Center
//                 </option>
//                 {functions.map((func, index) => (
//                   <option key={index} value={func}>
//                     {func}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                 <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone
//             </label>
//             <input
//               type="tel"
//               className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
//               placeholder="03121234567"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
//               placeholder="bob@mail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               onClick={handleClose}
//               className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
//             >
//               Add Contact
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
