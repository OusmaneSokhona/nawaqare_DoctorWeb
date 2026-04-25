"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PatientInsightsProps {
  className?: string;
}

const PatientInsightsChart: React.FC<PatientInsightsProps> = ({
  className = "",
}) => {
  // Sample data based on the chart
  const chartData = [
    {
      name: "Unsatisfied Patient",
      data: [280, 350, 370, 190, 180, 200, 250, 300, 320, 300, 180, 200],
    },
    {
      name: "New Patient",
      data: [230, 240, 80, 90, 180, 280, 360, 320, 280, 120, 80, 50],
    },
    {
      name: "Satisfied Patient",
      data: [320, 350, 150, 140, 200, 280, 300, 290, 280, 150, 120, 140],
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#EF4444", "#27AE60", "#2F80ED"], // Purple, Green, Blue
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      show: true,
      borderColor: "#E5E7EB",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 6,
      colors: ["#EF4444", "#27AE60", "#2F80ED"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Sep",
        "Oct",
        "Nov",
        "Des",
      ],
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
          fontWeight: "400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
          fontWeight: "400",
        },
        formatter: function (val: number) {
          return val.toString();
        },
      },
    },
    legend: {
      show: false, // We'll create custom legend
    },
    tooltip: {
      enabled: true,
      theme: "light",
      style: {
        fontSize: "12px",
      },
      x: {
        show: true,
      },
      y: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          markers: {
            size: 4,
          },
        },
      },
    ],
  };

  return (
    <div className={`bg-white rounded-2xl p-4 md:p-6 shadow-lg ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Patient Retention Rate
      </h2>

      <div className="w-full">
        <Chart
          options={chartOptions}
          series={chartData}
          type="line"
          height={360}
        />
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap gap-6 mt-4 justify-start">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#EF4444] rounded-full"></div>
          <span className="text-sm text-gray-600">Unsatisfied Patient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary-color rounded-full"></div>
          <span className="text-sm text-gray-600">New Patient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary-color rounded-full"></div>
          <span className="text-sm text-gray-600">Satisfied Patient</span>
        </div>
      </div>
    </div>
  );
};

export default PatientInsightsChart;
// "use client";

// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const operationData = [
//   { name: "Surveillance", value: 85, color: "#1E6BE3" },
//   { name: "Preview", value: 70, color: "#28C76F" },
//   { name: "Delivery", value: 55, color: "#FF9F43" },
//   { name: "Maintenance", value: 40, color: "#00CFE8" },
//   { name: "Submission", value: 30, color: "#EA5455" },
//   { name: "As shown", value: 15, color: "#9C27B0" },
// ];

// const visitData = [
//   { name: "Home Visit", value: 60, color: "#1E6BE3" },
//   { name: "In-person Visit", value: 25, color: "#28C76F" },
//   { name: "Remote Visit", value: 15, color: "#FF9F43" },
// ];

// const BusinessOperation = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//           <p className="text-gray-600">Business & Operation Overview</p>
//         </div>

//         {/* Main Business & Operation Section */}
//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           {/* Section Header with Tabs */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//             <div>
//               <h2 className="text-xl font-bold text-gray-800">Business & Operation</h2>
//               <p className="text-gray-600 mt-1">Performance metrics and operational insights</p>
//             </div>

//             {/* Tabs */}
//             <div className="flex gap-2">
//               <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//                 Weekly
//               </button>
//               <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                 Monthly
//               </button>
//               <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//                 Yearly
//               </button>
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column - Progress Bars */}
//             <div className="space-y-6">
//               {operationData.map((item, index) => (
//                 <div key={index}>
//                   {/* Label and Percentage */}
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-medium text-gray-700">{item.name}</span>
//                     <span className="font-semibold text-gray-900">{item.value}%</span>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className="h-full rounded-full transition-all duration-500"
//                       style={{
//                         width: `${item.value}%`,
//                         backgroundColor: item.color
//                       }}
//                     />
//                   </div>

//                   {/* Indicator Dots */}
//                   <div className="flex justify-between mt-1">
//                     {[0, 25, 50, 75, 100].map((dot) => (
//                       <div
//                         key={dot}
//                         className={`w-1 h-1 rounded-full ${dot <= item.value ? 'bg-gray-400' : 'bg-gray-300'}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Right Column - Donut Chart */}
//             <div className="flex flex-col items-center">
//               {/* Chart Container */}
//               <div className="relative w-64 h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={visitData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={2}
//                       dataKey="value"
//                     >
//                       {visitData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>

//                 {/* Center Text */}
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                   <p className="text-2xl font-bold text-gray-900">65%</p>
//                   <p className="text-sm text-gray-500">Completion</p>
//                 </div>
//               </div>

//               {/* Legend */}
//               <div className="flex flex-col gap-3 mt-8">
//                 {visitData.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between gap-8">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: item.color }}
//                       />
//                       <span className="text-gray-700">{item.name}</span>
//                     </div>
//                     <span className="font-semibold text-gray-900">{item.value}%</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//             {/* Total Operations */}
//             <div className="bg-blue-50 p-6 rounded-xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-blue-600 font-medium">Total Operations</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <span className="text-blue-600 text-xl">📊</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-green-500">↑ 8.2%</span>
//                 <span className="text-gray-500 ml-2">from last month</span>
//               </div>
//             </div>

//             {/* Active Processes */}
//             <div className="bg-green-50 p-6 rounded-xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-green-600 font-medium">Active Processes</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-2">342</p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <span className="text-green-600 text-xl">⚡</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-green-500">↑ 12.5%</span>
//                 <span className="text-gray-500 ml-2">from last month</span>
//               </div>
//             </div>

//             {/* Efficiency Rate */}
//             <div className="bg-orange-50 p-6 rounded-xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-orange-600 font-medium">Efficiency Rate</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-2">94.5%</p>
//                 </div>
//                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <span className="text-orange-600 text-xl">📈</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-green-500">↑ 3.7%</span>
//                 <span className="text-gray-500 ml-2">from last month</span>
//               </div>
//             </div>
//           </div>

//           {/* Recent Activities */}
//           <div className="mt-12">
//             <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activities</h3>
//             <div className="space-y-4">
//               {[
//                 { activity: "Surveillance system update completed", time: "2 hours ago", status: "completed" },
//                 { activity: "Delivery route optimization in progress", time: "4 hours ago", status: "in-progress" },
//                 { activity: "Maintenance scheduled for tomorrow", time: "1 day ago", status: "scheduled" },
//                 { activity: "Preview report generated", time: "2 days ago", status: "completed" },
//                 { activity: "Submission batch processed", time: "3 days ago", status: "completed" },
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-2 rounded-full ${
//                       item.status === 'completed' ? 'bg-green-500' :
//                       item.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
//                     }`} />
//                     <span className="text-gray-700">{item.activity}</span>
//                   </div>
//                   <span className="text-sm text-gray-500">{item.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Footer Legend */}
//           <div className="flex flex-wrap justify-center gap-8 mt-12 pt-6 border-t border-gray-200">
//             {visitData.map((item, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <div
//                   className="w-4 h-4 rounded-full"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <span className="text-gray-700 font-medium">{item.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Additional Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           {/* Performance Metrics */}
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
//             <div className="space-y-4">
//               {[
//                 { metric: "Response Time", value: "2.4min", target: "< 3min", status: "good" },
//                 { metric: "Accuracy Rate", value: "98.2%", target: "> 95%", status: "excellent" },
//                 { metric: "Uptime", value: "99.9%", target: "> 99%", status: "excellent" },
//                 { metric: "Cost Efficiency", value: "92%", target: "> 90%", status: "good" },
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="font-medium text-gray-700">{item.metric}</p>
//                     <p className="text-sm text-gray-500">Target: {item.target}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-bold ${
//                       item.status === 'excellent' ? 'text-green-600' :
//                       item.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
//                     }`}>
//                       {item.value}
//                     </p>
//                     <p className={`text-xs ${
//                       item.status === 'excellent' ? 'text-green-500' :
//                       item.status === 'good' ? 'text-blue-500' : 'text-yellow-500'
//                     }`}>
//                       {item.status}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Operation Distribution */}
//           <div className="bg-white rounded-2xl shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Operation Distribution</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={operationData.slice(0, 4)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     innerRadius={40}
//                     paddingAngle={3}
//                     dataKey="value"
//                   >
//                     {operationData.slice(0, 4).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="flex flex-wrap justify-center gap-4 mt-4">
//               {operationData.slice(0, 4).map((item, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: item.color }}
//                   />
//                   <span className="text-sm text-gray-600">{item.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessOperation;
