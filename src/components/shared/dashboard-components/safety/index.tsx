import { Typography } from "@/components/shared/typography";
import { content, critical, safety } from "@/data";
import { Icon } from "@iconify/react";
import React from "react";

const Safety = () => {
  return (
    <div className="">
      <Typography size="xl" className="pb-2 font-semibold">
        Critical Alerts
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {safety.map((activity, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-[#F5F5F5] space-y-3 max-sm:w-full max-md:w-full max-sm:text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
            //    style={{ backgroundColor: activity.bg }}
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

export default Safety;
