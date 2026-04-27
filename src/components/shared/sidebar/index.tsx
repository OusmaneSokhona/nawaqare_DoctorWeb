"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { content } from "@/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setExpandedIndex,
  setIsDrawerOpen,
  setIsLogoutModel,
} from "@/redux/slices/app-slice";
import Iconify from "../iconify";
import { Typography } from "../typography";
import SidebarItem from "./sidebarItem";

type SubMenuItem = {
  text: string;
  size: string;
  subItem: boolean;
  path: string;
};

type MenuItem = {
  icon: string;
  activeIcon?: string;
  text: string;
  size: string;
  path?: string;
  subMenu?: SubMenuItem[];
};

function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isDrawerOpen } = useAppSelector((state) => state.app);

  const handleLogout = () => {
    dispatch(setIsLogoutModel(true));
    if (isDrawerOpen) dispatch(setIsDrawerOpen(false));
  };

  return (
    <div className="relative">
      {/* <aside className={` h-[calc(100vh-1.5rem)] xl:h-[calc(100vh-2.5rem)]`}> */}
      
      <aside className="h-screen">
        <nav className="flex h-full flex-col bg-[#eceaf7] relative shadow-[8px_0_16px_rgba(0,0,0,0.12)]">
          {/* Right-edge gradient */}
          <div className="absolute top-0 right-0 w-4 h-full pointer-events-none bg-gradient-to-l from-black/10 to-transparent" />

          {/* Header and Logo */}
          <span
            onClick={() => dispatch(setIsDrawerOpen(false))}
            className="xl:hidden size-5 absolute bg-white rounded-full right-2 top-2 cursor-pointer flex items-center justify-center"
          >
            <Iconify
              icon="mingcute:close-line"
              width={16}
              height={16}
              color="black"
            />
          </span>

          <div
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center px-4 py-7"
          >
            <Image
              height={103}
              width={124}
              src={"/assets/svg/logo2.svg"}
              alt="Dashboard Logo"
              className="cursor-pointer"
            />
          </div>

          <ul className="flex-1 px-6 overflow-y-auto py-2">{children}</ul>
        </nav>
      </aside>
    </div>
  );
}

const SidebarComponent = () => {
  const dispatch = useAppDispatch();
  const { expandedIndex } = useAppSelector((state) => state.app);
  const pathname = usePathname();

  const menuItems = content.sideBar.pharmacy;

  useEffect(() => {
    const activeMenu = menuItems?.find(
      (item: MenuItem) =>
        item.subMenu?.some((subItem: SubMenuItem) =>
          pathname?.includes(subItem.path),
        ) ?? false,
    );

    if (activeMenu) {
      const activeIndex = menuItems?.indexOf(activeMenu);

      if (activeIndex !== -1) {
        dispatch(setExpandedIndex(activeIndex));
      }
    } else {
      dispatch(setExpandedIndex(null));
    }
  }, [dispatch, menuItems, pathname]);

  // useEffect(() => {
  //   const activeMenu = menuItems?.find(
  //     (item) => item.subMenu?.some((subItem) => pathname?.includes(subItem.path)) ?? false
  //   );

  //   if (activeMenu) {
  //     const activeIndex = menuItems?.indexOf(activeMenu);

  //     if (activeIndex !== -1) {
  //       dispatch(setExpandedIndex(activeIndex));
  //     }
  //   } else {
  //     dispatch(setExpandedIndex(null));
  //   }
  // }, [dispatch, menuItems, pathname]);

  const handleExpand = (index: number | null) => {
    dispatch(setExpandedIndex(index));
  };
  return (
    <Sidebar>
      {menuItems?.map((item: any, index: any) => (
        <React.Fragment key={index}>
          <SidebarItem
            {...item}
            expanded={expandedIndex === index}
            onToggle={() =>
              handleExpand(expandedIndex === index ? null : index)
            }
          />
        </React.Fragment>
      ))}
    </Sidebar>
  );
};

export default SidebarComponent;
