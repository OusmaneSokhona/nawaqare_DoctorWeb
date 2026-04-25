import React from "react";
import { Typography } from "../../typography";
import { patientManagement, systemHealth } from "@/data";
import Iconify from "@/components/shared/iconify";
import { Icon } from "@iconify/react";

const SystemHealth = () => {
  return (
    <div className="">
      <Typography size="xl" className="pb-2 font-semibold">
        Syatem Health
      </Typography>

      <div className="grid grid-cols-1 gap-5 pt-3">
        {systemHealth.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 shadow-sm">
            {/* ICON */}
            <div className="w-11 h-11 rounded-full bg-[#2F80ED33] flex items-center justify-center">
              <Icon
                icon={item.icon}
                width="24"
                height="24"
                className="text-[#2F80ED]"
              />
            </div>

            {/* STAT + DSC (column) */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800">
                {item.stat}
              </span>
              <span className="text-sm text-gray-500">{item.dsc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;
