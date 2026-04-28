"use client";

import { useRouter, useParams } from "next/navigation";
import { BlankPage } from "../../../components/blank-page";

export default function TeamAfya() {
  const router = useRouter();
  const params = useParams() as { flux: string };
  const flux = params.flux;

  return (
    <BlankPage>
      <div
        className="flex flex-1 items-center justify-center flex-col text-center px-6 cursor-pointer"
        onClick={() => router.push(`/${flux}/rating`)}
      >
        <h1 className="text-white font-bold text-8xl leading-tight mb-10">
          Será um prazer <br />
          ter você no time
        </h1>

        <p className="text-white text-6xl font-light">
          Sua escolha ficará salva <br />
          no sistema da Afya
        </p>
      </div>
    </BlankPage>
  );
}
