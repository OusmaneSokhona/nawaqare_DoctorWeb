import React from "react";

import Iconify from "@/components/shared/iconify";
import { Typography } from "@/components/shared/typography";
import { StatsCardProps } from "@/types/dashboard";

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentage,
  styling,
  negative,
  reverse,
  subTitle = "",
}) => {
  return (
    <div className={`grid  gap-4 items-center w-full ${styling}`}>
      <div className="flex flex-col justify-center items-start">
        {title && (
          <Typography
            as="p"
            size="md"
            className="text-dark-gray font-semibold text-wrap xs:text-nowrap"
          >
            {title}
          </Typography>
        )}
        <Typography as="h5" size="h5" className="text-black font-semibold">
          {value}
        </Typography>
        <Typography
          as="p"
          size="sm"
          className={`flex items-center gap-1 ${reverse && "flex-row-reverse"}`}
        >
          {percentage && (
            <span className="flex items-center gap-0">
              <Iconify
                height="25"
                width="25"
                icon={negative ? "uil:arrow-down" : "uil:arrow-up"}
                className={`${negative ? "text-red" : "text-primary-light"}`}
              />

              <span
                className={`${negative ? "text-red" : "text-primary-light"} "font-semibold"`}
              >
                {percentage}
              </span>
            </span>
          )}
          <span className="font-normal text-dark-gray whitespace-nowrap">
            {subTitle}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default StatsCard;
