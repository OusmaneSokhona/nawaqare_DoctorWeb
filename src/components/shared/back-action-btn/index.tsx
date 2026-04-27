import { useRouter } from "next/navigation";
import React from "react";

import Iconify from "../iconify";
import { Typography } from "../typography";

const BackActionBtn = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-1 cursor-pointer w-fit group"
    >
      <Iconify
        className="group-hover:-translate-x-1.5 transition-all duration-700 text-dark-gray"
        icon="ic:round-chevron-left"
        width={28}
        height={28}
      />
      <Typography as="p" size="lg" className="text-dark-gray font-semibold">
        Back
      </Typography>
    </div>
  );
};

export default BackActionBtn;
