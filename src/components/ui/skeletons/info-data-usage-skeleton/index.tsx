import React, { FC } from "react";

const InfoDataUsagePageSkeleton: FC = () => {
  const numOfSkeletons = 10; // Adjust this number based on how many skeletons you want

  return (
    <div className="flex flex-col w-full gap-6">
      {Array.from({ length: numOfSkeletons }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="w-full">
            <hr className="w-full text-light-gray" />
          </div>
          <div className="flex justify-between w-full">
            <div className="w-[50%] h-3 bg-gray-200 rounded-lg" />
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default InfoDataUsagePageSkeleton;
