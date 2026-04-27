"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

/* ================= TYPES ================= */

type SyncDirection = "one-way" | "two-way";
type LogStatus = "Sync" | "Conflict Detected";

interface LogItem {
  time: string;
  source: string;
  status: LogStatus;
}

/* ================= MOCK DATA ================= */

const initialLogs: LogItem[] = [
  { time: "Today at 9:20 pm", source: "Internal Calendar", status: "Sync" },
  {
    time: "Today at 9:20 pm",
    source: "Internal Calendar",
    status: "Conflict Detected",
  },
  {
    time: "Today at 9:20 pm",
    source: "Internal Calendar",
    status: "Conflict Detected",
  },
  {
    time: "Today at 9:20 pm",
    source: "Internal Calendar",
    status: "Conflict Detected",
  },
];

export default function CalendarSynchronization() {
  const [autoSync, setAutoSync] = useState(true);
  const [direction, setDirection] = useState<SyncDirection>("one-way");
  const [logs] = useState<LogItem[]>(initialLogs);

  const handleManualSync = () => {
    console.log("Manual sync triggered");
  };

  return (
    <div className="space-y-8 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Calendar synchronization</h1>
          <p className="text-gray-500 text-sm mt-1">
            Keep Your Nawa Care Schedule Aligned With Google, Outlook, Or iCal.
          </p>
        </div>

        <button
          onClick={handleManualSync}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Force manual synchronization
        </button>
      </div>

      {/* ================= SYNC STATUS ================= */}
      <div className="bg-green-100 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
        <Icon icon="mdi:check-circle" className="text-green-600" width={20} />
        <p className="text-sm text-green-800">
          <strong>Synchronized :</strong> Internal calendar | Last sync 12:00pm{" "}
          <span className="ml-2 text-green-600 font-medium">
            Last synced successfully at 09:45 AM.
          </span>
        </p>
      </div>

      {/* ================= INTEGRATION OPTIONS ================= */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Integration Options</h2>

        {[
          {
            name: "Google Calendar",
            icon: "logos:google-calendar",
          },
          {
            name: "Outlook Calendar",
            icon: "logos:microsoft-outlook",
          },
          {
            name: "Apple iCal",
            icon: "logos:apple",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center bg-white p-4 rounded-xl border"
          >
            <div className="flex items-center gap-4">
              <Icon icon={item.icon} width={28} />
              <span className="font-medium">{item.name}</span>
            </div>

            <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md">
              Connect
            </button>
          </div>
        ))}
      </div>

      {/* ================= SYNC SETTINGS ================= */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Sync Settings</h2>

        <div className="bg-white p-4 rounded-xl border flex justify-between items-center">
          <span className="text-sm">Automatic sync every 6 hours</span>

          {/* Toggle */}
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              autoSync ? "bg-primary-color" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                autoSync ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ================= SYNC DIRECTION ================= */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Sync Direction Mode</h2>

        {/* One Way */}
        <label className="bg-white p-4 rounded-xl border flex gap-4 cursor-pointer">
          <input
            type="radio"
            checked={direction === "one-way"}
            onChange={() => setDirection("one-way")}
            className="mt-1"
          />
          <div>
            <p className="font-medium">One-way (read-only)</p>
            <p className="text-sm text-gray-500">
              Updates Are Imported From External Calendar Only.
            </p>
          </div>
        </label>

        {/* Two Way */}
        <label className="bg-white p-4 rounded-xl border flex gap-4 cursor-pointer">
          <input
            type="radio"
            checked={direction === "two-way"}
            onChange={() => setDirection("two-way")}
            className="mt-1"
          />
          <div>
            <p className="font-medium">Two-way sync</p>
            <p className="text-sm text-gray-500">
              Changes In Nawa Care Are Mirrored In External Calendar.
            </p>
          </div>
        </label>
      </div>

      {/* ================= SYNC LOG ================= */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Synchronization Log</h2>

        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="p-3">Latest actions</th>
                <th className="p-3">Source</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{log.time}</td>
                  <td className="p-3 text-gray-500">{log.source}</td>
                  <td className="p-3">
                    <span
                      className={`font-medium ${
                        log.status === "Sync"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
