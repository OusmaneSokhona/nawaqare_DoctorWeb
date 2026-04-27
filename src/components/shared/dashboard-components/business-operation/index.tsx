import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Typography } from "../../typography";

export default function BusinessOperationChart() {
  const [activeTab, setActiveTab] = useState("Monthly");

  const barData = [
    { name: "Consultations", value: 85, color: "#2F80ED" },
    { name: "Pharmacy", value: 92, color: "#2F80ED" },
    { name: "Delivery", value: 68, color: "#2F80ED" },
    { name: "Top Pharmacies consultation", value: 75, color: "#2F80ED" },
    { name: "Top Doctors", value: 58, color: "#2F80ED" },
  ];

  const pieData = [
    { name: "Home Visit", value: 15, color: "#B6B6B6" },
    { name: "In person Visit", value: 45, color: "#2F80ED" },
    { name: "Remote Visit", value: 40, color: "#27AE60" },
  ];

  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center  justify-between mb-6">
        <Typography size="xl" className="pb-2 font-semibold">
          Business & Operation
        </Typography>
        <div className="flex gap-2">
          {["Weekly", "Monthly", "Yearly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded transition-colors ${
                activeTab === tab
                  ? "bg-[#2F80ED] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
        {/* Bar Charts Section */}
        <div className="space-y-4">
          {barData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-32 text-sm text-gray-600 truncate"
                title={item.name}
              >
                {item.name}
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-100 rounded-lg h-5 overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donut Chart Section */}
        <div className="flex items-center justify-center">
          {/* Custom Legend */}
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dimensions Display */}
      {/* <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-1.5 rounded text-sm font-semibold">
          827 × 294
        </div>
      </div> */}
    </div>
  );
}
