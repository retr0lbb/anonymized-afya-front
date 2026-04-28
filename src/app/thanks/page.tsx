"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlankPage } from "../../components/blank-page";
import toast from "react-hot-toast";
import { Toast } from "../../components/toast/toast-component";
import { CheckCircle } from "lucide-react";

export default function ThanksForCommming() {
  const router = useRouter();

  useEffect(() => {
    async function simulateSurveySuccess() {
      // Simula envio com sucesso
      toast.custom(
        <Toast Icon={<CheckCircle />} title="Pesquisa salva com sucesso" />
      );

      setTimeout(() => {
        console.log("✅ Redirecionando para /");
        router.push("/");
      }, 5000);
    }

    simulateSurveySuccess();
  }, [router]);

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
