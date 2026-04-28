import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TextButtonProps extends ComponentProps<"button"> {}

export function TextButton({ className, ...rest }: TextButtonProps) {
  return (
    <button
      className={twMerge(
        "text-6xl font-semibold text-zinc-200 animate-pulse",
        className
      )}
      {...rest}
    />
  );
}
