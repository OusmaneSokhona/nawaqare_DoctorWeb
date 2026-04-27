"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTopOnPageChange = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollableContainer = document.querySelector(
      "[data-scrollable-container]",
    );

    if (scrollableContainer) {
      scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTopOnPageChange;
