import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { BlankPage } from "./blank.page";
import { srcList } from "../assets/images";

export function InterestAreasPage() {
  const navigate = useNavigate();
  const { flux } = useParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [noInterest, setNoInterest] = useState(false);

  const options = [
    { id: "docencia", label: "Docência", image: srcList.Pessoa7 },
    { id: "conteudista", label: "Conteudista", image: srcList.Pessoa8 },
    { id: "preceptor", label: "Preceptor", image: srcList.Pessoa9 },
  ];

  const toggleOption = (id: string) => {
    setNoInterest(false);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    console.log("Selecionado:", noInterest ? "Nenhum interesse" : selected);
    localStorage.setItem("interest-areas", JSON.stringify(noInterest ? [] : selected));
    navigate(`/${flux}/team`);
  };

  return (
    <BlankPage>
      <div className="flex flex-col items-center gap-10 py-12 px-4 text-white font-nunito">
        <h1 className="text-6xl font-bold text-center leading-snug">
          Selecione as áreas com <br /> as quais gostaria de atuar:
        </h1>

        <div className="flex flex-col gap-1">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`cursor-pointer overflow-hidden shadow-2xl border-4 rounded-xl transition-all duration-200 ${
                selected.includes(opt.id) ? "border-[#D71B59]" : "border-transparent"
              }`}
            >
              <div className="relative w-[860px] h-[390px]">
                <img
                  src={opt.image}
                  alt={opt.label}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-16 right-0 px-5 py-20 rounded-b-xl">
                  <p className="text-white text-7xl font-semibold italic drop-shadow-md">
                    {opt.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setSelected([]);
            setNoInterest(true);
            navigate(`/${flux}/rating`);
          }}
          className={`mt-6 text-5xl px-8 py-4 rounded-full border border-white text-white transition-all ${
            noInterest ? "bg-white/20 font-bold" : "bg-transparent"
          }`}
        >
          Não tenho interesse nessas áreas
        </button>

        {/* HEXAGONAL CONFIRM BUTTON */}
        <div
          onClick={confirm}
          className="mt-12 cursor-pointer"
          style={{
            background: "rgba(207, 119, 187, 0.25)",
            fontSize: "3.5rem",
            padding: "4rem 2.8rem", // Altura aumentada
            clipPath:
              "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Nunito",
            boxShadow: `
              inset 0 0 14px rgba(43, 43, 43, 0.6),
              0 9px 100px rgba(22, 22, 22, 0.3)
            `,
            border: "none",
            width: "585px",
            margin: "0 auto",
          }}
        >
          Confirmar
        </div>
      </div>
    </BlankPage>
  );
}
