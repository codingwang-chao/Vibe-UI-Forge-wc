import type { CSSProperties, HTMLAttributes } from "react"
import "./StatusBar.css"

import darkIconSrc from "./assets/dark_icon.png"

export type StatusBarMode = "light" | "dark"

export type StatusBarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  mode?: StatusBarMode
  time?: string
  backgroundColor?: string
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function StatusBar({
  mode = "light",
  time = "08:08",
  backgroundColor,
  className,
  style,
  ...rest
}: StatusBarProps) {
  const rootStyle: CSSProperties = {
    ...style,
    ...(backgroundColor && { backgroundColor }),
  }

  return (
    <div
      {...rest}
      className={getClassNames(["pub-statusbar", `pub-statusbar--${mode}`, className])}
      style={rootStyle}
    >
      <div className="pub-statusbar__left">
        <span className="pub-statusbar__time">{time}</span>
      </div>
      <div className="pub-statusbar__right">
        <img
          className="pub-statusbar__right-icon"
          src={darkIconSrc}
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default StatusBar
