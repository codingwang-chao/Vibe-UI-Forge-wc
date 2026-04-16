import type { FocusEvent, ReactNode } from "react"

export interface SelectOptionObjectItem {
  name: string
  value: string | number
  _checked: boolean
  create?: boolean
  disabled?: boolean
  [key: string]: unknown
}

export type SelectOptionItem =
  | number
  | string
  | ({ value: string | number } & Partial<SelectOptionObjectItem>)

export type SelectOptions = Array<SelectOptionItem>

export type SelectModelValue = number | string | Array<number | string>

export type SelectFilter = boolean | ((query: string) => void)

export type SelectSize = "sm" | "md" | "lg"

export type SelectPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"

export interface SelectProps {
  modelValue?: SelectModelValue
  onUpdateModelValue?: (value: SelectModelValue) => void
  options?: SelectOptions
  position?: SelectPlacement[]
  size?: SelectSize | ""
  overview?: "border" | "underlined"
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  allowClear?: boolean
  optionDisabledKey?: string
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  filter?: SelectFilter
  remote?: boolean
  allowCreate?: boolean
  noDataText?: string
  noMatchText?: string
  loading?: boolean
  loadingText?: string
  onToggleChange?: (open: boolean) => void
  onValueChange?: (value: unknown, index?: number) => void
  multipleLimit?: number
  showGlowStyle?: boolean
  menuClass?: string
  maxLength?: number
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onClear?: () => void
  onRemoveTag?: (value: string | number) => void
  onInputChange?: (query: string) => void
  children?: ReactNode
}

export interface SelectRegisteredOption {
  value: string | number
  name: string
  disabled?: boolean
  create?: boolean
  groupDisabled?: boolean
  source: "prop" | "child"
}

export interface OptionProps {
  value?: string | number
  name?: string
  disabled?: boolean
  create?: boolean
  children?: ReactNode
}

export interface OptionGroupProps {
  label?: string
  disabled?: boolean
  children?: ReactNode
}

export interface SelectContextValue {
  registerOption: (option: SelectRegisteredOption) => void
  unregisterOption: (value: string | number, source: "prop" | "child") => void
  selectOption: (option: SelectRegisteredOption) => void
  isOptionDisabled: (option: SelectRegisteredOption) => boolean
  isOptionVisible: (option: SelectRegisteredOption) => boolean
  filterQuery: string
  multiple: boolean
  collapseTags: boolean
  collapseTagsTooltip: boolean
  selectedOptions: SelectRegisteredOption[]
}
