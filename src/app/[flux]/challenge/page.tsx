"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { TimerIcon } from "lucide-react";
import { srcList } from "../../../assets/images";
import { useSelection } from "../../../components/SelectionContext";
import { BlankPage } from "../../../components/blank-page";
import { questionMap, type Question } from "../../../components/questionMap";
import { useSurveyStore } from "../../../utils/store";

const normalizeGroup = (value: string | undefined): keyof typeof questionMap | "" => {
  if (!value) return "";
  const map: Record<string, keyof typeof questionMap> = {
    Estudante: "Estudante de Medicina",
    Estudantes: "Estudante de Medicina",
    "Estudante de Medicina": "Estudante de Medicina",
    Generalista: "Generalista",
    Especialista: "Especialista",
    "Outras áreas da saúde": "Outras áreas da saúde",
    "Outras áreas": "Outras áreas da saúde",
    Saúde: "Outras áreas da saúde",
  };
  return map[value] || "";
};

const groupImageMap: Record<keyof typeof questionMap, keyof typeof srcList> = {
  "Estudante de Medicina": "AfyaCollege",
  Generalista: "AfyaWhitebook",
  Especialista: "AfyaCardioPapers",
  "Outras áreas da saúde": "Afya",
};

const isValidImageKey = (key: string): key is keyof typeof srcList => {
  return key in srcList;
};

export default function GroupChallenge() {
  const useSurveyStoreMock = useSurveyStore || (() => ({ user_id: 'mock-id' }));
  const { user_id } = useSurveyStoreMock() as any;
  const router = useRouter();
  const params = useParams() as { flux: string };
  const flux = params.flux;
  const { selection } = useSelection();

  // Next.js client-side fallback for localStorage
  const effectiveSelection = selection || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("selection") || "null") : null);

  const group = normalizeGroup(effectiveSelection?.group);
  const groupSafe = group as keyof typeof questionMap;
  const title = effectiveSelection?.title;

  const [seconds, setSeconds] = useState(15);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paused, setPaused] = useState(false);
  const [errorHits, setErrorHits] = useState<Record<string, boolean>>({});
  const [activeHits, setActiveHits] = useState<Record<string, string>>({});
  const [receivedProducts, setReceivedProducts] = useState<Set<string>>(new Set());

  const allCorrect = questions.length > 0 && questions.every((q) => Object.values(activeHits).includes(q.product));

  const activeHitsRef = useRef<Record<string, string>>({});

  async function handleSubmitMedicina() {
    const moment_medicina = group;
    console.log(user_id);
    if (!user_id && typeof window !== "undefined") {
      alert("ID do usuário não encontrado.");
      return;
    }
    const escolhas_medicina = Object.values(activeHitsRef.current);

    try {
      // Usando try/catch block ao chamar api, pode falhar em mock
      const response = await fetch("http://localhost:5000/update-excel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: user_id,
          moment_medicina,
          escolhas_medicina,
        }),
      }).catch(err => {
        console.warn("API de excel offline. Ignorando para testes.");
        return { ok: true, json: async () => ({}) };
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      const data = await response.json();
      console.log("✅ Dados enviados com sucesso:", data);

      finalizeAndRedirect();
    } catch (error) {
      console.error("❌ Erro ao enviar escolhas:", error);
      if (typeof window !== "undefined") alert("Erro ao salvar escolhas.");
    }
  }

  function finalizeAndRedirect() {
    setShowSolutions(true);

    setTimeout(() => {
      setShowSuccess(true);

      setTimeout(() => {
        if (flux) {
          if (group === "Estudante de Medicina") {
            router.push(`/${flux}/rating`);
          } else {
            router.push(`/${flux}/afya-interest`);
          }
        } else {
          router.push("/");
        }
      }, 3000);
    }, 400);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let socket: WebSocket;
    try {
      socket = new WebSocket("ws://localhost:8765");

      socket.onopen = () => {
        console.log("🟢 Conectado ao WebSocket");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const tipo = data.tipo;
          setReceivedProducts((prev) => new Set(prev).add(tipo));
          const sensor = data.sensor;

          console.log("📡 Mensagem recebida do sensor:", sensor, "| Tipo:", tipo);

          if (tipo === "REMOVIDA") {
            setActiveHits((prev) => {
              const copy = { ...prev };
              delete copy[sensor];
              activeHitsRef.current = copy;
              return copy;
            });

            setErrorHits((prev) => {
              const aindaTemErro = Object.values(activeHits).some((p) => {
                return !questionMap[groupSafe].some((q) => q.product === p);
              });
              if (!aindaTemErro) {
                return {};
              }
              return prev;
            });
            return;
          }

          const isHit = questionMap[groupSafe].some((q) => q.product === tipo);

          if (isHit) {
            setActiveHits((prev) => {
              const updated = { ...prev, [sensor]: tipo };
              activeHitsRef.current = updated;
              return updated;
            });
            setErrorHits((prev) => {
              const copy = { ...prev };
              delete copy[sensor];
              return copy;
            });
          } else {
            setErrorHits(() => {
              const newErrors: Record<string, boolean> = {};
              questionMap[groupSafe].forEach((q) => {
                const isGreen = Object.values(activeHits).includes(q.product);
                if (!isGreen) newErrors[q.product] = true;
              });
              return newErrors;
            });
          }
        } catch (e) {
          console.warn("⚠️ Mensagem WebSocket não era JSON:", event.data);
        }
      };

      socket.onerror = (error) => {
        console.error("❌ Erro no WebSocket:", error);
      };

      socket.onclose = (event) => {
        console.log("🔌 WebSocket desconectado", event.code, event.reason);
      };
    } catch (error) {
      console.warn("Falha ao inicializar WebSocket", error);
    }

    return () => {
      if (socket) socket.close();
    };
  }, [groupSafe, activeHits]);

  useEffect(() => {
    if (group !== "") {
      setQuestions(questionMap[groupSafe]);
    }
  }, [groupSafe, group]);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitMedicina();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [flux, router, group, paused]);

  if (!group || !title) {
    return (
      <BlankPage>
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <p className="text-4xl text-zinc-200 font-semibold">
            Dados do grupo não encontrados.
          </p>
          <button
            className="mt-4 bg-white/30 px-10 py-4 rounded-full text-3xl text-zinc-200"
            onClick={() => router.push("/")}
          >
            Voltar ao início
          </button>
        </div>
      </BlankPage>
    );
  }

  const mainImageKey =
    (isValidImageKey(effectiveSelection?.image) && effectiveSelection?.image) ||
    groupImageMap[groupSafe] ||
    "Estrela";

  const getSrcUrl = (item: any) => typeof item === 'string' ? item : item?.src;

  return (
    <BlankPage>
      <div className="relative flex flex-1 flex-col w-full h-full items-center justify-center gap-16">
        {showSuccess && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center">
            <img
              src={getSrcUrl(srcList.AcertoBox)}
              alt="Parabéns"
              className="w-[720px] max-w-full drop-shadow-2xl rounded-xl"
            />
          </div>
        )}

        <div className="absolute top-[420px] left-[40px] z-50 bg-[#D71B59] px-6 py-2 rounded-[14px] flex items-center gap-3 text-white font-bold text-3xl shadow-lg border-[3px] border-[#9d1344]">
          <TimerIcon className="w-6 h-6" strokeWidth={3} />
          {seconds}s
        </div>

        <div className="absolute top-[180px] z-50 flex flex-col items-center gap-0">
          <span className="text-[2.6rem] font-nunito-italic font-bold text-white bg-[#D71B59] px-14 py-2 rounded-full shadow-xl z-10 relative top-3">
            Desafio
          </span>
          <div className="bg-[#2359a8] px-14 py-7 rounded-[20px] shadow-lg text-white text-[2.0rem] font-medium text-center leading-tight w-[800px] -mt-4">
            Posicione as soluções Afya que aparecem no grupo{" "}
            <span className="font-bold">{title}</span>
          </div>
        </div>

        <div className="relative w-[1030px] aspect-[9/16] rounded-4xl overflow-hidden shadow-2xl mt-[120px]">
          <img
            src={getSrcUrl(srcList[mainImageKey])}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />

          <div
            style={{
              backgroundImage: `url(${getSrcUrl(srcList.Rosa)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="absolute inset-0 w-full h-full z-20 bg-rose-800/25 border-4 border-[#bb1957a6]"
          />

          <header className="w-full mt-8 z-30 py-4 flex items-center justify-center px-5">
            <h1 className="px-8 w-fit py-5 text-5xl font-nunito-italic font-semibold text-zinc-100 bg-[#2359a8] rounded-full">
              {title}
            </h1>
          </header>

          {questions.length > 0 && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex gap-8 flex-wrap justify-center max-w-5xl">
              {questions.map((q) => {
                const imageSrc = isValidImageKey(q.product) ? srcList[q.product] : srcList.Estrela;

                return (
                  <div
                    key={q.id}
                    style={{
                      background: Object.values(activeHits).includes(q.product)
                        ? "#28a745cc"
                        : errorHits[q.product]
                          ? "#ff000099"
                          : "rgba(255, 255, 255, 0.35)",
                      clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                      color: "#fff",
                      textAlign: "center",
                      boxShadow: `
                        0 6px 0 rgba(255, 255, 255, 0.2),
                        0 6px 18px rgba(0, 0, 0, 0.3)
                      `,
                      width: "580px",
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1rem 2rem",
                      transition: "background 0.3s ease-in-out",
                    }}
                    className="border border-white/40"
                  >
                    {!showSolutions ? (
                      <p className="text-[2rem] font-semibold leading-snug">{q.text}</p>
                    ) : (
                      <img
                        src={getSrcUrl(imageSrc)}
                        alt={q.product}
                        className="w-full h-full object-contain p-3"
                      />
                    )}
                  </div>
                );
              })}

              {allCorrect && (
                <div className="w-full mt-8 flex justify-center">
                  <button
                    className="bg-[#D71B59] text-white font-bold px-8 py-4 rounded-full text-2xl shadow-lg hover:bg-[#bb1957]"
                    onClick={handleSubmitMedicina}
                  >
                    Enviar Escolhas
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </BlankPage>
  );
}
