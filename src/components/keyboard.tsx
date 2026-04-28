import { useState } from "react";

/**
 * This code sucks but is the only one we have
 *
 * - UwU
 */

const keyboardLayout = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´", "/"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç", "~", "^"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", ";", ":", "_"],
  ["aA", "@", ".com", "Space", "Backspace"],
];

const accentMap: Record<string, Record<string, string>> = {
  "´": { A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú", C: "Ć" },
  "`": { A: "À", E: "È", I: "Ì", O: "Ò", U: "Ù" },
  "~": { A: "Ã", O: "Õ", N: "Ñ" },
  "^": { A: "Â", E: "Ê", I: "Î", O: "Ô", U: "Û" },
};

interface KeysProps {
  letter: string;
  onKeyPressed: (letter: string) => void;
}

function Keys({ letter, onKeyPressed }: KeysProps) {
  return (
    <button
      type="button"
      onClick={() => onKeyPressed(letter)}
      className="size-20 w-full rounded-2xl bg-zinc-300 text-2xl shadow-sm border border-zinc-500 font-bold"
    >
      {letter}
    </button>
  );
}

interface RowsProps {
  row: string[];
  onKeyPress: (letter: string) => void;
}

function Rows({ row, onKeyPress }: RowsProps) {
  return (
    <li className="w-full flex items-center justify-evenly gap-2">
      {row.map(item => (
        <Keys letter={item} key={item} onKeyPressed={onKeyPress} />
      ))}
    </li>
  );
}

interface KeyboardProps {
  activeField: string | null;
  setValue: (name: string, value: string) => void;
  value: string | boolean | undefined;
  valueSelectPosition: number;
  setSelectionPositionOfFocusedInput: (position: number) => void;
}

export function Keyboard({
  setValue,
  activeField,
  value,
  valueSelectPosition,
  setSelectionPositionOfFocusedInput,
}: KeyboardProps) {
  const [pendingAccent, setPendingAccent] = useState<string | null>(null);
  const [isShifted, setIsShifted] = useState(false);

function handleKeyPress(key: string) {
  if (!activeField || typeof value !== "string") return;

  let text = value;
  let pos = valueSelectPosition;
  let insert = "";  

  // Backspace
  if (key === "Backspace") {
    if (pos > 0) {
      text = text.slice(0, pos - 1) + text.slice(pos);
      pos -= 1;
    }
    setPendingAccent(null);
  }
  // Espaço
  else if (key === "Space") {
    insert = " ";
  }
  // Shift (só alterna o estado)
  else if (key === "Shift") {
    setIsShifted(v => !v);
    return;
  }
  // Início de acento
  else if (accentMap[key]) {
    setPendingAccent(key);
    return;
  }
  // Combinação acentuada
  else if (pendingAccent && accentMap[pendingAccent][key]) {
    insert = isShifted
      ? accentMap[pendingAccent][key]
      : accentMap[pendingAccent][key].toLocaleLowerCase();
    setPendingAccent(null);
    setIsShifted(false);
  }
  // Qualquer outra tecla (inclui “.com”)
  else {
    insert = isShifted ? key : key.toLocaleLowerCase();
    setPendingAccent(null);
    setIsShifted(false);
  }

  // Se inseriu algo (não foi backspace), aplica
  if (insert) {
    text = text.slice(0, pos) + insert + text.slice(pos);
    pos += insert.length;                  // ← aqui é a mudança chave!
  }

  // Atualiza o valor e a posição do cursor
  setValue(activeField, text);
  setSelectionPositionOfFocusedInput(pos);
}


  return (
    <div
      className={`absolute flex bottom-0 left-0 w-full p-5 bg-zinc-200 transition-all ${activeField === null ? "translate-y-[100%] hidden" : "translate-y-0 block"}`}
    >
      <ul className="w-full flex flex-col list-none gap-2">
        {keyboardLayout.map((rows, index) => (
          <Rows
            onKeyPress={handleKeyPress}
            key={`rows: ${index + 1}`}
            row={rows}
          />
        ))}
      </ul>
    </div>
  );
}
