"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setIsLogoutModel } from "@/redux/slices/app-slice";
import { HeaderProfileDropDownProps } from "@/types/dashboard";
import { Typography } from "../typography";
import { Icon } from "@iconify/react";

const HeaderProfileDropDown: FC<HeaderProfileDropDownProps> = ({
  className,
  dropdownItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleSelect = (name: string) => {
    if (name === "Logout") {
      dispatch(setIsLogoutModel(true));
    }
    setIsOpen(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const router = useRouter();

  return (
    <>
      <div ref={dropdownRef} className={`relative rounded-[10px] ${className}`}>
        <div
          className=" cursor-pointer rounded-full flex items-center gap-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={"/assets/svg/header-profile-image.svg"}
            height={50}
            width={50}
            alt="profile image is missing"
          />
          <div className="flex gap-1 justify-center">
            <Typography as={"h4"} size={"lg"} className="font-bold">
              Dr. Ali Shah
            </Typography>
            <Icon
              icon={isOpen ? "iconamoon:arrow-up-2" : "iconamoon:arrow-down-2"}
              width="24"
              height="24"
            />
          </div>
        </div>
        {/* <Typography className="absolute z-50 top-0">ejejesjjsj</Typography> */}
        {isOpen && dropdownItems && (
          <ul className="absolute bg-white w-[196px] sm:w-[202px] py-1 rounded-2xl left-[-60px] z-50 shadow-xl">
            {dropdownItems?.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelect(item.name);
                  if (item?.link) {
                    router.push(item?.link);
                  }
                }}
                className={`px-1 cursor-pointer ${index < dropdownItems.length - 1 ? "" : ""}`}
              >
                <div
                  className={`${item.hoverBg} hover:rounded-xl ${item.color} ${item.hoverText} flex gap-3 items-center py-2 px-5`}
                >
                  {/* <span className="flex items-center">
                    <Iconify icon={item.icon} width="16px" height="16px" />
                  </span> */}
                  <Typography
                    size="md"
                    className="py-1 px-1 text-center font-medium"
                  >
                    {item.name}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default HeaderProfileDropDown;
