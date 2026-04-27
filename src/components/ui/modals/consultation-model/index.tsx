// 'use client';
// import React, { useState, useEffect } from 'react';

// type PackFormProps = {
//   mode: 'create' | 'edit';
//   initialData?: {
//     packName: string;
//     description: string;
//     numberOfConsultations: number;
//     price: number;
//     validityDuration: string;
//     consultationType: string;
//     specialty: string[];
//     renewalType: string;
//     visibility: string;
//     status: string;
//   };
//   onSubmit: (data: any) => void;
// };

// const PackForm: React.FC<PackFormProps> = ({ mode, initialData, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     packName: '',
//     description: '',
//     numberOfConsultations: 1,
//     price: 0,
//     validityDuration: '30 days',
//     consultationType: 'In-person',
//     specialty: [] as string[],
//     renewalType: 'Manual',
//     visibility: 'Public',
//     status: 'Draft',
//   });

//   useEffect(() => {
//     if (mode === 'edit' && initialData) {
//       setFormData(initialData);
//     }
//   }, [mode, initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, type } = e.target;

//     if (type === 'checkbox') {
//       const target = e.target as HTMLInputElement; // Type assertion for checkbox
//       const { value, checked } = target;

//       setFormData((prev) => {
//         let updatedSpecialty = [...prev.specialty];
//         if (checked) updatedSpecialty.push(value);
//         else updatedSpecialty = updatedSpecialty.filter((s) => s !== value);
//         return { ...prev, specialty: updatedSpecialty };
//       });
//     } else {
//       const value = e.target.value;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Pack Name */}
//       <div>
//         <label>Pack Name</label>
//         <input
//           type="text"
//           name="packName"
//           value={formData.packName}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label>Description</label>
//         <input
//           type="text"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {/* Number of Consultations & Price */}
//       <div className="flex gap-4">
//         <div>
//           <label>Number of Consultations</label>
//           <input
//             type="number"
//             name="numberOfConsultations"
//             value={formData.numberOfConsultations}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label>Price</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>
//       </div>

//       {/* Validity Duration & Consultation Type */}
//       <div className="flex gap-4">
//         <div>
//           <label>Validity Duration</label>
//           <input
//             type="text"
//             name="validityDuration"
//             value={formData.validityDuration}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label>Consultation Type</label>
//           <select
//             name="consultationType"
//             value={formData.consultationType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="In-person">In-person</option>
//             <option value="Online">Online</option>
//           </select>
//         </div>
//       </div>

//       {/* Specialty */}
//       <div>
//         <label>Specialty</label>
//         <div className="flex gap-4">
//           {['Dermatology', 'Neurology', 'Psychology'].map((spec) => (
//             <label key={spec} className="flex items-center gap-1">
//               <input
//                 type="checkbox"
//                 name="specialty"
//                 value={spec}
//                 checked={formData.specialty.includes(spec)}
//                 onChange={handleChange}
//               />
//               {spec}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Renewal Type, Visibility, Status */}
//       <div className="flex gap-4">
//         <div>
//           <label>Renewal Type</label>
//           <select
//             name="renewalType"
//             value={formData.renewalType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Manual">Manual</option>
//             <option value="Automatic">Automatic</option>
//           </select>
//         </div>

//         <div>
//           <label>Visibility</label>
//           <select
//             name="visibility"
//             value={formData.visibility}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Public">Public</option>
//             <option value="Private">Private</option>
//           </select>
//         </div>

//         <div>
//           <label>Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="Draft">Draft</option>
//             <option value="Active">Active</option>
//           </select>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-4">
//         <button
//           type="button"
//           className="text-gray-500"
//           onClick={() => console.log('Cancelled')}
//         >
//           Cancel
//         </button>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {mode === 'create' ? 'Add Pack' : 'Update Pack'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default PackForm;
// import React, { useState } from 'react';

// export default function ParkManagement() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
//   const [formData, setFormData] = useState({
//     parkName: '',
//     description: '',
//     consultations: '',
//     price: '',
//     validityDuration: '30 Days',
//     consultationType: 'Inperson',
//     specialties: {
//       general: false,
//       dermatology: false,
//       pediatric: false
//     },
//     renewalType: 'Manual',
//     validity: '',
//     status: 'Draft'
//   });

//   // Sample data for table
//   const [parks, setParks] = useState([
//     { id: 1, name: 'Health Consultation Pack', consultations: 30, price: '999', status: 'Active' },
//     { id: 2, name: 'Basic Care Pack', consultations: 15, price: '499', status: 'Draft' }
//   ]);

//   const openAddModal = () => {
//     setModalMode('add');
//     setFormData({
//       parkName: '',
//       description: '',
//       consultations: '',
//       price: '',
//       validityDuration: '30 Days',
//       consultationType: 'Inperson',
//       specialties: { general: false, dermatology: false, pediatric: false },
//       renewalType: 'Manual',
//       validity: '',
//       status: 'Draft'
//     });
//     setIsModalOpen(true);
//   };

//   const openEditModal = (park:any) => {
//     setModalMode('edit');
//     setFormData({
//       parkName: park.name,
//       description: '',
//       consultations: park.consultations.toString(),
//       price: park.price,
//       validityDuration: '30 Days',
//       consultationType: 'Inperson',
//       specialties: { general: true, dermatology: false, pediatric: false },
//       renewalType: 'Manual',
//       validity: '',
//       status: park.status
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleInputChange = (e:any) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (specialty: 'general' | 'dermatology' | 'pediatric') => {
//     setFormData(prev => ({
//       ...prev,
//       specialties: {
//         ...prev.specialties,
//         [specialty]: !prev.specialties[specialty]
//       }
//     }));
//   };

//   const handleSubmit = () => {
//     if (modalMode === 'add') {
//       console.log('Adding new park:', formData);
//       // Add logic here
//     } else {
//       console.log('Editing park:', formData);
//       // Edit logic here
//     }
//     closeModal();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Park Management</h1>
//           <button
//             onClick={openAddModal}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
//           >
//             + Add Park
//           </button>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Consultations</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {parks.map(park => (
//                 <tr key={park.id}>
//                   <td className="px-6 py-4 text-sm text-gray-900">{park.name}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{park.consultations}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">${park.price}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                       park.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {park.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => openEditModal(park)}
//                       className="text-blue-600 hover:text-blue-800 font-medium text-sm"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               {/* Modal Header */}
//               <div className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-white">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {modalMode === 'add' ? 'Add New Park' : 'Edit Park'}
//                 </h2>
//                 <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="px-6 py-4">
//                 {/* General Information */}
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-700 mb-3">General Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Park Name</label>
//                       <input
//                         type="text"
//                         name="parkName"
//                         value={formData.parkName}
//                         onChange={handleInputChange}
//                         placeholder="Health Consultation Pack"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                       <input
//                         type="text"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         placeholder="Health Consultation Pack"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pricing & Quantity */}
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Pricing & Quantity</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Number of Consultations</label>
//                       <input
//                         type="number"
//                         name="consultations"
//                         value={formData.consultations}
//                         onChange={handleInputChange}
//                         placeholder="30"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         placeholder="999"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Validity Duration</label>
//                       <select
//                         name="validityDuration"
//                         value={formData.validityDuration}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option>30 Days</option>
//                         <option>60 Days</option>
//                         <option>90 Days</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
//                       <select
//                         name="consultationType"
//                         value={formData.consultationType}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option>Inperson</option>
//                         <option>Online</option>
//                         <option>Both</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Specialty & Settings */}
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Specialty & Settings</h3>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
//                     <div className="space-y-2">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.specialties.general}
//                           onChange={() => handleCheckboxChange('general')}
//                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">General</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.specialties.dermatology}
//                           onChange={() => handleCheckboxChange('dermatology')}
//                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Dermatology</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={formData.specialties.pediatric}
//                           onChange={() => handleCheckboxChange('pediatric')}
//                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">Pediatric</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Type</label>
//                       <select
//                         name="renewalType"
//                         value={formData.renewalType}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option>Manual</option>
//                         <option>Automatic</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Validity</label>
//                       <select
//                         name="validity"
//                         value={formData.validity}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Select</option>
//                         <option>30 Days</option>
//                         <option>60 Days</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option>Draft</option>
//                       <option>Active</option>
//                       <option>Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="border-t px-6 py-4 flex justify-between items-center bg-gray-50">
//                 <button
//                   onClick={closeModal}
//                   className="text-blue-600 hover:text-blue-800 font-medium text-sm"
//                 >
//                   Save as Draft
//                 </button>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
//                   >
//                     {modalMode === 'add' ? 'Add' : 'Update'} Park
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";
// import { ConsultationType } from "@/types/dashboard";

// interface ConsultationPackModalProps {
//   isOpen: boolean;
//   mode: 'add' | 'edit';
//   selectedPack?: ConsultationType | null;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }

// const ConsultationPackModal: React.FC<ConsultationPackModalProps> = ({
//   isOpen,
//   mode,
//   selectedPack,
//   onClose,
//   onSubmit
// }) => {
//   const [formData, setFormData] = useState({
//     packName: '',
//     description: '',
//     consultations: '',
//     price: '',
//     validityDuration: '30 Days',
//     consultationType: 'Inperson',
//     specialties: {
//       general: false,
//       dermatology: false,
//       pediatric: false
//     },
//     renewalType: 'Manual',
//     validity: '',
//     status: 'Draft'
//   });

//   useEffect(() => {
//     if (mode === 'edit' && selectedPack) {
//       setFormData({
//         packName: selectedPack.Name || '',
//         description: '',
//         consultations: selectedPack.Qty?.toString() || '',
//         price: selectedPack.Price || '',
//         validityDuration: selectedPack.Period || '30 Days',
//         consultationType: selectedPack.consultationType || 'Inperson',
//         specialties: { general: true, dermatology: false, pediatric: false },
//         renewalType: selectedPack.Renewal || 'Manual',
//         validity: selectedPack.Period || '',
//         status: selectedPack.Status || 'Draft'
//       });
//     } else {
//       setFormData({
//         packName: '',
//         description: '',
//         consultations: '',
//         price: '',
//         validityDuration: '30 Days',
//         consultationType: 'Inperson',
//         specialties: { general: false, dermatology: false, pediatric: false },
//         renewalType: 'Manual',
//         validity: '',
//         status: 'Draft'
//       });
//     }
//   }, [mode, selectedPack]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (specialty: 'general' | 'dermatology' | 'pediatric') => {
//     setFormData(prev => ({
//       ...prev,
//       specialties: {
//         ...prev.specialties,
//         [specialty]: !prev.specialties[specialty]
//       }
//     }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Modal Header */}
//         <div className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
//           <Typography size="h4" as="h4" className="font-semibold">
//             {mode === 'add' ? 'Add New Pack' : 'Edit Pack'}
//           </Typography>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <Icon icon="mdi:close" width="24" height="24" />
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="px-6 py-4">
//           {/* General Information */}
//           <div className="mb-6">
//             <Typography size="sm" className="font-semibold text-gray-700 mb-3">
//               General Information
//             </Typography>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Pack Name</label>
//                 <input
//                   type="text"
//                   name="packName"
//                   value={formData.packName}
//                   onChange={handleInputChange}
//                   placeholder="Health Consultation Pack"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Health Consultation Pack"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pricing & Quantity */}
//           <div className="mb-6">
//             <Typography size="sm" className="font-semibold text-gray-700 mb-3">
//               Pricing & Quantity
//             </Typography>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Number of Consultations</label>
//                 <input
//                   type="number"
//                   name="consultations"
//                   value={formData.consultations}
//                   onChange={handleInputChange}
//                   placeholder="30"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   placeholder="999"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Validity Duration</label>
//                 <select
//                   name="validityDuration"
//                   value={formData.validityDuration}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 >
//                   <option>30 Days</option>
//                   <option>60 Days</option>
//                   <option>90 Days</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
//                 <select
//                   name="consultationType"
//                   value={formData.consultationType}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 >
//                   <option>Inperson</option>
//                   <option>Online</option>
//                   <option>Both</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Specialty & Settings */}
//           <div className="mb-6">
//             <Typography size="sm" className="font-semibold text-gray-700 mb-3">
//               Specialty & Settings
//             </Typography>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
//               <div className="space-y-2">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={formData.specialties.general}
//                     onChange={() => handleCheckboxChange('general')}
//                     className="w-4 h-4 text-primary-color border-gray-300 rounded focus:ring-primary-color"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">General</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={formData.specialties.dermatology}
//                     onChange={() => handleCheckboxChange('dermatology')}
//                     className="w-4 h-4 text-primary-color border-gray-300 rounded focus:ring-primary-color"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">Dermatology</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={formData.specialties.pediatric}
//                     onChange={() => handleCheckboxChange('pediatric')}
//                     className="w-4 h-4 text-primary-color border-gray-300 rounded focus:ring-primary-color"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">Pediatric</span>
//                 </label>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Type</label>
//                 <select
//                   name="renewalType"
//                   value={formData.renewalType}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 >
//                   <option>Manual</option>
//                   <option>Automatic</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Validity</label>
//                 <select
//                   name="validity"
//                   value={formData.validity}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//                 >
//                   <option value="">Select</option>
//                   <option>30 Days</option>
//                   <option>60 Days</option>
//                 </select>
//               </div>
//             </div>

//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent"
//               >
//                 <option>Draft</option>
//                 <option>Active</option>
//                 <option>Inactive</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Modal Footer */}
//         <div className="border-t px-6 py-4 flex justify-between items-center bg-gray-50">
//           <button
//             onClick={onClose}
//             className="text-primary-color hover:text-primary-color/80 font-medium text-sm"
//           >
//             Save as Draft
//           </button>
//           <div className="flex gap-3">
//             <Button
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium bg-white"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-primary-color hover:bg-primary-color/90 text-white rounded-lg font-medium"
//             >
//               {mode === 'add' ? 'Add' : 'Update'} Pack
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsultationPackModal;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// interface EditFaqProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (question: string, answer: string, status: string,Consultations:string,Type: string,Price: string,Duration: string,Renewal:string,Visibility: string) => void;
//   title?: string;
//   initialQuestion?: string;
//   initialAnswer?: string;
//   initialStatus?: string;
//   initialPrice?:string;
//   initialConsultations?:string;
//   initialDuration?: string;
//   initialType?:string;
//   initialRenewal?: string;
//   initialVisibility?: string;
// }

// const ConsultationPackModal: React.FC<EditFaqProps> = ({
//   onClose,
//   isOpen,
//   title,
//   onSave,
//   initialQuestion = "",
//   initialAnswer = "",
//   initialStatus = "Active",
//   initialConsultations="",
//   initialPrice='',
//   initialDuration="",
//   initialType="",
//   initialRenewal="",
//   initialVisibility="",
// }) => {
//   const [question, setQuestion] = useState(initialQuestion);
//   const [Consultations, setConsultations] = useState(initialConsultations);
//   const [Price, setPrice] = useState(initialPrice);
//   const [Duration, setDuration] = useState(initialDuration);
//   const [Type, setType] = useState(initialType);
//   const [answer, setAnswer] = useState(initialAnswer);
//   const [status, setStatus] = useState(initialStatus);
//   const [Renewal, setRenewal] = useState(initialRenewal);
//   const [Visibility, setVisibility] = useState(initialVisibility);
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [TypeOpen, setTypeOpen] = useState(false);
//   const [RenewalOpen, setRenewalOpen] = useState(false);
//   const [VisibilityOpen, setVisibilityOpen] = useState(false);

//   useEffect(() => {
//     setQuestion(initialQuestion);
//     setConsultations(initialConsultations)
//     setPrice(initialPrice);
//     setDuration(initialDuration);
//     setType(initialType),
//     setAnswer(initialAnswer);
//     setStatus(initialStatus);
//     setRenewal(initialRenewal);
//     setVisibility(initialVisibility);
//   }, [initialQuestion, initialAnswer, initialStatus,initialConsultations,initialPrice,initialType,initialRenewal,initialVisibility]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!question.trim() || !answer.trim() || !Consultations.trim() || !Price.trim() || !Type.trim() || !Renewal.trim() || !Visibility.trim()) return;
//     onSave(question, answer, status,Type, Price,Consultations,initialRenewal,initialVisibility);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWrapper
//       title={title}
//       titleStyling="text-left"
//       onClose={onClose}
//       isOpen={isOpen}
//     >
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">
//         {/* Question */}
//         <div>
//           <Typography className="pb-2  font-semibold">
//             Pack Name
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter your question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>

//         {/* Status Dropdown */}
//         {/* <div>
//           <Typography className="pb-2 font-semibold">
//             Status
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
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setStatus("Active");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Inactive");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Inactive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div> */}

//         {/* Answer */}
//         <div>
//           <Typography className="pb-2 font-semibold">
//             Description
//           </Typography>
//           <textarea
//             className="px-3 py-4 bg-white outline-none w-full rounded resize-none font-semibold placeholder:text-dark-gray"
//             placeholder="Enter your answer"
//             rows={4}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//         </div>

//         <div>
//           <Typography className="pb-2  font-semibold">
//             Number of Consultations
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter your question"
//             value={Consultations}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>
//         <div>
//           <Typography className="pb-2  font-semibold">
//             Price
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter your question"
//             value={Price}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>
//         <div>
//           <Typography className="pb-2  font-semibold">
//             Validity Duration
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter your question"
//             value={Duration}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>

//          <div>
//           <Typography className="pb-2 font-semibold">
//             Consultation Type
//           </Typography>
//           <div className="relative">
//             <div
//               className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//               onClick={() => setTypeOpen(!TypeOpen)}
//             >
//               <span>{Type}</span>
//               <Icon
//                 icon="uim:angle-down"
//                 width="24"
//                 height="24"
//                 className={`transition-transform ${
//                   TypeOpen
//                     ? "rotate-180 text-secondary-color"
//                     : "text-secondary-color"
//                 }`}
//               />
//             </div>
//             {TypeOpen && (
//               <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setType("Active");
//                     setTypeOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setType("Inactive");
//                     setTypeOpen(false);
//                   }}
//                 >
//                   Inactive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//             <div>
//           <Typography className="pb-2 font-semibold">
//             Renewal Type
//           </Typography>
//           <div className="relative">
//             <div
//               className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//               onClick={() => setRenewalOpen(!RenewalOpen)}
//             >
//               <span>{Renewal}</span>
//               <Icon
//                 icon="uim:angle-down"
//                 width="24"
//                 height="24"
//                 className={`transition-transform ${
//                   RenewalOpen
//                     ? "rotate-180 text-secondary-color"
//                     : "text-secondary-color"
//                 }`}
//               />
//             </div>
//             {RenewalOpen && (
//               <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setRenewal("Active");
//                     setRenewalOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setRenewal("Inactive");
//                     setRenewalOpen(false);
//                   }}
//                 >
//                   Inactive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//          <div>
//           <Typography className="pb-2 font-semibold">
//             Visibility
//           </Typography>
//           <div className="relative">
//             <div
//               className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//               onClick={() => setVisibilityOpen(!VisibilityOpen)}
//             >
//               <span>{Visibility}</span>
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
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setVisibility("Active");
//                     setVisibilityOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setVisibility("Inactive");
//                     setVisibilityOpen(false);
//                   }}
//                 >
//                   Inactive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//          <div>
//           <Typography className="pb-2 font-semibold">
//             Status
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
//                   className="px-3 py-2 hover:bg-light-gray text-secondary-color cursor-pointer"
//                   onClick={() => {
//                     setStatus("Active");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Active
//                 </div>
//                 <div
//                   className="px-3 py-2 hover:bg-light-gray text-dark-gray cursor-pointer"
//                   onClick={() => {
//                     setStatus("Inactive");
//                     setStatusOpen(false);
//                   }}
//                 >
//                   Inactive
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
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
//             // variant="primary"
//             size="medium"
//             className="w-full bg-primary-color rounded-xl text-white"
//           >
//             Update & Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default ConsultationPackModal;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/shared/button";
// import ModalWrapper from "@/components/shared/modal";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";

// interface EditFaqProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (
//     question: string,
//     answer: string,
//     status: string,
//     Consultations: string,
//     Type: string,
//     Price: string,
//     Duration: string,
//     Renewal: string,
//     Visibility: string
//   ) => void;
//   title?: string;

//   initialQuestion?: string;
//   initialAnswer?: string;
//   initialStatus?: string;
//   initialConsultations?: string;
//   initialPrice?: string;
//   initialDuration?: string;
//   initialType?: string;
//   initialRenewal?: string;
//   initialVisibility?: string;
// }

// const ConsultationPackModal: React.FC<EditFaqProps> = ({
//   onClose,
//   isOpen,
//   title,
//   onSave,

//   initialQuestion = "",
//   initialAnswer = "",
//   initialStatus = "Active",
//   initialConsultations = "",
//   initialPrice = "",
//   initialDuration = "",
//   initialType = "",
//   initialRenewal = "",
//   initialVisibility = "",
// }) => {
//   const [question, setQuestion] = useState(initialQuestion);
//   const [answer, setAnswer] = useState(initialAnswer);
//   const [status, setStatus] = useState(initialStatus);
//   const [Consultations, setConsultations] = useState(initialConsultations);
//   const [Price, setPrice] = useState(initialPrice);
//   const [Duration, setDuration] = useState(initialDuration);
//   const [Type, setType] = useState(initialType);
//   const [Renewal, setRenewal] = useState(initialRenewal);
//   const [Visibility, setVisibility] = useState(initialVisibility);

//   const [statusOpen, setStatusOpen] = useState(false);
//   const [TypeOpen, setTypeOpen] = useState(false);
//   const [RenewalOpen, setRenewalOpen] = useState(false);
//   const [VisibilityOpen, setVisibilityOpen] = useState(false);

//   useEffect(() => {
//     setQuestion(initialQuestion);
//     setConsultations(initialConsultations);
//     setPrice(initialPrice);
//     setDuration(initialDuration);
//     setType(initialType);
//     setAnswer(initialAnswer);
//     setStatus(initialStatus);
//     setRenewal(initialRenewal);
//     setVisibility(initialVisibility);
//   }, [
//     initialQuestion,
//     initialAnswer,
//     initialStatus,
//     initialConsultations,
//     initialPrice,
//     initialDuration,
//     initialType,
//     initialRenewal,
//     initialVisibility,
//   ]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !question.trim() ||
//       !answer.trim() ||
//       !Consultations.trim() ||
//       !Price.trim() ||
//       !Duration.trim() ||
//       !Type.trim() ||
//       !Renewal.trim() ||
//       !Visibility.trim()
//     )
//       return;

//     onSave(
//       question,
//       answer,
//       status,
//       Consultations,
//       Type,
//       Price,
//       Duration,
//       Renewal,
//       Visibility
//     );

//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalWrapper
//       title={title}
//       titleStyling="text-left"
//       onClose={onClose}
//       isOpen={isOpen}
//     >
//       <form onSubmit={handleSubmit} className="space-y-5 pt-3">
//         {/* Pack Name */}
//         <div>
//           <Typography className="pb-2 font-semibold">Pack Name</Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             placeholder="Enter pack name"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <Typography className="pb-2 font-semibold">Description</Typography>
//           <textarea
//             className="px-3 py-4 bg-white outline-none w-full rounded resize-none font-semibold placeholder:text-dark-gray"
//             placeholder="Enter description"
//             rows={4}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//         </div>

//         {/* Number of Consultations */}
//         <div>
//           <Typography className="pb-2 font-semibold">
//             Number of Consultations
//           </Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             value={Consultations}
//             onChange={(e) => setConsultations(e.target.value)}
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <Typography className="pb-2 font-semibold">Price</Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             value={Price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>

//         {/* Duration */}
//         <div>
//           <Typography className="pb-2 font-semibold">Validity Duration</Typography>
//           <input
//             type="text"
//             className="px-3 py-4 bg-white outline-none w-full rounded"
//             value={Duration}
//             onChange={(e) => setDuration(e.target.value)}
//           />
//         </div>

//         {/* Consultation Type */}
//         <Dropdown
//           label="Consultation Type"
//           isOpen={TypeOpen}
//           value={Type}
//           onToggle={() => setTypeOpen(!TypeOpen)}
//           onSelect={(v) => {
//             setType(v);
//             setTypeOpen(false);
//           }}
//         />

//         {/* Renewal Type */}
//         <Dropdown
//           label="Renewal Type"
//           isOpen={RenewalOpen}
//           value={Renewal}
//           onToggle={() => setRenewalOpen(!RenewalOpen)}
//           onSelect={(v) => {
//             setRenewal(v);
//             setRenewalOpen(false);
//           }}
//         />

//         {/* Visibility */}
//         <Dropdown
//           label="Visibility"
//           isOpen={VisibilityOpen}
//           value={Visibility}
//           onToggle={() => setVisibilityOpen(!VisibilityOpen)}
//           onSelect={(v) => {
//             setVisibility(v);
//             setVisibilityOpen(false);
//           }}
//         />

//         {/* Status */}
//         <Dropdown
//           label="Status"
//           isOpen={statusOpen}
//           value={status}
//           onToggle={() => setStatusOpen(!statusOpen)}
//           onSelect={(v) => {
//             setStatus(v);
//             setStatusOpen(false);
//           }}
//         />

//         {/* BUTTONS */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
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
//             Update & Save
//           </Button>
//         </div>
//       </form>
//     </ModalWrapper>
//   );
// };

// export default ConsultationPackModal;

// /* ---------------------------
//    Small Reusable Dropdown Component
// --------------------------- */
// const Dropdown = ({
//   label,
//   isOpen,
//   value,
//   onToggle,
//   onSelect,
// }: {
//   label: string;
//   isOpen: boolean;
//   value: string;
//   onToggle: () => void;
//   onSelect: (value: string) => void;
// }) => (
//   <div>
//     <Typography className="pb-2 font-semibold">{label}</Typography>

//     <div className="relative">
//       <div
//         className="px-3 py-4 bg-white outline-none w-full rounded cursor-pointer flex justify-between items-center"
//         onClick={onToggle}
//       >
//         <span>{value || "Select"}</span>
//         <Icon
//           icon="uim:angle-down"
//           width="24"
//           height="24"
//           className={`transition-transform ${
//             isOpen ? "rotate-180 text-secondary-color" : "text-secondary-color"
//           }`}
//         />
//       </div>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
//           <div
//             className="px-3 py-2 hover:bg-light-gray cursor-pointer"
//             onClick={() => onSelect("Active")}
//           >
//             Active
//           </div>
//           <div
//             className="px-3 py-2 hover:bg-light-gray cursor-pointer"
//             onClick={() => onSelect("Inactive")}
//           >
//             Inactive
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

/* ================== DROPDOWN OPTIONS ================== */
const CONSULTATION_TYPES = ["Online", "In-Person", "Chat"];
const RENEWAL_TYPES = ["Auto Renew", "Manual Renew", "No Renewal"];
const VISIBILITY_OPTIONS = ["Public", "Private", "Hidden"];
const STATUS_OPTIONS = ["Active", "Inactive"];

/* ================== PROPS ================== */
interface EditFaqProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    question: string,
    answer: string,
    status: string,
    Consultations: string,
    Type: string,
    Price: string,
    Duration: string,
    Renewal: string,
    Visibility: string,
  ) => void;
  title?: string;

  initialQuestion?: string;
  initialAnswer?: string;
  initialStatus?: string;
  initialConsultations?: string;
  initialPrice?: string;
  initialDuration?: string;
  initialType?: string;
  initialRenewal?: string;
  initialVisibility?: string;
}

/* ================== COMPONENT ================== */
const ConsultationPackModal: React.FC<EditFaqProps> = ({
  onClose,
  isOpen,
  title,
  onSave,
  initialQuestion = "",
  initialAnswer = "",
  initialStatus = "Active",
  initialConsultations = "",
  initialPrice = "",
  initialDuration = "",
  initialType = "",
  initialRenewal = "",
  initialVisibility = "",
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [status, setStatus] = useState(initialStatus);
  const [Consultations, setConsultations] = useState(initialConsultations);
  const [Price, setPrice] = useState(initialPrice);
  const [Duration, setDuration] = useState(initialDuration);
  const [Type, setType] = useState(initialType);
  const [Renewal, setRenewal] = useState(initialRenewal);
  const [Visibility, setVisibility] = useState(initialVisibility);

  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setQuestion(initialQuestion);
    setAnswer(initialAnswer);
    setStatus(initialStatus);
    setConsultations(initialConsultations);
    setPrice(initialPrice);
    setDuration(initialDuration);
    setType(initialType);
    setRenewal(initialRenewal);
    setVisibility(initialVisibility);
  }, [
    initialQuestion,
    initialAnswer,
    initialStatus,
    initialConsultations,
    initialPrice,
    initialDuration,
    initialType,
    initialRenewal,
    initialVisibility,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !question ||
      !answer ||
      !Consultations ||
      !Price ||
      !Duration ||
      !Type ||
      !Renewal ||
      !Visibility
    )
      return;

    onSave(
      question,
      answer,
      status,
      Consultations,
      Type,
      Price,
      Duration,
      Renewal,
      Visibility,
    );
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      title={title}
      titleStyling="text-left"
      onClose={onClose}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        <Input label="Pack Name" value={question} onChange={setQuestion} />
        <Textarea label="Specialty" value={answer} onChange={setAnswer} />
        <Input
          label="Number of Consultations"
          value={Consultations}
          onChange={setConsultations}
        />
        <Input label="Price" value={Price} onChange={setPrice} />
        <Input
          label="Validity Duration"
          value={Duration}
          onChange={setDuration}
        />

        <Dropdown
          label="Consultation Type"
          value={Type}
          isOpen={open === "type"}
          options={CONSULTATION_TYPES}
          onToggle={() => setOpen(open === "type" ? null : "type")}
          onSelect={(v: string) => {
            setType(v);
            setOpen(null);
          }}
        />
        <Dropdown
          label="Renewal Type"
          value={Renewal}
          isOpen={open === "renewal"}
          options={RENEWAL_TYPES}
          onToggle={() => setOpen(open === "renewal" ? null : "renewal")}
          onSelect={(v: string) => {
            setRenewal(v);
            setOpen(null);
          }}
        />
        <Dropdown
          label="Visibility"
          value={Visibility}
          isOpen={open === "visibility"}
          options={VISIBILITY_OPTIONS}
          onToggle={() => setOpen(open === "visibility" ? null : "visibility")}
          onSelect={(v: string) => {
            setVisibility(v);
            setOpen(null);
          }}
        />
        <Dropdown
          label="Status"
          value={status}
          isOpen={open === "status"}
          options={STATUS_OPTIONS}
          onToggle={() => setOpen(open === "status" ? null : "status")}
          onSelect={(v: string) => {
            setStatus(v);
            setOpen(null);
          }}
        />

        <div className="flex gap-3 pt-4">
          <Button variant="outlined" className="w-full" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full bg-primary-color text-white rounded-xl"
          >
            Update & Save
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ConsultationPackModal;

/* ---------------- SMALL COMPONENTS ---------------- */
const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <Typography className="pb-2 font-semibold">{label}</Typography>
    <input
      className="px-3 py-4 bg-white w-full rounded outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Textarea = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <Typography className="pb-2 font-semibold">{label}</Typography>
    <textarea
      rows={1}
      className="px-3 py-4 bg-white w-full rounded outline-none resize-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}
const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}) => (
  <div>
    <Typography className="pb-2 font-semibold">{label}</Typography>
    <div className="relative">
      <div
        className="px-3 py-4 bg-white rounded cursor-pointer flex justify-between items-center"
        onClick={onToggle}
      >
        <span>{value || "Select"}</span>
        <Icon icon="uim:angle-down" width="22" />
      </div>
      {isOpen && (
        <div className="absolute w-full bg-white rounded mt-1 shadow-[0_0_10px_rgba(0,0,0,0.12)] z-10">
          {options.map((o) => (
            <div
              key={o}
              className="px-3 py-2 hover:bg-light-gray cursor-pointer"
              onClick={() => onSelect(o)}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
