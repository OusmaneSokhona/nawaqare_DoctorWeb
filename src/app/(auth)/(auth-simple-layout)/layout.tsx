import React, { PropsWithChildren } from "react";

import AuthSimplelayout from "@/components/layouts/auth-simple-layout";

const layout = ({ children }: PropsWithChildren) => {
  return <AuthSimplelayout>{children}</AuthSimplelayout>;
};

export default layout;
