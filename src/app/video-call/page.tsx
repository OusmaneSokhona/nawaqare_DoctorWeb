"use client";
import { Typography } from "@/components/shared/typography";
import MedicalObservation from "@/components/shared/video-calll/medical-observation";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Video = () => {
  const router = useRouter();
  return (
    <div className="bg-white p-8 rounded-xl border">
      <div className="flex items-center justify-between">
        <div className="flex  items-center justify-between">
          <div className="space-y-1">
            <Typography size="h4" className="font-bold text-[#1F2A37]">
              Dr. John Smith
            </Typography>
          </div>
        </div>
        <div></div>
      </div>

      <div className="flex max-md:flex-col gap-5">
        <div className="basis-[50%] max-md:basis-full">
          <div className=" relative">
            <Image
              src="/assets/svg/videoImg2.svg"
              width={504}
              height={254}
              alt="prof"
              className=" w-full h-full object-cover  rounded-lg"
            />

            <div
              className="   absolute
    bottom-[80px]

    left-1/2 -translate-x-1/2   /* ✅ DEFAULT (2xl / xl) */

    max-2xl:left-1/2
    max-2xl:-translate-x-1/2

    max-lg:left-6 max-lg:translate-x-0
    max-md:left-5 max-md:translate-x-0
    max-md:bottom-9
    max-lg:bottom-10

    flex items-center justify-center gap-3"
            >
              <button className="bg-red w-[50px] max-md:w-[40px] h-[35px] text-white flex items-center justify-center rounded-xl">
                End
              </button>
              <div className="bg-transparent w-[30px] border border-primary-color cursor-pointer h-[30px] flex items-center justify-center rounded-full">
                <Icon
                  className="text-primary-color"
                  icon="tdesign:fullscreen"
                  width="18"
                  height="18"
                />
              </div>
              <div className="bg-[#C6BDC9] w-[40px]  h-[40px] flex items-center cursor-pointer justify-center rounded-full">
                <Icon
                  className="text-primary-color"
                  icon="bi:three-dots-vertical"
                  width="18"
                  height="18"
                />
              </div>
              <div className=" w-[40px] bg-primary-color  h-[40px] flex items-center cursor-pointer justify-center rounded-full">
                <Icon
                  className="text-white"
                  icon="rivet-icons:microphone-off-solid"
                  width="14"
                  height="14"
                />
              </div>
              <div
                className="bg-[#EDEEF6] w-[40px] border border-primary-color h-[40px] cursor-pointer flex items-center justify-center rounded-full"
                onClick={() => router.push("/video-call/medical-observation")}
              >
                <Icon
                  className="text-primary-color"
                  icon="mynaui:video"
                  width="18"
                  height="18"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-xl">
            <div className="bg-[#EBE9F6] rounded-tl-xl rounded-tr-xl">
              <Typography
                size="h4"
                className="text-[#2c2c2c] px-3 py-2 font-semibold"
              >
                Remote consultation
              </Typography>
            </div>

            <div className="px-5 py-3">
              {/* Header Section */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  {/* Time and Duration Row */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-primary-color">
                      <Icon icon="solar:calendar-date-bold" width="18" />
                      <span className="text-md font-semibold text-gray-700">
                        12:00pm-12:30pm
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-color">
                      <Icon icon="solar:clock-circle-bold" width="18" />
                      <span className="text-md font-semibold text-gray-700">
                        Tele consultation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Follow Up Button */}
                <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-600 transition-all">
                  Follow Up
                </button>
              </div>
              <div className="flex gap-4 items-center mt-5">
                <Image
                  src="/assets/svg/videoImg.svg"
                  width={109}
                  height={109}
                  alt="prof"
                  className=" rounded-lg"
                />
                <div className="space-y-0.5">
                  <Typography size="lg" className="text-[#1F2A37] font-bold">
                    Mr. Alex Martin
                  </Typography>
                  <Typography size="lg" className="text-desc-color font-medium">
                    ID: Pt 1234567
                  </Typography>
                  <Typography size="lg" className="text-desc-color font-medium">
                    45 YEAR . Male
                  </Typography>
                  <Typography size="lg" className="text-red font-medium">
                    Waiting
                  </Typography>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="bg-[#EBE9F6] rounded-tl-xl rounded-tr-xl">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Patient Record
                </Typography>
              </div>
              <div className="space-y-0.5 px-5 py-3">
                <Typography size="lg" className="text-[#1F2A37] font-bold">
                  Mr. Alex Martin
                </Typography>
                <Typography size="lg" className="text-desc-color font-medium">
                  Male . 44 years
                </Typography>
                <Typography size="lg" className="text-desc-color font-medium">
                  0344567890
                </Typography>
              </div>
            </div>
            {/* Allergies & Immediate Risks */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Allergies & Immediate Risks
                </Typography>
              </div>

              <div className="px-5 py-3 space-y-1">
                <Typography size="lg" className="text-[#1F2A37] font-bold">
                  No known drug allergies
                </Typography>
                <Typography size="lg" className="text-desc-color font-medium">
                  No food allergies declared
                </Typography>
                <Typography size="lg" className="text-desc-color font-medium">
                  No documented intolerances to date
                </Typography>
              </div>
            </div>

            {/* Medical History */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Medical History
                </Typography>
              </div>

              <div className="px-5 py-3 space-y-3">
                <div className="space-y-1">
                  <Typography size="lg" className="text-[#1F2A37] font-bold">
                    Personal medical history
                  </Typography>
                  <Typography size="lg" className="text-desc-color font-medium">
                    Arterial hypertension diagnosed 6 years ago, well controlled
                  </Typography>
                </div>

                <div className="space-y-1">
                  <Typography size="lg" className="text-[#1F2A37] font-bold">
                    Surgical history
                  </Typography>
                  <Typography size="lg" className="text-desc-color font-medium">
                    Appendectomy in 2005, no complications reported
                  </Typography>
                </div>

                <div className="space-y-1">
                  <Typography size="lg" className="text-[#1F2A37] font-bold">
                    Family history
                  </Typography>
                  <ul className="list-disc pl-5 space-y-1 text-desc-color">
                    <li className="text-sm font-medium">
                      Father: Type 2 diabetes
                    </li>
                    <li className="text-sm font-medium">
                      Mother: Arterial hypertension
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Treatment */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Treatment
                </Typography>
              </div>

              <div className="px-5 py-3 space-y-3">
                <div className="space-y-1">
                  <Typography size="lg" className="text-[#1F2A37] font-bold">
                    Current treatment
                  </Typography>
                  <Typography size="lg" className="text-desc-color font-medium">
                    Amlodipine 5 mg – 1 tablet per day
                  </Typography>
                </div>

                <div className="space-y-1">
                  <Typography size="lg" className="text-[#1F2A37] font-bold">
                    Other treatment
                  </Typography>
                  <Typography size="lg" className="text-desc-color font-medium">
                    No other chronic treatment reported
                  </Typography>
                </div>
              </div>
            </div>

            {/* Infectious History */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Infectious History
                </Typography>
              </div>

              <div className="px-5 py-3">
                <ul className="list-disc pl-5 space-y-1 text-desc-color">
                  <li className="text-sm font-medium">
                    Vaccination status partially documented
                  </li>
                  <li className="text-sm font-medium">
                    No known chronic infections
                  </li>
                </ul>
              </div>
            </div>

            {/* Vaccinations */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Vaccinations
                </Typography>
              </div>

              <div className="px-5 py-3">
                <ul className="list-disc pl-5 space-y-1 text-desc-color">
                  <li className="text-sm font-medium">
                    Vaccination status partially documented
                  </li>
                  <li className="text-sm font-medium">
                    Last tetanus booster: not recorded
                  </li>
                </ul>
              </div>
            </div>

            {/* Lifestyle & Risk Factors */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Lifestyle & Risk Factors
                </Typography>
              </div>

              <div className="px-5 py-3">
                <ul className="list-disc pl-5 space-y-1 text-desc-color">
                  <li className="text-sm font-medium">Non-smoker</li>
                  <li className="text-sm font-medium">
                    Occasional alcohol consumption
                  </li>
                  <li className="text-sm font-medium">Low physical activity</li>
                  <li className="text-sm font-medium">
                    Occupation: Sales representative
                  </li>
                </ul>
              </div>
            </div>

            {/* Medical Summary */}
            <div className="mt-6">
              <div className="bg-[#EBE9F6]">
                <Typography
                  size="h4"
                  className="text-[#2c2c2c] px-3 py-2 font-semibold"
                >
                  Medical Summary
                </Typography>
              </div>

              <div className="px-5 py-3">
                <ul className="list-disc pl-5 space-y-1 text-desc-color">
                  <li className="text-sm font-medium">
                    Patient with well-controlled arterial hypertension under
                    treatment.
                  </li>
                  <li className="text-sm font-medium">
                    No immediate risk factors identified.
                  </li>
                  <li className="text-sm font-medium">
                    No contraindication to remote consultation.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-color flex items-center justify-center py-4 rounded-xl cursor-pointer  mt-4 text-white">
              <Typography size="lg" className="font-medium">
                Request access to record
              </Typography>
            </div>
          </div>
        </div>
        <div className="basis-[50%] max-md:w-full">
          <MedicalObservation />
        </div>
      </div>
    </div>
  );
};

export default Video;
