"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  prescriptionData: any;
}

export default function SignatureModal({
  isOpen,
  onClose,
  onConfirm,
  prescriptionData,
}: SignatureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Electronic Signature
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Icon
              icon="mdi:close-circle"
              className="w-8 h-8 text-primary-color"
            />
          </button>
        </div>

        <div className="px-6 pt-2 space-y-6">
          <p className="text-sm text-gray-600 font-medium">
            You Are About To Electronically Sign This Prescription
          </p>

          {/* WARNING MESSAGE */}
          <div className="bg-orange-50 border border-red-100 p-3 rounded-lg flex items-center gap-3">
            <Icon
              icon="mdi:alert-circle"
              className="text-orange-500 w-5 h-5 flex-shrink-0"
            />
            <p className="text-gray-800 text-[10px] uppercase tracking-tight">
              WARNING: Once signed, the prescription can no longer be modified
              (only cancelled). Please check carefully.
            </p>
          </div>

          {/* PRESCRIPTION SUMMARY */}
          <section>
            <h3 className="text-sm font-bold text-gray-700 flex w-fit items-center gap-1 underline  mb-2  pb-1">
              <Icon
                icon="mdi:file-document-outline"
                className="w-4 h-4 text-yellow-700"
              />{" "}
              PRESCRIPTION SUMMARY
            </h3>
            <div className="grid grid-cols-2 gap-y-1 text-gray-400 text-sm">
              <span className="text-gray-500 font-semibold">Patient:</span>
              <span className=" text-gray-500">
                John Smith (34 years, 72 kg)
              </span>

              <span className="text-gray-500 font-semibold">ID:</span>
              <span className="text-gray-500">#54321 | CMU: Active</span>

              <span className="text-gray-500 font-semibold">Medications:</span>
              <div className="">
                <p className=" text-gray-500 text-xs ">
                  Amoxicillin 500mg capsule
                </p>
                <p className="text-[10px] text-gray-500">
                  1 capsule, 2x/day, 15 days
                </p>
              </div>

              <span className="text-gray-500 font-semibold">Diagnosis:</span>
              <span className="text-gray-500 text-xs">
                Urinary tract infection (N39.0)
              </span>
            </div>
            <button className="text-primary-color text-xs font-bold mt-3 flex items-center underline gap-1 hover:underline">
              <Icon icon="mdi:file-find-outline" className="w-4 h-4" /> View
              full prescription
            </button>
          </section>

          {/* AUTHENTICATION */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 border-b w-fit pb-1">
              <Icon icon="mdi:lock-outline" /> AUTHENTICATION REQUIRED
            </h3>
            <p className="text-xs text-gray-600 font-semibold">
              Authentication method:
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Password",
                "SMS code",
                "Mobile app",
                "Biometric(if available)",
              ].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 text-xs font-medium cursor-pointer"
                >
                  <input
                    type="radio"
                    name="auth"
                    defaultChecked={method === "Password"}
                    className="text-blue-500"
                  />
                  {method}
                </label>
              ))}
            </div>
            <div className="relative mt-4">
              <label className="text-[10px] font-bold text-gray-500 uppercase">
                Password
              </label>
              <input
                type="password"
                value="************"
                readOnly
                className="w-full border p-3 rounded-lg text-sm  mt-1"
              />
              <Icon
                icon="mdi:eye-outline"
                className="absolute right-3 top-9 text-gray-400"
              />
            </div>
            <button className="text-primary-color underline text-[10px] font-bold block text-right w-full hover:underline">
              Forget Password
            </button>
          </section>

          {/* SIGNATURE PAD AREA */}
          <section>
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-sm font-bold text-gray-700">
                Add your handwritten signature:
              </h3>
              <button className="text-primary-color text-[10px] underline  font-bold hover:underline">
                Use saved signature
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-xl h-40  flex items-center justify-center">
              <p className="text-gray-300 text-xs italic">
                The handwritten signature will be added to the PDF prescription
                for visual purposes
              </p>
            </div>
          </section>

          {/* CHECKBOXES */}
          <div className="space-y-2">
            {[
              "I confirm this prescription is accurate",
              "I confirm that I have verified all details of this prescription",
              "I certify the accuracy of the information",
              "Send a copy by email to the patient",
            ].map((text, i) => (
              <label
                key={i}
                className="flex items-center gap-3 text-[11px] font-semibold text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                />
                {text}
              </label>
            ))}
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-6 flex justify-end gap-4">
          <div></div>
          <div className="">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-100 text-sm text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition px-7"
            >
              Clear
            </button>
            <button className="flex-1 ml-4 py-2.5 bg-primary-color text-white text-sm px-4 font-bold rounded-xl shadow-lg ">
              Confirm signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
