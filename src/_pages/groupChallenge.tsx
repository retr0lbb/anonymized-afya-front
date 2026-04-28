import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TimerIcon } from "lucide-react";
import { srcList } from "../assets/images_challenge";
import { useSelection } from "../components/SelectionContext";
import { BlankPage } from "../pages/blank.page";
import { questionMap, type Question } from "../components/questionMap";
import { useSurveyStore } from "../utils/store"; // ou o caminho real do seu store
import { useRef } from "react";
import { baseURL } from "../api/api";
import buttonBg100 from "../assets/button/button_fundo_challenge_100.png";
import buttonBg90 from "../assets/button/button_fundo_challenge_90.png";
import buttonBg80 from "../assets/button/button_fundo_challenge_80.png";
import buttonBg70 from "../assets/button/button_fundo_challenge_70.png";
import buttonBg60 from "../assets/button/button_fundo_challenge_60.png";
import buttonBg50 from "../assets/button/button_fundo_challenge_50.png";
import buttonBg40 from "../assets/button/button_fundo_challenge_40.png";
import buttonBgError from "../assets/button/botao_vermelho.png";
import buttonBgCorrect from "../assets/button/botao_verde.png";
import { BlankPageChallenge } from "./blank.page_challenge";

const normalizeGroup = (
  value: string | undefined
): keyof typeof questionMap | "" => {
  if (!value) return "";
  const map: Record<string, keyof typeof questionMap> = {
    Estudante: "Estudantes",
    Estudantes: "Estudantes",
    Generalista: "Generalista",
    Especialista: "Especialista",
    "Outras áreas da saúde": "Outras áreas da saúde",
    "Outras áreas": "Outras áreas da saúde",
    Saúde: "Outras áreas da saúde",
  };
  return map[value] || "";
};

const groupImageMap: Record<keyof typeof questionMap, keyof typeof srcList> = {
  Estudantes: "AfyaCollege",
  Generalista: "AfyaWhitebook",
  Especialista: "AfyaCardioPapers",
  "Outras áreas da saúde": "Afya",
};

const isValidImageKey = (key: string): key is keyof typeof srcList => {
  return key in srcList;
};

export function GroupChallenge() {
  const { user_id } = useSurveyStore();
  const backgroundList = [
    buttonBg100,
    buttonBg80,
    buttonBg70,
    buttonBg60,
    buttonBg40,
    buttonBg40,
    buttonBg40,
  ];
  const navigate = useNavigate();
  const { flux } = useParams();
  const { selection } = useSelection();

  const effectiveSelection =
    selection || JSON.parse(localStorage.getItem("selection") || "null");
  const titleRaw = effectiveSelection?.title;
  const title = titleRaw === "Estudante de Medicina" ? "Estudantes" : titleRaw;
  const group = normalizeGroup(effectiveSelection?.group);
  const groupSafe = group as keyof typeof questionMap;

  const [seconds, setSeconds] = useState(15);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ mostrar imagem

  const [paused, setPaused] = useState(true);

  const [lastHit, setLastHit] = useState<string | null>(null);
  const [errorHits, setErrorHits] = useState<Record<string, boolean>>({});
  const [activeHits, setActiveHits] = useState<Record<string, string>>({});

  const [receivedProducts, setReceivedProducts] = useState<Set<string>>(
    new Set()
  );

  const allCorrect = questions.every((q) =>
    Object.values(activeHits).includes(q.product)
  );

  const activeHitsRef = useRef<Record<string, string>>({});

  async function handleSubmitMedicina() {
    const moment_medicina = group;
    if (!user_id) {
      alert("ID do usuário não encontrado.");
      return;
    }
    const escolhas_medicina = Object.values(activeHitsRef.current);

    try {
      const response = await fetch(`${baseURL}/update-excel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_id: user_id,
          moment_medicina,
          escolhas_medicina,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");

      const data = await response.json();
      console.log("✅ Dados enviados com sucesso:", data);

      finalizeAndRedirect();
    } catch (error) {
      console.error("❌ Erro ao enviar escolhas:", error);
      alert("Erro ao salvar escolhas.");
    }
  }

  function finalizeAndRedirect() {
    setShowSolutions(true);

    setTimeout(() => {
      setShowSuccess(true);

      setTimeout(() => {
        if (flux) {
          if (group === "Estudantes") {
            navigate(`/${flux}/rating`);
          } else {
            navigate(`/${flux}/afya-interest`);
          }
        } else {
          navigate("/");
        }
      }, 3000);
    }, 400);
  }

  useEffect(() => {
    const socket = new WebSocket("http://127.0.0.1:8765");

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
          // Apaga o verde (se havia algum) do sensor que foi removido
          setActiveHits((prev) => {
            const copy = { ...prev };
            delete copy[sensor];
            activeHitsRef.current = copy;
            return copy;
          });

          // Apaga os vermelhos somente se nenhum sensor ativo está com tag errada
          setErrorHits((prev) => {
            // Verifica se restam tags erradas ativas
            const aindaTemErro = Object.values(activeHits).some((p) => {
              return !questionMap[groupSafe].some((q) => q.product === p);
            });

            // Se nenhum erro continua, limpa os vermelhos
            if (!aindaTemErro) {
              return {};
            }

            // Se ainda tem erro ativo, mantém os vermelhos
            return prev;
          });

          return;
        }

        const isHit = questionMap[groupSafe].some((q) => q.product === tipo);

        if (isHit) {
          setActiveHits((prev) => {
            const updated = { ...prev, [sensor]: tipo };
            activeHitsRef.current = updated; // ✅ atualiza o ref aqui também!
            return updated;
          });

          setErrorHits((prev) => {
            const copy = { ...prev };
            delete copy[sensor]; // limpa erro se existir
            return copy;
          });
        } else {
          // ❌ Erro: marca todos hexágonos que não estão verdes
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

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (group !== "") {
      setQuestions(questionMap[groupSafe]);
    }
  }, [groupSafe]);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitMedicina(); // o handle já chama o redirect
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [flux, navigate, group, paused]); // ✅ inclua paused como dependência

  if (!group || !title) {
    return (
      <BlankPage>
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <p className="text-4xl text-zinc-200 font-semibold">
            Dados do grupo não encontrados.
          </p>
          <button
            className="mt-4 bg-white/30 px-10 py-4 rounded-full text-3xl text-zinc-200"
            onClick={() => navigate("/")}
          >
            Voltar ao início
          </button>
        </div>
      </BlankPage>
    );
  }

  const mainImageKey = ((isValidImageKey(effectiveSelection?.image) &&
    effectiveSelection?.image) ||
    groupImageMap[groupSafe] ||
    "Estrela") as keyof typeof srcList;

  return (
    <BlankPageChallenge>
      <div className="relative flex  flex-1 flex-col w-[full] h-full items-center justify-center gap-16 rounded-[30px] mt-20">
        {/* ✅ Parabéns sem fundo escuro */}
        {showSuccess && (
          <div
            className="absolute inset-0 z-[100] flex items-center justify-center "
            // style={{border:"solid 10px red"}}
          >
            <img
              src={srcList.AcertoBox}
              alt="Parabéns"
              className="w-[720px] max-w-full drop-shadow-2xl rounded-xl"
              style={{ transform: "translateY(-200px)" }}
            />
          </div>
        )}

        {/* ⏱️ Contador */}
        {/* arrumar */}
        <div
          className={`absolute top-[12.5vh] ${
            title === "Outras áreas da saúde" ? "left-[6.7vh]" : "left-[8.2vh]"
          } z-50 bg-[#D71B59] px-6 py-2 rounded-[14px] flex items-center gap-3
    text-white font-bold text-[2vh] shadow-lg`}
        >
          <TimerIcon className="w-8 h-8" strokeWidth={3} />
          {seconds}s
        </div>

        {/* Bloco do desafio */}
        <div className="absolute top-[-0.5vh] z-50 flex flex-col items-center gap-0">
          <span className="text-[2.1rem]  font-nunito font-bold text-white bg-[#D71B59] px-14 py-0.5 rounded-full shadow-xl z-10 relative top-9">
            Desafio
          </span>
          <div
            className={`bg-[#2359a8] ${
              title === "Outras áreas da saúde"
                ? "px-3 text-[2.4rem] w-[850px]"
                : "px-6 text-[2.8rem] w-[800px]"
            } py-3 rounded-[20px] shadow-lg
    text-white text-[2.8rem] text-center leading-none w-[800px]
    font-nunito mt-7`}
          >
            {title === "Outras áreas da saúde" ? (
              <span>
                Posicione as soluções Afya que aparecem em{" "}
                <span className="font-bold">Outras Áreas da Medicina</span>
              </span>
            ) : (
              <>
                Posicione as soluções Afya que aparecem no grupo{" "}
                <span className="font-bold">{title}</span>
              </>
            )}
          </div>
        </div>

        {/* Imagem central com overlay rosa */}
        <div
          className="relative w-[950px] aspect-[8/16] rounded-4xl overflow-hidden shadow-2xl "
          style={{
            // border: "solid 10px blue",
            backgroundImage: `url(${srcList[mainImageKey]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <img
            src={srcList[mainImageKey]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover z-10"
          /> */}

          <div
            style={{
              backgroundImage: `url(${srcList.Rosa})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="absolute inset-0 w-full h-[full] rounded-4xl z-20 bg-rose-800/25 border-4 border-[#bb1957a6]"
          />

          {/* <header className="w-full mt-8 z-30 py-4 flex items-center justify-center px-5">
            <h1 className="px-8 w-fit py-5 text-5xl font-nunito-italic font-semibold text-zinc-100 bg-[#2359a8] rounded-full">
              {title}
            </h1>
          </header> */}

          <div className="flex flex-wrap gap-3 justify-center max-w-5xl font-nunito mt-10">
            {(questions.length > 0 || showSolutions) && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2 flex-wrap justify-center max-w-5xl font-nunito ">
                {questions.map((q, index) => {
                  const imageSrc = isValidImageKey(q.product)
                    ? srcList[q.product]
                    : srcList.Estrela;

                  const defaultBg = backgroundList[index] || buttonBg100;

                  const backgroundImage = Object.values(activeHits).includes(
                    q.product
                  )
                    ? `url(${buttonBgCorrect})`
                    : errorHits[q.product]
                    ? `url(${buttonBgError})`
                    : `url(${defaultBg})`;

                  return (
                    <div
                      key={q.id}
                      style={{
                        backgroundImage,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        color: "#fff",
                        textAlign: "center",
                        fontFamily: "Nunito",
                        width: "35vh",
                        height: showSolutions ? "140px" : "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: showSolutions ? "0.5rem" : "4.5rem 4rem",
                        transition: "all 0.3s ease-in-out",
                        transform: "translateY(-50px)",
                      }}
                    >
                      {!showSolutions ? (
                        <p className="text-[2vh] font-semibold leading-snug">
                          {q.text}
                        </p>
                      ) : (
                        <img
                          src={imageSrc}
                          alt={q.product}
                          className="max-w-[80%] max-h-[80%] object-contain"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Botão AVANÇAR separado */}
      <div className="w-full flex justify-center  z-50">
        <button
          onClick={handleSubmitMedicina}
          disabled={!allCorrect}
          className="text-white font-bold text-2xl transition-colors cursor-pointer"
          style={{
            background: allCorrect ? "#2359a8" : "rgba(255, 255, 255, 0.4)",
            color: allCorrect ? "#fff" : "#fff",
            clipPath:
              "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
            fontFamily: "Nunito",
            width: "25vh",
            height: "1vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3.8rem 4rem",
            fontSize: "3rem",
            boxShadow:
              "0 0 0 12px #e2156d, 0 6px 0 rgba(255, 255, 255, 0.2), 0 6px 18px rgba(0, 0, 0, 0.3)",
            transition: "background 0.3s ease-in-out",
            transform: "translateY(-63px)",
          }}
        >
          AVANÇAR
        </button>
      </div>
    </BlankPageChallenge>
  );
}
