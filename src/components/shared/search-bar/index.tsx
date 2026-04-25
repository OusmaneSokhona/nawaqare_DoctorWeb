/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { onFilterName } from "@/redux/slices/app-slice";
import Iconify from "../iconify";

interface SearchInputProps {
  placeholder?: string;
  width?: string;
}
const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  width = "250",
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onFilterName(""));
  }, []);

  return (
    <div
      style={{
        width: `${width}px`,
      }}
      className="w-full h-[50px] flex items-center bg-[#ededf7] rounded-xl px-4 py-3"
    >
      <Iconify
        icon="material-symbols:search"
        className="text-primary-color font-semibold"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="ml-2 text-md w-full bg-transparent border-none outline-none !text-dark-gray placeholder:text-desc-color"
        onChange={(e) => dispatch(onFilterName(e.target.value))}
      />
    </div>
  );
};

export default SearchInput;
