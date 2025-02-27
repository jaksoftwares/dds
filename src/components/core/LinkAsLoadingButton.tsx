import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface LinkAsLoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  href: string;
  children?: ReactNode;
  className?: string;
  text?: string;
  loadingText?: string;
  isLoading?: boolean;
  rightSection?: React.ReactNode;
}

const LinkAsLoadingButton = React.forwardRef<HTMLButtonElement, LinkAsLoadingButtonProps>(
  (
    {
      href,
      children,
      className,
      text,
      loadingText = "Loading",
      isLoading = false,
      rightSection,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        asChild
        ref={ref}
        disabled={isLoading || disabled}
        className={cn("flex items-center gap-2 p-2 w-fit", className)}
        {...props}
      >
        <Link href={href}>
          {isLoading ? (
            <div className="flex gap-x-4">
              <LoadingSpinner />
              <span>{loadingText}</span>
            </div>
          ) : (
            <>
              <span className="flex gap-x-2 items-center">{text || children}</span>
              {rightSection && <span className="mr-2">{rightSection}</span>}
            </>
          )}
        </Link>
      </Button>
    );
  }
);

LinkAsLoadingButton.displayName = "LinkAsLoadingButton";

export default LinkAsLoadingButton;
