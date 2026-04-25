"use client";

import { cva } from "class-variance-authority";
import React from "react";

import { Typography } from "@/components/shared/typography";
import { StepperProps } from "@/types/dashboard";

// Step circle styling
const stepCircle = cva(
  "w-4 h-4 md:w-6 md:h-6 border-4 md:border-4 bg-white rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:text-base transition-all duration-300",
  {
    variants: {
      status: {
        completed: "border-primary-dark",
        current: "border-primary-dark",
        upcoming: "border-light-gray",
      },
    },
    defaultVariants: {
      status: "upcoming",
    },
  },
);

// Connector line between steps
const connectorLine = cva("flex relative", {
  variants: {
    active: {
      true: "after:bg-primary-dark",
      false: "after:bg-light-gray",
    },
    lastIndex: {
      true: "",
      false:
        'w-full after:content-[""] after:h-0.5 md:after:h-2  after:inline-block after:absolute after:left-12 after:translate-x-0 after:z-0 md:after:top-2 after:top-2 after:w-full',
    },
  },
});

const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <ol className="flex items-center w-full text-xs font-medium sm:text-base overflow-x-auto">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isCurrent = stepIndex === activeStep;
        const isCompleted = stepIndex < activeStep;

        const status = isCurrent
          ? "current"
          : isCompleted
            ? "completed"
            : "upcoming";

        return (
          <li
            key={index}
            className={connectorLine({
              active: isCompleted,
              lastIndex: steps.length - 1 === index,
            })}
            // Uncomment below if you want step click navigation
            // onClick={() => setActiveStep(stepIndex)}
          >
            <div className="z-10 relative text-center cursor-default">
              <span className={stepCircle({ status })}></span>

              <div className="w-[110px] lg:min-w-[100px]">
                <Typography as="p" size="md" className="text-primary-text">
                  {step.title}
                </Typography>
                <Typography as="p" size="sm" className="text-dark-gray">
                  {step.date}
                </Typography>
                <Typography as="p" size="sm" className="text-dark-gray">
                  {step.time}
                </Typography>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
