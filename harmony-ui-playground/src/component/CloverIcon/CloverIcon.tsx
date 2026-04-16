import type { CSSProperties, HTMLAttributes } from "react"
import "./CloverIcon.css"

import defR from "./assets/pixso-clover-leaf-r.png"
import defL from "./assets/pixso-clover-leaf-l.png"
import defTop from "./assets/pixso-clover-leaf-top.png"
import defStem from "./assets/pixso-clover-stem.png"
import incR from "./assets/pixso-mini-incomplete-leaf-r.png"
import incL from "./assets/pixso-mini-incomplete-leaf-l.png"
import incTop from "./assets/pixso-mini-incomplete-leaf-top.png"
import incStem from "./assets/pixso-mini-incomplete-stem.png"

export type CloverIconVariant = "default" | "incomplete"

export type CloverIconProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  size?: number
  variant?: CloverIconVariant
  ariaLabel?: string
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function CloverIcon({
  size = 156,
  variant = "default",
  ariaLabel = "三叶草",
  className,
  style,
  ...rest
}: CloverIconProps) {
  const assets =
    variant === "incomplete"
      ? { leafR: incR, leafL: incL, leafTop: incTop, stem: incStem }
      : { leafR: defR, leafL: defL, leafTop: defTop, stem: defStem }

  const wrapStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  }

  return (
    <div
      {...rest}
      className={getClassNames([
        "my-clover",
        variant === "incomplete" && "my-clover--incomplete",
        className,
      ])}
      style={wrapStyle}
      role="img"
      aria-label={ariaLabel}
    >
      <img
        className="my-clover__leaf my-clover__leaf--br"
        src={assets.leafR}
        alt=""
        aria-hidden="true"
      />
      <img
        className="my-clover__leaf my-clover__leaf--bl"
        src={assets.leafL}
        alt=""
        aria-hidden="true"
      />
      <div className="my-clover__top">
        <img
          className="my-clover__leaf my-clover__leaf--top"
          src={assets.leafTop}
          alt=""
          aria-hidden="true"
        />
        <img className="my-clover__stem" src={assets.stem} alt="" aria-hidden="true" />
      </div>
    </div>
  )
}

export default CloverIcon
