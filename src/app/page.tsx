import Link from "next/link";
import { BlankPage } from "../components/blank-page";
import { Logo } from "../components/logo";

export default function Home() {
  return (
    <BlankPage className="items-center justify-center text-center gap-10">
      <div className="flex flex-col items-center justify-center gap-8">
        <Logo srcImage="Afya" className="w-[400px] mb-8" />

        <p className="text-5xl lg:text-7xl text-zinc-100 font-nunito font-bold max-w-4xl leading-tight">
          Sua jornada médica começa aqui!
        </p>

        <Link
          href="/ask-medic"
          className="mt-12 bg-[#D71B59] hover:bg-[#b01648] text-white text-4xl lg:text-5xl font-bold font-nunito py-6 px-14 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Toque para iniciar
        </Link>
      </div>
    </BlankPage>
  );
}
