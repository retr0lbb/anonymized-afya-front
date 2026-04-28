// components/group-card.tsx

import React from "react";
import { type SrcListKeys, srcList } from "../assets/images";

interface GroupCardProps {
  title: string;
  src: SrcListKeys;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function GroupCard({ title, src, children, onClick }: GroupCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-between w-[700px] aspect-[9/16] shrink-0 rounded-4xl overflow-hidden shadow-2xl cursor-pointer transition-transform hover:scale-95"
    >
      {/* Imagem de fundo */}
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
      <header className="w-full mt-8 z-30 py-4 flex items-center justify-center px-5">
        <h1 className="px-8 w-fit py-5 text-5xl font-nunito-italic font-semibold text-zinc-100 bg-[#2359a8] rounded-full">
          {title}
        </h1>
      </header>

      {/* Conteúdo extra */}
      <div className="flex flex-col justify-end w-full z-30 pb-6">
        {children}
      </div>
    </div>
  );
}