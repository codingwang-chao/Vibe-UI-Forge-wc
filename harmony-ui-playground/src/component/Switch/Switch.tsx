import type { CSSProperties } from "react"

import "./Switch.css"

export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  /** 打开时轨道背景色 */
  activeColor?: string
  /** 关闭时轨道背景色 */
  inactiveColor?: string
  /** 滑块（圆钮）填充色 */
  nodeColor?: string
  /** 是否显示外圈描边（Pixso 1:10253） */
  border?: boolean
  /** 描边颜色 */
  borderColor?: string
  /** 描边宽度，数字视为 px */
  borderWidth?: string | number
  /**
   * 有描边时，外圈与内部轨道之间的间距（Pixso 1:10223）
   * 数字视为 px
   */
  borderGap?: string | number
  /** v-model 对应的 React 写法 */
  onUpdateModelValue?: (value: boolean) => void
  change?: (value: boolean) => void
  className?: string
  style?: CSSProperties
}

const DEFAULT_ACTIVE_COLOR = "#0a59f7"
const DEFAULT_INACTIVE_COLOR = "rgba(0, 0, 0, 0.09803921729326248)"
const DEFAULT_NODE_COLOR = "#fff"
const DEFAULT_BORDER_COLOR = "rgba(10, 89, 247, 1)"
const DEFAULT_BORDER_WIDTH = "2px"
const DEFAULT_BORDER_GAP = "2px"

function normalizeCssSize(value: string | number | undefined, fallback: string) {
  if (value === "" || value == null) return fallback
  return typeof value === "number" ? `${value}px` : value
}

export function Switch({
  modelValue = false,
  disabled = false,
  activeColor = DEFAULT_ACTIVE_COLOR,
  inactiveColor = DEFAULT_INACTIVE_COLOR,
  nodeColor = DEFAULT_NODE_COLOR,
  border = false,
  borderColor = DEFAULT_BORDER_COLOR,
  borderWidth = DEFAULT_BORDER_WIDTH,
  borderGap = DEFAULT_BORDER_GAP,
  onUpdateModelValue,
  change,
  className,
  style,
}: SwitchProps) {
  const nextClassName = [
    "my-switch",
    modelValue ? "my-switch--on" : "",
    disabled ? "my-switch--disabled" : "",
    border ? "my-switch--border" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  const cssVars = {
    "--my-switch-active": activeColor,
    "--my-switch-inactive": inactiveColor,
    "--my-switch-node": nodeColor,
    "--my-switch-border-color": borderColor,
    "--my-switch-border-width": normalizeCssSize(borderWidth, DEFAULT_BORDER_WIDTH),
    "--my-switch-border-gap": normalizeCssSize(borderGap, DEFAULT_BORDER_GAP),
  } as CSSProperties

  const handleToggle = () => {
    if (disabled) return
    const next = !modelValue
    onUpdateModelValue?.(next)
    change?.(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={modelValue}
      aria-disabled={disabled}
      disabled={disabled}
      className={nextClassName}
      style={{ ...cssVars, ...style }}
      onClick={handleToggle}
    >
      <span className="my-switch__track" aria-hidden="true">
        <span className="my-switch__knob" />
      </span>
    </button>
  )
}

