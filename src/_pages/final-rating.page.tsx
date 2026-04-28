import { useNavigate } from "react-router-dom";
import { StarRadioInput } from "../components/star-radio-input";
import { BlankPage } from "./blank.page";
import { useSurveyStore } from "../utils/store";
import { useState } from "react";

export function FinalRatingPage() {
  const navigate = useNavigate();
  const { updateSurvey } = useSurveyStore();
  const [rating, setRating] = useState(0);

  function handleSetRating(number: number) {
    setRating(number);
    updateSurvey({ stars: number });
    setTimeout(() => {
      navigate("/thanks");
    }, 1000);
  }

  return (
    <BlankPage>
      <div className="flex flex-1 flex-col items-center justify-center text-center px-3 gap-12">
        <h1 className="text-white text-8xl font-nunito leading-tight">
          <b>Avalie sua <br />
          experiência <br /> no estande</b>
        </h1>

        <StarRadioInput rating={rating} setRating={handleSetRating} />
      </div>
    </BlankPage>
  );
}
