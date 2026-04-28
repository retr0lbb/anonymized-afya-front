import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelection } from "../components/SelectionContext";
import { questionMap } from "../components/questionMap";

// 🎥 Vídeos
import estudantesVideo from "../assets/ESTUDANTE.mp4";
import generalistaVideo from "../assets/GENERALISTA.mp4";
import especialistaVideo from "../assets/ESPECIALISTA.mp4";
import outrasAreasVideo from "../assets/OUTRAS.mp4";

export function VideoPage() {
  const { video, flux } = useParams(); // ✅ agora pegamos o flux também
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { group?: string; title?: string; image?: string };
  };
  const { setSelection } = useSelection();

  // 🔁 Mapeia o grupo (rota) para o valor correto do questionMap
  const normalizeGroup = (value: string): keyof typeof questionMap => {
    const map: Record<string, keyof typeof questionMap> = {
      estudantes: "Estudantes",
      generalista: "Generalista",
      especialista: "Especialista",
      "outras-areas-da-saude": "Outras áreas da saúde",
    };
    return map[value] ?? "Generalista"; // fallback
  };

  // ✅ Salva a seleção no contexto, com todos os campos
  useEffect(() => {
    if (state?.group && state?.title) {
      const normalizedGroup = normalizeGroup(state.group);
      setSelection({
        group: normalizedGroup,
        title: state.title,
        flux: flux ?? "common", // fallback
        image: (state.image as keyof typeof import("../assets/images").srcList) ?? "Pessoa5",
      });
    }
  }, [state, setSelection, flux]);

  // 📼 Escolhe vídeo com base no param da rota
  const videoSrc = {
    estudantes: estudantesVideo,
    generalista: generalistaVideo,
    especialista: especialistaVideo,
    "outras-areas-da-saude": outrasAreasVideo,
  }[video ?? ""];

  if (!videoSrc) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-3xl">
        Vídeo não encontrado.
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black">
      <video
        controls
        autoPlay
        className="w-full h-full object-cover"
        onEnded={() => {
          if (flux) {
            navigate(`/${flux}/fixou`);
          } else {
            navigate("/fixou");
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>

      {/* <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 bg-white/20 backdrop-blur-md text-white text-3xl font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition"
      >
        Voltar
      </button> */}
    </div>
  );
}
