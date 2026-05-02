import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TextButtonProps extends ComponentProps<"button"> {}

export function TextButton({ className, ...rest }: TextButtonProps) {
  return (
    <button
      className={twMerge(
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-200 animate-pulse",
        className
      )}
      {...rest}
    />
  );
}
