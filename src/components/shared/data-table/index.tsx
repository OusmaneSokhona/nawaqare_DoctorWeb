import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { FC, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

import { useAppSelector } from "@/redux/hooks";
import { DataFilterTableProps } from "@/types";
import { applySortFilter } from "@/utils/search-filter";
import Iconify from "../iconify";
import { Typography } from "../typography";

const DataTable: FC<DataFilterTableProps> = ({
  invoice,
  notFonudText,
  headerBg = "",
  paginate = false,
  loading = false,
  tableRows = [],
  rowsPerPage = 5,
  ColumnsData = [],
  TableBodyRow,
  roundedHeader = false,
  headerClassName = "",
  headerChildClassName = "",
  tablehead = true, // ✅ default true
  headerPosition,
  meta = { totalItems: 0, itemsPerPage: 5, currentPage: 1, totalPages: 1 },
  setCurrentPage,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const appState = useAppSelector((state) => state.app);

  const filteredRows = useMemo(
    () => applySortFilter(tableRows, appState.filterName),
    [tableRows, appState.filterName],
  );

  const isTableEmpty = useMemo(
    () => tableRows.length === 0 && !loading,
    [tableRows, loading],
  );

  const isFilterNotFound = useMemo(
    () => !isTableEmpty && filteredRows.length === 0 && !!appState.filterName,
    [appState.filterName, filteredRows.length, isTableEmpty],
  );

  const handleSort = (columnId: string, isSortable: boolean) => {
    if (!isSortable) return;

    setSortConfig((prev) => {
      if (prev?.key === columnId) {
        return {
          key: columnId,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnId, direction: "asc" };
    });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig]);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handlePageChange = (newPage: { selected: number }) => {
    if (setCurrentPage) {
      setCurrentPage(newPage.selected + 1);
    }
  };

  return (
    <div className="w-full rounded-2xl p-4 md:px-6 bg-background-color4">
      <div className="w-full flex flex-col overflow-auto min-h-[25rem] data-table-scrollable">
        <table className="min-w-[900px] md:min-w-full">
          <thead
            className={`${roundedHeader ? "rounded-lg" : ""} border-b-[3px] border-[#374ea2]/20 ${headerPosition} ${headerBg} text-black`}
          >
            <tr>
              {ColumnsData?.map((column, index) => (
                <th
                  key={index}
                  onClick={() =>
                    column.sortable &&
                    handleSort(column.id, column.sortable ?? false)
                  }
                  className={`px-4 lg:px-6 py-4 font-bold whitespace-nowrap tracking-wider ${headerClassName} ${
                    column?.id === "action" ? "opacity-0" : ""
                  } text-lg ${roundedHeader && index === 0 ? "rounded-l-lg" : ""} ${
                    roundedHeader && index === ColumnsData.length - 1
                      ? "rounded-r-lg"
                      : ""
                  } ${column.sortable ? "cursor-pointer select-none" : ""} ${
                    invoice
                      ? index === 0
                        ? "text-start"
                        : "text-center"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-center ${headerChildClassName} ${invoice ? (index === 0 ? "justify-start" : "justify-center") : ""}`}
                  >
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col justify-center gap-0 items-center">
                        <Iconify
                          icon="raphael:arrowup"
                          height="10"
                          width="20"
                        />
                        <Iconify
                          icon="raphael:arrowdown"
                          height="10"
                          width="20"
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!loading &&
              sortedRows?.map((row, idx) => (
                <TableBodyRow
                  key={row._id || row.id || `row-${idx}`}
                  {...row}
                  idx={idx}
                />
              ))}
            {loading &&
              [...Array(rowsPerPage)].map((_, idx) => (
                <tr key={`loading-row-${idx}`}>
                  {[...Array(ColumnsData.length)].map((_, index) => (
                    <td
                      key={`loading-cell-${idx}-${index}`}
                      className="px-4 py-7 text-primary-text text-md"
                    >
                      <div className="w-full h-4 bg-light-gray rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>

          {(isFilterNotFound || isTableEmpty) && (
            <tbody className="h-full">
              <tr className="h-full">
                <td
                  colSpan={ColumnsData.length}
                  className="h-[25rem] align-middle"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Image
                      src="/assets/svg/no-data.svg"
                      alt="no-data"
                      width={124}
                      height={124}
                    />
                    <Typography size="lg" className="font-bold text-light-gray">
                      {notFonudText ? notFonudText : "No data found"}
                    </Typography>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      {!isFilterNotFound &&
        !isTableEmpty &&
        paginate &&
        !loading &&
        tableRows.length > 0 && (
          <div className="w-full border-t border-[#374ea2]/20 px-6 py-4 flex items-center justify-between text-sm">
            {/* LEFT: PAGINATION */}
            <div className="flex items-center gap-2">
              <ReactPaginate
                pageCount={meta.totalPages}
                onPageChange={handlePageChange}
                forcePage={meta.currentPage - 1}
                breakLabel="..."
                pageRangeDisplayed={8}
                marginPagesDisplayed={1}
                previousLabel={
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100">
                    <Icon icon="mdi:arrow-left" width="16" />
                  </div>
                }
                nextLabel={
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100">
                    <Icon icon="mdi:arrow-right" width="16" />
                  </div>
                }
                containerClassName="flex items-center gap-1"
                pageClassName="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 cursor-pointer hover:bg-gray-100"
                activeClassName="bg-primary-color text-white"
                breakClassName="w-8 h-8 flex items-center justify-center text-gray-400"
              />
            </div>

            {/* CENTER: RESULT TEXT */}
            <div className="text-gray-500 whitespace-nowrap">
              {(meta.currentPage - 1) * meta.itemsPerPage + 1} –{" "}
              {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)}{" "}
              of {meta.totalItems}
            </div>

            {/* RIGHT: ROWS PER PAGE */}
            <div className="flex items-center gap-2 text-gray-500">
              <span>Rows per page</span>
              <select
                className="border rounded-md px-2 py-1 text-sm focus:outline-none"
                value={meta.itemsPerPage}
                disabled
              >
                <option>10</option>
              </select>
            </div>
          </div>
        )}
    </div>
  );
};

export default DataTable;
