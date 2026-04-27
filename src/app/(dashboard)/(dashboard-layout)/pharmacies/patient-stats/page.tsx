// "use client";

// import React, { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import { Typography } from "@/components/shared/typography";
// import { ChevronDownIcon } from "@radix-ui/react-icons";
// // import { ChevronDown } from "lucide-react";

// const COLORS = ["#2F80ED", "#27AE60"]; // Blue (Rejected), Green (Accepted)

// const PatientRetentionRate = () => {
//   const [selectedRange, setSelectedRange] = useState("90d");

//   const data = [
//     { name: "Rejected", value: 27 },
//     { name: "Accepted", value: 73 },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-10 w-[90%] max-md:w-full max-w-sm">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <Typography as="h5" size="h5" className="font-semibold">
//           Patient Retention Rate
//         </Typography>
//         <button className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
//           {selectedRange}
//           <ChevronDownIcon className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Chart */}
//       <div className="relative h-[200px] flex items-center justify-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Tooltip />
//             <Pie
//               data={data}
//               innerRadius={60}
//               outerRadius={80}
//               startAngle={90}
//               endAngle={450}
//               dataKey="value"
//               paddingAngle={4}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>

//         {/* Center Percentage */}
//         <div className="absolute text-center">
//           <Typography as="h3" size="h3" className="font-bold">
//             73%
//           </Typography>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="flex justify-center gap-6 mt-4">
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-[#2F80ED]" />
//           <Typography className="text-gray-600 text-sm">Rejected</Typography>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-[#27AE60]" />
//           <Typography className="text-gray-600 text-sm">Accepted</Typography>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientRetentionRate;
"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function IncidentsOverviewChart() {
  const incidentData = [
    { name: "Missing medication", value: 73, color: "#2F80ED" },
    { name: "Out of stock", value: 15, color: "#10b981" },
    { name: "Incorrect rejection", value: 12, color: "#EB4824" },
  ];

  return (
    <div className="w-full max-w-md bg-white rounded-lg  p-6 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Incidents Overview
      </h3>

      {/* Chart and Legend Container */}
      <div className="flex items-center justify-center gap-8">
        {/* Donut Chart */}
        <div className="relative">
          <ResponsiveContainer width={200} height={270}>
            <PieChart>
              <Pie
                data={incidentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {incidentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Percentage */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-4xl font-bold text-gray-800">73%</div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {incidentData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dimensions Display */}
      {/* <div className="mt-6 flex justify-center">
        <span className="inline-flex items-center gap-2 text-xs text-white bg-blue-500 px-4 py-1.5 rounded font-semibold">
          465 × 363
        </span>
      </div> */}
    </div>
  );
}
