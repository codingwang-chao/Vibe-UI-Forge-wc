import type { CSSProperties, ReactNode } from "react"

export type SwitchValue = string | number | boolean
export type SwitchSize = "sm" | "md" | "lg"

export interface SwitchProps {
  modelValue?: SwitchValue
  onUpdateModelValue?: (value: SwitchValue) => void
  change?: (value: SwitchValue) => void
  beforeChange?: (nextChecked: boolean) => boolean | Promise<boolean>
  activeValue?: SwitchValue
  inactiveValue?: SwitchValue
  size?: SwitchSize
  color?: string
  disabled?: boolean
  checkedContent?: ReactNode
  uncheckedContent?: ReactNode
  className?: string
  style?: CSSProperties
}
