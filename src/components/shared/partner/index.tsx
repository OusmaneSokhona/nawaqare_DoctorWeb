// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState, useMemo } from "react";
// import type { InternalContacts, InternalContacts as InternalContactsType } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { internalContact, paymentTable } from "@/data";
// import { Icon } from "@iconify/react";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";

// const stats = [
//   {
//     icon: "tdesign:undertake-transaction-filled",
//     stat: "22",
//     title: "Total Transactions",
//   },
//   {
//     icon: "mdi:tick-circle",
//     stat: "2",
//     title: "Successful",
//   },
//   {
//     icon: "carbon:close-filled",
//     stat: "5",
//     title: "Refunded",
//   },
//   {
//     icon: "fluent:money-16-filled",
//     stat: "40%",
//     title: "Total Revenue",
//   },
//   {
//     icon: "gg:dollar",
//     stat: "$456",
//     title: "Platform Earnings",
//   },
// ];

// const InternalContacts = () => {
//   const router = useRouter();

//   // Filters
//   const [statusFilter, setStatusFilter] = useState("Status");
//   const [dateFilter, setDateFilter] = useState("Date");
//   const [patientFilter, setPatientFilter] = useState("Patient");
//   const [orderFilter, setOrderFilter] = useState("Order");

//   const [isStatusOpen, setIsStatusOpen] = useState(false);
//   const [isDateOpen, setIsDateOpen] = useState(false);
//   const [isPatientOpen, setIsPatientOpen] = useState(false);
//   const [isOrderOpen, setIsOrderOpen] = useState(false);

//   // Pagination
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ✅ Unique Patient & Order options for filters
// //   const uniquePatients = Array.from(new Set(paymentTable.rowsData.map((r) => r.Patient)));
// //   const uniqueOrders = Array.from(new Set(paymentTable.rowsData.map((r) => r.Order)));

//   // ✅ Filter logic (extended)
//   const filteredPatientData = useMemo(() => {
//     let filtered = [...internalContact.rowsData];
//     const now = new Date();

//     const parseDate = (dateStr: string) => {
//       const [day, month, year] = dateStr.split("/").map(Number);
//       return new Date(year, month - 1, day);
//     };

//     return filtered;
//   }, [statusFilter, dateFilter, patientFilter, orderFilter]);

//   // Pagination logic
//   const paginatedData = filteredPatientData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div className="px-8 py-10">
//       <div className="flex  items-center max-md:flex-col max-md:gap-3 justify-between">
//         <div>
//           <Typography size="h5" as="h5">
//             Internal Contacts
//           </Typography>

//         </div>
//         <Button className=" flex items-center justify-center rounded-xl bg-primary-color">
//           <Typography className="text-white">+ Add Contact</Typography>
//         </Button>
//       </div>

//       {/* ---------- Table ---------- */}
//       <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl">

//         {/* ---------- Table Data ---------- */}
//         <DataTable
//           ColumnsData={internalContact.ColumnsData}
//           tableRows={paginatedData}
//           roundedHeader={true}
//           paginate={true}
//           TableBodyRow={({ id, Name, Role, Phone, Email, }: InternalContacts) => (
//             <tr key={id} className="hover:bg-white transition">
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Name}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Role}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Phone}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Email}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg">
//                 <Icon
//                   icon="material-symbols:delete"
//                   width="20"
//                   height="20"
//                   className="cursor-pointer text-red"
//                   //onClick={() => router.push(`/payment-history/details?id=${id}`)}
//                 />
//               </td>
//             </tr>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default InternalContacts;
// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState, useMemo } from "react";
// import type { InternalContacts as InternalContactsType } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { internalContact } from "@/data";
// import { Icon } from "@iconify/react";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";
// import DeleteSpecialityModal from "@/components/ui/modals/delete-model";
// //import DeleteSpecialityModal from "@/components/shared/modal/DeleteSpecialityModal";

// const InternalContacts = () => {
//   const router = useRouter();

//   /* ---------------- STATES ---------------- */
//   const [rowsPerPage] = useState(10);
//   const [currentPage] = useState(1);

//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   /* ---------------- DATA ---------------- */
//   const filteredPatientData = useMemo(() => {
//     return [...internalContact.rowsData];
//   }, []);

//   const paginatedData = filteredPatientData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   /* ---------------- HANDLERS ---------------- */
//   const handleDeleteClick = (id: string) => {
//     setSelectedId(id);
//     setIsDeleteOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     console.log("Delete ID:", selectedId);

//     // 🔥 Yahan API call ya state update kar sakte ho
//     // deleteContact(selectedId)

//     setIsDeleteOpen(false);
//     setSelectedId(null);
//   };

//   return (
//     <div className="px-8 py-10">
//       {/* ---------- HEADER ---------- */}
//       <div className="flex items-center justify-between">
//         <Typography size="h5">Internal Contacts</Typography>

//         <Button className="rounded-xl bg-primary-color">
//           <Typography className="text-white">+ Add Contact</Typography>
//         </Button>
//       </div>

//       {/* ---------- TABLE ---------- */}
//       <div className="mt-5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl">
//         <DataTable
//           ColumnsData={internalContact.ColumnsData}
//           tableRows={paginatedData}
//           roundedHeader
//           paginate
//           TableBodyRow={({
//             id,
//             Name,
//             Role,
//             Phone,
//             Email,
//           }: InternalContactsType) => (
//             <tr key={id}>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Name}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Role}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Phone}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Email}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//                 <Icon
//                   icon="material-symbols:delete"
//                   width={20}
//                   height={20}
//                   className="cursor-pointer text-red"
//                   onClick={() => handleDeleteClick(id)}
//                 />
//               </td>
//             </tr>
//           )}
//         />
//       </div>

//       {/* ---------- DELETE MODAL ---------- */}
//       <DeleteSpecialityModal
//         isOpen={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         onConfirm={handleConfirmDelete}
//         title="Delete Contact"
//       />
//     </div>
//   );
// };

// export default InternalContacts;
// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState, useMemo } from "react";
// import type { InternalContacts as InternalContactsType } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { internalContact } from "@/data";
// import { Icon } from "@iconify/react";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";
// import DeleteSpecialityModal from "@/components/ui/modals/delete-model";
// import AddContactModal from "@/components/ui/modals/add-contact";
// //import AddContactModal from "@/components/ui/modals/add-contact-modal"; // 👈 Import karein

// const InternalContacts = () => {
//   const router = useRouter();

//   /* ---------------- STATES ---------------- */
//   const [rowsPerPage] = useState(10);
//   const [currentPage] = useState(1);

//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   // 👇 Add Contact Modal ke liye state
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   /* ---------------- DATA ---------------- */
//   const filteredPatientData = useMemo(() => {
//     return [...internalContact.rowsData];
//   }, []);

//   const paginatedData = filteredPatientData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   /* ---------------- HANDLERS ---------------- */
//   const handleDeleteClick = (id: string) => {
//     setSelectedId(id);
//     setIsDeleteOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     console.log("Delete ID:", selectedId);

//     // 🔥 Yahan API call ya state update kar sakte ho
//     // deleteContact(selectedId)

//     setIsDeleteOpen(false);
//     setSelectedId(null);
//   };

//   // 👇 Add Contact handler
//   const handleAddContact = (contactData: {
//     name: string;
//     function: string;
//     phone: string;
//     email: string;
//   }) => {
//     console.log("New Contact:", contactData);

//     // 🔥 Yahan aap API call kar sakte hain
//     // await addContactAPI(contactData);

//     // Ya phir local state update kar sakte hain
//     // setContacts([...contacts, { id: Date.now().toString(), ...contactData }]);

//     // Success message dikha sakte hain
//     alert(`Contact "${contactData.name}" added successfully!`);
//   };

//   return (
//     <div className="px-8 py-10">
//       {/* ---------- HEADER ---------- */}
//       <div className="flex items-center justify-between">
//         <Typography size="h5">Internal Contacts</Typography>

//         {/* 👇 Add onClick handler */}
//         <Button
//           className="rounded-xl bg-primary-color"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           <Typography className="text-white">+ Add Contact</Typography>
//         </Button>
//       </div>

//       {/* ---------- TABLE ---------- */}
//       <div className="mt-5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl">
//         <DataTable
//           ColumnsData={internalContact.ColumnsData}
//           tableRows={paginatedData}
//           roundedHeader
//           paginate
//           TableBodyRow={({
//             id,
//             Name,
//             Role,
//             Phone,
//             Email,
//           }: InternalContactsType) => (
//             <tr key={id}>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Name}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Role}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Phone}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Email}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//                 <Icon
//                   icon="material-symbols:delete"
//                   width={20}
//                   height={20}
//                   className="cursor-pointer text-red"
//                   onClick={() => handleDeleteClick(id)}
//                 />
//               </td>
//             </tr>
//           )}
//         />
//       </div>

//       {/* ---------- DELETE MODAL ---------- */}
//       <DeleteSpecialityModal
//         isOpen={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         onConfirm={handleConfirmDelete}
//         title="Delete Contact"
//       />

//       {/* ---------- ADD CONTACT MODAL ---------- */}
//       <AddContactModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSave={handleAddContact}
//       />
//     </div>
//   );
// };

// export default InternalContacts;
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import type { InternalContacts as InternalContactsType } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { internalContact } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import DeleteSpecialityModal from "@/components/ui/modals/delete-model";
import AddContactModal from "@/components/ui/modals/add-contact";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirm";
//import AddContactModal from "@/components/ui/modals/add-contact-modal";

const InternalContacts = () => {
  const router = useRouter();

  /* ---------------- STATES ---------------- */
  const [rowsPerPage] = useState(10);
  const [currentPage] = useState(1);

  // 👇 Contacts data ko state me store karein
  const [contacts, setContacts] = useState<InternalContactsType[]>(
    internalContact.rowsData,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedContact, setSelectedContact] =
    useState<InternalContactsType | null>(null);

  /* ---------------- DATA ---------------- */
  const filteredPatientData = useMemo(() => {
    return [...contacts]; // 👈 State se data lein
  }, [contacts]);

  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  /* ---------------- HANDLERS ---------------- */
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    // 👇 State se contact delete karein
    setContacts(contacts.filter((contact) => contact.id !== selectedId));

    console.log("Deleted ID:", selectedId);
    // 🔥 Yahan API call kar sakte ho
    // await deleteContactAPI(selectedId);

    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  const handleAddClick = () => {
    setModalMode("add");
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (contact: InternalContactsType) => {
    setModalMode("edit");
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveContact = (contactData: {
    name: string;
    function: string;
    phone: string;
    email: string;
  }) => {
    if (modalMode === "add") {
      // 👇 Naya contact add karein
      const newContact: InternalContactsType = {
        id: Date.now().toString(), // Unique ID generate karein
        Name: contactData.name,
        Role: contactData.function,
        Phone: contactData.phone,
        Email: contactData.email,
      };

      setContacts([newContact, ...contacts]); // Table ke top pe add hoga

      console.log("Added new contact:", newContact);
      // 🔥 API call
      // await addContactAPI(contactData);
    } else {
      // 👇 Existing contact update karein
      setContacts(
        contacts.map((contact) =>
          contact.id === selectedContact?.id
            ? {
                ...contact,
                Name: contactData.name,
                Role: contactData.function,
                Phone: contactData.phone,
                Email: contactData.email,
              }
            : contact,
        ),
      );

      console.log("Updated contact:", selectedContact?.id, contactData);
      // 🔥 API call
      // await updateContactAPI(selectedContact?.id, contactData);
    }
  };

  return (
    <div className="px-8 py-10">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between">
        <Typography size="h5">Internal Contacts</Typography>

        <Button
          className="rounded-xl bg-primary-color"
          onClick={handleAddClick}
        >
          <Typography className="text-white">+ Add Contact</Typography>
        </Button>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="mt-5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl">
        <DataTable
          ColumnsData={internalContact.ColumnsData}
          tableRows={paginatedData}
          roundedHeader
          paginate
          TableBodyRow={({
            id,
            Name,
            Role,
            Phone,
            Email,
          }: InternalContactsType) => (
            <tr key={id}>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Name}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Role}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Phone}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Email}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                <div className="flex items-center gap-3">
                  {/* Edit Icon */}
                  <Icon
                    icon="flowbite:edit-solid"
                    width={20}
                    height={20}
                    className="cursor-pointer text-primary-color"
                    onClick={() =>
                      handleEditClick({ id, Name, Role, Phone, Email })
                    }
                  />
                  {/* Delete Icon */}
                  <Icon
                    icon="material-symbols:delete"
                    width={20}
                    height={20}
                    className="cursor-pointer text-red hover:text-red-700"
                    onClick={() => handleDeleteClick(id)}
                  />
                </div>
              </td>
            </tr>
          )}
        />
      </div>

      {/* ---------- DELETE MODAL ---------- */}
      {/* <DeleteSpecialityModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
      /> */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone.”"
      />

      {/* ---------- ADD/EDIT CONTACT MODAL ---------- */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        mode={modalMode}
        initialData={
          selectedContact
            ? {
                name: selectedContact.Name,
                function: selectedContact.Role,
                phone: selectedContact.Phone,
                email: selectedContact.Email,
              }
            : undefined
        }
      />
    </div>
  );
};

export default InternalContacts;
