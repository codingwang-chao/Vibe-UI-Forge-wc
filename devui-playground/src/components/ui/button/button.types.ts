import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react"

export type MiniDevUIButtonVariant = "solid" | "outline" | "text"
export type ButtonColor = "secondary" | "primary" | "danger"
export type MiniDevUIButtonSize = "lg" | "md" | "sm"
export type ButtonShape = "round" | "circle"
export type ButtonNativeType = "button" | "submit" | "reset"

export type LegacyButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link"

export type LegacyButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

export type ButtonVariant = MiniDevUIButtonVariant | LegacyButtonVariant
export type ButtonSize = MiniDevUIButtonSize | LegacyButtonSize

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  icon?: string
  loading?: boolean
  shape?: ButtonShape
  nativeType?: ButtonNativeType
  asChild?: boolean
  children?: ReactNode
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: MiniDevUIButtonSize
  children?: ReactNode
}

export interface ButtonWaveStyle extends CSSProperties {
  top: string
  left: string
}
