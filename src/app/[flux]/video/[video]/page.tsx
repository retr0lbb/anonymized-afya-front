"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelection } from "../../../../components/SelectionContext";
import { questionMap } from "../../../../components/questionMap";

// 🎥 Vídeos
// import estudantesVideo from "../../../../../assets/ESTUDANTE.mp4";
// import generalistaVideo from "../../../../../assets/GENERALISTA.mp4";
// import especialistaVideo from "../../../../../assets/ESPECIALISTA.mp4";
// import outrasAreasVideo from "../../../../../assets/OUTRAS.mp4";

// TODO deixar esses videos na pasta public e acessar via URL

export default function VideoPage() {
  const router = useRouter();
  const params = useParams() as { video: string; flux: string };
  const { video, flux } = params;
  const { selection, setSelection } = useSelection();

  // 🔁 Mapeia o grupo (rota) para o valor correto do questionMap
  // const normalizeGroup = (value: string): keyof typeof questionMap => {
  //   const map: Record<string, keyof typeof questionMap> = {
  //     estudantes: "Estudante de Medicina", // Ajustado para match com questionMap original
  //     generalista: "Generalista",
  //     especialista: "Especialista",
  //     "outras-areas-da-saude": "Outras áreas da saúde",
  //   };
  //   return map[value] ?? "Generalista"; // fallback
  // };

  // ✅ Salva a seleção no contexto
  // useEffect(() => {
  //   if (selection?.group && selection?.title) {
  //     // Se já tivermos a selection no context (puxado do localStorage), garantimos a tipagem
  //     const normalizedGroup = normalizeGroup(selection.group);
  //     if (selection.group !== normalizedGroup) {
  //       setSelection({
  //         group: normalizedGroup,
  //         title: selection.title,
  //         flux: flux ?? "common",
  //         image: selection.image ?? "Pessoa5",
  //       });
  //     }
  //   }
  // }, [selection, setSelection, flux]);

  // 📼 Escolhe vídeo com base no param da rota
  // const videoMap: Record<string, any> = {
  //   estudantes: estudantesVideo,
  //   generalista: generalistaVideo,
  //   especialista: especialistaVideo,
  //   "outras-areas-da-saude": outrasAreasVideo,
  // };

  // const videoAsset = videoMap[video ?? ""];
  // const videoSrc = typeof videoAsset === 'string' ? videoAsset : videoAsset?.src;

  // if (!videoSrc) {
  //   return (
  //     <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-3xl">
  //       Vídeo não encontrado.
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-screen h-screen bg-black">
      <video
        controls
        autoPlay
        className="w-full h-full object-cover"
        onEnded={() => {
          if (flux) {
            router.push(`/${flux}/fixou`);
          } else {
            router.push("/fixou");
          }
        }}
      >
        Seu navegador não suporta vídeo.
      </video>
    </div>
  );
}
