import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ConsultationGraph() {
  // Usage Statistics data
  const usageData = [
    { month: "Jan", value: 27 },
    { month: "Feb", value: 28 },
    { month: "Mar", value: 26 },
    { month: "Apr", value: 27 },
    { month: "May", value: 26 },
    { month: "Jun", value: 27 },
    { month: "Jul", value: 26 },
    { month: "Aug", value: 28 },
    { month: "Sep", value: 26 },
    { month: "Oct", value: 27 },
    { month: "Nov", value: 28 },
  ];

  // Patient Retention data
  const retentionData = [
    { name: "Active", value: 73 },
    { name: "Expired", value: 27 },
  ];

  const COLORS = ["#3B82F6", "#F59E0B"];

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Usage Statistics */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Usage Statistics
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  domain={[25, 29]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Patient Retention Rate */}
          <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Patient Retention Rate
            </h2>
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={retentionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {retentionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-800">73%</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue"></div>
                  <span className="text-sm text-gray-600">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-600">Expired</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
