import { createContext, useContext } from "react"
import type { SelectContextValue } from "./types"

export const SelectContext = createContext<SelectContextValue | null>(null)

export function useSelectContext(): SelectContextValue | null {
  return useContext(SelectContext)
}

