import { createContext, useContext } from "react"
import type { MiniDevUIButtonSize } from "./button.types"

export const ButtonGroupSizeContext = createContext<MiniDevUIButtonSize | null>(
  null
)

export function useButtonGroupSize() {
  return useContext(ButtonGroupSizeContext)
}
