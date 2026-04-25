// "use client";

// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function DashboardCharts() {
//   const consultations = [
//     { month: "Jan", video: 200, audio: 150, physical: 180 },
//     { month: "Feb", video: 250, audio: 180, physical: 200 },
//     { month: "Mar", video: 300, audio: 210, physical: 250 },
//     { month: "Apr", video: 270, audio: 240, physical: 280 },
//     { month: "May", video: 320, audio: 270, physical: 310 },
//     { month: "Jun", video: 350, audio: 290, physical: 330 },
//     { month: "Jul", video: 380, audio: 300, physical: 350 },
//     { month: "Aug", video: 340, audio: 280, physical: 330 },
//     { month: "Sep", video: 300, audio: 260, physical: 300 },
//     { month: "Oct", video: 280, audio: 240, physical: 270 },
//     { month: "Nov", video: 260, audio: 220, physical: 250 },
//     { month: "Dec", video: 230, audio: 200, physical: 230 },
//   ];

//   const synthetic = [
//     { month: "Jan", value: 250 },
//     { month: "Feb", value: 250 },
//     { month: "Mar", value: 250 },
//     { month: "Apr", value: 250 },
//     { month: "May", value: 250 },
//     { month: "Jun", value: 400 },
//     { month: "Jul", value: 250 },
//     { month: "Aug", value: 260 },
//     { month: "Sep", value: 240 },
//     { month: "Oct", value: 260 },
//     { month: "Nov", value: 270 },
//     { month: "Dec", value: 280 },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
//       {/* Consultations Chart */}
//       <div className="bg-white rounded-2xl p-5 shadow-sm">
//         <h3 className="font-semibold text-gray-700 mb-3">Consultations by Type</h3>

//         <div className="h-64 w-[465px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={consultations}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />

//               <Line type="monotone" dataKey="video" stroke="#00C389" strokeWidth={3} />
//               <Line type="monotone" dataKey="audio" stroke="#2663FF" strokeWidth={3} />
//               <Line type="monotone" dataKey="physical" stroke="#FF4F4F" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Synthetic Activity History */}
//       <div className="bg-white rounded-2xl p-5 shadow-sm">
//         <h3 className="font-semibold text-gray-700 mb-3">Synthetic Activity History</h3>

//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={synthetic}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="value" stroke="#FFA726" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Typography } from "@/components/shared/typography";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardCharts() {
  const consultations = [
    { month: "Jan", video: 200, audio: 150, physical: 180 },
    { month: "Feb", video: 250, audio: 180, physical: 200 },
    { month: "Mar", video: 300, audio: 210, physical: 250 },
    { month: "Apr", video: 270, audio: 240, physical: 280 },
    { month: "May", video: 320, audio: 270, physical: 310 },
    { month: "Jun", video: 350, audio: 290, physical: 330 },
    { month: "Jul", video: 380, audio: 300, physical: 350 },
    { month: "Aug", video: 340, audio: 280, physical: 330 },
    { month: "Sep", video: 300, audio: 260, physical: 300 },
    { month: "Oct", video: 280, audio: 240, physical: 270 },
    { month: "Nov", video: 260, audio: 220, physical: 250 },
    { month: "Dec", video: 230, audio: 200, physical: 230 },
  ];

  const synthetic = [
    { month: "Jan", value: 250 },
    { month: "Feb", value: 250 },
    { month: "Mar", value: 250 },
    { month: "Apr", value: 250 },
    { month: "May", value: 250 },
    { month: "Jun", value: 400 },
    { month: "Jul", value: 250 },
    { month: "Aug", value: 260 },
    { month: "Sep", value: 240 },
    { month: "Oct", value: 260 },
    { month: "Nov", value: 270 },
    { month: "Dec", value: 280 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      {/* 📌 Card 1: Consultations */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <Typography size="h4" as="h4" className="mb-3">
          Consultations by Type
        </Typography>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={consultations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="video"
                stroke="#00C389"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="audio"
                stroke="#2663FF"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="physical"
                stroke="#FF4F4F"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📌 Card 2: Synthetic Activity */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <Typography size="h4" as="h4" className="mb-3">
          Synthetic Activity History
        </Typography>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={synthetic}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FFA726"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
