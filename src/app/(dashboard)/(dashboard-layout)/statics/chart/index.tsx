"use client";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/shared/typography";

const StaticCharts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  // Total Consultations Data
  const consultationsData = [
    { name: "Video", value: 65, color: "#10b981" },
    { name: "Audio", value: 20, color: "#3b82f6" },
    { name: "In-person", value: 15, color: "#f97316" },
  ];

  const totalConsultations = consultationsData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // Evolution Chart Data
  const evolutionData = [
    { week: "Week 1", value: 40, color: "#e5e7eb" },
    { week: "Week 2", value: 75, color: "#10b981" },
    { week: "Week 3", value: 50, color: "#e5e7eb" },
    { week: "Week 4", value: 35, color: "#ef4444" },
  ];

  return (
    <div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography size="h4" as="h4" className="font-bold mb-4">
              Total Consultations
            </Typography>
            {/* Total Consultations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text- font-medium text-gray-700">
                    Consultations
                  </span>
                  <div className="relative">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <ResponsiveContainer width={200} height={200}>
                      <PieChart>
                        <Pie
                          data={consultationsData}
                          innerRadius={65}
                          outerRadius={90}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {consultationsData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-gray-900">56</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6">
                  {consultationsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-8 h-4 rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px]"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Typography size="h4" as="h4" className="font-bold mb-4">
              Evolution Chart
            </Typography>
            {/* Evolution Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <ResponsiveContainer width="100%" height={310}>
                  <BarChart data={evolutionData} barSize={60}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f3f4f6"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {evolutionData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticCharts;
