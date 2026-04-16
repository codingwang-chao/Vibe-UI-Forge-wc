import type { CSSProperties, ChangeEvent, ReactNode } from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"
import "./Checkbox.css"

export type CheckboxProps = {
  modelValue?: boolean
  disabled?: boolean
  /** default: 16x16; large: 24x24 (Pixso 44:35189) */
  size?: "default" | "large"
  /** Selected fill color */
  checkedColor?: string
  /** Unchecked border color */
  borderColor?: string
  /** Outer 2px accent ring */
  border?: boolean
  children?: ReactNode
  onUpdateModelValue?: (value: boolean) => void
  change?: (value: boolean) => void
}

const DEFAULT_CHECKED_COLOR = "rgba(0, 125, 255, 1)"
const DEFAULT_BORDER_COLOR = "rgba(0, 0, 0, 0.4000000059604645)"
const DEFAULT_RING_COLOR = "rgba(10, 89, 247, 1)"

export function Checkbox({
  modelValue = false,
  disabled = false,
  size = "default",
  checkedColor = DEFAULT_CHECKED_COLOR,
  borderColor = DEFAULT_BORDER_COLOR,
  border = false,
  children,
  onUpdateModelValue,
  change,
}: CheckboxProps) {
  const id = useId()
  const hasLabel = children !== undefined && children !== null && children !== false
  const isLarge = size === "large"

  const cssVars = {
    "--my-checkbox-checked": checkedColor,
    "--my-checkbox-unchecked-border": borderColor,
    "--my-checkbox-ring": DEFAULT_RING_COLOR,
    "--my-checkbox-inset": isLarge ? "2px" : "1.33px",
  } as CSSProperties

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    const nextValue = event.currentTarget.checked
    onUpdateModelValue?.(nextValue)
    change?.(nextValue)
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "my-checkbox-field",
        disabled && "my-checkbox-field--disabled",
        border && "my-checkbox-field--border",
        isLarge && "my-checkbox-field--large"
      )}
    >
      <span
        className={cn(
          "my-checkbox",
          modelValue && "my-checkbox--checked",
          disabled && "my-checkbox--disabled"
        )}
        style={cssVars}
      >
        <input
          id={id}
          type="checkbox"
          className="my-checkbox__native"
          checked={modelValue}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className="my-checkbox__face" aria-hidden="true" />
        <svg
          className="my-checkbox__check"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3.5 8.2 6.4 11 12.5 4.8"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {hasLabel ? <span className="my-checkbox-field__text">{children}</span> : null}
    </label>
  )
}

export default Checkbox
