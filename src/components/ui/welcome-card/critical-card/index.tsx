import { Typography } from "@/components/shared/typography";
import { critical } from "@/data";
import React from "react";

const Critical = () => {
  return (
    <div>
      <Typography size="xl" className="pb-2 font-semibold">
        Critical Alerts
      </Typography>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
        {critical.map((activity, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 max-md:w-full max-sm:text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
            style={{ backgroundColor: activity.bg }}
          >
            <Typography size="h4" as="h4">
              {activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Critical;
