// Helper 1: apply numeric limits within type-specific limits
export const applyLimits = (
  value: number,
  type?: "discount" | "tax" | "shipping",
): number => {
  const limits = {
    discount: 100,
    tax: 200,
    shipping: 10000,
    default: 9999,
  };

  // 1. Apply type-specific numeric limits first
  const max = type ? limits[type] : limits.default;
  const maxValue = Math.max(0, Math.min(value, max));

  // 2. Enforce 4-character length limit
  const stringValue = maxValue.toString();
  if (stringValue.length > 5) {
    return parseFloat(stringValue.slice(0, 5));
  }

  return maxValue;
};

// Helper 2: validate numeric input
export const validateNumericInput = (
  value: string,
  options: {
    allowZero?: boolean;
    allowLeadingZero?: boolean;
    maxLength?: number;
  } = {},
): string => {
  const basePattern = options.allowZero ? /[^0-9.]/g : /[^1-9.]/g;
  let sanitized = value.replace(
    options.allowLeadingZero ? /[^0-9.]/g : basePattern,
    "",
  );

  // Handle multiple decimals
  const decimalCount = (sanitized.match(/\./g) || []).length;
  if (decimalCount > 1) {
    const parts = sanitized.split(".");
    sanitized = `${parts[0]}.${parts.slice(1).join("")}`;
  }

  return options.maxLength ? sanitized.slice(0, options.maxLength) : sanitized;
};
