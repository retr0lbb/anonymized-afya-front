"use client";

import { Toaster } from "react-hot-toast";
import { SelectionProvider } from "../components/SelectionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SelectionProvider>
      {children}
      <Toaster position="top-right" />
    </SelectionProvider>
  );
}
