"use client";

import React, { FC } from "react";

const PatientInformation: FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 max-md:p-5">
      <div className="flex flex-col gap-10 w-[60%] max-lg:w-full max-md:gap-6">
        {/* Consulting For & Guardian ID */}
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Consulting for</label>
            <input
              type="text"
              placeholder="My self"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Guardian ID</label>
            <input
              type="text"
              placeholder="myID.pdf"
              className="border border-border-color placeholder:text-tertiary-color rounded-xl py-2 px-3 h-14"
            />
          </div>
        </div>

        {/* State & Gender */}
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">State</label>
            <input
              type="text"
              placeholder="California"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Gender</label>
            <input
              type="text"
              placeholder="Female"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
        </div>

        {/* Age & Email */}
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Age in years</label>
            <input
              type="number"
              placeholder="27"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Email address</label>
            <input
              type="email"
              placeholder="abc.patient@email.com"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
        </div>

        {/* Phone & Condition */}
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Phone number</label>
            <input
              type="tel"
              placeholder="+90 000 0000 0000"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
          <div className="flex flex-col w-[50%] max-md:w-full space-y-2">
            <label className="font-medium">Medical condition</label>
            <input
              type="text"
              placeholder="Ureaplasma"
              className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col w-full space-y-2">
          <label className="font-medium">Reachable address</label>
          <input
            type="text"
            placeholder="P123, OI street, Aim block, New York city, NY568765, USA."
            className="border border-border-color placeholder:text-desc-color rounded-xl py-2 px-3 h-14"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientInformation;
