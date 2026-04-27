// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// //import { Card, CardContent } from "@/components/ui/card";
// //import { Button } from "@/components/ui/button";

// // Dummy Data
// const lineData = [
//   { name: "JAN", a: 40, b: 30 },
//   { name: "FEB", a: 50, b: 35 },
//   { name: "MAR", a: 45, b: 20 },
//   { name: "APR", a: 20, b: 10 },
//   { name: "MAY", a: 80, b: 60 },
//   { name: "JUN", a: 55, b: 50 },
//   { name: "JUL", a: 95, b: 70 },
//   { name: "AUG", a: 85, b: 75 },
//   { name: "SEP", a: 70, b: 65 },
//   { name: "OCT", a: 75, b: 70 },
//   { name: "NOV", a: 77, b: 73 },
//   { name: "DEC", a: 80, b: 80 },
// ];

// const complaints = [
//   { label: "Service Quality", value: 80 },
//   { label: "Wait Time", value: 70 },
//   { label: "Misdiagnosis", value: 60 },
//   { label: "Bedside Manner", value: 90 },
// ];

// const heatmapMonths = ["Jan", "Feb", "Mar", "Apr", "May"];
// const heatmapData = Array(5)
//   .fill(null)
//   .map(() => Array(31).fill(0).map(() => Math.floor(Math.random() * 4)));

// export default function DashboardCharts() {
//   return (
//     <div className="p-6 space-y-6">
//       {/* Top Section */}
//       <Card className="rounded-2xl shadow-sm">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Monthly Consultation Trends</h2>

//             <div className="flex gap-2">
//               <Button variant="outline">Weekly</Button>
//               <Button className="bg-blue-600 text-white hover:bg-blue-700">
//                 Monthly
//               </Button>
//               <Button variant="outline">Yearly</Button>
//             </div>
//           </div>

//           <div className="w-full h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={lineData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="a" stroke="#3b82f6" strokeWidth={2} />
//                 <Line type="monotone" dataKey="b" stroke="#94a3b8" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Complaints */}
//         <Card className="rounded-2xl shadow-sm">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Complaint & Dispute Analysis</h2>

//             <div className="space-y-4">
//               {complaints.map((item) => (
//                 <div key={item.label}>
//                   <p className="text-sm mb-1">{item.label}</p>
//                   <div className="w-full bg-gray-200 rounded-full h-3">
//                     <div
//                       className="bg-blue-600 h-3 rounded-full"
//                       style={{ width: `${item.value}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Heatmap */}
//         <Card className="rounded-2xl shadow-sm">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Heatmap: Doctor Activity</h2>

//             <div className="grid grid-cols-5 gap-4 text-center text-sm font-medium mb-2">
//               {heatmapMonths.map((m) => (
//                 <span key={m}>{m}</span>
//               ))}
//             </div>

//             <div className="grid grid-cols-5 gap-4">
//               {heatmapData.map((col, colIdx) => (
//                 <div key={colIdx} className="grid grid-rows-6 gap-1">
//                   {col.slice(0, 6).map((val, i) => (
//                     <div
//                       key={i}
//                       className={`rounded-md h-6 ${
//                         val === 0
//                           ? "bg-gray-200"
//                           : val === 1
//                           ? "bg-blue-200"
//                           : val === 2
//                           ? "bg-blue-400"
//                           : "bg-blue-600"
//                       }`}
//                     ></div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ComplaintHeatmap from "../graph-dispute";
import { Typography } from "@/components/shared/typography";

// Dummy Data
const lineData = [
  { name: "JAN", a: 40, b: 30 },
  { name: "FEB", a: 50, b: 35 },
  { name: "MAR", a: 45, b: 20 },
  { name: "APR", a: 20, b: 10 },
  { name: "MAY", a: 80, b: 60 },
  { name: "JUN", a: 55, b: 50 },
  { name: "JUL", a: 95, b: 70 },
  { name: "AUG", a: 85, b: 75 },
  { name: "SEP", a: 70, b: 65 },
  { name: "OCT", a: 75, b: 70 },
  { name: "NOV", a: 77, b: 73 },
  { name: "DEC", a: 80, b: 80 },
];

const complaints = [
  { label: "Service Quality", value: 80 },
  { label: "Wait Time", value: 70 },
  { label: "Misdiagnosis", value: 60 },
  { label: "Bedside Manner", value: 90 },
];

const heatmapMonths = ["Jan", "Feb", "Mar", "Apr", "May"];
const heatmapData = Array(5)
  .fill(null)
  .map(() =>
    Array(31)
      .fill(0)
      .map(() => Math.floor(Math.random() * 4)),
  );

export default function DashboardCharts() {
  return (
    <div className="space-y-3">
      {/* Top Section */}
      <div className="rounded-2xl shadow-sm bg-white border">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Typography size="h4" as="h4" className="mb-3">
              Monthly Consultation Trends
            </Typography>
            <div className="flex gap-2">
              <button className="px-4 py-1 border rounded">Weekly</button>
              <button className="px-4 py-1 bg-blue text-white rounded">
                Monthly
              </button>
              <button className="px-4 py-1 border rounded">Yearly</button>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="a"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="b"
                  stroke="#94a3b8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      <ComplaintHeatmap />
    </div>
  );
}
