// import React from 'react'

// const pharmacies = () => {
//   return (
//     <div>
//       Pharmacies
//     </div>
//   )
// }

// export default pharmacies
// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState, useMemo } from "react";
// import { paymentss, pharmacy } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { paymentTable, pharmacyTable } from "@/data";
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
// ];

// const Pharmacies = () => {
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
//   const uniquePatients = Array.from(new Set(pharmacyTable.rowsData.map((r) => r.Patient)));
//   // const uniqueOrders = Array.from(new Set(pharmacyTable.rowsData.map((r) => r.Order)));

//   // ✅ Filter logic (extended)
//   const filteredPatientData = useMemo(() => {
//     let filtered = [...pharmacyTable.rowsData];
//     const now = new Date();

//     const parseDate = (dateStr: string) => {
//       const [day, month, year] = dateStr.split("/").map(Number);
//       return new Date(year, month - 1, day);
//     };

//     // Status Filter
//     if (statusFilter !== "Status") {
//       filtered = filtered.filter((item) =>
//         item.Status?.toLowerCase().includes(statusFilter.toLowerCase())
//       );
//     }

//     // Date Range Filter
//     if (dateFilter !== "Date") {
//       if (dateFilter === "Last 7 Days") {
//         const last7 = new Date();
//         last7.setDate(now.getDate() - 7);
//         filtered = filtered.filter(
//           (item) => parseDate(item.Date) >= last7 && parseDate(item.Date) <= now
//         );
//       } else if (dateFilter === "Last 30 Days") {
//         const last30 = new Date();
//         last30.setDate(now.getDate() - 30);
//         filtered = filtered.filter(
//           (item) => parseDate(item.Date) >= last30 && parseDate(item.Date) <= now
//         );
//       } else if (dateFilter === "Last year") {
//         const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
//         filtered = filtered.filter(
//           (item) => parseDate(item.Date) >= lastYear && parseDate(item.Date) <= now
//         );
//       }
//     }

//     // ✅ Patient Filter
//     if (patientFilter !== "Patient") {
//       filtered = filtered.filter(
//         (item) => item.Patient.toLowerCase() === patientFilter.toLowerCase()
//       );
//     }

//     // ✅ Order Filter
//     // if (orderFilter !== "Order") {
//     //   filtered = filtered.filter(
//     //     (item) => item.Order.toLowerCase() === orderFilter.toLowerCase()
//     //   );
//     // }

//     return filtered;
//   }, [statusFilter, dateFilter, patientFilter, orderFilter]);

//   // Pagination logic
//   const paginatedData = filteredPatientData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div>
//       <div className="flex justify-between pt-4 pb-4">
//         <div>
//           <Typography size="h3" as="h3">
//             All Pharmacies
//           </Typography>
//           <Typography>
//             Manage and monitor pharmacy accounts.
//           </Typography>
//         </div>

//         <div className="flex flex-wrap gap-3 relative">

//             {/* Date Filter */}
//             {/* <Dropdown
//               label={dateFilter}
//               options={["Date", "Last 7 Days", "Last 30 Days", "Last year"]}
//               isOpen={isDateOpen}
//               setIsOpen={setIsDateOpen}
//               onSelect={setDateFilter}
//             /> */}

//             {/* Patient Filter */}
//             <Dropdown
//               label={patientFilter}
//               options={["Patient", ...uniquePatients]}
//               isOpen={isPatientOpen}
//               setIsOpen={setIsPatientOpen}
//               onSelect={setPatientFilter}
//             />

//             {/* Order Filter */}
//             {/* <Dropdown
//               label={orderFilter}
//               options={["Order", ...uniqueOrders]}
//               isOpen={isOrderOpen}
//               setIsOpen={setIsOrderOpen}
//               onSelect={setOrderFilter}
//             /> */}

//             {/* Status Filter */}
//             <Dropdown
//               label={statusFilter}
//               options={["Status", "Paid", "Refund", "Failed"]}
//               isOpen={isStatusOpen}
//               setIsOpen={setIsStatusOpen}
//               onSelect={setStatusFilter}
//             />
//             <div className="bg-primary-color gap-2 cursor-pointer text-white rounded-lg w-[200px] h-[45px] flex items-center justify-center">

//                <Icon className="text-white" icon="ic:baseline-plus" width="24" height="24" />
//               <button>Add Pharmacy</button>

//             </div>

//           </div>
//       </div>

//       {/* ---------- Table ---------- */}
//       <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">

//         {/* ---------- Table Data ---------- */}
//         <DataTable
//           ColumnsData={pharmacyTable.ColumnsData}
//           tableRows={paginatedData}
//           roundedHeader={true}
//           paginate={true}
//           TableBodyRow={({ id, Patient, Date, Status,Pharmacy,Responsible, Location,Total,Acceptance }: pharmacy) => (
//             <tr key={id} className="hover:bg-white transition">
//               <td className="px-4 lg:px-6 py-4 text-start text-desc-color">{Patient}</td>
//               {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{Date}</td> */}
//               <td className="px-4 lg:px-6 py-4 text-start text-xs font-semibold text-desc-color">{Pharmacy}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-xs font-semibold text-desc-color">{Responsible}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{Location}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{Total}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{Acceptance}</td>
//               <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{Date}</td>
//               <td
//                 className={`px-4 lg:px-6 py-4 text-start text-xs ${
//                   Status === "Failed"
//                     ? "text-red"
//                     : Status === "Active"
//                     ? "text-secondary-color"
//                     : Status === "Refund"
//                     ? ""
//                     : "text-[#F2994A]"
//                 }`}
//               >
//                 {Status || "-"}
//               </td>
//               <td className="px-4 lg:px-6 py-4 flex items-center gap-1 text-start text-xs">
//                 <Icon
//                   icon="mdi:eye"
//                   width="20"
//                   height="20"
//                   className="cursor-pointer text-primary-color"
//                   onClick={() => router.push(`/payment-history/details?id=${id}`)}
//                 />
//                 <Icon className="text-primary-color" icon="lucide:edit" width="24" height="24" />
//               </td>
//             </tr>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// /* ✅ Reusable dropdown component */
// const Dropdown = ({
//   label,
//   options,
//   isOpen,
//   setIsOpen,
//   onSelect,
// }: {
//   label: string;
//   options: string[];
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   onSelect: (option: string) => void;
// }) => (
//   <div className="relative">
//     <button
//       onClick={() => setIsOpen(!isOpen)}
//       className="flex items-center justify-between  border border-border-color bg-border-color rounded-md px-4 py-2 text-gray-700"
//     >
//       <span>{label}</span>
//       <Icon
//         icon="mdi:chevron-down"
//         className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
//       />
//     </button>
//     {isOpen && (
//       <div className="absolute left-0 mt-1 w-36 bg-white shadow-lg border border-gray-200 rounded-md z-10">
//         {options.map((option) => (
//           <div
//             key={option}
//             onClick={() => {
//               onSelect(option);
//               setIsOpen(false);
//             }}
//             className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
//               label === option ? "bg-gray-100" : ""
//             }`}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// export default Pharmacies;
"use client";
import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import DataTable from "@/components/shared/data-table";
import { pharmacyTable } from "@/data";
import { pharmacy } from "@/types/dashboard";
import EditPharmacyModal from "@/components/ui/modals/pharmacy-model/pharmacy";
import { useRouter } from "next/navigation";
// import EditPharmacyModal from "@/components/shared/modals/EditPharmacyModal"; // ✅ import modal

const stats = [
  {
    icon: "icon-park-solid:prescription",
    stat: "10",
    title: "Pending prescriptions",
  },
  {
    icon: "fluent:document-queue-multiple-24-filled",
    stat: "05",
    title: "Current load (queue)",
  },
  {
    icon: "mingcute:time-fill",
    stat: "1 hr",
    title: "Average validation time",
  },
  {
    icon: "tabler:activity",
    stat: "23 mint",
    title: "Last activity",
  },
  {
    icon: "eos-icons:system-ok",
    stat: "40%",
    title: "Reliability system",
  },
];

const Pharmacies = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<Partial<pharmacy> | null>(null);

  const [statusFilter, setStatusFilter] = useState("Status");
  const [patientFilter, setPatientFilter] = useState("Patient");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [pharmacyName, setPharmacyName] = useState("");
  const [Patient, setPatient] = useState("");
  const [responsible, setResponsible] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");
  const [pharmacies, setPharmacies] = useState<any[]>(pharmacyTable.rowsData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pharmacyToDelete, setPharmacyToDelete] = useState<pharmacy | null>(
    null,
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const uniquePatients = Array.from(
    new Set(pharmacyTable.rowsData.map((r) => r.Patient)),
  );

  const filteredPatientData = useMemo(() => {
    // let filtered = [...pharmacyTable.rowsData];
    let filtered = [...pharmacies];
    if (statusFilter !== "Status") {
      filtered = filtered.filter((item) =>
        item.Status?.toLowerCase().includes(statusFilter.toLowerCase()),
      );
    }
    if (patientFilter !== "Patient") {
      filtered = filtered.filter(
        (item) => item.Patient.toLowerCase() === patientFilter.toLowerCase(),
      );
    }
    return filtered;
  }, [statusFilter, patientFilter, pharmacies]);

  const handleAddClick = () => {
    setModalMode("add");
    setSelectedPharmacy(null);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (row: pharmacy) => {
    setPharmacyToDelete(row);
    setIsDeleteModalOpen(true);
  };

  // const handleEditClick = (row: pharmacy) => {
  //   setModalMode("edit");
  //   setSelectedPharmacy(row);
  //   setIsModalOpen(true);

  // };

  const handleEditClick = (row: pharmacy) => {
    console.log("Selected Pharmacy Row:", row);
    console.log("Pharmacy ID:", row?.id);
    setModalMode("edit");
    setSelectedPharmacy(row);
    setIsModalOpen(true);
    setPatient(String(row?.Patient ?? ""));
    setResponsible(String(row?.Responsible ?? ""));
    setPharmacyName(String(row?.Pharmacy ?? ""));
    setLocation(String(row?.Location ?? ""));
    setStatus(String(row?.Status ?? ""));
  };

  // const handleSave = (name: string, responsible: string, location: string, status: string) => {
  //   if (modalMode === "add") {
  //     console.log("✅ Added:", { name, responsible, location, status });
  //   } else {
  //     console.log("✅ Updated:", { name, responsible, location, status });
  //   }
  // };
  const handleSave = (
    patient: string,
    name: string,
    responsible: string,
    location: string,
    status: string,
  ) => {
    if (modalMode === "add") {
      const newPharmacy: pharmacy = {
        id: pharmacies.length + 1,
        Patient: patient,
        Pharmacy: name,
        Responsible: responsible,
        Location: location,
        Status: status,
        Date: new Date().toLocaleDateString(),
        Total: "0",
        Acceptance: "Pending",
      };

      setPharmacies((prev) => [...prev, newPharmacy]);
    } else if (modalMode === "edit" && selectedPharmacy) {
      const updatedPharmacies = pharmacies.map((p) =>
        p.id === selectedPharmacy.id
          ? {
              ...p,
              Patient: patient,
              Pharmacy: name,
              Responsible: responsible,
              Location: location,
              Status: status,
            }
          : p,
      );
      setPharmacies(updatedPharmacies);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex max-md:flex-col max-md:gap-3 justify-between pt-4 pb-4">
        <div>
          <Typography size="h3" as="h3">
            All Pharmacies
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Manage and monitor pharmacy accounts.
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleAddClick}
            className="bg-primary-color gap-2 cursor-pointer text-white rounded-lg flex items-center justify-center"
          >
            <Icon icon="ic:baseline-plus" width="24" height="24" />
            <span>Add Pharmacy</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="pt-5 pb-8 flex flex-wrap gap-5 items-center">
          {stats.map((activity, i) => (
            <div
              key={i}
              className="bg-white shadow-md w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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
      </div>
      <DataTable
        ColumnsData={pharmacyTable.ColumnsData}
        tableRows={filteredPatientData}
        roundedHeader={true}
        paginate={true}
        TableBodyRow={(row: pharmacy) => (
          <tr key={row.id} className="hover:bg-white transition">
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {row.Patient}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{Date}</td> */}
            <td className="px-4 lg:px-6 py-4 text-start text-lg  text-desc-color">
              {row.Pharmacy}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg  text-desc-color">
              {row.Type}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg  text-desc-color">
              {row.Responsible}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {row.Location}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {row.Total}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {row.Acceptance}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {row.Date}
            </td>
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                row.Status === "Inactive"
                  ? "text-red"
                  : row.Status === "Active"
                    ? "text-secondary-color"
                    : row.Status === "Refund"
                      ? ""
                      : "text-[#F2994A]"
              }`}
            >
              {row.Status || "-"}
            </td>
            <td className="px-4 py-4 mt-4 flex items-center justify-center gap-2">
              <Icon
                className="text-primary-color cursor-pointer"
                icon="mdi:eye"
                width="20"
                height="20"
                // onClick={() => handleEditClick(row)}
                onClick={() => router.push(`/pharmacies/details?id=${row.id}`)}
              />
              <Icon
                className="text-primary-color cursor-pointer"
                icon="lucide:edit"
                width="20"
                height="20"
                onClick={() => handleEditClick(row)}
              />
              {/* <Icon
                className="text-red cursor-pointer"
                icon="material-symbols:delete-rounded"
                width="20"
                height="20"
                onClick={() => handleDeleteClick(row)}
              /> */}
              <div className="relative">
                <Icon
                  className="text-primary-color cursor-pointer"
                  icon="ph:dots-three-vertical"
                  width="25"
                  height="25"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === `row-${row.id}` ? null : `row-${row.id}`,
                    )
                  }
                />
                {openDropdown === `row-${row.id}` && (
                  <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-48 py-2 z-20">
                    {["Delete  Pharmacy", "Password Reset"].map((option) => (
                      <div
                        key={option}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          console.log(option, row.id);
                          setOpenDropdown(null);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </td>
          </tr>
        )}
      />

      {/* ✅ Modal */}
      <EditPharmacyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        mode={modalMode}
        initialPatient={selectedPharmacy?.Patient}
        initialPharmacyName={selectedPharmacy?.Pharmacy}
        initialResponsible={selectedPharmacy?.Responsible}
        initialLocation={selectedPharmacy?.Location}
        initialStatus={selectedPharmacy?.Status}
      />
    </div>
  );
};

export default Pharmacies;
