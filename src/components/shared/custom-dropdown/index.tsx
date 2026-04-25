"use client";

import React, { FC, useEffect, useRef, useState } from "react";

import { DropDownOptions, PaginatedData } from "@/types/dashboard";
import Iconify from "../iconify";
import { Typography } from "../typography";

export interface CustomDropDownProps {
  type?: string;
  styling?: string;
  invoices?: boolean;
  index?: number;
  onOptionClick?: (name: string) => void;
  paginatedData?: PaginatedData;
  dropDownOptions?: DropDownOptions;
}

const CustomDropdown: FC<CustomDropDownProps> = ({
  styling,
  index = 0,
  paginatedData,
  dropDownOptions,
  onOptionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

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

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown Toggle */}
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <Iconify icon="bi:three-dots-vertical" className="w-6 h-6 text-black" />
      </div>

      {/* Dropdown Items */}
      {isOpen && (
        <div
          className={`absolute overflow-hidden bg-white w-48 rounded-2xl right-2 z-10 shadow-lg text-nowrap ${paginatedData && paginatedData.length - index <= 2 ? "bottom-0" : ""}
`}
        >
          {dropDownOptions?.map((item, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer ${index < dropDownOptions?.length - 1 ? "border-b border-light-gray" : ""}`}
              onClick={() => {
                if (onOptionClick) {
                  onOptionClick(item.action);
                }
                setIsOpen(false);
              }}
            >
              <div
                className={`${styling} flex items-center gap-3 py-2 px-4 rounded-lg relative
                    hover:text-white ${item?.hoverBgColor && `hover:${item?.hoverBgColor}`}
                    ${item?.bgColor && `${item?.bgColor}`}
                     ${item?.textColor && `${item?.textColor}`}
                 text-gray`}
              >
                <span className="flex items-center">
                  <Iconify icon={item.icon} width="20px" height="20px" />
                </span>
                <Typography size="md" className="font-semibold">
                  {item.name}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
