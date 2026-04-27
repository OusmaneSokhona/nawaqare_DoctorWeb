"use client";
import React, { useState } from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Admin creates account",
    description:
      "The system administrator initiates the pharmacy registration and assigns an ID. Initial setup details and temporary credentials are generated automatically.",
  },
  {
    title: "Pharmacy completes profile",
    description:
      "The pharmacy representative logs in to fill out essential information, upload documents. All submitted data remains pending until admin validation.",
  },
  {
    title: "Admin validates or rejects",
    description:
      "Once validated, the pharmacy gains full access to its dashboard and prescription management. Activity logs are updated with activation date and admin details.",
  },
  {
    title: "Account activates",
    description:
      "Once validated, the pharmacy gains full access to its dashboard and prescription management. Activity logs are updated with activation date and admin details.",
  },
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(stepNumber);

    if (stepNumber === steps.length && !completed) {
      setCompleted(true);
      toast.success("🎉 Completed successfully!");
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 max-md:p-5 flex justify-center gap-10">
      <div className="relative pl-8 space-y-10">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted =
            stepNumber < activeStep ||
            (completed && stepNumber === steps.length);
          const isActive = stepNumber === activeStep;
          const isLast = stepNumber === steps.length;

          return (
            <div key={index} className="relative flex gap-5 items-start">
              {!isLast && (
                <div
                  className={`absolute left-[21px] top-[45px] w-[3px] h-[calc(100%+20px)] rounded-full ${
                    isCompleted
                      ? "bg-primary-color"
                      : isActive
                        ? "bg-secondary-color"
                        : "bg-gray-300"
                  }`}
                />
              )}

              <div
                className={`flex-shrink-0 z-10 flex justify-center items-center rounded-full h-11 w-11 transition-all duration-300 cursor-pointer ${
                  isCompleted
                    ? "bg-primary-color text-white"
                    : isActive
                      ? "bg-secondary-color text-white"
                      : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handleStepClick(stepNumber)}
              >
                {isCompleted ? (
                  <Icon icon="mdi:check" width={20} height={20} />
                ) : (
                  stepNumber
                )}
              </div>

              <div>
                <Typography className="font-bold">{step.title}</Typography>
                <Typography className="pt-2 text-desc-color w-[85%] leading-[26px]">
                  {step.description}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
