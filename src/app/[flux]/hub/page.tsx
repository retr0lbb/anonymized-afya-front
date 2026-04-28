"use client";

import { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Carousel } from "../../../components/carousel";
import { BlankPage } from "../../../components/blank-page";
import { useSelection } from "../../../components/SelectionContext";
import type { SrcListKeys } from "../../../assets/images";
import type { GroupKey } from "../../../components/questionMap";
import buttonEscolher from "../../../assets/button/botao_escolher.png";

// In Next.js, importing an image returns an object with a src property
const btnBgUrl = typeof buttonEscolher === 'string' ? buttonEscolher : (buttonEscolher as any).src;

export default function BigHub() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const params = useParams() as { flux: string };
  const flux = params.flux;

  const { setSelection } = useSelection();

  const cardsData: {
    id: string;
    title: string;
    group: GroupKey;
    src: SrcListKeys;
    video: string;
  }[] = [
      {
        id: "student",
        title: "Estudante de Medicina",
        group: "Estudantes",
        src: "Pessoa5",
        video: "estudantes",
      },
      {
        id: "generalist",
        title: "Generalista",
        group: "Generalista",
        src: "Pessoa4",
        video: "generalista",
      },
      {
        id: "specialist",
        title: "Especialista",
        group: "Especialista",
        src: "Pessoa3",
        video: "especialista",
      },
      {
        id: "other",
        title: "Outras áreas da saúde",
        group: "Outras áreas da saúde",
        src: "Pessoa2",
        video: "outras-areas-da-saude",
      },
    ];

  const rollPrevious = useCallback(() => {
    if (current > 0) setCurrent((prev) => prev - 1);
  }, [current]);

  const rollNext = useCallback(() => {
    if (current < cardsData.length - 1) setCurrent((prev) => prev + 1);
  }, [current, cardsData]);

  return (
    <BlankPage>
      <div className="flex flex-col flex-1 w-full items-center justify-center gap-20 font-medium text-zinc-100 text-center">
        <h1 className="text-7xl font-nunito-italic font-bold px-6">
          Escolha seu momento <br /> na Medicina
        </h1>

        <div className="w-full flex items-center justify-center">
          <div className="max-w-[700px]">
            {Carousel && (
              <Carousel current={current} previous={rollPrevious} next={rollNext}>
                {cardsData
                  .filter((item) => !(flux === "medic" && item.id === "student"))
                  .map((item, index) => (
                    <Carousel.Slide
                      key={item.id}
                      isSelected={index === current}
                      src={item.src}
                      title={item.title}
                      onClick={() => { }}
                    >
                      <Carousel.Content>
                        <div className="relative flex flex-col justify-end h-full pb-8">
                          <div
                            onClick={() => {
                              const selected = {
                                group: item.group,
                                title: item.title,
                                image: item.src,
                                flux: flux!,
                              };
                              if (setSelection) {
                                setSelection(selected);
                              }
                              localStorage.setItem("selection", JSON.stringify(selected));

                              router.push(`/${flux}/video/${item.video}`);
                            }}
                            className="mt-8 cursor-pointer border-4 border-[#D71B59]"
                            style={{
                              backgroundImage: `url(${btnBgUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              fontSize: "3.0rem",
                              padding: "3.5rem 3rem",
                              color: "#fff",
                              textAlign: "center",
                              fontWeight: "bold",
                              fontFamily: "Nunito",
                              border: "none",
                              width: "562px",
                              margin: "0 auto",
                            }}
                          >
                            Escolher
                          </div>
                        </div>
                      </Carousel.Content>
                    </Carousel.Slide>
                  ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </BlankPage>
  );
}
