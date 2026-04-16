import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from "react"
import "./ListItem.css"

function classNames(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function hasRenderableContent(value: ReactNode) {
  if (value === null || value === undefined || value === false) {
    return false
  }

  if (typeof value === "string") {
    return value.trim().length > 0
  }

  return true
}

export interface ListItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick" | "title"> {
  title?: ReactNode
  subtitle?: ReactNode
  rightText?: ReactNode
  showArrow?: boolean
  border?: boolean
  leftGap?: number
  left?: ReactNode
  right?: ReactNode
  onClick?: (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => void
}

export function ListItem({
  title = "",
  subtitle = "",
  rightText = "",
  showArrow = true,
  border = true,
  leftGap = 12,
  left,
  right,
  className,
  style,
  role,
  tabIndex,
  onClick,
  onKeyDown,
  ...rest
}: ListItemProps) {
  const hasLeft = hasRenderableContent(left)
  const hasTitleArea = hasRenderableContent(title)
  const hasSubtitle = hasRenderableContent(subtitle)
  const hasRight =
    hasRenderableContent(right) ||
    hasRenderableContent(rightText) ||
    showArrow

  const classes = classNames([
    "my-list-item",
    !border && "my-list-item--no-border",
    hasLeft && "my-list-item--has-left",
    hasSubtitle && "my-list-item--multiline",
    className,
  ])

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (event.key === "Enter") {
      event.preventDefault()
      onClick?.(event)
    }
  }

  return (
    <div
      {...rest}
      className={classes}
      style={style}
      role={role ?? "button"}
      tabIndex={tabIndex ?? 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {hasLeft ? (
        <div className="my-list-item__left" style={{ marginRight: `${leftGap}px` }}>
          {left}
        </div>
      ) : null}

      <div className="my-list-item__content">
        {hasTitleArea || hasSubtitle ? (
          <div className="my-list-item__titles">
            {hasTitleArea ? <div className="my-list-item__title">{title}</div> : null}
            {hasSubtitle ? (
              <div className="my-list-item__subtitle-row">
                <span className="my-list-item__subtitle-text">{subtitle}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        {hasRight ? (
          <div className="my-list-item__right">
            {hasRenderableContent(right) ? (
              <div className="my-list-item__right-slot">{right}</div>
            ) : null}
            {hasRenderableContent(rightText) ? (
              <span className="my-list-item__right-text">{rightText}</span>
            ) : null}
            {showArrow ? (
              <span className="my-list-item__arrow" aria-hidden="true">
                <svg width="8" height="6" viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.75L4 5.25L8 0.75H0Z" fill="currentColor" />
                </svg>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ListItem
