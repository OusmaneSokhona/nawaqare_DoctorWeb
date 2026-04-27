import React, { PropsWithChildren } from "react";

import Authlayout from "@/components/layouts/auth-layout";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="bg-white min-h-screen  max-sm:px-4 
        bg-cover bg-center bg-no-repeat max-sm:py-4 flex justify-center items-center "
    >
      {children}
    </div>
  );
};

export default layout;
