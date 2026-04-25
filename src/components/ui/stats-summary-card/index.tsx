import React from "react";

import { StatsSummaryCardProps } from "@/types/dashboard";
import StatsCard from "../stats-card";

const StatsSummaryCard: React.FC<StatsSummaryCardProps> = ({
  statsData = [],
  styling,
}) => {
  return (
    <div className={`flex flex-col lg:flex lg:flex-row lg:py-4 ${styling}`}>
      {statsData?.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          negative={item.negative}
          percentage={item.percentage}
          data={{
            xAxis: item.xAxis,
            yAxis: item.yAxis,
          }}
          lineColor={item.lineColor}
          styling={
            index === statsData.length - 1
              ? "border-none"
              : " lg:border-r border-light-gray "
          }
        />
      ))}
    </div>
  );
};

export default StatsSummaryCard;
