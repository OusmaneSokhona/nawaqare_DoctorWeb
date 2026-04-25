import React, { FC } from "react";

import { ContainerProps } from "@/types";

const Container: FC<ContainerProps> = ({
  styling,
  children,
  isSideBorder,
  isBottomBorder,
}) => {
  return (
    // custom-shadow
    <div className="w-full flex relative rounded-[22px] h-full">
      {isSideBorder && (
        <div className="w-4 bg-primary-gradient rounded-tl-[22px] rounded-bl-[22px]" />
      )}
      {/* <div className={`w-full bg-white rounded-[22px] shadow-[0px_4px_20px_0_rgba(0,0,0,0.06)] ${styling}`}> */}
      <div className={`w-full bg-white rounded-[22px] shadow-lg ${styling}`}>
        {children}
      </div>
      {isSideBorder && <div className="w-4 bg-white rounded-r-[22px]" />}
      {isBottomBorder && (
        <div className="absolute bottom-0 left-0 w-full h-3 bg-primary-gradient rounded-b-[22px]" />
      )}
    </div>
  );
};

export default Container;
