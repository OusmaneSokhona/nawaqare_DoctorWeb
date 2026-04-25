"use client";

import React, { ReactNode } from "react";

import ScrollToTopOnPageChange from "@/components/shared/scroll-to-top/ScrollToTopOnPageChange";

const ParentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ScrollToTopOnPageChange />
      {children}
    </>
  );
};

export default ParentLayout;
