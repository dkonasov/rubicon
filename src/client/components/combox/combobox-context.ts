import { createContext, useContext } from "react";

export interface ComboboxContextValue {
  onItemSelect?: (value: string) => void;
}

const ComboboxContext = createContext<ComboboxContextValue>({});

export function useComboboxContext() {
  return useContext(ComboboxContext);
}

export const ComboboxProvider = ComboboxContext.Provider;
