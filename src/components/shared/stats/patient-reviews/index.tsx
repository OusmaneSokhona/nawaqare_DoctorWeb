"use client";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "../../typography";
import Image from "next/image";
import { patientReviewData } from "@/data";
import { Button } from "../../button";
import { Icon } from "@iconify/react";

const PatientReviews = () => {
  const [open, setOpen] = useState<null | "period" | "rating">(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (type: "period" | "rating") => {
    setOpen(open === type ? null : type);
  };
  return (
    <div>
      <div ref={wrapperRef} className="relative flex gap-4 mt-10">
        {/* Period */}
        <div className="relative">
          <Button
            onClick={() => toggle("period")}
            className="bg-white rounded-lg flex items-center gap-2"
          >
            Period
            <Icon
              icon="mdi:chevron-down"
              className={`transition-transform duration-300 ${
                open === "period" ? "rotate-180" : ""
              }`}
            />
          </Button>

          {open === "period" && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-20">
              <Typography className="cursor-pointer hover:text-primary-color mb-2">
                Last 7 days
              </Typography>
              <Typography className="cursor-pointer hover:text-primary-color mb-2">
                Last 30 days
              </Typography>
              <Typography className="cursor-pointer hover:text-primary-color">
                Custom range
              </Typography>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="relative">
          <Button
            onClick={() => toggle("rating")}
            className="bg-white rounded-lg flex items-center gap-2"
          >
            Rating
            <Icon
              icon="mdi:chevron-down"
              className={`transition-transform duration-300 ${
                open === "rating" ? "rotate-180" : ""
              }`}
            />
          </Button>

          {open === "rating" && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-20">
              <Typography className="cursor-pointer hover:text-primary-color mb-2">
                5 Stars
              </Typography>
              <Typography className="cursor-pointer hover:text-primary-color mb-2">
                4 Stars & above
              </Typography>
              <Typography className="cursor-pointer hover:text-primary-color">
                3 Stars & above
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-md px-4 py-6 mt-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Image src="/assets/svg/star.svg" width={80} height={16} alt="star" />
          <Typography className="font-semibold">
            4.0 <span className="font-semibold text-[#4F4F4F]">05 Reviews</span>
          </Typography>
        </div>

        {/* Criteria */}
        <div className="pt-4">
          <Typography size="h6">Criteria</Typography>

          {/* GRID instead of flex */}
          <div
            className="grid
              grid-cols-1
              gap-y-3
              pt-3
              lg:grid-cols-[20%_80%]
              lg:items-center"
          >
            <Typography className="text-desc-color font-semibold">
              Communication
            </Typography>
            <div className="h-2 w-full rounded-full bg-primary-color"></div>

            <Typography className="text-desc-color font-semibold">
              Clarity
            </Typography>
            <div className="h-2 w-[85%] rounded-full bg-primary-color"></div>

            <Typography className="text-desc-color font-semibold">
              Punctuality
            </Typography>
            <div className="h-2 w-[70%] rounded-full bg-primary-color"></div>

            <Typography className="text-desc-color font-semibold">
              Behaviors
            </Typography>
            <div className="h-2 w-[55%] rounded-full bg-primary-color"></div>

            <Typography className="text-desc-color font-semibold">
              Quailty
            </Typography>
            <div className="h-2 w-[40%] rounded-full bg-primary-color"></div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        {patientReviewData.map((d, i) => (
          <div key={i} className=" border-b py-6">
            <div className="flex items-center gap-3">
              <Image src={d.img} width={60} height={60} alt="img" />
              <div className="flex  gap-[150px]">
                <div className="flex flex-col space-y-1 justify-center">
                  <Typography size="h6" className="font-bold">
                    Emily Anderson
                  </Typography>
                  <div className="flex gap-1">
                    <Typography className="font-medium text-[#4F4F4F]">
                      5.0
                    </Typography>
                    <Image
                      src="/assets/svg/stars.svg"
                      width={77}
                      height={12}
                      alt="star"
                    />
                  </div>
                </div>
                <Typography className="font-semibold">12/oct</Typography>
              </div>
            </div>
            <Typography className="pt-2 text-desc-color font-medium">
              Dr. Patel is a true professional who genuinely cares about his
              patients. I highly recommend Dr. Patel to anyone seeking
              exceptional cardiac care.
            </Typography>
            <div className="flex justify-between pt-1">
              <Typography className="text-primary-color underline font-semibold">
                Reply
              </Typography>
              <Typography className="text-desc-color font-semibold">
                Report
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientReviews;
