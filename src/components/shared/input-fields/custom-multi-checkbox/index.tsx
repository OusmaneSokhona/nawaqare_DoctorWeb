import React from "react";

interface CustomMultiCheckboxProps {
  label?: string;
  name: string;
  options?: string[];
  values?: string[];
  onChange: (values: string[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  touched?: boolean;
  error?: string;
}

const CustomMultiCheckbox: React.FC<CustomMultiCheckboxProps> = ({
  label,
  name,
  options = [],
  values = [],
  onChange,
  onBlur,
  touched,
  error,
}) => {
  const handleCheck = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="space-y-2 w-full">
      {label && <p className="text-lg font-medium">{label}</p>}

      <div className="space-y-3">
        {options.map((opt, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              id={`${name}-${index}`}
              type="checkbox"
              checked={values.includes(opt)}
              onChange={() => handleCheck(opt)}
              onBlur={onBlur}
              className="h-3 w-3 border border-border-color rounded cursor-pointer"
            />

            <label
              htmlFor={`${name}-${index}`}
              className="text-desc-color cursor-pointer text-md"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>

      {touched && error && <span className="text-red text-md">{error}</span>}
    </div>
  );
};

export default CustomMultiCheckbox;
