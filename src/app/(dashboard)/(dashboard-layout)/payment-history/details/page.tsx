"use client";

import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { paymentTable, summaryItems } from "@/data";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import PaymentTimeline from "@/components/shared/time-line";
import { Icon } from "@iconify/react";
import Image from "next/image";

type PaymentRow = {
  id?: string;
  Patient: string;
  Date: string;
  Method: string;
  Order: string;
  Amount: string;
  Status: string;
  Type: string;
  Commission: string;
  Platform: string;
};

const getStatusClasses = (Status: string) => {
  switch (Status) {
    case "Paid":
      return "bg-secondary-color text-white";
    case "Consultation Fee":
      return "bg-primary-color text-white";
    case "Refunded":
      return "bg-[#F2994A] text-white";

    case "Failed":
      return "bg-red text-white";
    default:
      return "text bg-gray-100";
  }
};

const PaymentHistoryDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const payment = (paymentTable.rowsData as PaymentRow[]).find(
    (item) => item?.id?.toString() === id,
  );

  if (!payment) return <p>No data found</p>;

  return (
    <div className="mt-5">
      <div className="flex max-md:flex-col max-md:gap-3 justify-between mb-8">
        <div>
          <Typography size="h3" as="h3" className="font-bold">
            Transaction Details
          </Typography>
          <Typography className="text-desc-color1 font-medium">
            “Detailed payment and refund record
          </Typography>
        </div>
        <div>
          {/* <Button className="flex items-center gap-2 font-bold bg-primary-dark rounded-xl  text-white">
            Download Receipt
          </Button> */}
        </div>
      </div>
      <div className="   space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Typography
            size="h6"
            className="font-bold text-lg text-[#2C2C2C] mb-1"
          >
            Consultation payment
          </Typography>
          <Typography className="text-[#4F4F4F] text-lg font-semibold">
            Appointment id:Adp-1234567
          </Typography>
          <div className="mt-5">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/svg/sehrImg.svg"
                  width={86}
                  height={84}
                  alt="img"
                />
                <div className="space-y-1">
                  <Typography className="text-[#2C2C2C] font-bold">
                    Sehr Ali
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Video Consulation
                  </Typography>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className={`px-5 py-1  font-medium rounded-full ${getStatusClasses(
                    payment.Status,
                  )}`}
                >
                  {payment.Status}
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="basis-[25%] flex justify-between mt-8">
                <div className="space-y-3">
                  <Typography className="text-[#4F4F4F] font-semibold">
                    Patient ID
                  </Typography>
                  <Typography className="text-[#4F4F4F] font-semibold">
                    Transaction Type
                  </Typography>
                  <Typography className="text-[#4F4F4F] font-semibold">
                    Capture Date
                  </Typography>
                </div>
                <div className="space-y-3">
                  <Typography className="text-desc-color font-normal">
                    {payment.Patient}
                  </Typography>
                  <Typography className="text-desc-color font-normal">
                    Consultation
                  </Typography>
                  <Typography className="text-desc-color font-normal">
                    12/02/2024
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Typography size="h6" className="font-bold mb-4">
            Payment Summary
          </Typography>
          <hr className="mb-6" />
          <div className="flex max-md:flex-col gap-10">
            <div className="basis-[40%] max-md:basis-full flex justify-between">
              <div className="space-y-4">
                <Typography className="text-[#4F4F4F] font-semibold">
                  Gross Amount
                </Typography>
                <Typography className="text-[#4F4F4F] font-semibold">
                  Platform Fee
                </Typography>
                <Typography className="text-[#4F4F4F] font-semibold">
                  Doctor Payout
                </Typography>
                <Typography className="text-[#4F4F4F] font-semibold">
                  Pharmacy Payout
                </Typography>
                <Typography className="text-[#4F4F4F] font-semibold">
                  Tax (%)
                </Typography>
                <Typography className="text-[#4F4F4F] font-semibold">
                  Total
                </Typography>
              </div>
              <div className="space-y-4">
                <Typography className="text-desc-color font-medium">
                  $120.00
                </Typography>
                <Typography className="text-desc-color font-medium">
                  $120.00
                </Typography>
                <Typography className="text-desc-color font-medium">
                  $120.00
                </Typography>
                <Typography className="text-desc-color font-medium">
                  $120.00
                </Typography>
                <Typography className="text-desc-color font-medium">
                  $120.00
                </Typography>
                <Typography className="text-desc-color font-medium underline">
                  $120.00
                </Typography>
              </div>
            </div>
            <div className="border-l"></div>
            <div className="basis-[50%] max-md:basis-full space-y-4">
              <div className="flex items-center gap-2 border  rounded-xl p-3">
                <Icon
                  className="text-primary-color"
                  icon="solar:card-bold"
                  width={40}
                  height={40}
                />
                <Typography className="text-lg font-semibold text-gray-700">
                  Visa ............4021
                </Typography>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-[#A7A7A733] py-4">
                <Typography className="text-lg font-bold text-desc-color">
                  Download Receipt
                </Typography>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-[#A7A7A733] py-4">
                <Typography className="text-lg font-bold text-desc-color">
                  Download Payment Pdf
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl">
          <PaymentTimeline />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryDetails;
