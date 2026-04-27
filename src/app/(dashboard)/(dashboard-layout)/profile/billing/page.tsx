"use client";

import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

export default function BillingSubscription() {
  return (
    <div className="space-y-6 p-2">
      <Typography size="h4" className="font-semibold">
        Billing & Subscription
      </Typography>

      {/* CURRENT PLAN */}
      <div className="border rounded-xl p-4 sm:p-5 space-y-4 ">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 border-b border-gray-300 pb-2">
          <div>
            <Typography className="font-semibold">Professional Plan</Typography>
            <p className="text-xs text-gray-500">Renews on May 30, 2024</p>
          </div>

          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-md w-fit">
            Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm ">
          {[
            "Unlimited teleconsultation",
            "Electronic prescriptions",
            "Patient record access",
            "Priority support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 border-b border-gray-300 pb-1"
            >
              <Icon icon="mdi:check-circle" className="text-green-500" />
              {item}
            </div>
          ))}
        </div>

        <button className="text-xs text-primary-color underline w-fit ">
          View billing history
        </button>

        {/* PAYMENT METHOD */}
        <div>
          <Typography className="text-sm font-medium mb-2">
            Payment Method
          </Typography>

          <div className="flex flex-col sm:flex-row gap-3 border-b border-gray-300 pb-2">
            <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-white">
              <Icon icon="logos:mastercard" width={24} />
              <span className="text-sm">Credit/Debit Card</span>
            </div>

            <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-white">
              <Icon icon="logos:paypal" width={24} />
              <span className="text-sm">Paypal</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 text-xs text-gray-400 font-semibold cursor-pointer underline">
              Set a default
            </div>

            <div className="mt-2 text-xs text-primary-color font-semibold cursor-pointer underline">
              Add a payment method
            </div>
          </div>
        </div>
      </div>

      {/* PLANS */}
      <div className="border rounded-xl p-4 sm:p-5 space-y-4">
        <Typography className="font-semibold">Choose / Change Plan</Typography>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg px-4 py-3 bg-transparent"
          >
            {/* HEADER ROW */}
            <div className="flex justify-between items-center mb-2">
              <Typography className="font-medium text-sm">
                Standard Plan
              </Typography>

              {i === 1 && (
                <span className="bg-green-500 text-white text-xs px-4 py-1 rounded-md">
                  Active
                </span>
              )}
            </div>

            {/* FEATURES – ROW STYLE */}
            <div className="divide-y divide-gray-200 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 py-2">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Unlimited teleconsultation
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Electronic prescriptions
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 py-2">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Patient record access
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="text-green-500" />
                  Priority support
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ACTION BUTTONS */}
        <div className="flex justify-center sm:justify-end gap-3 pt-2">
          <button className="px-8 py-2 rounded-lg bg-gray-300 text-md font-semibold">
            Downgrade
          </button>

          <button className="px-8 py-2 rounded-lg bg-primary-color text-white text-md font-semibold">
            Upgrade
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <Typography className="font-semibold">Payment issue</Typography>
        <div className="border rounded-xl p-4 bg-yellow-50 border-yellow-300 mt-2">
          <div className="flex items-center gap-2 text-black text-md font-medium">
            <Icon icon="mdi:alert" className="text-yellow-700" />
            Your subscription payment has failed
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3 leading-relaxed">
          Manage how your professional information and patient-related data are
          handledManage how your professional information and patient-related
          data are handledManage how your professional information and
          patient-related data are handledManage how your professional
          information and patient-related data are handled
        </p>
      </div>
    </div>
  );
}
