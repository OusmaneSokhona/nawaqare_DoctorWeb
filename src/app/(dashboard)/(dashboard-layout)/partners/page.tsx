// "use client";

// import React, { useState } from "react";

// import { Button } from "@/components/shared/button";
// import Container from "@/components/shared/container";
// import CustomDropdown from "@/components/shared/custom-dropdown";
// import DataTable from "@/components/shared/data-table";
// import Iconify from "@/components/shared/iconify";
// import SearchInput from "@/components/shared/search-bar";
// import { Typography } from "@/components/shared/typography";
// import AddNewUserModal from "@/components/ui/modals/user-management/AddNewUserModal";
// import DeleteUserModal from "@/components/ui/modals/user-management/DeleteUserModal";
// import EditUserModal from "@/components/ui/modals/user-management/EditUserModal";
// import { contactusTable, partnerTable, UserManagement } from "@/data";
// import { ContactUs, Partner } from "@/types/dashboard";
// import { Icon } from "@iconify/react";
// import { useRouter } from "next/navigation";

// const stats = [
//   {
//     icon: "mingcute:git-pull-request-fill",
//     stat: "1h 34m",
//     title: "Avg Time to First Response",
//   },
//   {
//     icon: "ion:open-sharp",
//     stat: "1h 34m",
//     title: "Avg Time to First Response",
//   },
//   {
//     icon: "mdi:tick-circle",
//     stat: "14",
//     title: "Tickets Breaching SLA",
//   },
//   {
//     icon: "mdi:receipt-text-pending",
//     stat: "40%",
//     title: "% SLA Met",
//   },
// ];

// const ContactUsPage = () => {
//   const router = useRouter();

//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState(""); // State for status filter
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   // Filter the data based on statusFilter
//   const filteredData = statusFilter
//     ? partnerTable?.rowsData.filter((item) =>
//         item.Status?.toLowerCase().includes(statusFilter.toLowerCase())
//       )
//     : partnerTable?.rowsData;

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const meta = {
//     totalItems: filteredData.length,
//     itemsPerPage: rowsPerPage,
//     currentPage,
//     totalPages: Math.ceil(filteredData.length / rowsPerPage),
//   };

//   const [selectedRole, setSelectedRole] = useState("");

//   const [selectedOption, setSelectedOption] = useState({
//     name: "",
//     idx: -1,
//   });
//   const onOptionClickHandler = (name: string, idx: number) => {
//     setSelectedOption({
//       name,
//       idx,
//     });
//     setSelectedRole(UserManagement?.RowsData[idx]?.role);
//   };

//   const [addNewUser, setAddNewUser] = useState(false);

//   // Status options for the dropdown
//   const statusOptions = ["All", "3 days ago", "3 days ago", "3 days ago", "3 days ago"];

//   // Handler for status selection
//   const handleStatusSelect = (status: string) => {
//     setStatusFilter(status === "All" ? "" : status);
//     setIsDropdownOpen(false);
//     setCurrentPage(1); // Reset to first page on filter change
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex max-md:flex-col max-md:gap-3 pb-5 max-md:items-start items-center justify-between">
//         <div className="">
//           <Typography size="h3" as="h3">
//             Partners
//           </Typography>
//           <Typography size="lg" className="text-desc-color">
//             Manage delivery companies and their internal contacts.
//           </Typography>
//         </div>
//         <div className="relative">
//           <Button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="bg-border-color flex items-center justify-center py-2 rounded-lg cursor-pointer"
//           >
//             <Typography>{statusFilter || "Last Activity"}</Typography>
//             <Icon
//               icon="mdi:chevron-down"
//               width="16"
//               height="16"
//               className="ml-2"
//             />
//           </Button>
//           {isDropdownOpen && (
//             <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
//               {statusOptions.map((option) => (
//                 <div
//                   key={option}
//                   onClick={() => handleStatusSelect(option)}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <Typography>{option}</Typography>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* <div className="pt-5 flex flex-wrap gap-5 items-center">
//         {stats.map((activity, i) => (
//           <div
//             key={i}
//             className="bg-white shadow-md w-[190px] h-[190px] max-md:h-auto rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
//           >
//             <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
//               <Icon
//                 icon={activity.icon}
//                 width="24"
//                 height="24"
//                 className="text-white"
//               />
//             </div>
//             <Typography size="h4" as="h4">
//               {activity.stat}
//             </Typography>
//             <Typography>{activity.title}</Typography>
//           </div>
//         ))}
//       </div> */}
//       <DataTable
//         ColumnsData={partnerTable.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         TableBodyRow={({
//           id,
//           Partner,
//           title,
//           Primary,
//           Deliveries,
//           Status,
//           Last
//         }: Partner) => (
//           <tr key={id} className={`hover:bg-white transition text-start`}>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color font-medium break-words">
//               {Partner}
//             </td>

//             <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
//               {title}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-md w-[20px] text-start font-medium text-desc-color">
//               {Primary}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
//               {Deliveries}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
//               {Last}
//             </td>
//             <td
//               className={`px-4 flex gap-2 items-center lg:px-6 py-8 text-start text-lg ${
//                 Status === "Active"
//                   ? "text-secondary-color"
//                   : Status === "open"
//                     ? "text-primary-color"
//                     : Status === "Inactive"
//                       ? "text-red"
//                       : "text-[#F2994A]"
//               }`}
//             >
//               {Status || "-"}
//             </td>
//             <td className="px-4 lg:px-4 py-4 text-start text-lg w-[120px]">
//               <div className="flex items-center gap-1">
//                 <Icon
//                   icon="mdi:eye"
//                   width="20"
//                   height="20"
//                   className="cursor-pointer text-primary-color"
//                   onClick={() => router.push(`/partners/details?id=${id}`)}
//                 />
//                 <Icon
//                   icon="material-symbols:delete"
//                   width="20"
//                   height="20"
//                   className="cursor-pointer text-red"
//                   //onClick={() => router.push(`/partners/details?id=${id}`)}

//                 />

//                 {/* <div className="relative">
//                   <Icon
//                     className="text-primary-color cursor-pointer"
//                     icon="ph:dots-three-vertical"
//                     width="25"
//                     height="25"
//                     onClick={() =>
//                       setOpenDropdown(
//                         openDropdown === `row-${id}` ? null : `row-${id}`
//                       )
//                     }
//                   />

//                   {openDropdown === `row-${id}` && (
//                     <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-48 py-2 z-20">
//                       {[
//                         "Change status",
//                         "Assign / reassign",
//                         "Add internal note",

//                       ].map((option) => (
//                         <div
//                           key={option}
//                           className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                           onClick={() => {
//                             console.log(option, id);
//                             setOpenDropdown(null);
//                           }}
//                         >
//                           {option}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div> */}
//               </div>
//             </td>
//           </tr>
//         )}
//       />

//     </div>
//   );
// };

// export default ContactUsPage;
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { partnerTable } from "@/data";
import { Partner } from "@/types/dashboard";
import { Icon } from "@iconify/react";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirm";
//import DeleteConfirmationModal from "@/components/ui/modals/DeleteConfirmationModal";

const ContactUsPage = () => {
  const router = useRouter();

  /* ---------------- STATES ---------------- */
  const [tableData, setTableData] = useState(partnerTable.rowsData);
  const [rowsPerPage] = useState(10);
  const [currentPage] = useState(1);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /* ---------------- DELETE HANDLERS ---------------- */
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedId) return;

    setTableData((prev) => prev.filter((item) => item.id !== selectedId));

    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  /* ---------------- PAGINATION ---------------- */
  const paginatedData = useMemo(() => {
    return tableData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    );
  }, [tableData, currentPage, rowsPerPage]);

  const meta = {
    totalItems: tableData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(tableData.length / rowsPerPage),
  };

  return (
    <div className="flex flex-col gap-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Typography size="h3">Partners</Typography>
        <Button className="bg-primary-color text-white rounded-lg">
          + Add Partner
        </Button>
      </div>

      {/* TABLE */}
      <DataTable
        ColumnsData={partnerTable.ColumnsData}
        tableRows={paginatedData}
        paginate
        meta={meta}
        roundedHeader
        TableBodyRow={({
          id,
          Partner,
          title,
          Primary,
          Deliveries,
          Status,
          Last,
        }: Partner) => (
          <tr key={id} className="">
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Partner}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {title}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md w-[20px] text-start font-medium text-desc-color">
              {Primary}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Deliveries}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Last}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">{Status}</td> */}
            <td
              className={`px-4 flex gap-2 items-center lg:px-6 py-8 text-start text-lg ${
                Status === "Active"
                  ? "text-secondary-color"
                  : Status === "open"
                    ? "text-primary-color"
                    : Status === "Inactive"
                      ? "text-red"
                      : "text-[#F2994A]"
              }`}
            >
              {Status || "-"}
            </td>

            {/* ACTIONS */}
            <td className="px-4 py-4">
              <div className="flex gap-2">
                <Icon
                  icon="mdi:eye"
                  width={20}
                  className="cursor-pointer text-primary-color"
                  onClick={() => router.push(`/partners/details?id=${id}`)}
                />
                <Icon
                  icon="material-symbols:delete"
                  width={20}
                  className="cursor-pointer text-red"
                  onClick={() => handleDeleteClick(id)}
                />
              </div>
            </td>
          </tr>
        )}
      />

      {/* DELETE MODAL */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Partner"
        description="Are you sure you want to delete this partner? This action cannot be undone."
      />
    </div>
  );
};

export default ContactUsPage;
