"use client";
import React, { useState } from "react";

const AudioVideoSetup: React.FC = () => {
  const [bandwidth, setBandwidth] = useState<number>(14);
  const [latency, setLatency] = useState<number>(67);
  const [connectionQuality, setConnectionQuality] = useState<string>("Good");
  const [cameraGranted, setCameraGranted] = useState<boolean>(true);
  const [latencyGranted, setLatencyGranted] = useState<boolean>(false);

  return (
    <div className=" bg-white rounded-lg shadow-lg p-6">
      {/* Audio & Video Setup */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Audio & Video Setup
        </h2>
        <div className="flex max-md:flex-col gap-4">
          {/* Microphone */}
          <div className="mb-4 w-[50%] max-md:w-full">
            <label className="block text font-medium text-gray-700 mb-2">
              Microphone
            </label>
            {/* <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-8 bg-blue rounded-sm"></div>
            ))}
          </div> */}
            <select className="w-full px-3 py-3 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Internal microphone</option>
            </select>
          </div>

          {/* Speakers */}
          <div className="mb-4 w-[50%] max-md:w-full">
            <div className="flex justify-between items-center mb-2">
              <label className="block text font-medium text-gray-700">
                Speakers
              </label>
              <button className="text-blue-500 text hover:underline">
                Test Speakers
              </button>
            </div>
            <select className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Default</option>
            </select>
          </div>
        </div>

        <div className="flex  max-md:flex-col gap-4">
          {/* Camera */}
          <div className="mb-4 w-[50%] max-md:w-full">
            <div className="flex justify-between items-center mb-2">
              <label className="block text font-medium text-gray-700">
                Camera
              </label>
              <button className="text-primary-color text hover:underline">
                Camera is on
              </button>
            </div>
            <select className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Default</option>
            </select>
          </div>
          {/* Output Language */}
          <div className="mb-4 w-[50%] max-md:w-full">
            <label className="block  font-medium text-gray-700 mb-2">
              Outlook Language
            </label>
            <select className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue">
              <option>Output Language</option>
            </select>
          </div>
        </div>
      </div>

      {/* Connection Health */}
      <div className="mb-6 ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Connection Health
        </h2>

        <div className="space-y-3 border rounded-xl p-6 mb-4">
          <div className="flex justify-between border-b pb-3 items-center">
            <span className="text text-gray-700">Bandwidth</span>
            <span className="text font-medium text-gray-900">
              {bandwidth} Mbps
            </span>
          </div>
          <div className="flex justify-between border-b pb-3 items-center">
            <span className="text text-gray-700">Latency</span>
            <span className="text font-medium text-gray-900">{latency} ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text text-gray-700">Connection Quality</span>
            <span className="text font-medium text-gray-900">
              {connectionQuality}
            </span>
          </div>
          <div className="flex justify-end pt-4">
            <button className=" bg-primary-color hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Run Network Test
            </button>
          </div>
        </div>
      </div>

      {/* Device Permissions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Device Permissions
        </h2>

        <div className="space-y-3 border rounded-xl p-6 mb-4">
          <div className="flex justify-between border-b pb-3 items-center">
            <span className="text text-gray-700">Camera Access</span>
            <span
              className={`text font-medium ${cameraGranted ? "text-green-600" : "text-red"}`}
            >
              {cameraGranted ? "✓ Granted" : "✗ Blocked"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text text-gray-700">Latency</span>
            <span
              className={`text font-medium ${latencyGranted ? "text-green-600" : "text-red-600"}`}
            >
              {latencyGranted ? "✓ Granted" : "✗ Blocked"}
            </span>
          </div>
          <div className="flex justify-end items-end">
            <button className=" bg-primary-color hover:bg-blue text-white font-medium py-2 px-4 rounded-md transition-colors">
              Manage Permissions
            </button>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mb-6">
        <p className="text text-gray-700 mb-2">
          If You're Experiencing Call Or Device Issues, Try These Steps:
        </p>
        <ul className="space-y-1">
          <li>
            <a href="#" className="text-primary-color hover:underline text">
              Open Troubleshooting Guide
            </a>
          </li>
          <li>
            <a href="#" className="text-primary-color hover:underline text">
              Restart Device Test
            </a>
          </li>
          <li>
            <a href="#" className="text-primary-color hover:underline text">
              Contact Technical Support
            </a>
          </li>
        </ul>
        <p className="text text-gray-500 mt-2">Last Tested: 3 Minutes Ago</p>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3">
        <button className=" bg-gray-200 w-[180px] hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors">
          Restore Defaults
        </button>
        <button className=" w-[180px] bg-primary-color hover:bg-blue text-white font-medium py-2 px-4 rounded-md transition-colors">
          Save
        </button>
      </div>
    </div>
  );
};

export default AudioVideoSetup;
