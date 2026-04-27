import type { CSSProperties, HTMLAttributes } from "react"
import "./BatteryIcon.css"

export type BatteryIconVariant = "outline" | "filled" | "solid"
export type BatteryIconMode = "light" | "dark"

export type BatteryIconProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  variant?: BatteryIconVariant
  mode?: BatteryIconMode
  percentage?: number
  showLabel?: boolean
  /**
   * 渲染高度（px）。所有内部尺寸按 12px 基准等比缩放，默认 12 与 Pixso 3195:10644 1:1 对齐。
   */
  height?: number
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function clampPercentage(value: number) {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

export function BatteryIcon({
  variant = "outline",
  mode = "light",
  percentage = 100,
  showLabel = true,
  height = 12,
  className,
  style,
  ...rest
}: BatteryIconProps) {
  const safe = clampPercentage(percentage)
  const scale = height / 12
  const rootStyle: CSSProperties = {
    "--pub-battery-scale": String(scale),
    "--pub-battery-fill": `${safe}%`,
    ...style,
  } as CSSProperties

  return (
    <div
      {...rest}
      role="img"
      aria-label={`电池电量 ${safe}%`}
      className={getClassNames([
        "pub-battery",
        `pub-battery--${variant}`,
        `pub-battery--${mode}`,
        className,
      ])}
      style={rootStyle}
    >
      <span className="pub-battery__body">
        {variant === "filled" && (
          <span className="pub-battery__bar" aria-hidden="true" />
        )}
        {showLabel && (
          <span className="pub-battery__label">{safe}</span>
        )}
      </span>
      <span className="pub-battery__cap" aria-hidden="true" />
    </div>
  )
}

export default BatteryIcon
