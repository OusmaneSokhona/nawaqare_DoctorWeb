import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import React from "react";

type DocumentStatus = "Draft" | "Signed" | "Send";

interface DocumentItem {
  title: string;
  date: string;
  status: DocumentStatus;
  icon: string;
}

const documents: DocumentItem[] = [
  {
    title: "Blood Test",
    date: "Lab . New . 23 Jan 2025",
    status: "Draft",
    icon: "ri:test-tube-line",
  },
  {
    title: "Chest X-ray",
    date: "Patient . Reviewed . 20 Jan 2025",
    status: "Signed",
    icon: "fluent:xray-20-regular",
  },
  {
    title: "Referral Letter",
    date: "Dr. smith . Reviewed . 23 Jan 2025",
    status: "Send",
    icon: "ri:test-tube-line",
  },
];

const ViewReportsPage = () => {
  return (
    <div className="space-y-3">
      <Typography size={"h5"} as={"h5"}>
        Reports
      </Typography>
      <div className="rounded-xl mt-2 border p-4">
        {documents.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between border-b last:border-b-0 mt-2 pb-3 last:pb-0"
          >
            <div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1 items-center">
                  <Icon
                    className="text-primary-color"
                    icon={item.icon}
                    width="20"
                    height="20"
                  />
                  <p className="text-lg font-medium text-[#2C2C2C]">
                    {item.title}
                  </p>
                </div>
              </div>

              <p className="flex gap-1 items-center text-gray-400 mt-1">
                <Icon
                  className="text-secondary-color"
                  icon="hugeicons:tick-02"
                  width="20"
                  height="20"
                />
                {item.date}
              </p>
            </div>

            <Icon
              className="text-primary-color"
              icon="mdi:eye"
              width="20"
              height="20"
            />
          </div>
        ))}
      </div>
      <button className="px-4 py-4 rounded-xl bg-primary-color text-white cursor-pointer">
        Upload Document
      </button>
    </div>
  );
};

export default ViewReportsPage;
