import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PatientStaticsChart() {
  const performanceData = [
    { name: "Response time", value: 75 },
    { name: "Completion rate", value: 95 },
    { name: "Accuracy", value: 85 },
  ];

  const activityData = [
    { day: "Mon", value: 28 },
    { day: "Tue", value: 32 },
    { day: "Wed", value: 35 },
    { day: "Thu", value: 30 },
    { day: "Fri", value: 27 },
    { day: "Sat", value: 29 },
  ];

  const complianceData = [
    { name: "Records updated", value: 60, color: "#2563eb" },
    { name: "Pending verifications", value: 25, color: "#60a5fa" },
    { name: "Missing documents", value: 15, color: "#bfdbfe" },
  ];

  const engagementData = [
    { day: "Mon", messages: 35, followups: 28, feedback: 15 },
    { day: "Tue", messages: 32, followups: 25, feedback: 18 },
    { day: "Wed", messages: 45, followups: 38, feedback: 22 },
    { day: "Thu", messages: 38, followups: 30, feedback: 20 },
    { day: "Fri", messages: 42, followups: 35, feedback: 19 },
    { day: "Sat", messages: 30, followups: 22, feedback: 16 },
    { day: "Sun", messages: 25, followups: 20, feedback: 12 },
  ];

  const performanceColors = ["#f97316", "#22c55e", "#3b82f6"];

  return (
    <div className=" pt-6 pb-6">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Performance Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Performance
              </h2>
              <div className="flex justify-around items-end h-48 mb-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-16 rounded-t"
                      style={{
                        height: `${item.value * 1.5}px`,
                        backgroundColor: performanceColors[index],
                      }}
                    ></div>
                    <p className="text-lg mt-2 text-gray-600 text-center">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-lg text-gray-600 pt-2">
              Overall Performance:{" "}
              <span className="font-bold text-gray-800">4.5 / 5</span>
            </div>
          </div>
          <div>
            {/* Activity Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Activity
              </h2>
              <ResponsiveContainer width="100%" height={205}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-lg text-gray-600 pt-2 ">
              Average Weekly Activity:{" "}
              <span className="font-bold text">+12%</span> vs Previous Month*
            </div>
          </div>
          <div>
            {/* Compliance Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Compliance
              </h2>
              <div className="flex items-center justify-center mb-4">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mb-4 text-md">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#E1F5FF] rounded"></div>
                  <span className="text-gray-600">Records updated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2D9CDB] rounded"></div>
                  <span className="text-gray-600">Pending verifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2F80ED] rounded"></div>
                  <span className="text-gray-600">Missing documents</span>
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-600 pt-2">
              Compliance Score:{" "}
              <span className="font-bold text-gray-800">94%</span> (90% NHS
              Compliant)
            </div>
          </div>
          <div>
            {/* Engagement Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Engagement
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="messages" fill="#0ea5e9" />
                  <Bar dataKey="followups" fill="#7dd3fc" />
                  <Bar dataKey="feedback" fill="#bae6fd" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2F80ED] rounded"></div>
                  <span className="text-gray-600">Messages sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#6FD9DF] rounded"></div>
                  <span className="text-gray-600">Patients followed up</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#39BADA] rounded"></div>
                  <span className="text-gray-600">Feedback received</span>
                </div>
              </div>
            </div>
            <div className="text-lg text-gray-600 pt-2">
              Top Engagement Day:{" "}
              <span className="font-bold text-primary-color">Wednesday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import React from 'react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export default function PatientStaticsChart() {
//   const performanceData = [
//     { name: 'Response time', value: 65, color: '#fb923c' },
//     { name: 'Completion rate', value: 100, color: '#22c55e' },
//     { name: 'Accuracy', value: 80, color: '#3b82f6' }
//   ];

//   const activityData = [
//     { day: 'Mon', value: 26 },
//     { day: 'Tue', value: 30 },
//     { day: 'Wed', value: 34 },
//     { day: 'Thu', value: 28 },
//     { day: 'Fri', value: 26 },
//     { day: 'Sat', value: 29 }
//   ];

//   const complianceData = [
//     { name: 'Records updated', value: 45, color: '#3b82f6' },
//     { name: 'Pending verifications', value: 35, color: '#60a5fa' },
//     { name: 'Missing documents', value: 20, color: '#bfdbfe' }
//   ];

//   const engagementData = [
//     { day: 'Mon', msg: 32, follow: 28, feed: 18 },
//     { day: 'Tue', msg: 35, follow: 30, feed: 20 },
//     { day: 'Wed', msg: 42, follow: 36, feed: 25 },
//     { day: 'Thu', msg: 38, follow: 32, feed: 22 },
//     { day: 'Fri', msg: 40, follow: 34, feed: 24 },
//     { day: 'Sat', msg: 36, follow: 30, feed: 21 },
//     { day: 'Sun', msg: 34, follow: 28, feed: 19 }
//   ];

//   return (
//     <div className=" pt-6 pb-6">
//       <div className="">
//         <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">

//           {/* Performance Card */}
//           <div className="bg-white rounded-lg shadow-sm p-5">
//             <h2 className="text-sm font-semibold mb-6 text-gray-700">Performance</h2>
//             <div className="flex justify-around items-end h-44 mb-6">
//               {performanceData.map((item, idx) => (
//                 <div key={idx} className="flex flex-col items-center gap-2">
//                   <div
//                     className="w-20 rounded-t-md"
//                     style={{
//                       height: `${item.value * 1.3}px`,
//                       backgroundColor: item.color
//                     }}
//                   />
//                   <span className="text-xs text-gray-600 text-center max-w-[80px]">
//                     {item.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <p className="text-xs text-gray-600">
//               Overall Performance: <span className="font-semibold text-gray-800">4.5 / 5</span>
//             </p>
//           </div>

//           {/* Activity Card */}
//           <div className="bg-white rounded-lg shadow-sm p-5">
//             <h2 className="text-sm font-semibold mb-4 text-gray-700">Activity</h2>
//             <ResponsiveContainer width="100%" height={140}>
//               <LineChart data={activityData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//                 <XAxis
//                   dataKey="day"
//                   tick={{ fontSize: 11, fill: '#9ca3af' }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 11, fill: '#9ca3af' }}
//                   axisLine={false}
//                   tickLine={false}
//                   domain={[15, 35]}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3b82f6"
//                   strokeWidth={2.5}
//                   dot={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//             <p className="text-xs text-gray-600 mt-4">
//               Average Weekly Activity: <span className="font-semibold text-green-600">+12%</span> vs Previous Month*
//             </p>
//           </div>

//           {/* Compliance Card */}
//           <div className="bg-white rounded-lg shadow-sm p-5">
//             <h2 className="text-sm font-semibold mb-4 text-gray-700">Compliance</h2>
//             <div className="flex justify-center mb-4">
//               <div className="w-48 h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={complianceData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={55}
//                       outerRadius={85}
//                       dataKey="value"
//                       startAngle={90}
//                       endAngle={450}
//                     >
//                       {complianceData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div className="flex justify-center gap-3 mb-3 flex-wrap">
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
//                 <span className="text-xs text-gray-600">Records updated</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm bg-blue-400" />
//                 <span className="text-xs text-gray-600">Pending verifications</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm bg-blue-200" />
//                 <span className="text-xs text-gray-600">Missing documents</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-600">
//               Compliance Score: <span className="font-semibold text-gray-800">94%</span> (90% NHS Compliant)
//             </p>
//           </div>

//           {/* Engagement Card */}
//           <div className="bg-white rounded-lg shadow-sm p-5">
//             <h2 className="text-sm font-semibold mb-4 text-gray-700">Engagement</h2>
//             <ResponsiveContainer width="100%" height={140}>
//               <BarChart data={engagementData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//                 <XAxis
//                   dataKey="day"
//                   tick={{ fontSize: 11, fill: '#9ca3af' }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 11, fill: '#9ca3af' }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Bar dataKey="msg" fill="#06b6d4" radius={[2, 2, 0, 0]} />
//                 <Bar dataKey="follow" fill="#67e8f9" radius={[2, 2, 0, 0]} />
//                 <Bar dataKey="feed" fill="#a5f3fc" radius={[2, 2, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//             <div className="flex justify-center gap-3 mt-4 flex-wrap">
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500" />
//                 <span className="text-xs text-gray-600">Messages sent</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm bg-cyan-300" />
//                 <span className="text-xs text-gray-600">Patients followed up</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-sm bg-cyan-200" />
//                 <span className="text-xs text-gray-600">Feedback received</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-600 mt-3">
//               Top Engagement Day: <span className="font-semibold text-blue-600">Wednesday</span>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
