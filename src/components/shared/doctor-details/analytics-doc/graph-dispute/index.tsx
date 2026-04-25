// "use client";
// import React from "react";

// // Fake Heatmap Data (you can replace with real API data)
// const heatmapData = Array.from({ length: 140 }).map(() =>
//   Math.floor(Math.random() * 4)
// );

// export default function ComplaintHeatmap() {
//   const complaints = [
//     { label: "Service Quality", value: 80 },
//     { label: "Wait Time", value: 60 },
//     { label: "Misdiagnosis", value: 50 },
//     { label: "Bedside Manner", value: 70 },
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm border w-full">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* ---------------- LEFT SIDE: COMPLAINT ANALYSIS ---------------- */}
//         <div>
//           <h2 className="text-lg font-semibold mb-6">
//             Complaint & Dispute Analysis
//           </h2>

//           <div className="space-y-5">
//             {complaints.map((item, index) => (
//               <div key={index}>
//                 <div className="flex items-center justify-between mb-1">
//                   <p className="text-gray-600 text-sm">{item.label}</p>
//                 </div>

//                 <div className="w-full bg-gray-200 h-2 rounded-full">
//                   <div
//                     className="h-2 rounded-full bg-blue transition-all"
//                     style={{ width: `${item.value}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ---------------- RIGHT SIDE: HEATMAP ---------------- */}
//         <div className="border-l pl-6">
//           <h2 className="text-lg font-semibold mb-6">
//             Heatmap: Doctor Activity
//           </h2>

//           {/* Month Labels */}
//           <div className="flex text-xs text-gray-500 mb-2 gap-7">
//             <span>Jan</span>
//             <span>Feb</span>
//             <span>Mar</span>
//             <span>Apr</span>
//             <span>May</span>
//           </div>

//           {/* GRID */}
//           <div className="grid grid-cols-3 gap-1">
//             {heatmapData.map((value, i) => (
//               <div
//                 key={i}
//                 className={
//                   `w-3 h-3 rounded-sm ` +
//                   (value === 0
//                     ? "bg-gray-100"
//                     : value === 1
//                     ? "bg-blue"
//                     : value === 2
//                     ? "bg-blue"
//                     : "bg-blue")
//                 }
//               ></div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";
import { Typography } from "@/components/shared/typography";
import React from "react";

const complaints = [
  { label: "Service Quality", value: 80 },
  { label: "Wait Time", value: 65 },
  { label: "Misdiagnosis", value: 50 },
  { label: "Bedside Manner", value: 70 },
];

// create 5 months × 31 days heatmap
const months = ["Jan", "Feb", "Mar", "Apr", "May"];
const heatmapData = Array(5)
  .fill(null)
  .map(() =>
    Array(31)
      .fill(0)
      .map(() => Math.floor(Math.random() * 4)),
  );

export default function ComplaintHeatmap() {
  return (
    <div className="p-5 bg-white shadow-sm rounded-2xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — Complaints */}
        <div>
          <Typography size="h4" as="h4" className="mb-3">
            Complaint & Dispute Analysis
          </Typography>

          <div className="space-y-4">
            {complaints.map((item) => (
              <div key={item.label}>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="w-2 h-2 bg-gray-300 rounded-sm"></span>
                  {item.label}
                </div>

                <div className="w-full bg-gray-200/80 rounded-md h-3 mt-1">
                  <div
                    className="bg-primary-color h-3 rounded-md"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Heatmap */}
        <div className="border-l pl-10">
          <Typography size="h4" as="h4" className="mb-3">
            Heatmap: Doctor Activity
          </Typography>

          {/* Months */}
          <div className="grid grid-cols-5 text-sm text-gray-500 mb-2">
            {months.map((m) => (
              <div key={m} className="text">
                {m}
              </div>
            ))}
          </div>

          {/* Heatmap Blocks */}
          <div className="grid grid-cols-5 gap-2">
            {heatmapData.map((col, idx) => (
              <div key={idx} className="grid grid-rows-6 gap-1">
                {col.slice(0, 6).map((value, i) => {
                  const color =
                    value === 0
                      ? "bg-gray-200"
                      : value === 1
                        ? "bg-primary-color"
                        : value === 2
                          ? "bg-primary-color"
                          : "bg-primary-color";

                  return (
                    <div
                      key={i}
                      className={`w-[40%] h-6 rounded-md ${color}`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
