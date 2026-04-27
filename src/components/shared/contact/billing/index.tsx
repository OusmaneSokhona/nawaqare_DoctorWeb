import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface BillingStatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}

const BillingStatusDropdown: React.FC<BillingStatusDropdownProps> = ({
  value,
  onChange,
  options = ["Bill Paid", "Remaining Bill", "Other"],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input with Chevron */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-900 font-medium flex items-center justify-between hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select billing status"}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                value === option
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Demo usage component
const BillingStatusDemo = () => {
  const [billingStatus, setBillingStatus] = useState("");

  return (
    <div className="">
      <div className="">
        {/* <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Billing Status
        </h2> */}
        {/* <p className="text-sm text-gray-500 mb-4">
          Select the current billing status
        </p> */}

        <BillingStatusDropdown
          value={billingStatus}
          onChange={setBillingStatus}
        />

        {/* Selected Value Display */}
        {/* {billingStatus && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Selected:</span> {billingStatus}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default BillingStatusDemo;
