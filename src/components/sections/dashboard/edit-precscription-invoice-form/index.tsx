"use client";

import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/shared/button";
import Container from "@/components/shared/container";
import Iconify from "@/components/shared/iconify";
import InputTextField from "@/components/shared/input-fields/input-text-field";
import Tooltip from "@/components/shared/tool-tip";
import { Typography } from "@/components/shared/typography";
import { calculateFinalTotal } from "@/types";
import { FormDetails } from "@/types/dashboard";
import { applyLimits, validateNumericInput } from "@/utils/helper-function";

const EditPrescriptionInvoiceForm = ({
  formDetails,
  DetailsColumnsData,
  setChatWithDoctorModal,
}: {
  formDetails: FormDetails;
  DetailsColumnsData: { id: string; label: string }[];
  setChatWithDoctorModal: (value: boolean) => void;
}) => {
  // to keep track of table data
  const [tableData, setTableData] = useState(formDetails?.drugs || []);
  // to use debounce hook table data
  const debouncedTableData = useDebounce(tableData, 2000);
  // to keep track of amounts
  const [amounts, setAmounts] = useState({
    shipping: 0,
    discount: 0,
    tax: 0,
  });
  // to keep track of active row and column
  const [activerow, setActiveRow] = useState({
    activeRowId: null,
    activeColumnId: null,
  });

  // to update table data on change and after each change in table null the active row & column
  useEffect(() => {
    setTableData(debouncedTableData);
    setActiveRow({ activeRowId: null, activeColumnId: null });
  }, [debouncedTableData]);

  // onchange function to handle input change in the table
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: any,
    columnId: any,
  ) => {
    const row = tableData.find((v) => v.id === rowId);
    if (!row) return;

    const newValue = validateNumericInput(e.target.value, {
      allowLeadingZero: !!row?.unitprice,
      maxLength: 5,
    });

    if (newValue === "" || !isNaN(parseFloat(newValue))) {
      setTableData((prevData) =>
        prevData?.map((row) =>
          row.id === rowId
            ? {
                ...row,
                [columnId]: newValue,
                ...(columnId === "qty" || columnId === "unitprice"
                  ? {
                      totalprice: `$${(parseFloat(newValue) || 0) * (parseFloat(row.qty) || 0)}`,
                    }
                  : {}),
              }
            : row,
        ),
      );
    }

    // to set active row and column when click in table unit price
    setActiveRow({
      activeRowId: rowId,
      activeColumnId: columnId,
    });
  };

  // function to handle amount change shipping discount tax
  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "shipping" | "discount" | "tax",
  ) => {
    const allowZero = ["discount", "tax"].includes(type);
    const newValue = validateNumericInput(e.target.value, {
      allowZero,
      allowLeadingZero: true,
    });

    // Handle trailing decimal
    if (newValue.endsWith(".")) {
      setAmounts((prev) => ({ ...prev, [type]: newValue }));
      return;
    }

    // Explicitly allow "0"
    if (newValue === "0") {
      setAmounts((prev) => ({ ...prev, [type]: "0" }));
      return;
    }

    // Process valid numbers
    if (newValue && newValue !== ".") {
      const parsedValue = parseFloat(newValue);
      setAmounts((prev) => ({
        ...prev,
        [type]: isNaN(parsedValue)
          ? newValue
          : applyLimits(parsedValue, type).toString(),
      }));
      return;
    }

    // Handle empty input
    setAmounts((prev) => ({ ...prev, [type]: newValue }));
  };

  // function to change icon on base of availability
  const toggleAvailability = (rowId: string) => {
    setTableData((prevData) =>
      prevData?.map((item) =>
        item.id === rowId ? { ...item, isAvailable: !item.isAvailable } : item,
      ),
    );
  };

  // function to calculate total sum of colums
  const calculateTotalSum = () => {
    return tableData.reduce((sum, row) => {
      if (!row.isAvailable) return sum;

      const qty = parseFloat(row.qty) || 0;
      const unitprice = parseFloat(row.unitprice) || 0;
      return sum + qty * unitprice;
    }, 0);
  };
  const totalColumnSum = calculateTotalSum();

  // function to calculate final total
  const calculateFinalTotal = ({
    totalColumnSum,
    shippingAmount,
    discountPercentage,
    taxPercentage,
  }: calculateFinalTotal) => {
    const discountAmount = totalColumnSum * (discountPercentage / 100);
    const taxAmount = totalColumnSum * (taxPercentage / 100);
    const finalTotal =
      totalColumnSum +
      (parseFloat(shippingAmount.toString()) || 0) -
      discountAmount +
      taxAmount;
    return finalTotal.toFixed(2);
  };

  const finalTotal = calculateFinalTotal({
    totalColumnSum,
    shippingAmount: amounts.shipping,
    discountPercentage: amounts.discount,
    taxPercentage: amounts.tax,
  });

  const isDisabledAmount = totalColumnSum === 0 ? true : false;
  return (
    <Container>
      <div className="flex sm:flex-row flex-col justify-between w-full">
        <div className="sm:w-[50%] w-full flex md:flex-row flex-col items-baseline gap-4 lg:gap-2 sm:p-10 p-5">
          <div className="w-[16%]">
            <Typography
              size={"lg"}
              as={"p"}
              className="text-primary-dark font-bold"
            >
              Clinic:
            </Typography>
          </div>
          <div className="w-[84%] flex flex-col gap-3">
            {formDetails?.clinic_details?.map((clinic, index) => (
              <div key={index} className="">
                <Typography
                  size={"md"}
                  as={"p"}
                  className="text-primary-text font-semibold"
                >
                  {clinic.clinicname}
                </Typography>

                <Typography size={"md"} as={"p"} className="text-dark-gray">
                  {clinic.email}
                </Typography>
                <Typography size={"md"} as={"p"} className="text-dark-gray">
                  {clinic.address}
                </Typography>
                <Typography size={"md"} as={"p"} className="text-dark-gray">
                  {clinic.phone}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full sm:w-[1px] bg-light-gray h-auto" />
        <div className="sm:w-[50%] w-full flex md:flex-row flex-col items-baseline gap-4 lg:gap-2 sm:p-10 p-5">
          <div className="w-[16%]">
            <Typography
              size={"lg"}
              as={"p"}
              className="text-primary-dark font-bold"
            >
              Patient:
            </Typography>
          </div>
          <div className="w-[84%] flex flex-col gap-3">
            {formDetails?.patient_details?.map((patient, index) => (
              <div key={index} className="">
                <Typography
                  size={"md"}
                  as={"p"}
                  className="text-primary-text font-semibold"
                >
                  {patient.patientname}
                </Typography>
                <Typography
                  size={"md"}
                  as={"p"}
                  className="text-dark-gray font-semibold"
                >
                  {patient.dob}
                </Typography>
                <Typography size={"md"} as={"p"} className="text-dark-gray">
                  {patient.email}
                </Typography>
                <Typography size={"md"} as={"p"} className="text-dark-gray">
                  {patient.address}
                </Typography>
                <Typography size={"md"} as={"p"} className="text-dark-gray">
                  {patient.phone}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="bg-light-gray" />
      <Typography
        size={"xl"}
        as={"p"}
        className="text-primary-dark font-bold py-5 sm:px-10 px-5"
      >
        Details:
      </Typography>

      <div className="overflow-x-auto data-table-scrollable">
        <table className="w-full">
          <thead className={` bg-primary-gradient text-white`}>
            <tr>
              {DetailsColumnsData?.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 lg:px-6 py-4 font-bold whitespace-nowrap tracking-wider ${
                    column?.id === "action" ? "opacity-0" : ""
                  } text-md ${index === 0 ? "rounded-l-lg" : ""} ${index === DetailsColumnsData.length - 1 ? "rounded-r-lg" : ""}`}
                >
                  <div
                    className={`flex items-center ${index === 0 ? "justify-start pl-4" : "justify-center"}`}
                  >
                    {column.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, index) => {
              return (
                <tr key={index} className="align-middle">
                  {DetailsColumnsData?.map(
                    (column: { id: string }, index: number) => {
                      const qty = parseFloat(row.qty) || 0;
                      const unitprice = parseFloat(row.unitprice) || 0;
                      const totalprice = `$${(qty * unitprice).toFixed(2)}`;

                      return (
                        <td
                          key={column.id}
                          className={`py-4 border-r last:border-r-0 border-l first:border-l-0 border-b border-light-gray
                        ${index === 0 ? "text-left pl-6 w-[20%]" : "text-center"} ${row.isAvailable ? "text-primary-text" : "text-dark-gray"}
              
                        align-middle
                      `}
                        >
                          <div
                            className={` ${
                              column.id === "unitprice"
                                ? "min-w-[100px] sm:w-[50%] px-2 sm:px-0 h-12 mx-auto rounded-lg flex flex-col justify-center"
                                : column.id === "nameofdrug"
                                  ? "pl-4"
                                  : ""
                            }`}
                          >
                            {column.id === "unitprice" ? (
                              <InputTextField
                                className={`w-full h-full text-center bg-transparent outline-none `}
                                value={
                                  row[column.id] ? `$${row[column.id]}` : "$"
                                }
                                onChange={(e) => {
                                  e.preventDefault();
                                  handleInputChange(e, row.id, column.id);
                                }}
                                autoFocus={
                                  activerow.activeRowId === row.id &&
                                  activerow.activeColumnId === column.id
                                }
                                disabled={!row.isAvailable}
                                inputHeigth="h-[50px]"
                                textColor={`${row.isAvailable ? "!text-primary-text" : "!text-dark-gray"}`}
                              />
                            ) : column.id === "icon" ? (
                              <Iconify
                                icon={
                                  row.isAvailable
                                    ? "icons8:minus"
                                    : "icons8:plus"
                                }
                                width={25}
                                height={25}
                                className={`font-bold cursor-pointer ${row.isAvailable ? "text-red" : "text-primary-dark"}`}
                                onClick={() => toggleAvailability(row.id)}
                              />
                            ) : column.id === "totalprice" ? (
                              row.isAvailable ? (
                                totalprice
                              ) : (
                                "--"
                              )
                            ) : column.id in row ? (
                              row[column.id as keyof typeof row]
                            ) : (
                              "--"
                            )}
                          </div>
                        </td>
                      );
                    },
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="sm:p-10 p-4 w-full flex sm:flex-row flex-col-reverse justify-between">
        <div className="lg:w-[70%] sm:w-[50%] w-full flex flex-col gap-5 sm:pt-0 pt-5">
          <div className="">
            <Typography
              size={"lg"}
              as={"p"}
              className="text-primary-dark font-bold leading-8"
            >
              DR. Registration No.
            </Typography>
            <Typography
              size={"md"}
              as={"p"}
              className="text-dark-gray font-bold"
            >
              938273849
            </Typography>
          </div>
          <div className="flex gap-2 items-start">
            <div
              className="flex gap-2 items-start cursor-pointer"
              onClick={() => setChatWithDoctorModal(true)}
            >
              <Iconify
                icon="material-symbols:chat-outline"
                width={25}
                height={25}
                className=" text-primary-dark font-bold"
              />
              <Typography
                size={"lg"}
                as={"p"}
                className="text-primary-dark font-bold underline"
              >
                Chat With Doctor{" "}
              </Typography>
            </div>
            <Tooltip
              message="Lorem Ipsum is simply dummy text of the printing"
              trigger="hover"
            >
              <Iconify
                icon="mdi:information-outline"
                width={20}
                height={20}
                className="text-dark-gray cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>
        <div className="lg:w-[30%] sm:w-[50%] w-full flex flex-col gap-3">
          <div className="flex gap-2 justify-between items-baseline">
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-dark" : "text-dark-gray"} font-semibold text-left sm:text-right w-[30%]`}
            >
              Sub Total
            </Typography>
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-text" : "text-dark-gray"} text-center font-semibold w-[40%] sm:w-[26%]`}
            >
              ${totalColumnSum ? totalColumnSum : 0.0}
            </Typography>
          </div>
          <div className="flex gap-2 justify-between items-baseline">
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-dark" : "text-dark-gray"} font-semibold text-left sm:text-right w-[30%]`}
            >
              Shipping
            </Typography>
            <div className="w-[40%] sm:w-[26%]">
              <InputTextField
                className=" text-center bg-transparent outline-none border border-light-gray p-2 "
                name="shipping"
                disabled={isDisabledAmount}
                value={amounts.shipping ? `$ ${amounts.shipping}` : "$"}
                onChange={(e) => handleAmountChange(e, "shipping")}
                inputHeigth="h-[30px]"
                textColor={`${!isDisabledAmount ? "!text-primary-text" : "!text-dark-gray"}`}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between items-baseline">
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-dark" : "text-dark-gray"} font-semibold text-left sm:text-right w-[30%]`}
            >
              Discount%
            </Typography>
            <div className="w-[40%] sm:w-[26%]">
              <InputTextField
                className=" text-center bg-transparent outline-none border border-light-gray p-2 "
                name="discount"
                disabled={isDisabledAmount}
                value={amounts.discount ? `% ${amounts.discount}` : "%"}
                onChange={(e) => handleAmountChange(e, "discount")}
                inputHeigth="h-[30px]"
                textColor={`${!isDisabledAmount ? "!text-primary-text" : "!text-dark-gray"}`}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between items-baseline">
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-dark" : "text-dark-gray"} font-semibold text-left sm:text-right w-[30%]`}
            >
              Tax%
            </Typography>
            <div className="w-[40%] sm:w-[26%]">
              <InputTextField
                className=" text-center bg-transparent outline-none border border-light-gray "
                name="tax"
                disabled={isDisabledAmount}
                value={amounts.tax ? `% ${amounts.tax}` : "%"}
                onChange={(e) => handleAmountChange(e, "tax")}
                inputHeigth="h-[30px]"
                textColor={`${!isDisabledAmount ? "!text-primary-text" : "!text-dark-gray"}`}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between items-baseline">
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-dark" : "text-dark-gray"} font-semibold text-left sm:text-right w-[30%]`}
            >
              Total
            </Typography>
            <Typography
              size={"lg"}
              as={"p"}
              className={`${!isDisabledAmount ? "text-primary-text" : "text-dark-gray"} font-semibold text-center w-[40%] sm:w-[26%]`}
            >
              ${finalTotal ? finalTotal : 0.0}
            </Typography>
          </div>
        </div>
      </div>

      <div className="w-full sm:px-10 px-4 py-7 flex xs:flex-row flex-col gap-2 items-baseline border-y border-light-gray">
        <Typography
          size={"lg"}
          as={"p"}
          className="text-primary-dark font-bold "
        >
          Comment:
        </Typography>
        <Typography
          size={"md"}
          as={"p"}
          className="text-dark-gray font-semibold "
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s,
        </Typography>
      </div>
      <div className="flex sm:flex-row flex-col justify-end items-center lg:w-[50%] md:w-[60%] sm:w-[90%] w-full gap-3 py-8 px-4 sm:px-6 md:px-8 float-end">
        <div className="sm:w-[36%] w-full">
          <Button
            variant="outlined"
            size="medium"
            className="w-full text-dark-gray"
          >
            Cancel
          </Button>
        </div>
        <div className="sm:w-[36%] w-full">
          <Button
            onClick={() => {}}
            variant="primary"
            size="medium"
            className="w-full"
            disabled={isDisabledAmount}
          >
            Send To Patient
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(EditPrescriptionInvoiceForm);
