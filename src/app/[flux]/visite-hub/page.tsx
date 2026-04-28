"use client";

import { useRouter, useParams } from "next/navigation";
import { BlankPage } from "../../../components/blank-page";
import { ChevronRight } from "lucide-react";

export default function VisiteHub() {
  const router = useRouter();
  const params = useParams() as { flux: string };
  const flux = params.flux;
  
  return (
    <BlankPage>
      <div className="flex flex-1 w-full items-center justify-center flex-col gap-2 text-center">
        <p className="text-zinc-200 font-light font-nunito text-7xl">
          Para conhecer um pouco mais da solução escolhida por você,
        </p>
        <p className="text-zinc-200 font-nunito-italic font-extrabold text-7xl text-center">
          visite nosso café,
          <br /> fale com o time
          <br /> comercial e aproveite descontos exclusivos.
        </p>

        <button
          className="bg-white/30 px-14 py-6 mb-4 rounded-full flex items-center justify-center mt-20 transition-all hover:bg-white/40 hover:scale-105"
          type="reset"
          onClick={() => {
            router.push(`/${flux}/rating`);
          }}
        >
          <p className="text-5xl px-5 pb-2 text-zinc-200 font-semibold text-center items-center">
            Avançar
          </p>
          <ChevronRight size={58} strokeWidth={3} className="text-zinc-100" />
        </button>
      </div>
    </BlankPage>
  );
}
