"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "../../../components/buttons/plain-button";
import { Input } from "../../../components/input";
import { Logo } from "../../../components/logo";
import { BlankPage } from "../../../components/blank-page";
import { Keyboard } from "../../../components/keyboard";
import { useEffect, useRef, useState, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Mock imports that might be missing
// import { createUser } from "../../../api/create-user";
// import { useSurveyStore } from "../../../utils/store";
// import { formatPhone, insertMaskPhone } from "../../../utils/tel-mask";
// import { getNameByCrm } from "../../../api/get-name";
// import { capitalizeName } from "../../../utils/captalize";
import toast from "react-hot-toast";
import { Toast } from "../../../components/toast/toast-component";
import { TriangleAlert } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams() as { flux: string };
  const flux = params.flux;

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [selectionPositionOfFocusedInput, setSelectionPositionOfFocusedInput] = useState(0);
  const keyboardRef = useRef<HTMLDivElement | null>(null);

  // Mock store if not available
  // const updateSurvey = useSurveyStore ? useSurveyStore((state: any) => state.updateSurvey) : (data: any) => console.log('Mock updateSurvey', data);

  const registerDataSchemaValidation = z.object({
    crm: flux === "medic"
      ? z.string().min(1, "CRM obrigatório")
      : z.string().optional(),
    name: z.string().min(1, "Nome obrigatório"),
    tel: z.string().min(14, "Número de telefone obrigatório"),
    email: z.string().email("E-mail inválido").optional(),
    privacy_policy: z.literal(true),
    afya_research: z.boolean().optional(),
  });

  type FormDataValidation = z.infer<typeof registerDataSchemaValidation>;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest("input") && !keyboardRef.current?.contains(target) && target.tagName !== "BUTTON") {
        setFocusedInput(null);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormDataValidation>({
    resolver: zodResolver(registerDataSchemaValidation),
  });

  async function onSubmit(data: FormDataValidation) {
    try {
      const payload = {
        crm: data.crm,
        name: data.name,
        phone: data.tel,
        email: data.email,
        is_doctor: flux === "medic",
        privacy_policy: data.privacy_policy,
        afya_research: data.afya_research ?? false,
      };

      // Mock user creation response if createUser is undefined
      // const response = createUser ? await createUser(payload) : { id: 'mock-id' };

      // if (!response?.id) {
      //   throw new Error("Cadastro inválido. Tente novamente.");
      // }

      // if (updateSurvey) {
      //   updateSurvey({ user_id: response.id });
      // }
      router.push(`/${flux}/hub`);
    } catch (error: any) {
      console.error(error);
      toast.custom(
        <Toast
          Icon={<TriangleAlert />}
          title={`Erro: ${error.message || error}`}
        />
      );
    }
  }

  const phoneValue = watch("tel", "");
  const crm = watch("crm", "");
  const name = watch("name", "");
  const [isLoadingCrm, setIsLoadingCrm] = useState(false);

  // useEffect(() => {
  //   async function getCrmFetch() {
  //     if (!crm) return;
  //     if (flux !== "medic") return;
  //     if (!crm.match(/^\d{2,15}\/[a-zA-Z]{2}$/)) return;

  //     setIsLoadingCrm(true);
  //     try {
  //       if (getNameByCrm) {
  //         const response = await getNameByCrm(crm);
  //         if (response.name) {
  //           setValue("name", response.name as string);
  //           setIsLoadingCrm(false);
  //         }
  //       }
  //     } catch (err: any) {
  //       console.error("Falha ao carregar dados do CRM:", err);
  //     } finally {
  //       setIsLoadingCrm(false);
  //     }
  //   }
  //   getCrmFetch();
  // }, [crm, flux, setValue]);

  return (
    <BlankPage className="h-screen overflow-hidden">
      {focusedInput && (
        <div ref={keyboardRef}>
          {Keyboard && (
            <Keyboard
              activeField={focusedInput}
              value={watch((focusedInput as keyof FormDataValidation) ?? "")}
              setValue={(name: string, value: string) =>
                setValue(name as keyof FormDataValidation, value)
              }
              valueSelectPosition={selectionPositionOfFocusedInput}
              setSelectionPositionOfFocusedInput={(pos: number) =>
                setSelectionPositionOfFocusedInput(pos)
              }
            />
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col py-10 gap-2 overflow-hidden">
        {/* Logo */}
        <div className="w-full flex items-center justify-start px-4 mt-10 mb-30">
          <Logo className="w-[300px]" srcImage="Afya" />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4 lg:gap-32 items-start">
          <header className="w-full flex flex-col gap-4 lg:gap-10">
            <h1 className="text-7xl font-black font-nunito leading-none text-zinc-200">
              Olá, seja bem-vindo.
            </h1>
            <p className="text-3xl lg:text-6xl font-nunito font-semibold text-zinc-200">
              Faça seu cadastro abaixo
            </p>
          </header>

          <div className="space-y-14 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-1 w-full gap-6"
            >
              {flux === "medic" && (
                <div>
                  <Input>
                    <Input.Label>CRM</Input.Label>
                    <Input.Field
                      {...register("crm")}
                      type="text"
                      placeholder=""
                      onFocus={() => setFocusedInput("crm")}
                    />
                  </Input>
                </div>
              )}

              <div>
                <Input wFull>
                  <Input.Field
                    {...register("name")}
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onFocus={() => setFocusedInput("name")}
                  />
                </Input>
              </div>

              <div>
                <Input>
                  <Input.Label>Celular</Input.Label>
                  <Input.Field
                    {...register("tel")}
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phoneValue}
                    onFocus={() => setFocusedInput("tel")}
                  />
                </Input>
              </div>

              <div>
                <Input wFull>
                  <Input.Field
                    {...register("email")}
                    type="text"
                    placeholder="E-mail"
                    onFocus={() => setFocusedInput("email")}
                  />
                </Input>
              </div>

              <div className="flex flex-col gap-6 mt-50 mb-6">
                <div className="flex items-center gap-3">
                  <input
                    className="size-10"
                    type="checkbox"
                    {...register("privacy_policy")}
                  />
                  <p className="text-zinc-100 text-xl font-bold">
                    Ao informar meus dados, concordo com a política de privacidade
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    className="size-10 shrink-0"
                    type="checkbox"
                    {...register("afya_research")}
                  />
                  <p className="text-zinc-100 text-xl font-bold">
                    Aceito receber pesquisas da Afya para a geração de insights <br></br> e aprimoramento da profissão
                  </p>
                </div>
              </div>
              <div className="mb-36 font-nunito-italic ">
                <Button
                  type="submit"
                  onClick={(e: any) => {
                    e.stopPropagation();
                  }}
                >
                  Iniciar
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex items-center justify-start px-4 pb-24">
          <button
            onClick={() => router.back()}
            className="
              flex items-center gap-3 px-7 py-4
              text-white text-4xl font-nunito font-semibold
              bg-white/10 hover:bg-white/20
              rounded-full transition
            "
          >
            &lt; Voltar
          </button>
        </div>
      </div>
    </BlankPage>
  );
}
