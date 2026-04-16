import type { ButtonHTMLAttributes, CSSProperties } from "react"
import "./IconButton.css"

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> & {
  src: string
  alt?: string
  size?: 28 | 32 | 40 | number
  disabled?: boolean
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function IconButton({
  src,
  alt = "",
  size = 32,
  disabled = false,
  className,
  style,
  ...rest
}: IconButtonProps) {
  const rootStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  }

  return (
    <button
      {...rest}
      disabled={disabled}
      className={getClassNames([
        "pub-iconbtn",
        size === 28 && "pub-iconbtn--28",
        size === 32 && "pub-iconbtn--32",
        size === 40 && "pub-iconbtn--40",
        className,
      ])}
      style={rootStyle}
    >
      <img className="pub-iconbtn__img" src={src} alt={alt} />
    </button>
  )
}

export default IconButton
