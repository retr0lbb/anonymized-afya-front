import { ArrowRight } from "lucide-react";

interface NextPageButtonProps {
  onClick: () => void;
  textHidden?: boolean;
}
export function NextPageButton({ onClick, textHidden }: NextPageButtonProps) {
  return (
    <button
      type="button"
      className="absolute inset-0 z-10 w-full h-full flex items-end justify-end"
      onClick={() => onClick()}
    >
      {!textHidden && (
        <p className="text-4xl italic text-zinc-300 animate-pulse font-semibold p-5 flex items-center justify-center gap-2">
          Proxima pagina
          <ArrowRight className="flex items-center justify-center size-12" />
        </p>
      )}
    </button>
  );
}
