"use client";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "../../typography";
import { Button } from "../../button";
import { Icon } from "@iconify/react";
import PatientStaticsChart from "./chartss";

const PatientStatics = () => {
  const [open, setOpen] = useState<null | "period" | "export">(null);
  const [period, setPeriod] = useState<"7" | "30">("7");

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const toggle = (type: "period" | "export") => {
    setOpen(open === type ? null : type);
  };

  return (
    <div className="pt-10">
      <Typography size="h5" className="">
        Performance Statistics
      </Typography>
      <Typography className="text-desc-color">
        Feedback from your recent consultations
      </Typography>
      <div ref={wrapperRef} className="relative flex gap-4 mt-10">
        {/* PERIOD */}
        <div className="relative">
          <Button
            onClick={() => toggle("period")}
            className="bg-white rounded-lg flex items-center gap-2"
          >
            {period === "7" ? "Last 7 days" : "Last 30 days"}
            <Icon
              icon="mdi:chevron-down"
              className={`transition-transform duration-300 ${
                open === "period" ? "rotate-180" : ""
              }`}
            />
          </Button>

          {open === "period" && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-20">
              <Typography
                onClick={() => {
                  setPeriod("7");
                  setOpen(null);
                }}
                className="cursor-pointer hover:text-primary-color mb-2"
              >
                Last 7 days
              </Typography>

              <Typography
                onClick={() => {
                  setPeriod("30");
                  setOpen(null);
                }}
                className="cursor-pointer hover:text-primary-color"
              >
                Last 30 days
              </Typography>
            </div>
          )}
        </div>

        {/* EXPORT */}
        <div className="relative">
          <Button
            onClick={() => toggle("export")}
            className="bg-white rounded-lg flex items-center gap-2"
          >
            Export
            <Icon
              icon="mdi:chevron-down"
              className={`transition-transform duration-300 ${
                open === "export" ? "rotate-180" : ""
              }`}
            />
          </Button>

          {open === "export" && (
            <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-3 z-20">
              <Typography className="mb-2 text-sm text-gray-500">
                Export data for:
              </Typography>

              <Typography className="cursor-pointer hover:text-primary-color mb-2">
                CSV ({period === "7" ? "Last 7 days" : "Last 30 days"})
              </Typography>

              <Typography className="cursor-pointer hover:text-primary-color mb-2">
                Excel ({period === "7" ? "Last 7 days" : "Last 30 days"})
              </Typography>

              <Typography className="cursor-pointer hover:text-primary-color">
                PDF ({period === "7" ? "Last 7 days" : "Last 30 days"})
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div>
        <PatientStaticsChart />
      </div>
    </div>
  );
};

export default PatientStatics;
