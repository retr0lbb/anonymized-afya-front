import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlankPage } from "./blank.page";
import toast from "react-hot-toast";
import { Toast } from "../components/toast/toast-component";
import { CheckCircle } from "lucide-react";

export function ThanksForCommming() {
  const navigate = useNavigate();

  useEffect(() => {
    async function simulateSurveySuccess() {
      // Simula envio com sucesso
      toast.custom(
        <Toast Icon={<CheckCircle />} title="Pesquisa salva com sucesso" />
      );

      setTimeout(() => {
        console.log("✅ Redirecionando para /rest");
        navigate("/");
      }, 5000);
    }

    simulateSurveySuccess();
  }, [navigate]);

  return (
    <BlankPage>
     <div className="flex flex-1 items-center justify-center">
  <h1 className="text-zinc-200 text-center font-nunito-italic leading-none">
    <span className="block text-[12rem] font-bold">Obrigada</span>
    <span className="block text-[7rem] font-normal">por participar!</span>
  </h1>
</div>

    </BlankPage>
  );
}
