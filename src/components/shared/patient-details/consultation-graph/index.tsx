// "use client";

// import Chart from "react-apexcharts";
// import { Typography } from "@/components/shared/typography";

// const ConsultationGraph = () => {
//   const series = [
//     {
//       name: "Consultations",
//       data: [26, 28.5, 27, 26.5, 27.2, 26],
//     },
//   ];

//   const options: ApexCharts.ApexOptions = {
//     chart: {
//       type: "line",
//       toolbar: { show: false },
//       zoom: { enabled: false },
//     },
//     stroke: {
//       curve: "smooth",
//       width: 3,
//       colors: ["#007bff"],
//     },
//     grid: {
//       borderColor: "#f2f2f2",
//       strokeDashArray: 4,
//       yaxis: { lines: { show: true } },
//       xaxis: { lines: { show: false } },
//     },
//     dataLabels: { enabled: false },
//     markers: {
//       size: 0,
//       hover: {
//         size: 6,
//       },
//     },
//     xaxis: {
//       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//       labels: {
//         style: { colors: "#555", fontSize: "12px" },
//       },
//     },
//     yaxis: {
//       min: 25,
//       max: 29,
//       tickAmount: 4,
//       labels: {
//         style: { colors: "#555", fontSize: "12px" },
//       },
//     },
//     tooltip: {
//       theme: "light",
//       y: {
//         formatter: (val) => `${val}`,
//       },
//       marker: { show: true },
//     },
//   };

//   return (
//     <div className="w-[465px] max-md:w-full bg-white p-6 rounded-2xl shadow-sm">
//       <Typography as="h3" size="h3" className="font-semibold mb-4">
//         Consultation graph
//       </Typography>
//       <div className="w-full h-[300px]">
//         <Chart options={options} series={series} type="line" height="100%" />
//       </div>
//     </div>
//   );
// };

// export default ConsultationGraph;
"use client";

import dynamic from "next/dynamic";
import { Typography } from "@/components/shared/typography";

// ✅ Import Chart dynamically to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ConsultationGraph = () => {
  const series = [
    {
      name: "Consultations",
      data: [26, 28.5, 27, 26.5, 27.2, 26],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#007bff"],
    },
    grid: {
      borderColor: "#f2f2f2",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 0,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#555", fontSize: "12px" },
      },
    },
    yaxis: {
      min: 25,
      max: 29,
      tickAmount: 4,
      labels: {
        style: { colors: "#555", fontSize: "12px" },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val}`,
      },
      marker: { show: true },
    },
  };

  return (
    <div className="w-[465px] max-md:w-full bg-white p-6 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.2)]">
      <Typography as="h3" size="h3" className="font-semibold mb-4">
        Consultation graph
      </Typography>
      <div className="w-full h-[300px]">
        {/* ✅ Chart only renders in client-side */}
        <Chart options={options} series={series} type="line" height="100%" />
      </div>
    </div>
  );
};

export default ConsultationGraph;
