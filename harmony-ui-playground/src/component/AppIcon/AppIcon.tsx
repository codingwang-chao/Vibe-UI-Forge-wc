import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import "./AppIcon.css"

export type AppIconProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  src?: string
  size?: number
  radius?: number
  children?: ReactNode
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function AppIcon({
  src = "",
  size = 48,
  radius = 12,
  className,
  style,
  children,
  ...rest
}: AppIconProps) {
  const rootStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`,
    ...style,
  }

  return (
    <div {...rest} className={getClassNames(["pub-appicon", className])} style={rootStyle}>
      {src ? <img className="pub-appicon__img" src={src} alt="" /> : children}
    </div>
  )
}

export default AppIcon
