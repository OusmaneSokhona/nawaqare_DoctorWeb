"use client";
import { EngagmentData } from "@/data";
import React from "react";
// import { Typography } from '../../typography'
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/shared/typography";

const PatientEngagement = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {EngagmentData.map((d, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl space-y-2 transform transition-transform duration-300 hover:-translate-y-2 shadow flex flex-col items-center justify-between"
        >
          <Icon icon={d.icon} className="text-primary-color text-3xl" />
          <Typography size="h6" className="text-[#1F2A37] font-semibold">
            {d.title}
          </Typography>
          <Typography className="text-xl text-desc-color font-semibold">
            {d.nbr}
          </Typography>
          <Typography
            className="text-primary-color underline font-medium cursor-pointer"
            onClick={() => router.push("/statics/reviews")}
          >
            {d.view}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default PatientEngagement;
