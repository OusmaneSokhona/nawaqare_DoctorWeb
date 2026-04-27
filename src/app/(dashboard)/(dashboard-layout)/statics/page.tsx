"use client";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import React, { useEffect, useState } from "react";
import StatCards from "@/components/shared/stats/stat-card";
import PatientEngagement from "@/components/shared/stats/patient-engagement";
import Dashboard from "./chart";
import PatientPie from "@/components/shared/stats/patient-pie";
import StaticCharts from "./chart";
import ConsultationsChart from "@/components/shared/statics-chart";
import { getDoctorStatistics } from "@/api/service/dashboard";

const operationalCardData = [
  {
    title: "consultation duration﻿",
    value: "38 mint",
    chartData: [13, 4, 12, 5, 16, 4, 16, 2, 10],
    borderColor: "#27AE60",
    backgroundColor: "rgba(39, 174, 96, 0.2)",
  },
  {
    title: "Cancellation",
    value: "12",
    chartData: [13, 4, 12, 5, 16, 4, 16, 2, 10],
    borderColor: "#EB4824",
    backgroundColor: "rgba(235, 87, 87, 0.2)",
  },
  {
    title: "Scheduled",
    value: "30%",
    chartData: [13, 4, 12, 5, 16, 4, 16, 2, 10],
    borderColor: "#EB4824",
    backgroundColor: "rgba(242, 153, 74, 0.2)",
  },
  {
    title: " completed consultations﻿",
    value: "30%",
    chartData: [13, 4, 12, 5, 16, 4, 16, 2, 10],
    borderColor: "#27AE60",
    backgroundColor: "rgba(79, 70, 229, 0.2)",
  },
  {
    title: "consultation write-up time﻿",
    value: "5 mint",
    chartData: [13, 4, 12, 5, 16, 4, 16, 2],
    borderColor: "#27AE60",
    backgroundColor: "rgba(155, 81, 224, 0.2)",
  },
];

const Stats = () => {
  const [apiStats, setApiStats] = useState<any>(null);

  useEffect(() => {
    getDoctorStatistics()
      .then((data: any) => {
        if (data) setApiStats(data);
      })
      .catch(() => {});
  }, []);

  // Extract values from API or fall back to defaults
  const avgDuration = apiStats?.avg_consultation_duration_minutes
    ? `${Math.floor(apiStats.avg_consultation_duration_minutes)}m ${Math.round((apiStats.avg_consultation_duration_minutes % 1) * 60)}s`
    : "23m 56s";
  const writeUpTime = apiStats?.avg_writeup_time_minutes
    ? `${Math.floor(apiStats.avg_writeup_time_minutes)}m ${Math.round((apiStats.avg_writeup_time_minutes % 1) * 60)}s`
    : "7min 42s";
  const cancellationRate = apiStats?.cancellation_rate
    ? `${apiStats.cancellation_rate.toFixed(1)}%`
    : "5.8%";
  const scheduledCount = apiStats?.scheduled_count ?? 174;
  const completedCount = apiStats?.completed_count ?? 174;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between max-md:flex-col max-md:gap-3">
        <Typography size="h4" as="h4">
          Clinical Activity
        </Typography>
        <div className="flex items-center gap-3">
          <Button className="bg-primary-color gap-2 cursor-pointer text-white rounded-lg flex items-center justify-center">
            <Typography>Export Monthly Report</Typography>
          </Button>
        </div>
      </div>

      <div className="pt-10">
        {/* Top Section: Clinical Activity - 3 wider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <StatCards chartHeight={80} />
        </div>

        {/* Bottom Section: Operational Performance - 5 smaller cards */}
        {/* <div className="py-10">
          <Typography size="h4" as="h4" className="mb-4">
            Operational Performance
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-3">
            <StatCards cardData={operationalCardData} chartHeight={80} />
          </div>
        </div> */}

        {/* Bottom Section: Operational Performance */}
        <div className="py-10">
          <Typography
            size="h4"
            as="h4"
            className="mb-6 font-bold text-gray-800"
          >
            Operational Performance
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Box 1: Time & medical workload (Contains 2 cards) */}
            <div className="p-6 border border-border-color rounded-xl shadow-sm">
              <Typography className="font-bold mb-6 text-lg">
                Time & medical workload
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FDFDFF] border border-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                  <Typography className="text-[11px] tracking-wider font-semibold mb-2">
                    Consultation Duration
                  </Typography>
                  <Typography
                    size={"h4"}
                    as={"h4"}
                    className="text-2xl font-black text-gray-800 mb-1"
                  >
                    {avgDuration}
                  </Typography>
                  <Typography className="text-sm text-gray-400 font-medium">
                    Average per consultation
                  </Typography>
                </div>
                <div className="bg-[#FDFDFF] border border-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                  <Typography className="text-[11px] tracking-wider font-semibold mb-2">
                    write-up time
                  </Typography>
                  <Typography
                    size={"h4"}
                    as={"h4"}
                    className="text-2xl font-black text-gray-800 mb-1"
                  >
                    {writeUpTime}
                  </Typography>
                  <Typography className="text-sm text-gray-400 font-medium">
                    Record completion after consult
                  </Typography>
                </div>
              </div>
            </div>

            {/* Box 2: Flow & reliability (Contains 3 cards) */}
            <div className="p-6 border border-border-color rounded-xl shadow-sm">
              <Typography className="font-bold mb-6 text-lg">
                Flow & reliability
              </Typography>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#FDFDFF] border border-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                  <Typography className="text-[11px] tracking-wider font-semibold mb-2">
                    Cancellations
                  </Typography>
                  <Typography
                    size={"h4"}
                    as={"h4"}
                    className="text-2xl font-black text-gray-800 mb-1"
                  >
                    {cancellationRate}
                  </Typography>
                  <Typography className="text-sm text-gray-400 font-medium">
                    Cancelled within 24 hour
                  </Typography>
                </div>
                <div className="bg-[#FDFDFF] border border-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                  <Typography className="text-[11px] tracking-wider font-semibold mb-2">
                    Scheduled
                  </Typography>
                  <Typography
                    size={"h4"}
                    as={"h4"}
                    className="text-2xl font-black text-gray-800 mb-1"
                  >
                    {scheduledCount}
                  </Typography>
                  <Typography className="text-sm text-gray-400 font-medium">
                    Confirmed Consultation
                  </Typography>
                </div>
                <div className="bg-[#FDFDFF] border border-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                  <Typography className="text-[11px] tracking-wider font-semibold mb-2">
                    Completed
                  </Typography>
                  <Typography
                    size={"h4"}
                    as={"h4"}
                    className="text-2xl font-black text-gray-800 mb-1"
                  >
                    {completedCount}
                  </Typography>
                  <Typography className="text-sm text-gray-400 font-medium">
                    Completed Consultation
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Typography size="h4" as="h4" className="mb-4">
            Patient Engagement﻿
          </Typography>
          <div className="pt-3">
            <PatientEngagement />
          </div>
        </div>

        <div className="py-6 ">
          <Typography size="h4" as="h4" className="mb-6">
            Clinical & Documents
          </Typography>
          <PatientPie />
        </div>
        <div className="py-6">
          <ConsultationsChart />
        </div>
        <div className="">
          <StaticCharts />
        </div>
      </div>
    </div>
  );
};

export default Stats;