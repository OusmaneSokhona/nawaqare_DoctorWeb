// 'use client';

// import { ApexOptions } from 'apexcharts';
// import dynamic from 'next/dynamic';

// import { DonutChartProps } from '@/types/dashboard';

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const DonutChart: React.FC<DonutChartProps> = ({ height, data, isCompleteDataset, insideLabel }) => {
//   const totalData = data.reduce((acc, item) => acc + item.value, 0);
//   // const totalMale = data.reduce((acc, item) => acc + (item.male || 0), 0);
//   // const totalFemale = data.reduce((acc, item) => acc + (item.female || 0), 0);

//   // Calculate legend row configuration based on dataset size
//   const getItemMargin = () => {
//     if (data.length >= 8) {
//       return {
//         horizontal: 5,
//         vertical: 4,
//       };
//     }
//     return {
//       horizontal: 10,
//       vertical: 4,
//     };
//   };

//   const chartOptions: ApexOptions = {
//     chart: {
//       type: 'donut',
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     labels: data?.map((item) => item.name),
//     colors: data?.map((item) => item.color),
//     stroke: {
//       show: false,
//     },
//     legend: {
//       show: false,
//       position: 'bottom',
//       horizontalAlign: 'center',
//       floating: false,
//       fontSize: '12px',
//       itemMargin: getItemMargin(),
//       formatter: (label: string) => label,
//       markers: {
//         strokeWidth: 0,
//         offsetX: -2,
//       },
//       onItemClick: {
//         toggleDataSeries: true,
//       },
//       onItemHover: {
//         highlightDataSeries: true,
//       },
//     },
//     tooltip: {
//       enabled: true,
//       custom: function ({ series, seriesIndex }) {
//         const item = data[seriesIndex];
//         if (isCompleteDataset) {
//           return `<div class="apexcharts-tooltip-box" style="background: ${item.color}; color: white; padding: 4px; border-radius: 4px; width: 100px;
//             min-width: 100px;
//             text-align: center;">
//             <div>${item.name}</div>
//             <div>${item.male} Male</div>
//             <div>${item.female} Female</div>
//           </div>`;
//         }
//         return `<div class="apexcharts-tooltip-box" style="background: ${item.color}; color: white; padding: 8px; border-radius: 4px;">
//           <div style="font-weight: bold;">${item.name}</div>
//           <div>$${series[seriesIndex]}</div>
//         </div>`;
//       },
//       style: {
//         fontSize: '12px',
//       },
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '75%',
//           labels: {
//             show: true,
//             name: {
//               show: true,
//               offsetY: -10,
//               color: '#000',
//               fontSize: '14px',
//               fontWeight: isCompleteDataset ? 'bold' : 'normal',
//             },
//             value: {
//               show: true,
//               offsetY: 10,
//               formatter: () => `${totalData}`,
//               color: '#000',
//               fontSize: '32px',
//               fontWeight: 'bold',
//             },
//             total: {
//               show: true,
//               showAlways: true,
//               label: insideLabel,
//               color: '#969696',
//               fontSize: '14px',
//               fontWeight: 'semi-bold',
//               formatter: () => `$${totalData}`,
//             },
//           },
//         },
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 768,
//         options: {
//           plotOptions: {
//             pie: {
//               donut: {
//                 labels: {
//                   name: {
//                     fontSize: '10px',
//                   },
//                   value: {
//                     fontSize: '18px',
//                   },
//                 },
//               },
//             },
//           },
//           legend: {
//             fontSize: '10px',
//             itemMargin: {
//               horizontal: 5,
//               vertical: 2,
//             },
//           },
//         },
//       },
//     ],
//   };

//   const chartSeries = data?.map((item) => item.value);

//   return (
//     <>
//       <div className="">
//         {chartSeries.length > 0 && (
//           <div className="">
//             <Chart options={chartOptions} series={chartSeries} type="donut" height={height ? height : 260} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DonutChart;
// 'use client';

// import { ApexOptions } from 'apexcharts';
// import dynamic from 'next/dynamic';
// import React from 'react';

// import { DonutChartProps } from '@/types/dashboard';
// import { Typography } from '@/components/shared/typography';

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const DonutChart: React.FC<DonutChartProps> = ({
//   height,
//   data,
//   insideLabel = 'Total Earning',
// }) => {
//   const totalData = data.reduce((acc, item) => acc + item.value, 0);

//   const chartOptions: ApexOptions = {
//     chart: {
//       type: 'donut',
//     },
//     dataLabels: { enabled: false },
//     labels: data.map((item) => item.name),
//     colors: data.map((item) => item.color),
//     legend: { show: false },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '70%',
//           labels: {
//             show: true,
//             total: {
//               show: true,
//               showAlways: true,
//               label: insideLabel,
//               color: '#969696',
//               fontSize: '14px',
//               fontWeight: 600,
//               formatter: () => `$${totalData}`,
//             },
//           },
//         },
//       },
//     },
//     tooltip: {
//       enabled: true,
//       custom: ({ seriesIndex }) => {
//         const item = data[seriesIndex];
//         return `<div class="apexcharts-tooltip-box" style="background: ${item.color}; color: white; padding: 8px; border-radius: 4px;">
//           <div style="font-weight: bold;">${item.name}</div>
//           <div>$${item.value}</div>
//         </div>`;
//       },
//     },
//   };

//   const chartSeries = data.map((item) => item.value);

//   return (
//     <div className='flex items-center gap-6
//        max-md:flex-col max-md:gap-3 max-md:justify-center max-md:w-full'>
//       {/* Chart */}
//       <div className="relative ">
//         <Chart
//           options={chartOptions}
//           series={chartSeries}
//           type="donut"
//           height={height || 260}
//         />
//       </div>

//       {/* Legends / Labels */}
//       <div className="flex flex-col gap-3">
//         {data.map((item) => (
//           <div key={item.name} className="flex items-center gap-2">
//             <span
//               style={{
//                 width: 12,
//                 height: 12,
//                 borderRadius: '50%',
//                 backgroundColor: item.color,
//               }}
//             />
//             <Typography size="sm" className="text-gray font-medium">
//               {item.name}
//             </Typography>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// //   return (
// //   <div
// //     className="
// //       flex items-center gap-6
// //       max-md:flex-col max-md:gap-3 max-md:justify-center max-md:w-full
// //     "
// //   >
// //     {/* Chart */}
// //     <div className="relative flex justify-center max-md:w-full">
// //       <Chart
// //         options={chartOptions}
// //         series={chartSeries}
// //         type="donut"
// //         height={height || 260}
// //       />
// //     </div>

// //     {/* Legends */}
// //     <div
// //       className="
// //         flex flex-col gap-3
// //         max-md:flex-row max-md:flex-wrap max-md:gap-4 max-md:justify-center
// //       "
// //     >
// //       {data.map((item) => (
// //         <div key={item.name} className="flex items-center gap-2">
// //           <span
// //             style={{
// //               width: 12,
// //               height: 12,
// //               borderRadius: "50%",
// //               backgroundColor: item.color,
// //             }}
// //           />
// //           <Typography size="sm" className="text-gray font-medium">
// //             {item.name}
// //           </Typography>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// };

// export default DonutChart;
"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
import { DonutChartProps } from "@/types/dashboard";
import { Typography } from "@/components/shared/typography";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart: React.FC<DonutChartProps> = ({
  height,
  data,
  insideLabel = "Total Earning",
}) => {
  const totalData = data.reduce((acc, item) => acc + item.value, 0);

  const chartOptions: ApexOptions = {
    chart: { type: "donut" },
    dataLabels: { enabled: false },
    labels: data.map((item) => item.name),
    colors: data.map((item) => item.color),
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: insideLabel,
              color: "#969696",
              fontSize: "15px",
              fontWeight: 500,
              formatter: () => `$${totalData}`,
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex }) => {
        const item = data[seriesIndex];
        return `<div class="apexcharts-tooltip-box" style="background: ${item.color}; color: white; padding: 8px; border-radius: 4px;">
          <div style="font-weight: bold;">${item.name}</div>
          <div>$${item.value}</div>
        </div>`;
      },
    },
  };

  const chartSeries = data.map((item) => item.value);

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="w-full max-md:w-[90%]">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          height={height || 210}
        />
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <Typography size="sm" className="text-gray font-medium">
              {item.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
