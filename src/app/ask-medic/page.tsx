"use client";

import { useRouter } from "next/navigation";
import { BlankPage } from "../../components/blank-page";
import { useSelection } from "../../components/SelectionContext";
import type { Selection } from "../../components/SelectionContext";
import button from "../../assets/button/medico_estudante.png";

// In Next.js, importing an image returns an object with a src property
const btnBgUrl = typeof button === 'string' ? button : (button as any).src;

export default function AskIfIsMedic() {
  const router = useRouter();
  const { setSelection } = useSelection();

  const handleSelect = (selection: Selection) => {
    setSelection(selection);
    localStorage.setItem("selection", JSON.stringify(selection));
    router.push(`/${selection.flux}/register`);
  };

  return (
    <BlankPage>
      <div className="flex flex-col flex-1 w-full items-center justify-center gap-16 overflow-x-auto">
        <div className="flex flex-nowrap justify-center gap-12 px-4 w-full">
          {/* Botão Médico */}
          <button
            onClick={() =>
              handleSelect({
                flux: "medic",
                group: "Generalista",
                title: "Médico Generalista",
                image: "Pessoa2",
              })
            }
            className="text-white font-nunito transition duration-300 shadow-lg leading-tight flex items-center justify-center text-center flex-shrink-0 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              backgroundImage: `url(${btnBgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              fontSize: "3rem",
              padding: "2rem",
              minHeight: "620px",
              minWidth: "400px",
              clipPath:
                "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
              cursor: "pointer",
              border: "none",
              textTransform: "none",
            }}
          >
            Médico
          </button>

          {/* Botão Estudante */}
          <button
            onClick={() =>
              handleSelect({
                flux: "common",
                group: "Estudantes",
                title: "Estudantes",
                image: "Pessoa5",
              })
            }
            className="text-white font-nunito transition duration-300 shadow-lg leading-tight flex items-center justify-center text-center flex-shrink-0 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              backgroundImage: `url(${btnBgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              fontSize: "3rem",
              padding: "2rem",
              minHeight: "620px",
              minWidth: "400px",
              clipPath:
                "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
              cursor: "pointer",
              border: "none",
              textTransform: "none",
              whiteSpace: "pre-wrap",
            }}
          >
            Estudante{"\n"}de Medicina
          </button>
        </div>
      </div>
    </BlankPage>
  );
}
