import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import "./Avatar.css"

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  src?: string
  size?: number
  radius?: number
  children?: ReactNode
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function Avatar({
  src = "",
  size = 40,
  radius = 999,
  className,
  style,
  children,
  ...rest
}: AvatarProps) {
  const rootStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`,
    ...style,
  }

  return (
    <div {...rest} className={getClassNames(["pub-avatar", className])} style={rootStyle}>
      {src ? <img className="pub-avatar__img" src={src} alt="" /> : children}
    </div>
  )
}

export default Avatar
