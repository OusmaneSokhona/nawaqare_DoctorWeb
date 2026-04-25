import { FC } from "react";

import Container from "@/components/shared/container";

const StatsCardSkeleton: FC = () => {
  return (
    <Container styling="w-full items-center h-full flex justify-between animate-pulse min-h-[89px]">
      {/* Left section skeleton for text */}
      <div className="flex flex-col pl-1.5 justify-between w-[70%] space-y-4">
        {/* Title placeholder */}
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        {/* Value placeholder */}
        <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
      </div>

      {/* Right section skeleton for image */}
      <div className="w-[30%] flex justify-end max-w-[50px]">
        <div className="bg-gray-300 rounded-[10px] w-[50px] h-[50px]"></div>
      </div>
    </Container>
  );
};

export default StatsCardSkeleton;
