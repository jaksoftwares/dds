import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingButtonProps extends ButtonProps {
  text?: string;
  loadingText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      text,
      loadingText = "Loading",
      isLoading = false,
      className,
      children,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn("flex items-center gap-2 w-fit", className)}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            <span>{text || children}</span>
          </>
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
