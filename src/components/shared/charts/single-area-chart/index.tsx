import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

import { SingleAreaChartProps } from "@/types/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SingleAreaChart: React.FC<SingleAreaChartProps> = ({
  seriesData,
  categoriesData,
  showDollarSign,
  chartColor,
  className,
}) => {
  // Enforce single series
  const singleSeries =
    seriesData && seriesData.length > 0 ? [seriesData[0]] : [];
  const maxValue =
    singleSeries.length > 0 ? Math.max(...singleSeries[0].data) : 0;

  const chartOptions: ApexOptions = {
    chart: {
      height: "auto",
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      position: "bottom",
      type: "category",
      categories: categoriesData,
      labels: {
        show: !!categoriesData && categoriesData.length > 0,
        style: { colors: "#969696" },
      },
      axisBorder: { show: true },
      axisTicks: { show: false },
      crosshairs: { show: false },
    },
    yaxis: {
      show: false,
      min: 0,
      max: maxValue,
      labels: {
        show: false,
        formatter: (value: number) => {
          if (value === 0)
            return `< ${showDollarSign ? `$${value}` : `${value}`}`;
          if (value === maxValue)
            return `${showDollarSign ? `$${value}` : `${value}`} >`;
          return showDollarSign ? `$${value}` : `${value}`;
        },
        style: { colors: "#969696" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: { show: true },
    },
    grid: { show: false },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true,
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        if (seriesIndex === undefined || dataPointIndex === undefined)
          return "";

        const value = w.globals.series[seriesIndex][dataPointIndex];
        const label = w.globals.labels[dataPointIndex];
        const seriesColor = w.globals.colors[seriesIndex];

        const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const day = parseInt(label);
        const labelText = isNaN(day) ? label : weekdayNames[day - 1] || label;

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
            <div style="font-weight: normal; font-size: 10px;">This Week</div>
            <div style="font-weight: bold;">${showDollarSign ? `$${value}` : value}</div>
            <div style="font-size: 12px;">${labelText}</div>
          </div>`;
      },
    },
    colors: [chartColor ? chartColor : "#1A5F44"],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "right",
      floating: true,
      fontSize: "14px",
      fontWeight: 600,
      labels: { colors: "#969696" },
      offsetY: -6,
    },
    fill: { opacity: 0.1 },
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
    <div id="chart" className={`${className}`}>
      <ReactApexChart
        options={chartOptions}
        series={singleSeries}
        type="area"
        height="100%"
      />
    </div>
  );
};

export default SingleAreaChart;
