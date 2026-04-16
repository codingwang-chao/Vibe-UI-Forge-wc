import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react"

export type InputSize = "sm" | "md" | "lg"
export type InputStyleType = "default" | "gray"

export interface InputHandle {
  select: () => void
  focus: () => void
  blur: () => void
}

export interface MiniDevUIInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "size"
  | "value"
  | "defaultValue"
  | "onInput"
  | "onChange"
  | "onFocus"
  | "onBlur"
  | "onKeyDown"
  | "prefix"
> {
  modelValue?: string
  defaultModelValue?: string
  size?: InputSize
  error?: boolean
  validateEvent?: boolean
  prefixIcon?: string
  suffixIcon?: string
  prefix?: ReactNode
  suffix?: ReactNode
  prepend?: ReactNode
  append?: ReactNode
  showPassword?: boolean
  clearable?: boolean
  showGlowStyle?: boolean
  autofocus?: boolean
  styleType?: InputStyleType
  onUpdateModelValue?: (value: string) => void
  onInput?: (value: string, event: FormEvent<HTMLInputElement>) => void
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onClear?: () => void
  className?: string
  style?: CSSProperties
}

export interface InputIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string
  size?: number | string
}
