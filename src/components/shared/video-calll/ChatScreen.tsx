import { Icon } from "@iconify/react";
import React from "react";
import { Typography } from "../typography";

const messages = [
  {
    id: 1,
    sender: "doctor",
    text: "Chat in real time with your doctor. Ask questions, share reports, and get quick medical advice — all in one secure place.",
    time: "08:16 AM",
  },
  {
    id: 2,
    sender: "user",
    text: "Yes, we'll be covering the latest ESC 2025 guidelines.",
    time: "08:16 AM",
  },
  {
    id: 3,
    sender: "doctor",
    file: { name: "Cough-audio-recording.m4a", size: "427 KB" },
    image: "/throat.jpg", // replace with real image
  },
];

const ChatScreen = () => {
  return (
    <div className="flex flex-col h-[80vh] bg-[#f7f6fb]">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="doctor"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">Mr. Alex Martin</p>
            <p className="text-xs text-green-500">Online</p>
            <p className="text-xs text-gray-400">
              Encrypted Messaging – GDPR/HDS Compliant
            </p>
          </div>
        </div>
        <button className="bg-primary-color text-white text-xs px-3 py-1 rounded-md">
          Appointment Detail
        </button>
      </div>

      {/* Consultation Info */}
      <div className="bg-yellow-100 mx-4 mt-3 p-3 rounded-lg text-sm">
        <p className="font-medium text-green-600">Active Consultation</p>
        <p className="text-gray-600">Video Consultation · 2 days ago</p>
        <p className="text-gray-600">Reason: Cough and sore throat</p>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-xl p-3 mx-4 mt-4">
        <Icon
          className="text-primary-color"
          icon="material-symbols:info-rounded"
          width="24"
          height="24"
        />
        <div className="">
          <Typography>
            This chat is available for 48h after consultation.
          </Typography>
          <Typography size={"h6"} as={"h6"}>
            Messages are part of the medical record.
          </Typography>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Doctor Message */}
        <div className="flex items-start gap-2">
          <img
            src="https://i.pravatar.cc/30"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-white p-3 rounded-xl max-w-[70%] shadow">
            <p className="text-sm">
              Chat in real time with your doctor. Ask questions, share reports,
              and get quick medical advice — all in one secure place.
            </p>
            <span className="text-xs text-gray-400">08:16 AM</span>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white p-3 rounded-xl max-w-[70%]">
            <p className="text-sm">
              Yes, we'll be covering the latest ESC 2025 guidelines.
            </p>
            <span className="text-xs text-blue-200">Seen</span>
          </div>
        </div>

        {/* File + Image */}
        <div className="flex items-start gap-2">
          <img
            src="https://i.pravatar.cc/30"
            className="w-8 h-8 rounded-full"
          />
          <div className="bg-white p-3 rounded-xl shadow space-y-2">
            <div className="flex items-center justify-between border p-2 rounded">
              <span className="text-sm">Cough-audio-recording.m4a</span>
              <span className="text-xs text-gray-400">427 KB</span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03"
              className="w-40 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white p-3 flex items-center gap-2 border-t">
        <button className="text-xl">＋</button>
        <input
          type="text"
          placeholder="Message"
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
        />
        <button className="bg-blue-600 text-white px-3 py-2 rounded-full">
          🎤
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
