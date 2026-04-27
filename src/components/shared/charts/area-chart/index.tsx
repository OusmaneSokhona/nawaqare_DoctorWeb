import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

import { AreaChartProps } from "@/types/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AreaChart: React.FC<AreaChartProps> = ({
  seriesData,
  categoriesData,
  showDollarSign,
  className,
}) => {
  const maxValue =
    seriesData && seriesData.length > 0
      ? Math.max(...seriesData.flatMap((series) => series.data))
      : 0;
  const totals = seriesData?.map((s) =>
    s.data.reduce((sum, val) => sum + val, 0),
  );
  const displayOrder = ["Last Month", "This Month"];

  const chartOptions: ApexOptions = {
    chart: {
      height: "auto",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      colors: ["#27AE60", "#2F80ED"],
      strokeColors: ["#27AE60", "#2F80ED"],
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      position: "bottom",
      type: "category",
      categories: categoriesData,

      labels: {
        style: {
          colors: "#969696",
        },
      },

      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: maxValue,
      labels: {
        show: false,
        formatter: (value: number) => {
          if (value === 0) {
            return `< ${showDollarSign ? `$${value}` : `${value}`}`;
          } else if (value === maxValue) {
            return `${showDollarSign ? `$${value}` : `${value}`} >`;
          }
          return showDollarSign ? `$${value}` : `${value}`;
        },
        style: {
          colors: "#969696",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        if (seriesIndex === undefined || dataPointIndex === undefined)
          return "";

        const value = w.globals.series[seriesIndex][dataPointIndex];
        const monthIndex = w.globals.labels[dataPointIndex];
        const seriesColor = w.globals.colors[seriesIndex];

        const monthNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Suns"];
        const month = monthNames[parseInt(monthIndex) - 1] || monthIndex;

        return `
      <div style="
        background: ${seriesColor} !important;
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
          
      min-width: 121px;
        font-family: Arial, sans-serif;
        text-align: left;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      ">
       <div style="font-weight: normal;
       font-size: 10px;
       ">This Week</div>
        <div style="font-weight: bold;">${showDollarSign ? `$${value}` : value}</div>
        <div style="font-size: 12px;">${month}</div>
      </div>`;
      },
    },

    colors: ["#374ea2", "#64baa9"],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "right",
      floating: true,
      fontSize: "14px",
      fontWeight: 600,
      labels: {
        colors: "#969696",
      },
      offsetY: -6,
    },
    fill: {
      opacity: 0.1,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "top",
            horizontalAlign: "left",
          },
        },
      },
    ],
  };

  return (
    <div id="chart" className={`${className} relative`}>
      {/* <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="area"
        height="100%"
      /> */}
      <div className="h-[100%] max-md:h-[25vh] w-full">
        <ReactApexChart
          options={chartOptions}
          series={seriesData}
          type="area"
          height="100%"
        />
      </div>

      {/* <div className="flex justify-center gap-3  absolute left-[10%] right-[10%] "> */}
      <div className="flex justify-center divide-x divide-gray-300 w-[80%] mx-auto">
        {displayOrder.map((label) => {
          const i = (seriesData || []).findIndex((s) => s.name === label);
          if (i === -1) return null;

          // Icons map
          const iconMap: Record<string, string> = {
            "Last Month": "/assets/svg/last-month-icon.svg",
            "This Month": "/assets/svg/this-month-icon.svg",
          };

          return (
            <div
              key={seriesData![i].name}
              className="flex-1 flex flex-col items-center px-4"
            >
              {/* Icon + label */}
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <img
                    src={iconMap[label]}
                    alt={`${label} icon`}
                    className="w-4 h-4"
                  />
                  {seriesData![i].name}
                </span>
              </div>

              {/* Value */}
              <span className="text-lg font-semibold text-black text-center mt-1">
                {totals?.[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
};

export default AreaChart;

// "use client";

// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ Props Interface
// interface PerformanceChartProps {
//   showDollarSign?: boolean;
//   seriesData: {
//     name: string;
//     lastMonth: number;
//     thisMonth: number;
//   }[];
//   className?: string;
// }

// const PerformanceChart: React.FC<PerformanceChartProps> = ({
//   showDollarSign = false,
//   seriesData,
//   className = "",
// }) => {
//   // ✅ Calculate Totals
//   const lastMonthTotal = seriesData.reduce(
//     (sum, item) => sum + item.lastMonth,
//     0
//   );
//   const thisMonthTotal = seriesData.reduce(
//     (sum, item) => sum + item.thisMonth,
//     0
//   );

//   // ✅ Format Value
//   const formatValue = (value: number) =>
//     showDollarSign ? `$${value}` : value.toString();

//   return (
//     <div className={`w-full  p-4   ${className}`}>
//       <div className="w-full h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={seriesData}>
//             <defs>
//               <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip
//               formatter={(value: any) =>
//                 showDollarSign ? `$${value}` : value
//               }
//             />
//             <Area
//               type="monotone"
//               dataKey="lastMonth"
//               stroke="#3b82f6"
//               fillOpacity={1}
//               fill="url(#colorLast)"
//               dot
//             />
//             <Area
//               type="monotone"
//               dataKey="thisMonth"
//               stroke="#22c55e"
//               fillOpacity={1}
//               fill="url(#colorThis)"
//               dot
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* ✅ Bottom Info Box */}
//       <div className="flex justify-center items-center gap-8 mt-4 text-sm font-medium">
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-blue-500"></span>
//           <span className="text-gray-600">Last Month:</span>
//           <span className="font-semibold text-gray-800">
//             {formatValue(lastMonthTotal)}
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="w-3 h-3 rounded-full bg-green-500"></span>
//           <span className="text-gray-600">This Month:</span>
//           <span className="font-semibold text-gray-800">
//             {formatValue(thisMonthTotal)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceChart;
