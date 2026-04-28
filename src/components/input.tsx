import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  children: ReactNode;
  wFull?: boolean;
}

function Input({ children, wFull = false }: InputProps) {
  return (
    <div
      data-wfull={wFull}
      className={`flex transition-all p-1.5 ${wFull ? "w-full" : "w-fit"} gap-4 md:gap-6 border-b-2 border-zinc-300/50 group focus-within:border-zinc-200/70 items-center`}
    >
      {children}
    </div>
  );
}

interface LabelProps {
  children: ReactNode;
}
function Label({ children }: LabelProps) {
  return (
    <span className="font-bold text-2xl lg:text-4xl text-zinc-200 opacity-70 transition-opacity group-focus-within:opacity-100">
      {children}
    </span>
  );
}

interface FieldProps extends ComponentProps<"input"> {}

function Field({ className, ...rest }: FieldProps) {
  return (
    <input
      autoComplete="off"
      className={twMerge(
        "flex group-data-[wfull=true]:flex-1 outline-0 text-2xl lg:text-4xl leading-0 font-semibold text-zinc-200 transition-all group-focus-within:placeholder:opacity-0 placeholder:text-zinc-200 placeholder:font-bold",
        className
      )}
      {...rest}
    />
  );
}

Input.Label = Label;
Input.Field = Field;

export { Input };
