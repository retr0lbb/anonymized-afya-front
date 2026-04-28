import { X } from "lucide-react";
import type React from "react";

interface ModalProps {
  children: React.ReactNode;
  visible?: boolean;
}

function Modal({ children, visible }: ModalProps) {
  return (
    <div
      className={`inset-0 z-[1000] w-full h-full absolute flex items-center justify-center bg-black/30 backdrop-blur-lg ${!visible && "scale-0"}`}
    >
      <div className="flex flex-col px-5 py-10 m-10 rounded-xl bg-zinc-200">
        {children}
      </div>
    </div>
  );
}

interface HeadProps {
  title: string;
  description: string;
  onCloseModal: () => void;
}

function Head({ description, title, onCloseModal }: HeadProps) {
  return (
    <header className="w-full flex items-center justify-between gap-20">
      <div className="flex flex-col">
        <h1 className="font-nunito text-5xl text-zinc-900">{title}</h1>
        <p className="font-nunito-italic text-3xl text-zinc-800">
          {description}
        </p>
      </div>
      <button
        onClick={() => onCloseModal()}
        type="button"
        className="flex text-5xl items-center justify-center border-none bg-none"
      >
        <X size={52} />
      </button>
    </header>
  );
}

interface BodyProps {
  children: React.ReactNode;
}
function Body({ children }: BodyProps) {
  return <div className="flex flex-col flex-1 px-5">{children}</div>;
}

Modal.Head = Head;
Modal.Body = Body;

export { Modal };
