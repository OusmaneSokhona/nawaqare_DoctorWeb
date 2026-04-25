"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Typography } from "@/components/shared/typography";

// Mock Data as per image
const data = [
  { name: "Mon", current: 26.8, previous: 26.2 },
  { name: "Tue", current: 27.2, previous: 27.1 },
  { name: "Wed", current: 28.5, previous: 26.5 },
  { name: "Thu", current: 26.5, previous: 27.1 },
  { name: "Fri", current: 26.8, previous: 28.1 },
  { name: "Sat", current: 26.1, previous: 27.2 },
];

const ConsultationsChart = () => {
  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <Typography size="h4" className="text-gray-800 mb-8">
        Consultations Over Time
      </Typography>

      <div className="h-[300px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            {/* Grid Lines - subtle as per image */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              opacity={0.5}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              domain={[25, 29]}
              ticks={[25, 26, 27, 28, 29]}
            />

            {/* Custom Tooltip matching the blue box in image */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#EBF3FF] p-4 rounded-xl border border-blue-100 shadow-sm text-center">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">
                        Date: Jan 10
                      </p>
                      <p className="text-xs text-blue-700 font-bold mt-1">
                        Current period: {payload[0].value} consultations
                      </p>
                      <p className="text-xs text-orange-600 font-bold">
                        Previous period: {payload[1].value} consultations
                      </p>
                      <p className="text-[10px] text-blue-500 font-black mt-1">
                        +41 % vs previous period
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              content={({ payload }) => (
                <div className="flex justify-center gap-6 mt-6 text-[11px] font-bold">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
                    Current period (Last 30 days)
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                    Previous period (30 days before)
                  </div>
                </div>
              )}
            />

            {/* Blue Line - Current */}
            <Line
              type="monotone"
              dataKey="current"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
            />

            {/* Red/Orange Line - Previous */}
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#EF4444"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#EF4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsultationsChart;
