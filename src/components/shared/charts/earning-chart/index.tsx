"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TotalEarningsProps {
  className?: string;
}

type TimeFrame = "Weekly" | "Monthly" | "Yearly";

const EarningChart: React.FC<TotalEarningsProps> = ({ className = "" }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrame>("Yearly");
  // Sample data for different time frames
  const chartData = {
    Weekly: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      series: [
        {
          name: "Video Consultation",
          data: [14, 17, 6, 16, 12, 17, 21],
        },
        {
          name: "Text Consultation",
          data: [13, 12, 23, 7, 11, 14, 11],
        },
      ],
      yAxisMax: 25,
    },
    Monthly: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [
        {
          name: "Video Consultation",
          data: [45, 52, 38, 48, 42, 58, 65, 51, 47, 62, 55, 68],
        },
        {
          name: "Text Consultation",
          data: [38, 42, 35, 28, 38, 45, 48, 42, 40, 48, 45, 52],
        },
      ],
      yAxisMax: 80,
    },
    Yearly: {
      categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
      series: [
        {
          name: "Video Consultation",
          data: [420, 380, 480, 520, 580, 650],
        },
        {
          name: "Text Consultation",
          data: [380, 320, 420, 460, 500, 540],
        },
      ],
      yAxisMax: 700,
    },
  };

  const currentData = chartData[selectedTimeFrame];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#2F80ED", "#F2994A"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        // endingShape: "rounded",
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#F3F4F6",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    xaxis: {
      categories: currentData.categories,
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
          fontWeight: "400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: currentData.yAxisMax,
      tickAmount: 5,
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
          fontWeight: "400",
        },
        formatter: function (val: number) {
          if (selectedTimeFrame === "Yearly") {
            return val >= 1000 ? val / 1000 + "k" : val.toString();
          } else if (selectedTimeFrame === "Monthly") {
            return val + "k";
          } else {
            return val + "k";
          }
        },
      },
    },
    legend: {
      show: false, // We'll create custom legend
    },
    tooltip: {
      enabled: true,
      theme: "light",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val: number) {
          if (selectedTimeFrame === "Yearly") {
            return val >= 1000 ? "$" + val / 1000 + "k" : "$" + val;
          } else {
            return "$" + val + "k";
          }
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              columnWidth: "70%",
            },
          },
        },
      },
    ],
  };

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  return (
    <div className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg ${className}`}>
      {/* Header with Title and Time Frame Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
          Total Earning
        </h2>

        {/* Time Frame Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(["Weekly", "Monthly", "Yearly"] as TimeFrame[]).map((timeFrame) => (
            <button
              key={timeFrame}
              onClick={() => handleTimeFrameChange(timeFrame)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedTimeFrame === timeFrame
                  ? "bg-primary-color text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              {timeFrame}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full">
        <Chart
          options={chartOptions}
          series={currentData.series}
          type="bar"
          height={350}
        />
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary-color rounded-full"></div>
          <span className="text-sm text-gray-600">Remote Consultation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#F2994A] rounded-full"></div>
          <span className="text-sm text-gray-600">In Person Consultation </span>
        </div>
      </div>
    </div>
  );
};

export default EarningChart;
