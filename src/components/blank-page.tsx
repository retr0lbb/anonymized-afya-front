import type { ReactNode } from "react";
import BackGround from "../assets/retrato.png";
import { twMerge } from "tailwind-merge";

interface BlankPageProps {
  children: ReactNode;
  className?: string;
}

export function BlankPage({ children, className }: BlankPageProps) {
  // In Next.js, importing an image returns an object with a src property
  const bgUrl = typeof BackGround === 'string' ? BackGround : (BackGround as any).src;

  return (
    <main
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={twMerge(
        "w-full min-h-screen flex flex-col justify-center py-22 px-16",
        className
      )}
    >
      {children}
    </main>
  );
}
