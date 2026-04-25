import { FC } from "react";
import { Typography } from "@/components/shared/typography";
import Iconify from "../../iconify";

interface InputDateFieldProps {
  label?: string;
  error?: string;
  name?: string;
  value?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  labelStyles?: string;
  placeholder?: string;
  styling?: string;
  textColor?: string;
  min?: string;
  max?: string;
}

const InputDateField: FC<InputDateFieldProps> = ({
  label,
  error,
  name,
  value,
  onFocus,
  onBlur,
  onChange,
  disabled,
  required,
  labelStyles,
  placeholder,
  styling,
  min,
  max,
  textColor = "text-black",
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* LABEL */}
      {label && (
        <div>
          <Typography size="lg" className={`${labelStyles} font-semibold`}>
            {label}
            {required && <span className="text-red">*</span>}
          </Typography>
        </div>
      )}

      {/* INPUT */}
      <div>
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          disabled={disabled}
          min={min}
          max={max}
          placeholder={placeholder}
          className={`px-5 bg-white py-4 h-[3.8rem] ${textColor}
            border ${error ? "border-red" : "border-light-gray"}
            text-lg placeholder:text-lg placeholder:text-placeholder-gray
            disabled:text-placeholder-gray disabled:border-light-gray
            placeholder:font-medium disabled:cursor-not-allowed
            font-medium disabled:bg-dull-white
            focus:outline-none rounded-[12px] w-full
            ${error ? "hover:border-red" : "hover:border-gray"}
            ${styling}
          `}
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2">
          <span className="relative top-[1px]">
            <Iconify
              icon="bx:error"
              className="text-red bg-white rounded-full p-[1px]"
            />
          </span>
          <Typography size="md" className="text-red">
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InputDateField;
