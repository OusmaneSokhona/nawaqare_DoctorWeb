// "use client";

// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Typography } from "@/components/shared/typography";
// import { Button } from "@/components/shared/button";

// const PrescriptionVolumeChart = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

//   const data = {
//     Weekly: [
//       { name: "Mon", value1: 26, value2: 27 },
//       { name: "Tue", value1: 25, value2: 26 },
//       { name: "Wed", value1: 26.5, value2: 27.5 },
//       { name: "Thu", value1: 27, value2: 28 },
//       { name: "Fri", value1: 26, value2: 26.5 },
//       { name: "Sat", value1: 25.5, value2: 25.8 },
//       { name: "Sun", value1: 26, value2: 27 },
//     ],
//     Monthly: [
//       { name: "Jan", value1: 26, value2: 27 },
//       { name: "Feb", value1: 25.8, value2: 26.5 },
//       { name: "Mar", value1: 27, value2: 28.5 },
//       { name: "Apr", value1: 26.7, value2: 27.2 },
//       { name: "May", value1: 26.2, value2: 26.8 },
//       { name: "Jun", value1: 25.9, value2: 26.4 },
//       { name: "Jul", value1: 26.8, value2: 27 },
//       { name: "Aug", value1: 25.6, value2: 26 },
//       { name: "Sep", value1: 26.7, value2: 27.1 },
//       { name: "Oct", value1: 27, value2: 27.5 },
//       { name: "Nov", value1: 26.5, value2: 27 },
//       { name: "Dec", value1: 25.9, value2: 26.2 },
//     ],
//     Yearly: [
//       { name: "2020", value1: 24.5, value2: 25.2 },
//       { name: "2021", value1: 25.5, value2: 26 },
//       { name: "2022", value1: 26, value2: 27 },
//       { name: "2023", value1: 26.8, value2: 27.5 },
//       { name: "2024", value1: 27.1, value2: 28 },
//     ],
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 w-full">
//       <div className="flex justify-between items-center mb-5">
//         <Typography as="h5" size="h5" className="font-semibold">
//           Prescription Volume
//         </Typography>

//         <div className="flex gap-2">
//           {["Weekly", "Monthly", "Yearly"].map((period) => (
//             <button
//               key={period}
//               onClick={() => setSelectedPeriod(period)}
//               className={`px-4 py-2 rounded-lg font-medium transition ${
//                 selectedPeriod === period
//                   ? "bg-primary-color text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {period}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="h-[260px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data[selectedPeriod]}>
//             <XAxis dataKey="name" />
//             <YAxis domain={[25, 29]} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="value1"
//               stroke="#F2994A"
//               strokeWidth={2}
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="value2"
//               stroke="#2F80ED"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionVolumeChart;
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@/components/shared/typography";

type Period = "Weekly" | "Monthly" | "Yearly";

const PrescriptionVolumeChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Monthly");

  const data: Record<
    Period,
    { name: string; value1: number; value2: number }[]
  > = {
    Weekly: [
      { name: "Mon", value1: 26, value2: 27 },
      { name: "Tue", value1: 25, value2: 26 },
      { name: "Wed", value1: 26.5, value2: 27.5 },
      { name: "Thu", value1: 27, value2: 28 },
      { name: "Fri", value1: 26, value2: 26.5 },
      { name: "Sat", value1: 25.5, value2: 25.8 },
      { name: "Sun", value1: 26, value2: 27 },
    ],
    Monthly: [
      { name: "Jan", value1: 26, value2: 27 },
      { name: "Feb", value1: 25.8, value2: 26.5 },
      { name: "Mar", value1: 27, value2: 28.5 },
      { name: "Apr", value1: 26.7, value2: 27.2 },
      { name: "May", value1: 26.2, value2: 26.8 },
      { name: "Jun", value1: 25.9, value2: 26.4 },
      { name: "Jul", value1: 26.8, value2: 27 },
      { name: "Aug", value1: 25.6, value2: 26 },
      { name: "Sep", value1: 26.7, value2: 27.1 },
      { name: "Oct", value1: 27, value2: 27.5 },
      { name: "Nov", value1: 26.5, value2: 27 },
      { name: "Dec", value1: 25.9, value2: 26.2 },
    ],
    Yearly: [
      { name: "2020", value1: 24.5, value2: 25.2 },
      { name: "2021", value1: 25.5, value2: 26 },
      { name: "2022", value1: 26, value2: 27 },
      { name: "2023", value1: 26.8, value2: 27.5 },
      { name: "2024", value1: 27.1, value2: 28 },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-6 w-[55%] max-md:w-full">
      <div className="flex justify-between max-md:flex-col items-center max-md:gap-3 mb-5">
        <Typography as="h5" size="h5" className="font-semibold">
          Prescription Volume
        </Typography>

        <div className="flex gap-2">
          {["Weekly", "Monthly", "Yearly"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as Period)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedPeriod === period
                  ? "bg-primary-color text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data[selectedPeriod]}>
            <XAxis dataKey="name" />
            <YAxis domain={[25, 29]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value1"
              stroke="#F2994A"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="#2F80ED"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrescriptionVolumeChart;
