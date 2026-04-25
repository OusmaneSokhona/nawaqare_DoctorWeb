"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { pending } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { pendingTable } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import AddMedicationTemplateModal from "@/components/ui/modals/template";

const Pending = () => {
  const router = useRouter();

  /* ---------------- TABLE DATA (🔥 MAIN FIX) ---------------- */
  const [tableData, setTableData] = useState<any[]>(pendingTable.rowsData);

  /* ---------------- FILTER STATES ---------------- */
  const [templateFilter, setTemplateFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  /* ---------------- MODAL STATES ---------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredData = useMemo(() => {
    let filtered = [...tableData];

    // TEMPLATE NAME FILTER
    if (templateFilter !== "All") {
      filtered = filtered.filter((row) => row.name === templateFilter);
    }

    // CATEGORY FILTER
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (row) => row.Category?.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    return filtered;
  }, [templateFilter, categoryFilter, tableData]);

  return (
    <div className="bg-white rounded-2xl p-4">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex justify-between items-center mb-2 mt-4 px-6">
        <div className="flex gap-3">
          <div
            className="relative bg-[#EAEEF7] px-6 py-3 rounded-xl cursor-pointer"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <Typography className="font-bold text-left">
              {categoryFilter === "All" ? "Category" : categoryFilter}
            </Typography>

            {isCategoryOpen && (
              <div className="absolute top-12 left-0 bg-white shadow rounded-md w-44 z-20">
                {["All", "Hypertension", "Pain Relief"].map((cat) => (
                  <p
                    key={cat}
                    className="px-3 py-2 hover:bg-gray-100 text-left cursor-pointer"
                    onClick={() => {
                      setCategoryFilter(cat);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {cat}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div
            className="relative bg-[#EAEEF7] px-6 py-3 rounded-xl cursor-pointer flex items-center justify-start min-w-[220px]"
            onClick={() => setIsTemplateOpen(!isTemplateOpen)}
          >
            <Typography className="font-bold text-left w-full">
              {templateFilter === "All" ? "Template Name" : templateFilter}
            </Typography>

            {isTemplateOpen && (
              <div className="absolute top-12 left-0 bg-white shadow rounded-md w-full z-20">
                {["All", "Personal Templates", "Platform Templates"].map(
                  (name) => (
                    <p
                      key={name}
                      className="px-3 py-2 hover:bg-gray-100 text-left cursor-pointer"
                      onClick={() => {
                        setTemplateFilter(name);
                        setIsTemplateOpen(false);
                      }}
                    >
                      {name}
                    </p>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Export Button (disabled / grey) */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed">
            <Icon icon="material-symbols:upload-rounded" width={18} />
            <Typography size="sm" className="font-medium">
              Export CSV / PDF
            </Typography>
          </div>

          {/* ADD BUTTON */}
          <div
            className="bg-primary-color px-6 py-3 rounded-xl cursor-pointer"
            onClick={() => router.push("/prescriptions/add")}
          >
            <Typography className="text-white font-semibold">
              Add New Template
            </Typography>
          </div>
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <DataTable
        key={tableData.length}
        ColumnsData={pendingTable.ColumnsData}
        tableRows={filteredData}
        roundedHeader
        paginate
        TableBodyRow={({ id, name, Includes, Date, Category }: pending) => (
          <tr key={id}>
            <td className="px-6 py-4 text-start text-desc-color">{name}</td>
            <td className="px-6 py-4 text-start text-desc-color">{Includes}</td>
            <td className="px-6 py-4 text-start text-desc-color">{Date}</td>
            <td className="px-6 py-4 text-primary-color text-start">
              {Category}
            </td>
            <td className="px-6 py-4 flex gap-2">
              <Icon
                icon="material-symbols:format-list-bulleted-rounded"
                width="20"
                className="cursor-pointer text-primary-color"
                onClick={() =>
                  router.push(`/prescriptions/template-details?id=${id}`)
                }
              />
              <Icon
                icon="material-symbols:edit-square-outline-rounded"
                width="22"
                className="cursor-pointer text-primary-color"
                onClick={() => router.push(`/prescriptions/edit`)}
                // onClick={() => {
                //   setModalMode("edit");
                //   setSelectedTemplate({
                //     id,
                //     templateName: name,
                //     medicationName: Includes,
                //     category: Category,
                //   });
                //   setIsModalOpen(true);
                // }}
              />
            </td>
          </tr>
        )}
      />

      {/* ---------------- MODAL ---------------- */}
      <AddMedicationTemplateModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedTemplate}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (modalMode === "add") {
            setTableData((prev) => [
              {
                id: Date.now(),
                name: data.templateName,
                Includes: data.medicationName,
                Category: data.category,
                Date: "01/01/2026",
                Status: "Pending",
              },
              ...prev,
            ]);
          } else {
            setTableData((prev) =>
              prev.map((row) =>
                row.id === selectedTemplate.id
                  ? {
                      ...row,
                      name: data.templateName,
                      Includes: data.medicationName,
                      Category: data.category,
                    }
                  : row,
              ),
            );
          }

          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Pending;
