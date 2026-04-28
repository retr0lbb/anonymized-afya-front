import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BlankPage } from "./blank.page";

export function InterestInAfya() {
  const navigate = useNavigate();
  const { flux } = useParams();

  // Proteção: só médicos acessam essa tela
  useEffect(() => {
    if (flux !== "medic") {
      navigate("/");
    }
  }, [flux, navigate]);

  const handleYes = () => {
    navigate(`/${flux}/interest-areas`);
  };

  const handleNo = () => {
    navigate(`/${flux}/rating`);
  };

  return (
    <BlankPage>
      <div
        className="flex flex-col w-full items-center justify-start gap-16 px-4 text-center"
        style={{
          minHeight: "100vh",
          paddingTop: "15vh",
        }}
      >
        <p className="text-white font-nunito text-[3.7rem] leading-snug text-center whitespace-pre-line">
          Já pensou em fazer{'\n'}
          parte da Afya e contribuir{'\n'}
          com a transformação da{'\n'}
          medicina no Brasil?
        </p>

        <div className="flex flex-nowrap justify-center gap-12 w-full">
          <button
            onClick={handleYes}
            className="text-white font-semibold transition duration-300 shadow-lg leading-tight flex items-center justify-center text-center flex-shrink-0"
            style={{
              background: "rgba(234, 24, 169, 0.4)",
              fontSize: "3rem",
              padding: "2rem",
              minHeight: "620px",
              minWidth: "400px",
              clipPath: "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
              cursor: "pointer",
              border: "none",
              textTransform: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(240, 53, 181, 1)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(233, 105, 192, 0.8)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
            }}
          >
            SIM
          </button>

          <button
            onClick={handleNo}
            className="text-white font-semibold transition duration-300 shadow-lg leading-tight flex items-center justify-center text-center flex-shrink-0"
            style={{
              background: "rgba(234, 24, 169, 0.4)",
              fontSize: "3rem",
              padding: "2rem",
              minHeight: "620px",
              minWidth: "400px",
              clipPath: "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
              cursor: "pointer",
              border: "none",
              textTransform: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(234, 24, 169, 1)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(234, 24, 169, 0.8)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
            }}
          >
            NÃO
          </button>
        </div>
      </div>
    </BlankPage>
  );
}
