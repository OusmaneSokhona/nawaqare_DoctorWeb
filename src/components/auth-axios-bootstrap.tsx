"use client";

import { useEffect } from "react";
import { syncAuthBearerFromStorage } from "@/api/base";

/** Ensures axios default Authorization matches localStorage after navigation / HMR. */
export default function AuthAxiosBootstrap() {
  useEffect(() => {
    syncAuthBearerFromStorage();
  }, []);
  return null;
}
