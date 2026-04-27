"use client";

import { Typography } from "@/components/shared/typography";

export default function EditServiceForm() {
  return (
    <div className="bg-white rounded-2xl p-6 max-w-4xl">
      {/* TITLE */}
      <Typography size="h5" className="font-semibold mb-6">
        Edit Existing Service
      </Typography>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4">
        {/* Service Name */}
        <div>
          <label className="text-sm">Service Name</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value="Home Visit"
          />
        </div>

        {/* Default Duration */}
        <div>
          <label className="text-sm">Default Duration</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value="15 min"
          />
        </div>

        {/* Fee */}
        <div>
          <label className="text-sm">Fee</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value="$590"
          />
        </div>

        {/* Additional Travel Fee */}
        <div>
          <label className="text-sm">Additional Travel Fee</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value="$590"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm">Duration</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value="12km"
          />
        </div>

        {/* Mode (Reusable Component) */}
        {/* <ModeSelect
          value="Home Visit"
          onChange={() => {}}
          options={[
            "Remote Consultation",
            "In-person Consultation",
            "Home Visit Consultation",
          ]}
        /> */}

        {/* Status */}
        <div>
          <label className="text-sm">Status</label>
          <select className="w-full border rounded-lg px-3 py-2 text-sm">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm">Category</label>
          <select className="w-full border rounded-lg px-3 py-2 text-sm">
            <option>Home visit Consultation</option>
            <option>Remote Consultation</option>
            <option>In-person Consultation</option>
          </select>
          <p className="text-xs text-red-500 mt-1">Requires verification</p>
        </div>
      </div>

      {/* Patient Instructions */}
      <div className="mt-4">
        <label className="text-sm">Patient instructions</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm"
          rows={3}
          defaultValue="Bring previous test results. Fasting required."
        />
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="text-sm">Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm"
          rows={3}
          defaultValue="Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA."
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="px-6 py-2 rounded-lg bg-gray-100 text-sm">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-lg bg-primary-color text-white text-sm">
          Update
        </button>
      </div>
    </div>
  );
}
