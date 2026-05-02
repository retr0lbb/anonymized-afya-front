import React from "react";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { TouchScreen, type SrcListKeys, srcList } from "../assets/images";

interface CarouselProps {
  children: ReactNode;
  current: number;
  previous: () => void;
  next: () => void;
}

function Carousel({ children, current, next, previous }: CarouselProps) {
  const slides = React.Children.toArray(children);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex flex-row transition-transform ease-in-out duration-500 gap-4 sm:gap-6 md:gap-10"
        style={{ transform: `translateX(calc(-${current} * (min(700px, 85vw) + 40px)))` }}
      >
        {children}
      </div>

      <div className="absolute inset-y-0 left-[-20px] right-[-20px] sm:left-[-40px] sm:right-[-40px] flex items-center justify-between pointer-events-none">
        <button
          className={`pointer-events-auto rounded-full big-shaddow size-14 sm:size-18 md:size-24 bg-zinc-200 text-pink-800 ${current === 0 ? "scale-0" : "flex"} items-center justify-center`}
          type="button"
          onClick={_ => {
            previous();
          }}
        >
          <ChevronLeft size={52} strokeWidth={4} className="size-8 sm:size-10 md:size-13" />
        </button>
        <button
          className={`pointer-events-auto rounded-full big-shaddow size-14 sm:size-18 md:size-24 bg-zinc-200 text-pink-800 ${current === slides.length - 1 ? "scale-0" : "flex"} items-center justify-center`}
          type="button"
          onClick={_ => {
            next();
          }}
        >
          <ChevronLeft size={52} strokeWidth={4} className="rotate-180 size-8 sm:size-10 md:size-13" />
        </button>
      </div>
    </div>
  );
}

interface SlideProps {
  title: string;
  src: SrcListKeys;
  children: ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}

function Slide({ title, children, isSelected, src, onClick }: SlideProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-between z-10 w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[700px] aspect-[9/16] shrink-0 rounded-4xl overflow-hidden shadow-2xl cursor-pointer ${isSelected ? "scale-100" : "scale-90 opacity-80"
        } transition-transform`}
    >
      {/* Imagem de fundo preenchendo tudo */}
      <img
        src={srcList[src]}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Overlay rosa */}
      <div
        style={{
          backgroundImage: `url(${srcList.Rosa})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="absolute inset-0 w-full h-full z-20 bg-rose-800/25 border-4 border-[#bb1957a6]"
      />

      {/* Título */}
      <header className="w-full mt-4 sm:mt-6 md:mt-8 z-30 py-2 sm:py-4 flex items-center justify-center px-3 sm:px-5">
        <h1 className="px-4 sm:px-6 md:px-8 w-fit py-2 sm:py-3 md:py-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-nunito-italic font-semibold text-zinc-100 bg-[#2359a8] rounded-full">
          {title}
        </h1>
      </header>

      {/* Children (botão) */}
      <div className="flex flex-col justify-end w-full z-30 pb-4 sm:pb-6">
        {children}
      </div>
    </div>
  );
}


interface LogoWrapperProps {
  children: ReactNode;
}
function LogosWrapper({ children }: LogoWrapperProps) {
  return (
    <div className="w-full z-50 flex flex-1 flex-wrap items-end justify-center content-end gap-2 sm:gap-4">
      {children}
    </div>
  );
}

Carousel.Slide = Slide;
Carousel.Content = LogosWrapper;

export { Carousel };
