import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, label, type, required, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label className="font-medium" htmlFor={props.name}>
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}

        <input
          type={type}
          className={cn(
            "flex md:mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";


export { Input };
