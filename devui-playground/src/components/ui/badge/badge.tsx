import type { CSSProperties } from "react"
import type { BadgePositionType, MiniDevUIBadgeProps } from "./badge.types"
import "./badge.css"

const baseClass = "mini-devui-badge"
const contentClass = `${baseClass}__content`

function joinClasses(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function getText(
  count: MiniDevUIBadgeProps["count"],
  showDot?: boolean,
  maxCount?: number
) {
  if (showDot) {
    return null
  }

  if (typeof count === "number" && typeof maxCount === "number") {
    return count > maxCount ? `${maxCount}+` : count
  }

  return count ?? null
}

function getPositionStyle(
  position: BadgePositionType,
  offset: [number, number]
): CSSProperties {
  const [x, y] = offset
  const [yName, xName] = position.split("-") as [
    "top" | "bottom",
    "left" | "right",
  ]

  return {
    [yName]: `${y}px`,
    [xName]: `${x}px`,
  }
}

export function Badge({
  count,
  maxCount = 99,
  showDot = false,
  status = "info",
  position = "top-right",
  offset,
  bgColor,
  textColor,
  hidden = false,
  className,
  children,
  style,
  ...props
}: MiniDevUIBadgeProps) {
  const hasChildren = children !== undefined && children !== null
  const text = getText(count, showDot, maxCount)
  const resolvedStyle: CSSProperties = { ...style }

  if (bgColor) {
    resolvedStyle.background = bgColor
  }

  if (textColor) {
    resolvedStyle.color = textColor
  }

  if (hasChildren && offset) {
    Object.assign(resolvedStyle, getPositionStyle(position, offset))
  }

  const contentClasses = joinClasses(
    contentClass,
    showDot ? `${baseClass}--dot` : `${baseClass}--count`,
    status && `${baseClass}--${status}`,
    hasChildren && position && `${baseClass}--${position}`,
    hasChildren && `${baseClass}--fixed`,
    hidden ? `${baseClass}--hidden` : `${baseClass}--show`
  )

  return (
    <div className={joinClasses(baseClass, className)} {...props}>
      {children}
      <div className={contentClasses} style={resolvedStyle}>
        {text}
      </div>
    </div>
  )
}
