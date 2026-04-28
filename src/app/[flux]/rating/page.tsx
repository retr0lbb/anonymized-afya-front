"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StarRadioInput } from "../../../components/star-radio-input";
import { BlankPage } from "../../../components/blank-page";
// import { useSurveyStore } from "../../../utils/store";

export default function FinalRatingPage() {
  const router = useRouter();
  // Mock store if not available
  // const updateSurvey = useSurveyStore ? useSurveyStore((state: any) => state.updateSurvey) : (data: any) => console.log('Mock updateSurvey', data);
  const [rating, setRating] = useState(0);

  function handleSetRating(number: number) {
    setRating(number);
    // if (updateSurvey) {
    //   updateSurvey({ stars: number });
    // }
    setTimeout(() => {
      router.push("/thanks");
    }, 1000);
  }

  return (
    <BlankPage>
      <div className="flex flex-1 flex-col items-center justify-center text-center px-3 gap-12">
        <h1 className="text-white text-8xl font-nunito leading-tight">
          <b>Avalie sua <br />
            experiência <br /> no estande</b>
        </h1>

        {StarRadioInput && <StarRadioInput rating={rating} setRating={handleSetRating} />}
      </div>
    </BlankPage>
  );
}
