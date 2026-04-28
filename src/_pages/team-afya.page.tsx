import { useNavigate, useParams } from "react-router-dom";
import { BlankPage } from "./blank.page";

export function TeamAfya() {
  const navigate = useNavigate();
  const { flux } = useParams();

  return (
    <BlankPage>
      <div
        className="flex flex-1 items-center justify-center flex-col text-center px-6 cursor-pointer"
        onClick={() => navigate(`/${flux}/rating`)}
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
