"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";

interface SubmitButtonProps extends ButtonProps {
  loadingText?: string;
}

export function SubmitButton({ children, loadingText, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} {...props}>
      {pending && loadingText ? loadingText : children}
    </Button>
  );
}
