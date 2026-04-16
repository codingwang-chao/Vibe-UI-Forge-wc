import type { CSSProperties, HTMLAttributes } from "react"
import "./AiBottomBar.css"

export type AiBottomBarMode = "light" | "dark" | "transparent"

export type AiBottomBarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  mode?: AiBottomBarMode
  showHandle?: boolean
  showDarkPlate?: boolean
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function AiBottomBar({
  mode = "light",
  showHandle = false,
  showDarkPlate = false,
  className,
  style,
  ...rest
}: AiBottomBarProps) {
  const rootStyle: CSSProperties = {
    ...style,
  }

  return (
    <div
      {...rest}
      className={getClassNames([
        "pub-aibottombar",
        `pub-aibottombar--${mode}`,
        showHandle && "pub-aibottombar--with-handle",
        showDarkPlate && "pub-aibottombar--with-dark-plate",
        className,
      ])}
      style={rootStyle}
    >
      {showHandle ? <div className="pub-aibottombar__handle" /> : null}
    </div>
  )
}

export default AiBottomBar
