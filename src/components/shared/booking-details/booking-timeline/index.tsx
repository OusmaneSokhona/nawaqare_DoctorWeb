"use client";

import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Check } from "lucide-react";
import { Typography } from "../../typography";

const BookingTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      title: "Appointment Booked",
      date: "12/09/2025 ; 12:00 pm Appointment created by patient",
      performer: " Appointment type: Video / Chat / In-person",
      desc: "Payment method visible if prepaid",
    },
    {
      id: 2,
      title: "Payment Authorized",
      date: "12/09/2025 ; 12:00 pm Payment Authorized ",
      performer: "Transaction ID",
      desc: "If failed → red node + error tag",
    },
    {
      id: 3,
      title: "Doctor Notified",
      date: "12/09/2025 ; 12:00 pm Delivery method: push / SMS / call ",
      performer: "Notification status: delivered / opened (if tracked)",
    },
    {
      id: 4,
      title: "Patient Joined Call",
      date: "12/09/2025 ; 12:00 pm Device: iOS / Android / Web   ",
      performer: "Network type: Wi-Fi / 4G / 5G",
      desc: "Connection quality: Good / Fair / Poor",
    },
    {
      id: 5,
      title: "Doctor Joined Call",
      date: "12/09/2025 ; 12:00 pm Device: iOS / Android / Web ",
      performer: "Delay indicator (e.g., “Joined 42s after patient”)",
    },
    {
      id: 6,
      title: "Consultation Completed",
      date: "12/09/2025 ; 12:00 pm Actual duration: 14m 22s",
    },
    {
      id: 7,
      title: "Medical Notes Added",
      date: "12/09/2025 ; 12:00 pm  Notes finalised by doctor",
      view: "View Notes",
    },
    {
      id: 8,
      title: "Prescription Created",
      date: "12/09/2025 ; 12:00 pm  Notes finalised by doctor ",
      view: "View Prescription",
    },
    {
      id: 9,
      title: "Pharmacy Validation",
      date: "12/09/2025 ; 12:00 pm  Validated",
      performer: "xyz pharmacy",
    },
    {
      id: 10,
      title: "Follow-Up Scheduled",
      date: "12/09/2025 ; 12:00 pm  Follow-up added to schedule",
      view: "View Follow-Up",
    },
  ];

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepClick = (id: number, index: number) => {
    if (!completedSteps.includes(id)) {
      const newCompleted = [...completedSteps, id];
      setCompletedSteps(newCompleted);

      // Last step → show success toast
      if (index === timelineEvents.length - 1) {
        toast.success("Successfully submitted! 🎉");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-xl p-8">
      <Toaster position="top-right" />

      <div className="relative mt-6">
        {timelineEvents.map((event, index) => {
          const isCompleted = completedSteps.includes(event.id);

          return (
            <div key={event.id} className="relative flex gap-4 pb-8">
              {/* Vertical Line */}
              {index !== timelineEvents.length - 1 && (
                <div
                  className={`absolute left-5 top-8 bottom-0 w-0.5 transition-colors ${
                    isCompleted ? "bg-green-500" : "bg-primary-color"
                  }`}
                />
              )}

              {/* Number Circle */}
              <div className="relative z-10 flex-shrink-0">
                <button
                  onClick={() => handleStepClick(event.id, index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium transition-colors ${
                    isCompleted ? "bg-green-500" : "bg-primary-color"
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : event.id}
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 pt-0.5">
                <Typography
                  size="lg"
                  className=" font-bold text-[#2c2c2c] mb-1"
                >
                  {event.title}
                </Typography>
                <p className="text-desc-color font-medium mb-0.5">
                  {event.date}
                </p>
                <p className="text-desc-color font-medium">{event.performer}</p>
                <p className="text-desc-color font-medium">{event.desc}</p>
                <p className="text-primary-color underline font-medium">
                  {event.view}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingTimeline;
