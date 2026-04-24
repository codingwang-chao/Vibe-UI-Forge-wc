import type { CSSProperties, ReactNode } from "react"

import { SliderBase, type SliderBaseProps } from "./SliderBase"
import "./Slider.css"

export interface SliderWithIconsProps extends SliderBaseProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  iconGap?: number
  containerStyle?: CSSProperties
}

export function SliderWithIcons({
  leftIcon,
  rightIcon,
  iconGap = 12,
  containerStyle,
  ...sliderProps
}: SliderWithIconsProps) {
  return (
    <div
      className="hmy-slider-row"
      style={{ gap: `${iconGap}px`, ...containerStyle }}
    >
      <div className="hmy-slider-row__icon">{leftIcon}</div>
      <SliderBase {...sliderProps} className="hmy-slider-row__main" />
      <div className="hmy-slider-row__icon">{rightIcon}</div>
    </div>
  )
}

export default SliderWithIcons
