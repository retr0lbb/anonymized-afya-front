import type { ComponentProps, ReactNode } from "react";
import React from "react";

interface CheckBoxProps extends ComponentProps<"input"> {
  extended?: boolean;
  children?: ReactNode;
}

function Checkbox({
  extended = false,
  children,
  className,
  checked,
  ...rest
}: CheckBoxProps) {
  return (
    <div
      data-selected={checked}
      className={`relative group flex 
      w-full ${extended && "h-full"} rounded-3xl sm:rounded-4xl pt-3 sm:pt-5 justify-center bg-zinc-50 data-[selected=true]:bg-rose-500 px-4 sm:px-6 md:px-10 gap-2 sm:gap-4 big-shaddow`}
    >
      <input
        type="checkbox"
        className="absolute inset-0 bg-transparent outline-0 z-10 opacity-0"
        {...rest}
      />
      {children}
    </div>
  );
}

interface HeadProps {
  children: ReactNode;
}
function Head({ children }: HeadProps) {
  return (
    <div
      className="w-full
    flex-col pt-3 sm:pt-5 flex flex-nowrap group-data-[selected=true]:text-zinc-200 overflow-hidden items-baseline gap-2 sm:gap-4"
    >
      {children}
    </div>
  );
}

interface BodyProps {
  children?: ReactNode;
  title: string;
  description: string;
  isBig?: boolean;
}
function Body({ children, description, title, isBig = false }: BodyProps) {
  return (
    <div className="flex flex-1 relative overflow-hidden justify-between w-full gap-2 sm:gap-4">
      <div
        className={`flex flex-col ${isBig ? "justify-start" : "justify-center"} gap-2 sm:gap-4`}
      >
        <h1
          className={`${isBig ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl sm:text-3xl md:text-4xl"} ${isBig ? "pt-3 sm:pt-5" : ""} text-rose-600 group-data-[selected=true]:text-zinc-200 text-left font-nunito-italic font-extrabold`}
        >
          {title.split("<br/>").map((line, index) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <React.Fragment key={index + 1}>
                {line}
                {title.length > 1 || title.includes("<br/>") ? <br /> : ""}
              </React.Fragment>
            );
          })}
        </h1>
        <p
          className={`text-zinc-900 group-data-[selected=true]:text-zinc-300 ${isBig ? "text-2xl sm:text-3xl md:text-4xl font-normal" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold"} font-nunito pb-4 sm:pb-7`}
        >
          {description.split("<br/>").map((line, index) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <React.Fragment key={index + 1}>
                {line}
                {description.length > 1 && <br />}
              </React.Fragment>
            );
          })}
        </p>
      </div>

      <div className="h-full flex items-center justify-center">{children}</div>
    </div>
  );
}

Checkbox.Head = Head;
Checkbox.Body = Body;

export { Checkbox };
