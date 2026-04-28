import { useNavigate } from "react-router-dom";
import { BlankPage } from "./blank.page";
import { useSelection } from "../components/SelectionContext";
import type { Selection } from "../components/SelectionContext";
/////arrumar colocar um brilho de fundo
import button from "../assets/button/medico_estudante.png";
export function AskIfIsMedic() {
  const navigate = useNavigate();
  const { setSelection } = useSelection();

  const handleSelect = (selection: Selection) => {
    setSelection(selection);
    localStorage.setItem("selection", JSON.stringify(selection));
    navigate(`/${selection.flux}/register`);
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
            className="text-white font-nunito transition duration-300 shadow-lg leading-tight flex items-center justify-center text-center flex-shrink-0"
            style={{
             backgroundImage:`url(${button})`,
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
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.background = "rgba(234, 24, 169, 1)";
            //   e.currentTarget.style.transform = "translateY(-3px)";
            //   e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.background = "rgba(234, 24, 169, 0.8)";
            //   e.currentTarget.style.transform = "translateY(0)";
            //   e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
            // }}
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
            className="text-white font-nunito transition duration-300 shadow-lg leading-tight flex items-center justify-center text-center flex-shrink-0"
            style={{
               backgroundImage:`url(${button})`,
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
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.background = "rgba(234, 24, 169, 1)";
            //   e.currentTarget.style.transform = "translateY(-3px)";
            //   e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.background = "rgba(234, 24, 169, 0.6)";
            //   e.currentTarget.style.transform = "translateY(0)";
            //   e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
            // }}
          >
            Estudante{"\n"}de Medicina
          </button>
        </div>
      </div>
    </BlankPage>
  );
}
