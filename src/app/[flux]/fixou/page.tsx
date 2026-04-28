"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import fixouGif from "../../../assets/fixou.gif";
import { useSelection } from "../../../components/SelectionContext";

export default function FixouPage() {
  const router = useRouter();
  const params = useParams() as { flux: string };
  const flux = params.flux;
  const [canClick, setCanClick] = useState(false);

  useSelection(); // Contexto global mantido

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  const gifSrc = typeof fixouGif === 'string' ? fixouGif : (fixouGif as any).src;

  return (
    <div
      onClick={() => {
        if (canClick) {
          router.push(`/${flux}/challenge`);
        }
      }}
      className={`w-screen h-screen bg-black flex items-center justify-center ${canClick ? "cursor-pointer" : "cursor-default"
        }`}
    >
      <img
        src={gifSrc}
        alt="Fixou as soluções"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
