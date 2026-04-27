"use client";

import { Icon } from "@iconify/react";
import { Typography } from "../typography";

type StatCardProps = {
  icon: string;
  value: string;
  label: string;
};

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col max-sm:items-center gap-3 bg-white rounded-xl px-5 py-4 min-w-[200px]">
      <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center">
        <Icon icon={icon} className="text-white" width={18} />
      </div>
      <Typography size={"h5"} as={"h5"}>
        {value}
      </Typography>
      <Typography className="text-sm text-desc-color">{label}</Typography>
    </div>
  );
}
