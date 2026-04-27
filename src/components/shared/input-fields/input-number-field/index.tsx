import { FC } from "react";

import { Typography } from "@/components/shared/typography";
import { InputNumberFeildProps } from "@/types";
import Iconify from "../../iconify";

const InputNumberField: FC<InputNumberFeildProps> = ({
  label,
  error,
  name,
  value,
  onFocus,
  onBlur,
  styling,
  disabled,
  onChange,
  required,
  labelStyles,
  placeholder,
  textColor = "text-black",
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div>
          <Typography size="lg" className={`${labelStyles} font-semibold`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}
      <div>
        <input
          onFocus={onFocus}
          onBlur={handleBlur}
          name={name}
          disabled={disabled}
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`px-5 py-4 bg-white h-[3.8rem] ${textColor} border ${error ? "border-red" : "border-light-gray"} text-lg placeholder:text-lg placeholder:text-placeholder-gray disabled:text-placeholder-gray disabled:border-light-gray placeholder:font-medium disabled:cursor-not-allowed font-medium disabled:bg-dull-white focus:outline-none rounded-[12px] w-full ${error ? "hover:border-red" : "hover:border-gray"} ${styling}`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2">
          <span className="relative top-[1px]">
            <Iconify
              icon="bx:error"
              className="text-red bg-white rounded-full p-[1px]"
            />
          </span>
          <Typography size="md" className={`text-red`}>
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InputNumberField;
