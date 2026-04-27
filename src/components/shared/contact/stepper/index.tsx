"use client";
import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Typography } from "../../typography";

interface Step {
  id: number;
  title: string;
  date: string;
  color: string;
}

const ActivityLogStepper = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Status changes",
      date: "14 Oct 2025 - 3:45 PM",
      color: "bg-primary-color",
    },
    {
      id: 2,
      title: "Assignee changes",
      date: "14 Oct 2025 - 3:45 PM",
      color: "bg-primary-color",
    },
    {
      id: 3,
      title: "Priority edits",
      date: "14 Oct 2025 - 3:45 PM",
      color: "bg-primary-color",
    },
    {
      id: 4,
      title: "Notes added",
      date: "14 Oct 2025 - 3:45 PM",
      color: "bg-primary-color",
    },
    {
      id: 5,
      title: "Replies sent",
      date: "14 Oct 2025 - 3:45 PM",
      color: "bg-primary-color",
    },
  ];

  const handleStepClick = (stepId: number): void => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  useEffect(() => {
    if (completedSteps.length === steps.length) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [completedSteps, steps.length]);

  const isStepCompleted = (stepId: number): boolean =>
    completedSteps.includes(stepId);

  return (
    <div className="">
      <div className="">
        <Typography size="h6" className="font-bold underline pb-4 pt-4">
          Activity Log
        </Typography>

        {/* Stepper */}
        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className="relative flex gap-4 pb-8   transition-all"
            >
              {/* Vertical Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-4 top-10 bottom-0 w-0.5 transition-colors ${
                    isStepCompleted(step.id) &&
                    isStepCompleted(steps[index + 1].id)
                      ? "bg-green-400"
                      : "bg-gray-200"
                  }`}
                />
              )}

              {/* Circle with Icon */}
              <div className="relative z-10 flex-shrink-0 cursor-pointer">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
                    isStepCompleted(step.id)
                      ? "bg-green-500"
                      : `${step.color} group-hover:ring-4 group-hover:ring-opacity-20 ${step.color.replace("bg-", "group-hover:ring-")}`
                  }`}
                >
                  {isStepCompleted(step.id) ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white  font-medium">{step.id}</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3
                  className={`text-base font-semibold mb-1 transition-colors ${
                    isStepCompleted(step.id)
                      ? ""
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}
                >
                  {step.title}
                </h3>
                <p className=" text-gray-500">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {/* <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">
              {completedSteps.length} / {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
        </div> */}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn z-50">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-green-500" />
          </div>
          <span className="font-medium">Completed Successfully!</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ActivityLogStepper;
