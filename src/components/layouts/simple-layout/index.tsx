import { FC, PropsWithChildren } from "react";

import SimpleHeader from "@/components/ui/simple-header";

const SimpleLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full bg-background-color xl:justify-center">
      <SimpleHeader />
      <div className="p-5 pb-7 w-full h-full min-h-[calc(100vh-85px)] sm:min-h-[calc(100vh-120px)] flex">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default SimpleLayout;
