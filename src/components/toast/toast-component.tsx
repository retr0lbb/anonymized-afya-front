import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ToastProps {
  title: string;
  Icon: ReactNode;
  className?: string;
}
export function Toast({ Icon, title, className }: ToastProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-2 sm:gap-4 text-orange-500 p-3 sm:p-5 rounded-xl bg-pink-200 border-4 border-rose-900/10 max-w-[90vw]",
        className
      )}
    >
      {Icon}{" "}
      <p className="text-2xl sm:text-3xl md:text-4xl font-nunito text-zinc-800 text-center">{title}</p>
    </div>
  );
}
