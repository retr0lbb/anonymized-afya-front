"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { GroupKey } from "./questionMap";
import type { SrcListKeys } from "../assets/images";

// ✅ Tipagem principal do selection
export type Selection = {
  flux: string;
  group: GroupKey;
  title: string;
  image: SrcListKeys;
};

// ✅ Tipo do contexto
type SelectionContextType = {
  selection: Selection | null;
  setSelection: (selection: Selection | null) => void;
};

const SelectionContext = createContext<SelectionContextType>({
  selection: null,
  setSelection: () => {},
});

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelectionState] = useState<Selection | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selection");
    if (stored) {
      setSelectionState(JSON.parse(stored));
    }
  }, []);

  const setSelection = (newSelection: Selection | null) => {
    setSelectionState(newSelection);
    if (newSelection) {
      localStorage.setItem("selection", JSON.stringify(newSelection));
    } else {
      localStorage.removeItem("selection");
    }
  };

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}

// ✅ Hook para uso em qualquer lugar
export const useSelection = () => useContext(SelectionContext);
