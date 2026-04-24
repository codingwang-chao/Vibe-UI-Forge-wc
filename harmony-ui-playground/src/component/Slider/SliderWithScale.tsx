import type { CSSProperties } from "react"

import { SliderBase, type SliderBaseProps } from "./SliderBase"
import "./Slider.css"

export interface SliderWithScaleProps extends SliderBaseProps {
  ticks?: number[]
  showValue?: boolean
  valueFormatter?: (value: number) => string
  containerStyle?: CSSProperties
}

export function SliderWithScale({
  modelValue = 50,
  min = 0,
  max = 100,
  ticks = [0, 20, 40, 60, 80, 100],
  showValue = false,
  valueFormatter = (value) => `${value}`,
  containerStyle,
  ...rest
}: SliderWithScaleProps) {
  const currentValue = Math.min(max, Math.max(min, modelValue))

  return (
    <div className="hmy-slider-scale" style={containerStyle}>
      <SliderBase modelValue={currentValue} min={min} max={max} {...rest} />
      <div className="hmy-slider-scale__ticks">
        {ticks.map((tick) => (
          <span key={tick} className="hmy-slider-scale__tick">
            {tick}
          </span>
        ))}
      </div>
      {showValue ? (
        <div className="hmy-slider-scale__value">{valueFormatter(currentValue)}</div>
      ) : null}
    </div>
  )
}

export default SliderWithScale
