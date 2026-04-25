"use client";

import React, { FC, useState } from "react";

import { Typography } from "@/components/shared/typography";
import { InputFieldProps } from "@/types";
import Iconify from "../../iconify";

const InputTextField: FC<InputFieldProps> = ({
  name,
  label,
  value,
  error,
  onBlur,
  onFocus,
  styling,
  required,
  onChange,
  disabled,
  labelStyles,
  placeholder,
  textColor = "text-black",
  placeholderTop = false,
  inputHeigth = "h-[3.8rem]",
  type = "text",
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      {label && (
        <div>
          <Typography size="lg" className={`font-semibold ${labelStyles}`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}
      <div className="relative">
        {placeholderTop && (
          <label
            className={`absolute left-5 transition-all border duration-200 ${
              isFocused || value !== ""
                ? "-top-2 text-md font-semibold text-gray bg-white px-1"
                : "top-4 text-lg text-light-gray font-semibold"
            }`}
          >
            {placeholder}
          </label>
        )}
        {icon && (
          <Iconify
            icon={icon}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-color text-xl"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholderTop ? "" : placeholder}
          // className={`px-3 py-[1.1rem] bg-white ${inputHeigth} ${textColor} border-2 ${
          //   error ? "border-red" : "border-border-color"
          // } text-lg placeholder:text-lg text-black placeholder:text-placeholder-gray shadow-sm disabled:text-dark-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-opacity-20 focus:outline-none rounded-[12px] w-full ${
          //   error ? "hover:border-red" : "hover:border-light-gray"
          // } ${styling}`}
          className={`pl-12 pr-3 py-[1.1rem] bg-white ${inputHeigth} ${textColor} border-2 ${
            error ? "border-red" : "border-border-color"
          } text-lg placeholder:text-lg text-black placeholder:text-placeholder-gray shadow-sm disabled:text-dark-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-opacity-20 focus:outline-none rounded-[12px] w-full ${
            error ? "hover:border-red" : "hover:border-light-gray"
          } ${styling}`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 ">
          <Iconify
            icon="bx:error"
            className="text-red bg-white rounded-full p-[1px]"
          />
          <Typography size="md" className={"text-red"}>
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InputTextField;
