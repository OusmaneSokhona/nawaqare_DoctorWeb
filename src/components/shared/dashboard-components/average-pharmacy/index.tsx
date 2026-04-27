import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Typography } from "../../typography";

export default function PharmacyProcessingTimeChart() {
  const data = [
    { month: "Jan", time: 320 },
    { month: "Feb", time: 380 },
    { month: "Mar", time: 420 },
    { month: "Apr", time: 450 },
    { month: "May", time: 390 },
    { month: "Jun", time: 480 },
    { month: "Jul", time: 520 },
    { month: "Aug", time: 490 },
    { month: "Sep", time: 420 },
    { month: "Oct", time: 380 },
    { month: "Nov", time: 340 },
    { month: "Dec", time: 310 },
  ];

  const avgTime = Math.round(
    data.reduce((sum, item) => sum + item.time, 0) / data.length,
  );
  const maxTime = Math.max(...data.map((item) => item.time));

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Typography size="xl" className="pb-2 font-semibold">
            Average Pharmacy Processing Time
          </Typography>
          {/* <button className="text-xs text-gray-500 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Export
          </button> */}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            domain={[0, maxTime + 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value) => [`${value} mins`, "Processing Time"]}
          />
          <Area
            type="monotone"
            dataKey="time"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorTime)"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold">
          <span>
            {avgTime} × {data.length}
          </span>
        </div>
      </div>

      {/* <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-2xl font-bold text-gray-800">{Math.min(...data.map(item => item.time))}</div>
          <div className="text-xs text-gray-500 mt-1">Min Time (mins)</div>
        </div>
        <div className="p-3 bg-blue-50 rounded">
          <div className="text-2xl font-bold text-blue-600">{avgTime}</div>
          <div className="text-xs text-gray-500 mt-1">Avg Time (mins)</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-2xl font-bold text-gray-800">{maxTime}</div>
          <div className="text-xs text-gray-500 mt-1">Max Time (mins)</div>
        </div>
      </div> */}
    </div>
  );
}
