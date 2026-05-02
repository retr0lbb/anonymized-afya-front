import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BlueLabelProps extends ComponentProps<"h1"> {}

export function BlueLabel({ className, ...rest }: BlueLabelProps) {
  return (
    <h1
      className={twMerge(
        "px-6 sm:px-8 md:px-12 w-fit py-2 sm:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-nunito-italic font-bold text-zinc-100 bg-[#2359a8] rounded-full",
        className
      )}
      {...rest}
    />
  );
}
