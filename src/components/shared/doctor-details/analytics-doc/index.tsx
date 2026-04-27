import React from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";
import ConsultationsCharts from "./analytics-chart";
import DashboardCharts from "./heat-map";

const stats = [
  {
    icon: "streamline:medical-bag-solid",
    stat: "120",
    title: "Total Consultations",
  },
  {
    icon: "mingcute:calendar-fill",
    stat: "12/04/2023",
    title: "Doctor Since",
  },
  {
    icon: "solar:dollar-bold",
    stat: "1k",
    title: "Total Earning",
  },
  {
    icon: "majesticons:restricted",
    stat: "450",
    title: "Compliants",
  },
  {
    icon: "solar:star-bold",
    stat: "4.0",
    title: "Rating",
  },
  {
    icon: "streamline:medical-bag-solid",
    stat: "18 min",
    title: "Average Consultation Time",
  },
  {
    icon: "mingcute:calendar-fill",
    stat: "4/5",
    title: "Satisfaction Score",
  },
  {
    icon: "solar:dollar-bold",
    stat: "1.4 min",
    title: "Acceptance Time",
  },
  {
    icon: "majesticons:restricted",
    stat: "3",
    title: "Delayed Consultations",
  },
  {
    icon: "solar:star-bold",
    stat: "4.0",
    title: "Rating",
  },
];

const AnalyticsDoc = () => {
  return (
    <div className="pt-6">
      <div className="flex flex-wrap gap-6">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-sm w-[210px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
          >
            <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
              <Icon
                icon={activity.icon}
                width="24"
                height="24"
                className="text-white"
              />
            </div>
            <Typography size="h4" as="h4">
              {activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
          </div>
        ))}
      </div>
      <div className="pt-5 space-y-5">
        <ConsultationsCharts />
        <DashboardCharts />
      </div>
    </div>
  );
};

export default AnalyticsDoc;
