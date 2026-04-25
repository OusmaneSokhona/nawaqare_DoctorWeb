import Image from "next/image";
import Link from "next/link";

import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import { content, pharmacy } from "@/data";
import { Icon } from "@iconify/react";
import { act } from "react";

const Pharmacy = () => {
  return (
    <Container styling="relative p-4 md:p-6  h-full">
      <div className="flex justify-between items-center">
        <Typography size="xl" className="font-semibold">
          Pharmacy & Delivery Overview
        </Typography>
      </div>
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {pharmacy.map((activity, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
            style={{ backgroundColor: activity.bg }}
          >
            <div
              className="rounded-full h-11 w-11 flex justify-center items-center max-sm:mx-auto"
              style={{ backgroundColor: activity.iconColor }}
            >
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
            <Typography className="text-sm">{activity.title}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Pharmacy;
