import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "plain" | "ghost";
}

const variantHandler = {
  base: {
    className:
      "rounded-xl font-nunito py-3 lg:py-6 px-7 lg:px-14 text-xl sm:text-2xl lg:text-5xl font-bold transition-all active:opacity-70",
  },
  plain: {
    className: "border border-zinc-400 bg-zinc-200 text-rose-600",
  },
  ghost: {
    className:
      "bg-transparent border-4 rounded-4xl text-zinc-200 border-pink-700 active:opacity-80 active:bg-pink-700/10 big-shaddow good-inner-shaddow",
  },
};

export function Button({ variant = "plain", className, ...rest }: ButtonProps) {
  const variantClass = variantHandler[variant]?.className || "";
  const baseClass = variantHandler.base.className;
  return (
    <button className={twMerge(baseClass, variantClass, className)} {...rest} />
  );
}
