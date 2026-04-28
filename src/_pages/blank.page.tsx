import type { ReactNode } from "react";
import BackGround from "../assets/retrato.png";
import { twMerge } from "tailwind-merge";

interface BlankPageProps {
  children: ReactNode;
  className?: string;
}

export function BlankPage({ children, className }: BlankPageProps) {
  return (
    <main
      style={{
        backgroundImage: `url(${BackGround})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
       
      }}
      className={twMerge(
        "w-full h-full flex overflow-hidden flex-col justify-center py-22 px-16 ",
        className
      )}
    >
      {children}
    </main>
  );
}
