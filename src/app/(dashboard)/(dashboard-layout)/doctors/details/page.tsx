"use client";

import CustomTabs from "@/components/shared/custom-tabs";
import { Typography } from "@/components/shared/typography";
import { allDoctors, allPatients, docData } from "@/data";
import { AllDoctorsType, AllPatients } from "@/types/dashboard";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { FC } from "react";

// Type for tabs
interface Tab {
  label: string;
  value: string;
  lock?: boolean;
}

const tabs: Tab[] = [
  { label: "analyticsd", value: "Analytics" },
  { label: "documents", value: "Documents" },
  { label: "consultations", value: "Consultations" },
  { label: "patients", value: "Patients" },
  { label: "doctorPrescription", value: "Prescription" },
  { label: "payment_historyd", value: "Payment History" },
];

const DoctorDetail: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const patient = allDoctors?.RowsData?.find(
    (item: AllDoctorsType) => item?.id?.toString() === id,
  );

  if (!patient) return <p>No data found</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between max-md:flex-col max-md:gap-4">
        <div className="flex items-center gap-5">
          <Image
            src="/assets/svg/profile.svg"
            width={86}
            height={82}
            alt={patient?.fname}
            className="rounded-xl"
          />
          <div>
            <Typography size="h5" as="h5">
              {patient.fname}
            </Typography>
            <div className="flex gap-3 items-center mt-2 ">
              <Typography className=" px-5 py-2 bg-[#EAEEF7] rounded-xl font-semibold flex items-center justify-center">
                License Verified
              </Typography>
              <Typography className="text-white bg-[#27AE60] px-5 font-semibold py-1 rounded-full">
                Verified
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Typography className="w-[130px] h-[40px] rounded-md bg-[#EF444433] text-[#EF4444] flex items-center justify-center font-semibold">
            Suspend Doctor
          </Typography>
          <Typography className="w-[130px] h-[40px] rounded-md bg-[#2F80ED] text-white flex items-center justify-center font-semibold">
            Send Notification
          </Typography>
        </div>
      </div>

      <div className="basis-[40%]">
        <div className="flex flex-wrap gap-10">
          <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Email
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.email}
            </Typography>
          </div>

          <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Phone No
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.phoneNo}
            </Typography>
          </div>

          {/* <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Gender
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.gender}
            </Typography>
          </div> */}

          {/* <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Consultation Type
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.consultationType}
            </Typography>
          </div> */}
          <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Qualification
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              MD
            </Typography>
          </div>
          {/* <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Speciality
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.speciality}
            </Typography>
          </div> */}
          {/* <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Expertise
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.expertise}
            </Typography>
          </div> */}
          <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Experience
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {/* {patient.experience} */}
              12 year
            </Typography>
          </div>
          {/* <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Services
            </Typography>
            <Typography className="text-h6 font-medium text-desc-color">
              {patient.services}
            </Typography>
          </div> */}
          <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
            <Typography size="h6" as="h6">
              Languages
            </Typography>
            {patient.languages.map((lan, i) => (
              <span key={i} className="text-h6 font-medium text-desc-color">
                {lan},
              </span>
            ))}
          </div>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="pt-4">
          <Typography size="h4" as="h4" className="pb-3">
            Activity & Schedule
          </Typography>
          <div className="flex max-md:flex-col gap-5 pb-6">
            <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
              <Typography size="h6" as="h6">
                Weekly Availability
              </Typography>
              <Typography className="text-h6 font-medium text-desc-color">
                40 hours/week
              </Typography>
            </div>
            <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
              <Typography size="h6" as="h6">
                Peak Hours
              </Typography>
              <Typography className="text-h6 font-medium text-desc-color">
                2–5 PM
              </Typography>
            </div>
            <div className="space-y-2 basis-[22%] max-md:basis-[45%] max-sm:basis-full">
              <Typography size="h6" as="h6">
                Average Response Time
              </Typography>
              <Typography className="text-h6 font-medium text-desc-color">
                1 hr
              </Typography>
            </div>
          </div>
        </div>
        <hr className="pt- pb-6" />
        <div>
          <Typography size="h4" as="h4">
            Quality & Risk Indicators
          </Typography>
          <div className="pt-4">
            {/* {docData.map((d,i)=>(
            <div className="">

            </div>
          ))} */}
            <div className="flex flex-wrap gap-8 items-center">
              {docData.map((activity, i) => (
                <div
                  key={i}
                  className="bg-[#2F80ED1A]  w-[180px] rounded-2xl p-6 space-y-3 max-sm:w-full max-sm:text-center"
                >
                  {/* <div
                      className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto"
                    >
                      <Icon
                        icon={activity.icon}
                        width="24"
                        height="24"
                        className="text-white"
                      />
                    </div> */}
                  <Typography size="h4" as="h4">
                    {activity.title}
                  </Typography>
                  <Typography>{activity.desc}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="basis-[60%] pt-3 space-y-3">
        <Typography size="h4" as="h4">
          Overview of the Doctor engagement and consultation history
        </Typography>
        <CustomTabs tabs={tabs} />
      </div>
    </div>
  );
};

export default DoctorDetail;
