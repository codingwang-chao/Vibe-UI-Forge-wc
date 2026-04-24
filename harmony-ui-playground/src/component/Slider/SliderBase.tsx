import type { CSSProperties, KeyboardEvent } from "react"

import "./Slider.css"

export interface SliderBaseProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  activeColor?: string
  inactiveColor?: string
  thumbColor?: string
  className?: string
  style?: CSSProperties
  onUpdateModelValue?: (value: number) => void
  change?: (value: number) => void
}

const DEFAULT_ACTIVE_COLOR = "#0a59f7"
const DEFAULT_INACTIVE_COLOR = "rgba(0, 0, 0, 0.1)"
const DEFAULT_THUMB_COLOR = "#ffffff"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeToStep(value: number, min: number, max: number, step: number) {
  const clamped = clamp(value, min, max)
  const stepped = Math.round((clamped - min) / step) * step + min
  return Number(stepped.toFixed(4))
}

export function SliderBase({
  modelValue = 50,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  activeColor = DEFAULT_ACTIVE_COLOR,
  inactiveColor = DEFAULT_INACTIVE_COLOR,
  thumbColor = DEFAULT_THUMB_COLOR,
  className,
  style,
  onUpdateModelValue,
  change,
}: SliderBaseProps) {
  const safeMin = Math.min(min, max)
  const safeMax = Math.max(min, max)
  const safeStep = step > 0 ? step : 1
  const value = normalizeToStep(modelValue, safeMin, safeMax, safeStep)
  const percent = ((value - safeMin) / (safeMax - safeMin || 1)) * 100

  const classNames = [
    "hmy-slider",
    disabled ? "hmy-slider--disabled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  const cssVars = {
    "--hmy-slider-active": activeColor,
    "--hmy-slider-inactive": inactiveColor,
    "--hmy-slider-thumb": thumbColor,
    "--hmy-slider-percent": `${percent}%`,
  } as CSSProperties

  const emit = (nextValue: number) => {
    const next = normalizeToStep(nextValue, safeMin, safeMax, safeStep)
    onUpdateModelValue?.(next)
    change?.(next)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      emit(value - safeStep)
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      emit(value + safeStep)
    }
  }

  return (
    <div className={classNames} style={{ ...cssVars, ...style }}>
      <input
        className="hmy-slider__input"
        type="range"
        min={safeMin}
        max={safeMax}
        step={safeStep}
        value={value}
        disabled={disabled}
        onChange={(event) => emit(Number(event.target.value))}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SliderBase
