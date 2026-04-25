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
// import { contactusTable, UserManagement } from "@/data";
// import { ContactUs } from "@/types/dashboard";
// import { Icon } from "@iconify/react";
// import { useRouter } from "next/navigation";

// const stats = [
//   {
//     icon: "mingcute:git-pull-request-fill",
//     stat: "22",
//     title: "Total Requests",
//   },
//   {
//     icon: "ion:open-sharp",
//     stat: "2",
//     title: "Open",
//   },
//   {
//     icon: "mdi:tick-circle",
//     stat: "5",
//     title: "Resolved",
//   },
//   {
//     icon: "mdi:receipt-text-pending",
//     stat: "40%",
//     title: "Pending",
//   },
// ];

// const ContactUsPage = () => {
//   const router = useRouter();

//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);

//   const paginatedData = contactusTable?.rowsData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const meta = {
//     totalItems: contactusTable?.rowsData.length,
//     itemsPerPage: rowsPerPage,
//     currentPage,
//     totalPages: Math.ceil(contactusTable?.rowsData.length / rowsPerPage),
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

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex items-center justify-between">
//      <div className="">
//         <Typography size={"h3"} as={"h3"}>
//           Contact-Us
//         </Typography>
//         <Typography>Centralized view of all user inquiries and support requests.</Typography>
//       </div>
//       <div className="bg-border-color w-[100px] flex items-center justify-center py-2 rounded">
//         <Typography>Resolved</Typography>
//       </div>
//       </div>

//        <div className="pt-5 flex flex-wrap gap-5 items-center">
//               {stats.map((activity, i) => (
//                 <div
//                   key={i}
//                   className="bg-white shadow-md w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
//                 >
//                   <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
//                     <Icon icon={activity.icon} width="24" height="24" className="text-white" />
//                   </div>
//                   <Typography size="h4" as="h4">
//                     {activity.stat}
//                   </Typography>
//                   <Typography>{activity.title}</Typography>
//                 </div>
//               ))}
//             </div>
//       <DataTable
//         ColumnsData={contactusTable.ColumnsData}
//         tableRows={contactusTable.rowsData}
//         roundedHeader={true}
//         paginate={true}
//         TableBodyRow={({
//           id,
//           subject,
//           title,
//           email,
//           desc,
//           Status,
//           Date,
//           Ticket,
//         }: ContactUs) => (
//           <tr key={id} className={`hover:bg-white transition`}>
//             <td className="px-4 lg:px-6 py-4 text-start text-desc-color font-medium break-words">
//               {subject}
//             </td>

//             <td className="px-4 lg:px-6 py-4 text-xs text-start font-bold text-desc-color">
//               {title}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-xs text-start font-bold text-desc-color">
//               {Ticket}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-xs text-start font-bold text-desc-color">
//               {Date}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-xs text-start font-medium text-desc-color">
//               {desc}{" "}
//               <span className="text-primary-color underline">view more</span>
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-xs text-start font-medium text-desc-color">
//               {email}
//             </td>
//             <td
//               className={`px-4 flex gap-2 items-center lg:px-6 py-4 text-start text-xs ${
//                 Status?.toLowerCase() === "resolved"
//                   ? "text-secondary-color"
//                   : Status?.toLowerCase() === " in progress"
//                     ? "text-[#F2994A]"
//                     : Status?.toLowerCase() === "archived"
//                       ? "text-red"
//                       : "text-primary-color"
//               }`}
//             >
//               {Status || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs">
//               <Icon
//                 icon="mdi:eye"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push(`/contact-us/details/${id}`)}
//               />
//             </td>
//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default ContactUsPage;
"use client";

import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import CustomDropdown from "@/components/shared/custom-dropdown";
import DataTable from "@/components/shared/data-table";
import Iconify from "@/components/shared/iconify";
import SearchInput from "@/components/shared/search-bar";
import { Typography } from "@/components/shared/typography";
import AddNewUserModal from "@/components/ui/modals/user-management/AddNewUserModal";
import DeleteUserModal from "@/components/ui/modals/user-management/DeleteUserModal";
import EditUserModal from "@/components/ui/modals/user-management/EditUserModal";
import { contactusTable, UserManagement } from "@/data";
import { ContactUs } from "@/types/dashboard";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const stats = [
  {
    icon: "mingcute:git-pull-request-fill",
    stat: "1h 34m",
    title: "Avg Time to First Response",
  },
  {
    icon: "ion:open-sharp",
    stat: "1h 34m",
    title: "Avg Time to First Response",
  },
  {
    icon: "mdi:tick-circle",
    stat: "14",
    title: "Tickets Breaching SLA",
  },
  {
    icon: "mdi:receipt-text-pending",
    stat: "40%",
    title: "% SLA Met",
  },
];

const ContactUsPage = () => {
  const router = useRouter();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Filter the data based on statusFilter
  const filteredData = statusFilter
    ? contactusTable?.rowsData.filter((item) =>
        item.Status?.toLowerCase().includes(statusFilter.toLowerCase()),
      )
    : contactusTable?.rowsData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const meta = {
    totalItems: filteredData.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredData.length / rowsPerPage),
  };

  const [selectedRole, setSelectedRole] = useState("");

  const [selectedOption, setSelectedOption] = useState({
    name: "",
    idx: -1,
  });
  const onOptionClickHandler = (name: string, idx: number) => {
    setSelectedOption({
      name,
      idx,
    });
    setSelectedRole(UserManagement?.RowsData[idx]?.role);
  };

  const [addNewUser, setAddNewUser] = useState(false);

  // Status options for the dropdown
  const statusOptions = ["All", "Resolved", "In Progress", "Open", "Archived"];

  // Handler for status selection
  const handleStatusSelect = (status: string) => {
    setStatusFilter(status === "All" ? "" : status);
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-md:flex-col max-md:gap-3 max-md:items-start items-center justify-between">
        <div className="">
          <Typography size="h3" as="h3">
            Contact-Us
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Centralized view of all user inquiries and support requests.
          </Typography>
        </div>
        <div className="relative">
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-border-color flex items-center justify-center py-2 rounded-lg cursor-pointer"
          >
            <Typography>{statusFilter || "Resolved"}</Typography>
            <Icon
              icon="mdi:chevron-down"
              width="16"
              height="16"
              className="ml-2"
            />
          </Button>
          {isDropdownOpen && (
            <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
              {statusOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleStatusSelect(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Typography>{option}</Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-md w-[190px] h-[190px] max-md:h-auto rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
          >
            <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
              <Icon
                icon={activity.icon}
                width="24"
                height="24"
                className="text-white"
              />
            </div>
            <Typography size="h4" as="h4">
              {activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
          </div>
        ))}
      </div>
      <DataTable
        ColumnsData={contactusTable.ColumnsData}
        tableRows={paginatedData} // Use paginatedData instead of full rowsData
        roundedHeader={true}
        paginate={true}
        meta={meta} // Pass meta for pagination
        // onPageChange={(page) => setCurrentPage(page)}
        // onRowsPerPageChange={(rows) => {
        //   setRowsPerPage(rows);
        //   setCurrentPage(1);
        // }}
        TableBodyRow={({
          id,
          subject,
          title,
          email,
          desc,
          Status,
          Date,
          Ticket,
          Type,
          To,
          Priority,
        }: ContactUs) => (
          <tr key={id} className={`hover:bg-white transition`}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color font-medium break-words">
              {subject}
            </td>

            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {title}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Type}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Ticket}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {To}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Date}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {Priority}
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {desc}{" "}
              <span className="text-primary-color underline">view more</span>
            </td>
            <td className="px-4 lg:px-6 py-4 text-md text-start font-medium text-desc-color">
              {email}
            </td>
            <td
              className={`px-4 flex gap-2 items-center lg:px-6 py-4 text-start text-lg ${
                Status?.toLowerCase() === "resolved"
                  ? "text-secondary-color"
                  : Status?.toLowerCase() === "open"
                    ? "text-primary-color"
                    : Status?.toLowerCase() === "archived"
                      ? "text-red"
                      : "text-[#F2994A]"
              }`}
            >
              {Status || "-"}
            </td>
            <td className="px-4 lg:px-4 py-4 text-start text-lg w-[120px]">
              <div className="flex items-center gap-1">
                <Icon
                  icon="mdi:eye"
                  width="20"
                  height="20"
                  className="cursor-pointer text-primary-color"
                  onClick={() => router.push(`/contact-us/details?id=${id}`)}
                />

                <div className="relative">
                  <Icon
                    className="text-primary-color cursor-pointer"
                    icon="ph:dots-three-vertical"
                    width="25"
                    height="25"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === `row-${id}` ? null : `row-${id}`,
                      )
                    }
                  />

                  {openDropdown === `row-${id}` && (
                    <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-48 py-2 z-20">
                      {[
                        "Change status",
                        "Assign / reassign",
                        "Add internal note",
                      ].map((option) => (
                        <div
                          key={option}
                          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            console.log(option, id);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default ContactUsPage;
