import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fixouGif from "../assets/fixou.gif";
import { useSelection } from "../components/SelectionContext";

export function FixouPage() {
  const navigate = useNavigate();
  const { flux } = useParams();
  const [canClick, setCanClick] = useState(false);

  useSelection(); // Contexto global mantido

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={() => {
        if (canClick) {
          navigate(`/${flux}/challenge`);
        }
      }}
      className={`w-screen h-screen bg-black flex items-center justify-center ${
        canClick ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <img
        src={fixouGif}
        alt="Fixou as soluções"
        className="w-full h-full object-cover" // <- Aqui a mudança!
      />
    </div>
  );
}
