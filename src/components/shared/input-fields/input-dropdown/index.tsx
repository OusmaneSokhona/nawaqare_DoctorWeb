import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { FC, useRef, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { InputDropdownProps, IOption } from "@/types";
import { Typography } from "../../typography";
import { getClassNames } from "./input.styles";

const InputDropdown: FC<InputDropdownProps> = ({
  label,
  textColor = "",
  background = "",
  placeholder = "",
  options = [],
  required,
  onSelect,
  value = "",
  name,
  multipleCheck = false,
  isCreatable = false,
  error = "",
  touched = false,
  onBlur,
  fetchNextPage,
  inputEnd = false,
  hasNextPage,
  fetchQuery,
  subLabel,
  selectedImgUrl,
  isLoading = false,
  height = "h-[3rem]",
  placeholderStyle = "",
  indicatorStyle = "",
  labelStyles = "",
  selectedTextColor,
  menuPlacement = "auto",
  borderRadius = "rounded-xl",
  menuHeight = 300,
  ...props
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(isLoading);

  const handleOnChange = (selectedValue: IOption | IOption[]): void => {
    if (multipleCheck) {
      if (onSelect)
        onSelect((selectedValue as IOption[])?.map((i: IOption) => i.value));
    } else {
      if (onSelect) onSelect((selectedValue as IOption)?.value);
    }
  };

  const handleMenuScrollToBottom = async () => {
    if (hasNextPage && !loading) {
      setLoading(true);
      await fetchNextPage();
      setLoading(false);
    }
  };

  const handleInputChange = (inputValue: string) => {
    if (fetchQuery && !loading) {
      fetchQuery(inputValue);
    }
  };

  const bgColor = background;
  const borderColor = !!error && touched ? "!border-red" : "!border-light-gray";
  const displayPlaceholder = placeholder;

  const defaultValue =
    value &&
    (typeof value === "string" || (Array.isArray(value) && value.length > 0))
      ? Array.isArray(value)
        ? value.map((i) => ({ value: i, label: i }))
        : { value, label: value }
      : null;

  const customStyles = {
    singleValue: (provided: any) => ({
      ...provided,
      color: selectedTextColor ? "#00000" : "#969696",
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: menuHeight,
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: menuHeight,
      overflowY: "auto",
    }),
  };

  return (
    <div className={`flex flex-col gap-2 w-full`} ref={dropdownRef}>
      {label && (
        <div>
          <Typography
            size="lg"
            as="p"
            className={`font-semibold ${labelStyles}`}
          >
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}
      {subLabel && (
        <div>
          <Typography
            size="md"
            as="p"
            className={`font-normal text-primary-dark ${error && "!text-red"}`}
          >
            {subLabel}
          </Typography>
        </div>
      )}

      <div
        className={`relative bg-white border ${borderColor} ${inputEnd && bgColor} ${borderRadius} flex items-center w-full`}
      >
        {selectedImgUrl && (
          <div className="z-[1] absolute inset-y-0 left-0 items-center hidden pl-3 pointer-events-none sm:flex">
            <Image
              src={selectedImgUrl}
              alt="flag"
              width={30}
              height={30}
              loading="lazy"
            />
          </div>
        )}

        {isCreatable ? (
          <CreatableSelect
            classNames={getClassNames(
              !inputEnd ? "w-full" : "sm:w-[75%] w-[65%]",
              bgColor,
              textColor,
              !!error,
              selectedImgUrl ? "!pl-0 sm:!pl-10" : "",
              "",
              "",
              "text-black",
            )}
            isMulti={multipleCheck}
            placeholder={displayPlaceholder}
            value={defaultValue}
            onChange={handleOnChange as any}
            options={options}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            isLoading={loading || isLoading}
            onBlur={onBlur}
            required={required}
            hideSelectedOptions
            name={name}
            inputId={name}
            isClearable
            {...props}
          />
        ) : (
          <Select
            classNames={getClassNames(
              !inputEnd ? "w-full" : "sm:w-[75%] w-[65%] ",
              bgColor,
              // textColor,
              "!text-black",
              !!error,
              selectedImgUrl ? "!pl-0 sm:!pl-10" : "",
              height ? height : "",
              placeholderStyle ? placeholderStyle : "",
              indicatorStyle ? indicatorStyle : "",
            )}
            isMulti={multipleCheck}
            placeholder={displayPlaceholder}
            value={defaultValue}
            onInputChange={handleInputChange}
            onChange={handleOnChange as any}
            options={options}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            isLoading={loading || isLoading}
            hideSelectedOptions
            onBlur={onBlur}
            required={required}
            name={name}
            inputId={name}
            isClearable
            menuPlacement={menuPlacement}
            // styles={customStyles}
            {...props}
          />
        )}
        {inputEnd && (
          <>
            <div className="flex items-center h-full">
              <Image
                src="/assets/svg/separator-line.svg"
                alt="Separator Line"
                width={1}
                height={55}
              />
            </div>
            <div className="w-[35%] sm:w-[25%]">{inputEnd}</div>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red">
          <div>
            <Icon icon="icon-park-outline:caution" width="18" height="18" />
          </div>
          <div>
            <Typography size="md" as="p" className="font-normal">
              {error}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputDropdown;
