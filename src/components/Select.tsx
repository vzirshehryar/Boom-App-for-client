import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        className="w-full rounded-xl bg-border p-2.5 placeholder:text-sm"
        {...props}
        ref={ref}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  },
);
Select.displayName = "Select";
export default Select;
