import { Star } from "lucide-react";

interface StarRadioInputProps {
  setRating: (currentRating: number) => void;
  rating: number;
}

export function StarRadioInput({ setRating, rating }: StarRadioInputProps) {
  return (
    <div className="flex items-center justify-center gap-5">
      {[...Array(5)].map((_, index) => {
        const curretRating = index + 1;
        return (
          <label
            key={curretRating}
            className="flex relative items-center justify-center"
          >
            <input
              className="absolute inset-0 w-full h-full opacity-0"
              type="radio"
              name="rate"
              value={curretRating}
              onClick={() => {
                setRating(curretRating);
              }}
            />
            <Star
              className="size-16 sm:size-20 md:size-28 lg:size-32 text-zinc-200"
              fill={rating >= curretRating ? "#e4e4e7" : "transparent"}
            />
          </label>
        );
      })}
    </div>
  );
}
