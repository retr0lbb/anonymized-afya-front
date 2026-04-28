import { useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";
import { BlankPage } from "./blank.page";
import { useEffect } from "react";
import { useSurveyStore } from "../utils/store";
import buttonIniciar from "../assets/button/buttonIniciar.png";
export function RestPage() {
  const navigate = useNavigate();
  const { resetSurveyData } = useSurveyStore();

  useEffect(() => {
    resetSurveyData();
  }, []);

  return (
    <BlankPage>
      <div
        className="
          flex flex-1 flex-col items-center justify-center relative px-4
          -translate-y-6
        "
      >
        {/* Logo grande */}
        <Logo className="w-[600px] mb-12" srcImage="Afya" />

        {/* Texto grande */}
        <p className="text-white text-4xl md:text-5xl font-semibold mb-16 text-center leading-tight">
          Sua jornada médica<br />começa aqui
        </p>

        {/* Botão hexagonal com as cores do segundo código */}
        <div
          onClick={() => navigate("/ask-medic")}
          className="text-white text-center font-bold font-nunito cursor-pointer transition duration-300 select-none"
          style={{
             backgroundImage:`url(${buttonIniciar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
            fontSize: "1.75rem",
            padding: "1.4rem 5rem",
            // clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
            // boxShadow: `
            //   inset 0 0 14px rgba(43, 43, 43, 0.6),
            //   0 12px 80px 20px rgba(22, 22, 22, 0.8)
            // `,
            width: "fit-content",
            margin: "0 auto",
            // border:"solid 1px red",
            fontFamily: "Nunito, sans-serif",
          }}
          // onMouseEnter={(e) => {
          //   e.currentTarget.style.transform = "translateY(-2px)";
          //   e.currentTarget.style.boxShadow = `
          //     inset 0 0 16px rgba(43, 43, 43, 0.7),
          //     0 12px 120px rgba(22, 22, 22, 0.4)
          //   `;
          // }}
          // onMouseLeave={(e) => {
          //   e.currentTarget.style.transform = "translateY(0)";
          //   e.currentTarget.style.boxShadow = `
          //     inset 0 0 14px rgba(43, 43, 43, 0.6),
          //     0 9px 100px rgba(22, 22, 22, 0.3)
          //   `;
          // }}
        >
          Toque para iniciar!
        </div>
      </div>
      {/* arrumar colocar o quase la
      arrumar o teste de botoes todos vermelhos e quando n acerta todo
      arrumar ver esse negocio de id do usuario n encontrado
      arrumar todos os botoes
      arrumar ver todas as possibilidades que eram respostas (que traz imagens no lugar de texto) e ver se as cores estao corretas */}
    </BlankPage>
  );
}
