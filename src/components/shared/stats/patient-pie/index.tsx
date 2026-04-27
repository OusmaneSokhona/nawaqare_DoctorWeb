"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PatientPie = () => {
  const prescriptionData = {
    labels: ["Signed", "Pending", "Expired"],
    datasets: [
      {
        data: [25, 15, 5],
        backgroundColor: ["#27AE60", "#F2994A", "#EB5757"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } },
  };

  return (
    <div className="grid grid-cols-1  sm:grid-cols-3 gap-6">
      {/* Prescriptions Card */}
      <div
        className="bg-white transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl rounded-xl shadow p-6 "
      >
        <div className="flex">
          <Icon
            icon="mingcute:prescription-line"
            className="w-[26px] h-[26px] text-primary-color"
          />
          <Typography size="h5" className="font-semibold mb-3 mt-[-3px]">
            Prescriptions
          </Typography>
        </div>

        <div className="flex flex-row-reverse items-center justify-between">
          <div className="relative w-20 h-20">
            <Doughnut data={prescriptionData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Typography size="h5" className="font-bold text-[#1F2A37]">
                45
              </Typography>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-sm"></span>Signed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#F2994A] rounded-sm"></span>Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red rounded-sm"></span>Expired
            </span>
          </div>
        </div>
      </div>

      {/* DMP Documents Card */}
      <div
        className="bg-white transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl rounded-xl shadow p-6 flex flex-col items-center justify-center"
      >
        <Icon
          icon="solar:documents-broken"
          className="text-4xl text-primary-color mb-3"
        />
        <Typography size="h6" className="text-[#1F2A37] font-semibold">
          DMP Documents
        </Typography>
        <Typography className="text-xl text-desc-color font-semibold">
          04
        </Typography>
      </div>

      {/* Valid Signatures Card */}
      <div
        className="bg-white transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl rounded-xl shadow p-6 flex flex-col items-center justify-center"
      >
        <Icon
          icon="fluent:signature-24-regular"
          className="text-4xl text-primary-color mb-3"
        />
        <Typography size="h6" className="text-[#1F2A37] font-semibold">
          Valid Signatures
        </Typography>
        <Typography className="text-xl text-desc-color font-semibold">
          04
        </Typography>
      </div>
    </div>
  );
};

export default PatientPie;
