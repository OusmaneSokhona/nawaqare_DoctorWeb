import { FC } from "react";

const PackagePageSkeleton: FC = () => {
  return (
    <div className="flex flex-col items-center w-full gap-6 p-5 xl:p-10 rounded-[22px] border border-purple">
      <div className="w-3/4 h-6 mb-2 bg-gray-200 rounded-lg xl:w-2/4"></div>
      <div className="w-2/3 h-10 mb-2 bg-gray-200 rounded-lg xl:w-1/3"></div>
      <div className="w-full">
        <hr className="w-full text-light-gray" />
      </div>
      <div className="flex flex-col w-full gap-7">
        <div className="w-1/3 h-6 bg-gray-200 rounded-lg"></div>
        <div className="flex flex-col w-full gap-3">
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex items-center gap-4 xl:gap-6">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
        <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default PackagePageSkeleton;
