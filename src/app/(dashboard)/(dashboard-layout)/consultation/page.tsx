// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { AllDoctorsType, AllPatients, BookingsType, ConsultationType } from "@/types/dashboard";
// import Container from "@/components/shared/container";
// import DataTable from "@/components/shared/data-table";
// import DateRangeDropdown from "@/components/shared/date-range-dropdown";
// import Iconify from "@/components/shared/iconify";
// import InputDropdown from "@/components/shared/input-fields/input-dropdown";
// import SearchInput from "@/components/shared/search-bar";
// import { Typography } from "@/components/shared/typography";
// import StatsCard from "@/components/ui/stats-card";
// import { allDoctors, allPatients, bookings, consultation, content, Orders } from "@/data";
// import { Icon } from "@iconify/react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/shared/button";
// import PaymentStatusOverview from "../bookings/card/page";
// //import PaymentStatusOverview from "./card/page";

// const stats = [
//   {
//     icon: "streamline:waiting-appointments-calendar-solid",
//     stat: "22",
//     title: "Active Packs",
//   },
//   {
//     icon: "mdi:tick-circle",
//     stat: "8",
//     title: "Total Subscribers",
//   },
//   {
//     icon: "carbon:close-filled",
//     stat: "$450",
//     title: "Monthly Revenue",
//   },
//   {
//     icon: "simple-line-icons:graph",
//     stat: "10",
//     title: "Expiring Soon",
//   },
//   // {
//   //   icon: "simple-line-icons:graph",
//   //   stat: "40%",
//   //   title: "Success rate",
//   //   img: "/assets/svg/graphImg.svg",
//   // },
// ];

// const ConsultationPage = () => {
//   const [customFilter, setCustomFilter] = useState("");
//   const [filteredPatientData, setFilteredPatientData] = useState(
//     consultation?.RowsData
//   );
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//     if (filter === "All") {
//       setFilteredPatientData(consultation?.RowsData);
//     } else {
//       const filteredData = consultation?.RowsData;
//       // const filteredData = bookings?.RowsData.filter(
//       //   (row) => row.status === filter
//       // );
//       setFilteredPatientData(filteredData);
//     }
//     setCurrentPage(1);
//   };
//   const paginatedData = filteredPatientData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const meta = {
//     totalItems: filteredPatientData?.length,
//     itemsPerPage: rowsPerPage,
//     currentPage,
//     totalPages: Math.ceil(filteredPatientData.length / rowsPerPage),
//   };

//   const router = useRouter();
//   return (
//     <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden">
//       <div className="flex max-md:flex-col max-md:gap-3 max-md:items-start justify-between items-center">
//         <div>
//           <Typography size="h3" as="h3" className="font-bold">
//             Consultation Packs
//           </Typography>
//           <Typography size="lg" className="text-desc-color">
//             Create, edit, and monitor prepaid consultation offers.
//           </Typography>
//         </div>

//         <Button
//           // onClick={() => router.push(`/doctors/add/`)}
//           // variant="primary"
//           className="flex rounded-lg justify-center bg-primary-color text-white items-center gap-2 font-bold"
//         >
//           <span>+</span>
//           Add New Pack
//         </Button>
//       </div>
//       <div className="pt-5 flex flex-wrap gap-5 items-center">
//         {stats.map((activity, i) => (
//           <div
//             key={i}
//             className="bg-white shadow-md w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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
//                <Typography>{activity.title}</Typography>
//             </div>
//         ))}

//       </div>
//       <DataTable
//         ColumnsData={consultation?.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         setCurrentPage={setCurrentPage}
//         TableBodyRow={({
//           Name,
//           consultationType,
//           Specialty,
//           Price ,
//           Status,
//           id,
//           Qty,
//           Period,
//           Renewal,
//            On
//         }: ConsultationType) => (
//           <tr key={id} className="">
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Name || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {consultationType || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg whitespace-nowrap text-desc-color">
//               {Specialty || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Price  || "-"}
//             </td>
//              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Qty  || "-"}
//             </td>
//              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               { Period || "-"}
//             </td>
//              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Renewal  || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {On || "-"}
//             </td>
//             <td
//               className={`px-4 lg:px-6 py-4 text-start text-lg ${Status === "Active" ? "text-secondary-color"  : Status === "Inactive" ? "" : "text-red"} `}
//             >
//               {Status || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color flex gap-2 items-center">
//               <Icon
//                 icon="mdi:eye"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push(`/bookings/details/`)}
//               />
//               <Icon
//                 icon="bx:edit"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 // onClick={() => router.push(`/bookings/details/`)}
//               />
//             </td>
//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default ConsultationPage;
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  AllDoctorsType,
  AllPatients,
  BookingsType,
  ConsultationType,
} from "@/types/dashboard";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { consultation } from "@/data";
import { Icon } from "@iconify/react";
import { Button } from "@/components/shared/button";
import ConsultationPackModal from "@/components/ui/modals/consultation-model";

//import ConsultationPackModal from "@/components/modals/ConsultationPackModal"; // ← ADD THIS IMPORT

const stats = [
  {
    icon: "streamline:waiting-appointments-calendar-solid",
    stat: "22",
    title: "Active Packs",
  },
  { icon: "mdi:tick-circle", stat: "8", title: "Total Subscribers" },
  { icon: "carbon:close-filled", stat: "$450", title: "Monthly Revenue" },
  { icon: "simple-line-icons:graph", stat: "10", title: "Expiring Soon" },
];

const ConsultationPage = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    consultation?.RowsData,
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------------- MODAL STATES -----------------
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPack, setSelectedPack] = useState<ConsultationType | null>(
    null,
  );

  const router = useRouter();

  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const meta = {
    totalItems: filteredPatientData?.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredPatientData.length / rowsPerPage),
  };

  // ---------------- SAVE HANLDER -----------------
  //   const handleSave = (
  //     question,
  //     answer,
  //     status,
  //     consultations,
  //     type,
  //     price,
  //     duration,
  //     renewal,
  //     visibility
  //   ) => {
  //     console.log("Saved Modal Data:", {
  //       question,
  //       answer,
  //       status,
  //       consultations,
  //       type,
  //       price,
  //       duration,
  //       renewal,
  //       visibility,
  //     });
  //   };
  // const handleSave = (
  //   question: string,
  //   answer: string,
  //   status: string,
  //   consultations: string,
  //   type: string,
  //   price: string,
  //   duration: string,
  //   renewal: string,
  //   visibility: string
  // ) => {
  //   console.log("Saved Modal Data:", {
  //     question,
  //     answer,
  //     status,
  //     consultations,
  //     type,
  //     price,
  //     duration,
  //     renewal,
  //     visibility,
  //   });
  // };
  const handleSave = (
    question: string,
    answer: string,
    status: string,
    consultations: string,
    type: string,
    price: string,
    duration: string,
    renewal: string,
    visibility: string,
  ) => {
    setFilteredPatientData((prev: ConsultationType[]) => {
      if (editMode && selectedPack) {
        // EDIT existing pack
        return prev.map((item) =>
          item.id === selectedPack.id
            ? {
                ...item,
                Name: question,
                Specialty: answer,
                Status: status,
                Qty: consultations,
                consultationType: type,
                Price: price,
                Period: duration,
                Renewal: renewal,
                On: visibility,
              }
            : item,
        );
      }

      // ADD new pack
      const newPack: ConsultationType = {
        id: Date.now().toString(), // ✅ id ko string me convert kiya
        Name: question,
        Specialty: answer,
        Status: status,
        Qty: consultations,
        consultationType: type,
        Price: price,
        Period: duration,
        Renewal: renewal,
        On: visibility,
      };

      return [...prev, newPack];
    });

    // close modal
    setModalOpen(false);
  };

  return (
    <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden">
      <div className="flex max-md:flex-col max-md:gap-3 max-md:items-start justify-between items-center">
        <div>
          <Typography size="h3" as="h3" className="font-bold">
            Consultation Packs
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Create, edit, and monitor prepaid consultation offers.
          </Typography>
        </div>

        {/* ---------------- ADD NEW PACK BUTTON ---------------- */}
        <Button
          onClick={() => {
            setEditMode(false);
            setSelectedPack(null);
            setModalOpen(true);
          }}
          className="flex rounded-lg justify-center bg-primary-color text-white items-center gap-2 font-bold"
        >
          <span>+</span>
          Add New Pack
        </Button>
      </div>

      {/* Stats */}
      <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-md w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full"
          >
            <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center">
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

      {/* ---------------- TABLE ---------------- */}
      <DataTable
        ColumnsData={consultation?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          Name,
          consultationType,
          Specialty,
          Price,
          Status,
          id,
          Qty,
          Period,
          Renewal,
          On,
        }: ConsultationType) => (
          <tr key={id}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Name || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consultationType || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color whitespace-nowrap">
              {Specialty || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Price || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Qty || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Period || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Renewal || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {On || "-"}
            </td>
            {/* <td className="px-4 lg:px-6 py-4">{Status || "-"}</td> */}
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${Status === "Active" ? "text-secondary-color" : Status === "Inactive" ? "" : "text-red"} `}
            >
              {Status || "-"}
            </td>

            <td className="px-4 lg:px-6 py-4 flex gap-2 items-center">
              {/* View */}
              <Icon
                icon="mdi:eye"
                width="20"
                height="20"
                className="cursor-pointer text-primary-color"
                onClick={() => router.push(`/consultation/details?id=${id}`)}
              />

              {/* ---------------- EDIT BUTTON ---------------- */}
              <Icon
                icon="bx:edit"
                width="20"
                height="20"
                className="cursor-pointer text-primary-color"
                onClick={() => {
                  setEditMode(true);
                  setSelectedPack({
                    id,
                    Name,
                    consultationType,
                    Specialty,
                    Price,
                    Status,
                    Qty,
                    Period,
                    Renewal,
                    On,
                  });
                  setModalOpen(true);
                }}
              />
            </td>
          </tr>
        )}
      />

      {/* ---------------- MODAL OPEN HERE ---------------- */}
      <ConsultationPackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editMode ? "Edit Consultation Pack" : "Add Consultation Pack"}
        onSave={handleSave}
        initialQuestion={selectedPack?.Name || ""}
        initialAnswer={selectedPack?.Specialty || ""}
        initialStatus={selectedPack?.Status || "Active"}
        initialConsultations={selectedPack?.Qty?.toString() || ""}
        initialPrice={selectedPack?.Price || ""}
        initialDuration={selectedPack?.Period || ""}
        initialType={selectedPack?.consultationType || ""}
        initialRenewal={selectedPack?.Renewal || ""}
        initialVisibility={selectedPack?.On || ""}
      />
    </div>
  );
};

export default ConsultationPage;
