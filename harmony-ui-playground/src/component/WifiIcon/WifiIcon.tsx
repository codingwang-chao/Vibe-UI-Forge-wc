import type { ImgHTMLAttributes } from "react"
import "./WifiIcon.css"

import darkIconSrc from "./assets/dark_icon.png"
import lightIconSrc from "./assets/light_icon.png"

export type WifiIconMode = "light" | "dark"

export type WifiIconProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  mode?: WifiIconMode
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function WifiIcon({
  mode = "light",
  className,
  style,
  ...rest
}: WifiIconProps) {
  return (
    <img
      {...rest}
      className={getClassNames(["pub-wifi-icon", className])}
      style={style}
      src={mode === "dark" ? darkIconSrc : lightIconSrc}
      alt=""
      aria-hidden="true"
    />
  )
}

export default WifiIcon
