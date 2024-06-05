import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className="bg-border w-full rounded-xl p-2.5 placeholder:text-sm"
        {...props}
        ref={ref}
      />
    );
  },
);
Input.displayName = "Input";
export default Input;
