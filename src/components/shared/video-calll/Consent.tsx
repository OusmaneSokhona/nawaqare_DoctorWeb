import React from "react";
import { Typography } from "../typography";

const Consent = () => {
  return (
    <div className="space-y-3">
      <div>
        <Typography size={"h4"} as={"h4"}>
          Consent & Access
        </Typography>
        <p className="text-sm text-gray-500 mb-1">Access Scope</p>
      </div>

      {/* Consents */}
      <div className="mb-4 border p-4 rounded-xl space-y-2">
        {/* Access Scope */}
        <div className="">
          <div className="flex justify-between items-center bg-green-100 text-green-700 px-3 py-2 rounded-lg">
            <span className="text-sm font-medium">Record access</span>
            <span className="text-xs bg-green-200 px-2 py-1 rounded">
              Access Granted
            </span>
          </div>
        </div>
        <Typography size={"h5"} as={"h5"} className="text-gray-500 mb-2">
          Consents
        </Typography>

        <div className="flex justify-between items-center bg-white px-3 py-2 rounded-lg mb-2 shadow-sm border">
          <span className="text-sm">Teleconsultation consent</span>
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            Signed
          </span>
        </div>

        <div className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm border">
          <span className="text-sm">Teleconsultation consent</span>
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
            Not Signed
          </span>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-primary-color text-white py-2 rounded-lg font-medium">
        Send Consent Request
      </button>
    </div>
  );
};

export default Consent;
