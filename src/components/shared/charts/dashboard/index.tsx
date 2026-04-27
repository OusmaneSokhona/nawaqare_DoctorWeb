// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const earningData = [
//   { name: "Doctor", value: 45 },
//   { name: "Pharmacy", value: 25 },
//   { name: "Delivery", value: 20 },
//   { name: "Logistics", value: 10 },
// ];

// const Dashboard = () => {
//   return (
//     <div className="p-6 space-y-6 w-full">

//       {/* Total Earnings */}
//       <div className="rounded-2xl shadow-sm bg-white">
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h2 className="text-lg font-semibold">Total Earning</h2>
//             <div className="flex items-center gap-4 mt-4">
//               <ResponsiveContainer width={120} height={120}>
//                 <PieChart>
//                   <Pie
//                     data={earningData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={35}
//                     outerRadius={55}
//                   >
//                     {earningData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <div>
//                 <p className="text-gray-600">Total Earnings</p>
//                 <p className="text-3xl font-bold">$720</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacy & Delivery Overview */}
//       <div className="rounded-2xl shadow-sm bg-white">
//         <div className="p-6">
//           <h2 className="text-lg font-semibold mb-3">
//             Pharmacy & Delivery Overview
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               "Prescription Uploaded",
//               "Orders Being Prepared",
//               "Delivered Orders",
//               "Active Delivery Agents",
//             ].map((title, i) => (
//               <div key={i} className="rounded-xl bg-gray-50">
//                 <div className="p-4 text-center">
//                   <p className="text-2xl font-semibold">120</p>
//                   <p className="text-gray-500 text-sm mt-1">{title}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Business & Operation */}
//       <div className="rounded-2xl shadow-sm bg-white">
//         <div className="p-6 space-y-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Business & Operation</h2>
//             <div className="flex gap-2 text-sm">
//               <button className="px-3 py-1 bg-gray-100 rounded-lg">Weekly</button>
//               <button className="px-3 py-1 bg-blue text-white rounded-lg">Monthly</button>
//               <button className="px-3 py-1 bg-gray-100 rounded-lg">Yearly</button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Bars */}
//             <div className="space-y-3">
//               {[
//                 "Consultation",
//                 "Prescription",
//                 "Pharmacy",
//                 "Delivery",
//                 "Top Doctors",
//               ].map((item, i) => (
//                 <div key={i}>
//                   <p className="text-sm font-medium">{item}</p>
//                   <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
//                     <div
//                       className="h-full bg-blue rounded-full"
//                       style={{ width: `${70 - i * 10}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Donut Chart */}
//             <div className="flex justify-center">
//               <ResponsiveContainer width={200} height={200}>
//                 <PieChart>
//                   <Pie
//                     data={earningData}
//                     dataKey="value"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={55}
//                     outerRadius={80}
//                   >
//                     {earningData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// // OPTION A — Exact Screenshot Color Scheme
// const earningData = [
//   { name: "Doctor", value: 45, color: "#1E6BE3" },
//   { name: "Pharmacy", value: 25, color: "#28C76F" },
//   { name: "Delivery", value: 20, color: "#FF9F43" },
//   { name: "Logistics", value: 10, color: "#00CFE8" },
// ];

// const Dashboard = () => {
//   return (
//     <div className="p-4 md:p-6 space-y-6 w-full bg-[#F7F9FB] min-h-screen">

//       {/* ==================== TOP EARNING SECTION ==================== */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
//         {/* Donut Left */}
//         <div className="flex justify-center">
//           <ResponsiveContainer width={160} height={160}>
//             <PieChart>
//               <Pie
//                 data={earningData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={45}
//                 outerRadius={70}
//                 strokeWidth={3}
//               >
//                 {earningData.map((item, index) => (
//                   <Cell key={index} fill={item.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Middle Legend */}
//         <div className="flex flex-col justify-center gap-2 text-sm">
//           {earningData.map((item, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <span
//                 className="w-3 h-3 rounded-full"
//                 style={{ backgroundColor: item.color }}
//               />
//               <p className="text-gray-700">{item.name}</p>
//             </div>
//           ))}
//         </div>

//         {/* Right Earning Text */}
//         <div className="text-center md:text-left">
//           <h2 className="text-lg font-semibold text-gray-700">Total Earning</h2>
//           <p className="text-4xl font-bold mt-2">$720</p>
//         </div>
//       </div>

//       {/* ==================== PHARMACY CARDS SECTION ==================== */}
//       <div className="bg-white rounded-2xl shadow-sm p-6">
//         <h2 className="text-lg font-semibold mb-4">Pharmacy & Delivery Overview</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {/* Card 1 */}
//           <div className="bg-[#E7F3FF] rounded-xl p-4 flex flex-col items-center shadow-sm">
//             <p className="text-3xl font-bold text-[#1E6BE3]">120</p>
//             <p className="text-gray-600 text-sm mt-1 text-center">Prescription Uploaded</p>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-[#E9FBF4] rounded-xl p-4 flex flex-col items-center shadow-sm">
//             <p className="text-3xl font-bold text-[#28C76F]">120</p>
//             <p className="text-gray-600 text-sm mt-1 text-center">Orders Being Prepared</p>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-[#E8FCE8] rounded-xl p-4 flex flex-col items-center shadow-sm">
//             <p className="text-3xl font-bold text-[#28C76F]">120</p>
//             <p className="text-gray-600 text-sm mt-1 text-center">Delivered Orders</p>
//           </div>

//           {/* Card 4 */}
//           <div className="bg-[#FFECDD] rounded-xl p-4 flex flex-col items-center shadow-sm">
//             <p className="text-3xl font-bold text-[#FF9F43]">120</p>
//             <p className="text-gray-600 text-sm mt-1 text-center">Active Delivery Agents</p>
//           </div>
//         </div>
//       </div>

//       {/* ==================== BUSINESS & OPERATION SECTION ==================== */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Business & Operation</h2>

//           {/* Tabs */}
//           <div className="flex gap-2 text-sm">
//             <button className="px-3 py-1 bg-gray-100 rounded-lg">Weekly</button>
//             <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">Monthly</button>
//             <button className="px-3 py-1 bg-gray-100 rounded-lg">Yearly</button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Bars */}
//           <div className="space-y-4">
//             {[
//               "Consultation",
//               "Prescription",
//               "Pharmacy",
//               "Delivery",
//               "Top Doctors",
//             ].map((item, i) => (
//               <div key={i}>
//                 <div className="flex justify-between items-center mb-1">
//                   <p className="text-sm font-medium text-gray-700">{item}</p>
//                 </div>
//                 <div className="w-full h-3 bg-gray-200 rounded-full">
//                   <div
//                     className="h-full rounded-full"
//                     style={{
//                       width: `${85 - i * 12}%`,
//                       backgroundColor: earningData[i]?.color || "#1E6BE3",
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Donut Chart */}
//           <div className="flex justify-center items-center">
//             <ResponsiveContainer width={220} height={220}>
//               <PieChart>
//                 <Pie
//                   data={earningData}
//                   dataKey="value"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   strokeWidth={5}
//                 >
//                   {earningData.map((item, index) => (
//                     <Cell key={index} fill={item.color} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Colored Legends */}
//         <div className="flex justify-center gap-8 text-sm mt-2">
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#1E6BE3]"></span> Home Visit
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#28C76F]"></span> In-person Visit
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#FF9F43]"></span> Remote Visit
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const earningData = [
  { name: "Doctor", value: 45, color: "#1E6BE3" },
  { name: "Pharmacy", value: 25, color: "#28C76F" },
  { name: "Delivery", value: 20, color: "#FF9F43" },
  { name: "Logistics", value: 10, color: "#00CFE8" },
];

const consultationData = [
  { name: "Home Visit", value: 60, color: "#1E6BE3" },
  { name: "In-person Visit", value: 25, color: "#28C76F" },
  { name: "Remote Visit", value: 15, color: "#FF9F43" },
];

const ChartGraph = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your earnings and performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Total Earning Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Earning Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Donut Chart */}
                <div className="relative">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={earningData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {earningData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold text-gray-900">$720</p>
                    <p className="text-gray-500 text-sm mt-1">Total Earning</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Total Earning
                  </h2>
                  <div className="space-y-4">
                    {earningData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-700">
                            {item.name}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {item.value}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Consultation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left - Progress Bars */}
                <div className="space-y-6">
                  {["Consultation", "Pharmacy", "Delivery"].map(
                    (item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium">
                            {item}
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {85 - index * 20}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${85 - index * 20}%`,
                              backgroundColor:
                                earningData[index]?.color || "#1E6BE3",
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Right - Donut Chart */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={consultationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {consultationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-6 mt-4">
                    {consultationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Doctor Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Doctor
              </h2>
              <div className="space-y-4">
                {["Total Doctors", "Active Today", "Consultations"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-600">{item}</span>
                      <span className="font-semibold text-gray-900">
                        {index === 0 ? "45" : index === 1 ? "32" : "120"}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Pharmacy Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Pharmacy
              </h2>
              <div className="space-y-4">
                {["Total Orders", "Active Orders", "Delivered"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-600">{item}</span>
                      <span className="font-semibold text-gray-900">
                        {index === 0 ? "89" : index === 1 ? "24" : "65"}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Logistics Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Logistics
              </h2>
              <div className="space-y-4">
                {["Active Agents", "Deliveries Today", "On Time Rate"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-600">{item}</span>
                      <span className="font-semibold text-gray-900">
                        {index === 0 ? "18" : index === 1 ? "45" : "92%"}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Monthly Revenue</span>
                  <span className="font-bold">$12,580</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Users</span>
                  <span className="font-bold">3,245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conversion Rate</span>
                  <span className="font-bold">12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Charts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mini Earning Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Earning Overview</h3>
              <div className="text-2xl font-bold text-gray-900">$720</div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={earningData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {earningData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {earningData.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-4">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Avg. Response Time", value: "2.4m", change: "+5%" },
                { label: "Customer Satisfaction", value: "94%", change: "+2%" },
                { label: "Order Accuracy", value: "98%", change: "+1%" },
                { label: "Delivery Speed", value: "32m", change: "-3%" },
              ].map((metric, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <p
                      className={`text-sm ${metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {metric.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartGraph;
