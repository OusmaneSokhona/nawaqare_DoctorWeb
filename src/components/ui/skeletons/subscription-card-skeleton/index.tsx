import React, { FC } from "react";

const SubscriptionCardSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-2 xl:!px-10 xl:!py-5 p-5 bg-white shadow-md rounded-lg animate-pulse">
      {/* Header Loader */}
      <div className="w-32 h-6 mb-2 bg-gray-200 rounded"></div>

      {/* Next Payment Loader */}
      <div className="w-48 h-6 mb-2 bg-gray-200 rounded"></div>

      {/* Card Info Loader */}
      <div className="flex items-center gap-3">
        <div className="w-24 h-6 bg-gray-200 rounded"></div>
        <div className="w-40 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SubscriptionCardSkeleton;
