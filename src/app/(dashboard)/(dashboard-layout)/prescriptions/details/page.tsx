"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { prescriptionTable } from "@/data";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import PrescriptionTimeline from "../pre-timeline";
import { PrescriptionDetail, PrescriptionRow } from "@/types";

type prescription =
  | {
      id?: string;
      Patient: string;
      Date: string;
      Method: string;
      Order: string;
      Amount: string;
      Status: string;
      Pharmacy: string;
    }
  | {
      id?: string;
      Patient: string;
      Date: string;
      img: string;
      Activity: string;
      Description: string;
      Medication: string;
      Pharmacy: string;
      Doctor: string;
      Status: string;
      Method: string;
    };

const PrescriptionDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // const prescription = (prescriptionTable.rowsData as prescription[]).find(
  //   (item) => item?.id?.toString() === id,
  // );

  const rows = prescriptionTable.rowsData as PrescriptionRow[];

  const prescription: PrescriptionDetail | undefined = rows
    .map((item) => ({
      id: item.id,
      Patient: item.Patient,
      Date: item.Date,
      Activity: item.type,
      Description: item.Prescription,
      Medication: item.Medication,
      Pharmacy: item.Pharmacy,
      Doctor: item.Doctor,
      Status: item.validation,
      Method: item.delivery,
    }))
    .find((item) => item.id === id);

  if (!prescription) return <p>No data found</p>;

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Rejected":
        return "bg-red text-white";
      case "Active":
        return "bg-secondary-color text-white";
      case "Awaiting Pharmacy":
        return "bg-[#F2994A] text-white";
      case "Delivered":
        return "bg-[#E0F3FF] text-[#2F80ED]";
      default:
        return "bg-[#F2F2F2] text-[#4F4F4F]";
    }
  };

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex max-md:flex-col max-md:gap-3 justify-between mb-8">
        <div>
          <Typography size="h3" as="h3" className="font-bold">
            Prescriptions
          </Typography>
          {/* <Typography className="text-desc-color1 font-medium">
            Issued on: Oct 12, 2025 – Valid until: Nov 12, 2025
          </Typography> */}
        </div>
        <div className="flex gap-2">
          {/* <button
            className={`px-8 py-2 font-bold rounded-full ${getStatusClasses(
              prescription.Status,
            )}`}
          >
            {prescription.Status}
          </button> */}
          <div className="bg-[#DEDCE7] w-[173px] cursor-pointer flex items-center py-4 rounded-xl justify-center">
            <Typography className="text font-bold">Download PDF</Typography>
          </div>
          <div className="bg-primary-color w-[173px] cursor-pointer flex items-center py-4 rounded-xl justify-center">
            <Typography className="text-white font-bold">
              View Final Prescription
            </Typography>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className=" max-md:p-5 space-y-4">
        <div className="rounded-xl border bg-white">
          <div className="flex max-md:flex-col max-md:gap-3 justify-between px-10 pt-5">
            <div>
              <Typography size="h3" as="h3" className="font-bold">
                Patient ID {prescription.Patient}
              </Typography>
              <Typography className="text-desc-color1 font-medium">
                Issued on: Oct 12, 2025 – Valid until: Nov 12, 2025”
              </Typography>
            </div>
            <div>
              <button
                className={`px-8 py-2 font-bold rounded-lg ${getStatusClasses(
                  prescription.Status,
                )}`}
              >
                {prescription.Status}
              </button>
            </div>
          </div>
          <div className="flex max-md:flex-col gap-10 p-10 max-md:p-5 ">
            <div className="basis-[50%] max-md:basis-full">
              <Typography
                size="h5"
                className="font-bold underline text-[#2c2c2c]"
              >
                Prescription Details
              </Typography>
              <div className="flex max-md:gap-3 mt-10">
                <div className="basis-[50%] max-md:basis-full space-y-3">
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Prescription for
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Dosage
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Duration
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Quantity
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Medication
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Dosage instruction
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Refill until
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Renewal
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Remaining
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Next
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Last
                  </Typography>
                </div>
                <div className="basis-[50%] max-md:basis-full space-y-4">
                  <Typography className="text-desc-color font-medium">
                    Migraine without aura
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    2 tablets
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    2 tablets
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    2 tablets
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Amoxicillin 500mg
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    1 tablet, twice daily after meals
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Oct 15,2025
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Allowed
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    2 out of 3
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Oct 15,2025
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Oct 15,2025
                  </Typography>
                </div>
              </div>
            </div>
            <div className="basis-[50%] max-md:basis-full">
              <Typography
                size="h5"
                className="font-bold underline text-[#2c2c2c]"
              >
                {" "}
                Patient Information
              </Typography>
              <div className="flex mt-10">
                <div className="basis-[50%] max-md:basis-full space-y-3">
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Patient ID
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Full Name:
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    {" "}
                    Age:
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Weight
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Phone
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Gender
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Address
                  </Typography>
                  <Typography
                    size="lg"
                    className="font-semibold text-[#4F4F4F]"
                  >
                    Status
                  </Typography>
                </div>
                <div className="basis-[50%] max-md:basis-full space-y-4">
                  <Typography className="text-desc-color font-medium">
                    #12**4589
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Alexis J.
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    34 years
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    72 kg
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    +221 XX XXX XX XX
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Male
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Elite Ortho Clinic, USA
                  </Typography>
                  <Typography className="text-desc-color font-medium">
                    Active
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex max-md:flex-col gap-10 pt-10">
          <div className="basis-[50%] p-10 max-md:p-5 rounded-xl border bg-white max-md:basis-full">
            <Typography size="h5" className="font-bold  text-[#2c2c2c]">
              Source consultation: <span className="text-lg">#12345678678</span>
            </Typography>
            <Typography className="text-desc-color font-medium pt-1">
              Issued on: Oct 12, 2025 – Valid until: Nov 12, 2025”
            </Typography>
            <Typography
              size="h6"
              className="font-semibold underline text-[#2c2c2c] mt-6"
            >
              Consultation Details
            </Typography>
            <div className="flex mt-3">
              <div className="basis-[50%] max-md:basis-full space-y-3">
                <Typography size="lg" className="font-semibold text-[#4F4F4F]">
                  Type
                </Typography>
                <Typography size="lg" className="font-semibold text-[#4F4F4F]">
                  Reason
                </Typography>
                <Typography size="lg" className="font-semibold text-[#4F4F4F]">
                  Diagnosis
                </Typography>
                <Typography size="lg" className="font-semibold text-[#4F4F4F]">
                  Justification
                </Typography>
                {/* <Typography size='lg' className="font-semibold text-primary-color underline">View consultation</Typography> */}
              </div>
              <div className="basis-[50%] space-y-4">
                <Typography className="text-desc-color font-medium">
                  Teleconsultation
                </Typography>
                <Typography className="text-desc-color font-medium">
                  High Fever
                </Typography>
                <Typography className="text-desc-color font-medium">
                  Migraine without aura (G43.0)
                </Typography>
                <Typography className="text-desc-color font-medium">
                  Acute attack, empirical treatment
                </Typography>
              </div>
            </div>
            <Typography
              size="lg"
              className="font-semibold text-primary-color mt-3 underline"
            >
              View consultation
            </Typography>
          </div>
          <div className="basis-[50%] p-10 max-md:p-5 rounded-xl border bg-white max-md:basis-full">
            <Typography size="h5" className="font-bold  text-[#2c2c2c]">
              SAFETY ALERTS
            </Typography>

            <div className="mt-6 space-y-3">
              <div className="flex gap-2 items-center">
                <Icon
                  className="text-yellow-300"
                  icon="material-symbols:warning"
                  width={20}
                  height={20}
                />
                <Typography size="lg" className="font-medium text-desc-color">
                  Patient Allergies: Penicillin (severe)
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon
                  className="text-yellow-300"
                  icon="material-symbols:warning"
                  width={20}
                  height={20}
                />
                <Typography size="lg" className="font-medium text-desc-color">
                  Interactions: With Warfarin (ongoing)
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Icon
                  className="text-yellow-300"
                  icon="material-symbols:warning"
                  width={20}
                  height={20}
                />
                <Typography size="lg" className="font-medium text-desc-color">
                  Contraindications: None
                </Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Typography size="lg" className="font-medium text-desc-color">
                  {" "}
                  ✓ Checks performed: Yes
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Typography size="h5" className="font-bold underline text-[#2c2c2c] ">
            Electronique sign
          </Typography>
          <div className="px-3 py-5 space-y-1 rounded-xl border mt-3 bg-white">
            <div className="space-y-1">
              <Typography size="lg" className="text-[#2c2c2c] font-semibold">
                Dr. sarah
              </Typography>
              <Typography className="font-medium text-desc-color">
                Signature ID#12345678678
              </Typography>
            </div>
            <Typography className="font-medium text-desc-color">
              {" "}
              <span className="text-[#2c2c2c] font-semibold">Note:</span> This
              digital prescription is generated and signed by a verified
              practitioner
            </Typography>
            <Typography className="text-[#2c2c2c] font-semibold">
              12/10/2025 at 14:32:15
            </Typography>
            <div className="flex justify-between items-center max-md:flex-col gap-2">
              <Typography className="text-[#2c2c2c] font-semibold">
                Certificate:{" "}
                <span className="text-secondary-color font-medium">
                  Valid ✓
                </span>{" "}
              </Typography>
              <div className="flex gap-2 items-center">
                <Typography className="underline font-semibold text-[#828282]">
                  Download certificate
                </Typography>
                <Typography className="underline font-semibold text-primary-color">
                  View details
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Typography size="h5" className="font-bold underline text-[#2c2c2c]">
            CLINICAL NOTES – Medical Follow-up
          </Typography>
          <div className="px-3 py-5 space-y-1  rounded-xl border mt-3 bg-white">
            <div className="flex gap-2 items-center">
              <Icon
                className="text-primary-color"
                icon="grommet-icons:notes"
                width={16}
                height={16}
              />
              <Typography className="text-[#2c2c2c] font-semibold">
                Notes for medical record:
              </Typography>
            </div>
            <Typography className="text-desc-color font-medium">
              "Symptoms improved, headache frequency reduced from 5 to 2/week.
              Continue treatment and maintain sleep hygiene."
            </Typography>
          </div>
        </div>
        <div className="pt-6">
          <Typography size="h5" className="font-bold underline text-[#2c2c2c]">
            PATIENT INSTRUCTIONS – Overview
          </Typography>
          <div className="px-3 py-5 space-y-1  rounded-xl border mt-3 bg-white">
            <div className="flex gap-2 items-center">
              <Icon
                className="text-primary-color"
                icon="grommet-icons:notes"
                width={16}
                height={16}
              />
              <Typography className="text-[#2c2c2c] font-semibold">
                Instructions sent to the patient:
              </Typography>
            </div>
            <Typography className="text-desc-color font-medium">
              "Take 1 capsule twice daily after meals for 7 days. Do not stop
              even if improvement occurs..."
            </Typography>
            <Typography className="text-desc-color font-medium">
              ✓ Sent via: SMS + Email
            </Typography>
            <Typography className="text-desc-color font-medium">
              ✓ Wolof translation: Available
            </Typography>
            <div className="flex gap-2 items-center">
              <Icon
                className="text-primary-color"
                icon="ix:sound-loud"
                width={16}
                height={16}
              />
              <Typography className="text-desc-color font-medium">
                {" "}
                Audio: Yes
              </Typography>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <PrescriptionTimeline />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
