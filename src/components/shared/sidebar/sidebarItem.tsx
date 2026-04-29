"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDrawerOpen } from "@/redux/slices/app-slice";
import { SidebarItemProps } from "@/types";
import Iconify from "../iconify";
import { Typography } from "../typography";
import { useState } from "react";

/** SVG / PNG paths; Iconify keys look like `mdi:home` or `material-symbols:chat-outline`. */
function isStaticImageSrc(src: string): boolean {
  return (
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.endsWith(".svg") ||
    src.endsWith(".png") ||
    src.endsWith(".webp")
  );
}

export default function SidebarItem({
  icon,
  activeIcon,
  text,
  onToggle,
  path,
  size = "md",
  subMenu = null,
  expanded = false,
  subItem = false,
}: SidebarItemProps & { onToggle?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const isActive =
    (path && pathname?.includes(path)) ||
    (subMenu &&
      subMenu.some(
        (subItem) =>
          typeof subItem?.path === "string" && pathname?.includes(subItem.path),
      ));

  const { isDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    if (isDrawerOpen) dispatch(setIsDrawerOpen(false));
  };

  const displayIcon =
    !icon
      ? null
      : (isActive || isHovered) && activeIcon
        ? activeIcon
        : icon;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
    if (path) {
      router.push(path);
      closeSidebar();
    }
  };

  const content = (
    <>
      <span
        className={`
          flex items-center justify-center rounded-md p-1.5
          ${!subItem && ""}  
          ${!subItem && isActive && ""}
        `}
      >
        {displayIcon ? (
          isStaticImageSrc(displayIcon) ? (
            <Image src={displayIcon} alt="icon" width={24} height={24} />
          ) : (
            <Iconify
              icon={displayIcon}
              width={24}
              height={24}
              color="currentColor"
            />
          )
        ) : (
          <Iconify icon="mdi:dot" width={24} height={24} />
        )}
      </span>

      <Typography
        size={size === "sm" ? "sm" : "md"}
        className={`whitespace-nowrap overflow-hidden text-start text-[18px] font-semibold  ${(isActive || isHovered) && activeIcon ? "text-white" : "text-desc-color"}`}
      >
        {text}
      </Typography>

      {subMenu && (
        <span
          className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform ${
            expanded ? "rotate-90" : "rotate-0"
          }`}
        >
          <Iconify icon="tabler:chevron-right" width={16} height={16} />
        </span>
      )}
    </>
  );

  return (
    <li className="overflow-hidden">
      {!subItem ? (
        <button
          onClick={handleClick}
          className={`
            group relative my-[4px] flex w-full cursor-pointer items-center gap-3  rounded-md px-4 
            ${subItem ? "py-2.5 hover:bg-white/20 hover:text-white" : "py-2.5"} 
            font-medium 
            ${isActive ? "text-white bg-primary-dark" : "hover:text-white hover:bg-primary-dark text-[#252525]"}
            ${subItem && isActive ? "bg-white/20 text-white" : ""}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {content}
        </button>
      ) : (
        path && (
          <Link
            href={path}
            onClick={closeSidebar}
            className={`
            group relative my-[4px] flex w-full cursor-pointer items-center gap-2 rounded-md px-6 
            ${subItem ? "py-2.5 hover:bg-white/20 hover:text-white" : "py-4"} 
            font-medium 
            ${isActive ? "text-dark-charcoal bg-white" : "text-white"}
            ${subItem && isActive ? "bg-white/20 text-white" : ""}
          `}
          >
            {content}
          </Link>
        )
      )}
      {subMenu && !subItem && (
        <ul
          className="sub-menu transition-all duration-300 ease-in-out overflow-hidden"
          style={{ height: expanded ? `${subMenu.length * 64}px` : "0px" }}
        >
          {subMenu?.map((item, index) => <SidebarItem key={index} {...item} />)}
        </ul>
      )}
    </li>
  );
}
