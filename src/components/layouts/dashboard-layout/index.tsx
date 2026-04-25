"use client";

import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

import Modal from "@/components/shared/custom-modal";
import Header from "@/components/shared/header";
import SidebarComponent from "@/components/shared/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetLogoutState,
  setIsDrawerOpen,
  setIsLogoutModel,
} from "@/redux/slices/app-slice";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isLogoutModel, isDrawerOpen } = useAppSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setIsLogoutModel(false));
    router.push("/login");
  };

  useEffect(() => {
    dispatch(resetLogoutState());
  }, [dispatch]);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isDrawerOpen]);

  return (
    <div>
      <div className="flex-shrink-0 sticky top-0 z-[100]">
        <Header />
      </div>
      <div className="h-screen flex overflow-hidden relative bg-background-color2">
        <div
          className={`
    fixed inset-y-0 left-0 w-64 flex-shrink-0 p-3
    transform transition-all duration-300
    bg-white shadow-[8px_0_16px_rgba(0,0,0,0.12)] border-r-2 border-gray-100
    ${isDrawerOpen ? "translate-x-0 z-50 xl:z-[10]" : "-translate-x-full z-50 xl:z-[10]"}
    xl:relative xl:transform-none xl:inset-auto xl:p-0
    ${!isDrawerOpen ? "opacity-0 invisible xl:opacity-100 xl:visible" : "opacity-100 visible"}
  `}
        >
          <SidebarComponent />
        </div>

        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            onClick={() => dispatch(setIsDrawerOpen(false))}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden z-10 bg-[#eceaf7]">
          {/* Header */}
          {/* <div className="flex-shrink-0">
          <Header />
        </div> */}

          {/* <hr className="border-t border-light-gray flex-shrink-0" /> */}

          <div
            className="flex-1 overflow-y-auto px-7 py-5 max-sm:px-4 max-sm:py-4"
            data-scrollable-container
          >
            {children}
          </div>
        </div>

        <Modal
          isOpen={isLogoutModel}
          onClose={() => dispatch(setIsLogoutModel(false))}
          onConfirm={handleLogout}
          type="logout"
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
