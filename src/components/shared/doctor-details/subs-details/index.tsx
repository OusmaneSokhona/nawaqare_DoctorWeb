import React, { useState } from "react";
import DataTable from "../../data-table";
import { docPrescription, subscriptions } from "@/data";
import { useRouter } from "next/navigation";
import { SubscriptonsType } from "@/types/dashboard";
import Image from "next/image";
import { Typography } from "../../typography";

const SubscriptionDetail = () => {
  const [customFilter, setCustomFilter] = useState("");
  const [filteredPatientData, setFilteredPatientData] = useState(
    subscriptions?.RowsData,
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredPatientData(subscriptions?.RowsData);
    } else {
      const filteredData = subscriptions?.RowsData;
      // const filteredData = subscriptions?.RowsData.filter(
      //   (row) => row.status === filter
      // );
      setFilteredPatientData(filteredData);
    }
    setCurrentPage(1);
  };
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

  const router = useRouter();
  return (
    <div className="mt-5">
      <DataTable
        ColumnsData={subscriptions?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          plan,
          fee,
          sdate,
          edate,
          status,
          id,
        }: SubscriptonsType) => (
          <tr key={id} className="">
            <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
              {plan || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
              {fee || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
              {sdate || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-xs whitespace-nowrap text-desc-color">
              {edate || "-"}
            </td>
            <td
              className={`px-4 lg:px-6 py-4 text-start text-xs ${status === "Active" ? "text-secondary-color" : "text-tertiary-color"} text-desc-color`}
            >
              {status || "-"}
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default SubscriptionDetail;
