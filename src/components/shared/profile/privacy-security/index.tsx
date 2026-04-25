"use client";

import { useState } from "react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { Icon } from "@iconify/react";

/* ======================
   TOGGLE (SAME AS PIC)
====================== */
const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: () => void;
}) => (
  <div
    onClick={onChange}
    className={`w-10 h-5 rounded-full cursor-pointer transition relative ${
      checked ? "bg-primary-color" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition ${
        checked ? "right-0.5" : "left-0.5"
      }`}
    />
  </div>
);

/* ======================
   ROW
====================== */
const Row = ({
  title,
  label,
  description,
  right,
}: {
  title?: string;
  label?: string;
  description?: string;
  right?: React.ReactNode;
}) => (
  <div className="py-3 border-b border-gray-200">
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-700 font-medium">
        {title || label}
      </span>
      {right}
    </div>

    {description && (
      <p className="text-xs text-gray-400 mt-1 max-w-[85%]">{description}</p>
    )}
  </div>
);

export default function PrivacyAndSecurity() {
  const [twoFA, setTwoFA] = useState(true);
  const [shareDocs, setShareDocs] = useState(true);
  const [shareRx, setShareRx] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [alerts, setAlerts] = useState(false);

  const [exportType, setExportType] = useState("pdf");
  const [dataType, setDataType] = useState("Medical Record");
  const [dateRange, setDateRange] = useState("last30");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Typography size="h4" className="font-semibold">
        Privacy & Security
      </Typography>

      {/* ACCOUNT SECURITY */}
      <div className="bg-white rounded-xl p-4 border">
        <Typography className="font-semibold mb-1">Account Security</Typography>
        <p className="text-xs text-gray-500 mb-4">
          Manage how your professional information and
          <br />
          patient-related data are handled
        </p>

        <Row
          label="Two-Factor Authentication"
          right={
            <div className="flex items-center gap-3">
              <span className="text-primary-color text-xs cursor-pointer underline font-semibold">
                Change Password
              </span>
              <Toggle checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
            </div>
          }
        />

        <div className="mt-4">
          <Typography className="font-medium text-md mb-2">
            Active Sessions
          </Typography>

          {[
            "Sign in device OPPO A5",
            "Sign in device OPPO A5",
            "Sign in device OPPO A5",
          ].map((item, i) => (
            <div
              key={i}
              className="text-xs text-gray-500 py-2 border-b last:border-b-0"
            >
              {item}
            </div>
          ))}

          <div className="flex justify-end mt-4">
            <Button className="bg-primary-color text-white rounded-lg px-4 text-sm">
              Sign out of all devices
            </Button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* DATA PROTECTION */}
        <div className="bg-white rounded-xl p-4 border">
          <Typography className="font-semibold mb-1">
            Your Data is Protected
          </Typography>

          <p className="text-xs text-gray-500 mb-3">
            Manage how your professional information and patient-related data
            are handled
          </p>

          <Row
            title="Allow Sharing Documents With Patient"
            description="Allows sharing your patient records with other verified professionals when needed."
            right={
              <Toggle
                checked={shareDocs}
                onChange={() => setShareDocs(!shareDocs)}
              />
            }
          />

          <Row
            title="Share Prescriptions With Pharmacy"
            description="Allows pharmacies to access prescriptions for dispensing."
            right={
              <Toggle checked={shareRx} onChange={() => setShareRx(!shareRx)} />
            }
          />

          <Row
            title="Allow Anonymized Analytics"
            description="Used for product improvement and aggregated insights only."
            right={
              <Toggle
                checked={analytics}
                onChange={() => setAnalytics(!analytics)}
              />
            }
          />

          <Row
            title="Activity Alerts"
            description="Receive notifications when sensitive actions occur."
            right={
              <Toggle checked={alerts} onChange={() => setAlerts(!alerts)} />
            }
          />
        </div>

        {/* EXTERNAL SOURCES */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 overflow-x-auto">
          <Typography className="font-semibold mb-3">
            External document sources
          </Typography>

          {/* TABLE HEADER */}
          <div className="min-w-[700px]">
            <div className="grid grid-cols-5 text-xs text-gray-400 pb-3 border-b">
              <span>Name</span>
              <span>Role</span>
              <span>Data</span>
              <span>Date & Time</span>
              <span className="text-right">Action</span>
            </div>

            {/* TABLE ROWS */}
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-5 text-xs py-3 border-b items-center text-gray-600"
              >
                <span>Alexis</span>
                <span>Cardiologist</span>
                <span>Medical Record</span>
                <span>Oct 18, 2025 - 14:22</span>

                <span className="flex justify-end gap-3 text-primary-color">
                  <Icon
                    icon="mdi:eye-outline"
                    className="cursor-pointer"
                    width={16}
                  />
                  <Icon
                    icon="mdi:pencil-outline"
                    className="cursor-pointer"
                    width={16}
                  />
                  <Icon
                    icon="mdi:delete-outline"
                    className="cursor-pointer"
                    width={16}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* EXPORT DATA */}
        <div className="bg-white rounded-xl p-4 border">
          <Typography className="font-semibold mb-3">Export My Data</Typography>

          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={exportType === "pdf"}
                onChange={() => setExportType("pdf")}
              />
              PDF
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={exportType === "email"}
                onChange={() => setExportType("email")}
              />
              Email
            </label>

            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option>Medical Record</option>
              <option>Prescription</option>
              <option>Consultation History</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
            </select>

            <Button className="w-full bg-primary-color text-white rounded-lg">
              Export
            </Button>
          </div>
        </div>

        {/* DATA CONTROLLER */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <Typography className="font-semibold mb-3">
            Data Controller
          </Typography>

          <div className="text-sm text-gray-600">
            {/* ROW 1 */}
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span>Data Controller</span>
              <span className="text-gray-500">
                Navna Care Digital Health (EU)
              </span>
            </div>

            {/* ROW 2 */}
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span>DPO Contact</span>
              <span className="text-gray-500">dpo@navnacare.eu</span>
            </div>

            {/* ROW 3 */}
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span>Hosting</span>
              <span className="text-gray-500">HDS-certified cloud</span>
            </div>

            {/* FOOTER TEXT */}
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              All operations comply with GDPR, CNPD, and HDS standards.
              Doctor-level access is strictly audited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
