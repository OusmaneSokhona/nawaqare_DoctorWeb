"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { Icon } from "@iconify/react";

const data = [
  { name: "Paid", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Failed", value: 15 },
];

const COLORS = ["#22c55e", "#f97316", "#ef4444"]; // green, orange, red

export default function PaymentStatusOverview() {
  return (
    <div className="bg-white shadow-md w-[190px] rounded-2xl p-4 space-y-2 max-sm:w-full max-sm:text-center">
      {/* Left Section */}
      <div className="flex flex-col max-md:items-center gap-2">
        {/* <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center text-white">
          <TrendingUp size={16} />
        </div> */}
        <div className="w-9 h-9 rounded-full bg-primary-color flex items-center justify-center text-white">
          <Icon icon="simple-line-icons:graph" width="24" height="24" />
        </div>

        <div className="flex max-md:flex-col max-md:gap-3 max-md:items-center justify-between">
          <div className="text-sm flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Paid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red rounded-full"></span>
              <span>Failed</span>
            </div>
          </div>
          {/* <div className="w-20 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={40}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div> */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={24}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <p className="text-xs mt-2">Payment Status Overview</p>

      {/* Pie Chart */}
    </div>
  );
}
