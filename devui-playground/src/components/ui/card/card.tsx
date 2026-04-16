import * as React from "react"

import type { CardProps } from "./types"
import "./card.css"

function cn(...values: Array<string | undefined | false | null>) {
  return values.filter(Boolean).join(" ")
}

function Card({
  align = "start",
  src = "",
  shadow = "hover",
  className,
  children,
  avatar,
  title,
  subtitle,
  content,
  actions,
  ...props
}: CardProps & Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  const hasHeader = Boolean(avatar || title || subtitle)
  const hasActions = Boolean(actions)

  return (
    <div
      data-slot="card"
      data-align={align}
      data-shadow={shadow}
      className={cn(
        "card-container",
        "card",
        `card--shadow-${shadow}`,
        className
      )}
      {...props}
    >
      {children}

      {hasHeader ? (
        <div data-slot="card-header" className="card__header">
          {avatar ? (
            <div data-slot="card-avatar" className="card__avatar">
              {avatar}
            </div>
          ) : null}
          <div className="card__heading">
            {title ? (
              <div data-slot="card-title" className="card__title">
                {title}
              </div>
            ) : null}
            {subtitle ? (
              <div data-slot="card-subtitle" className="card__subtitle">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {src ? (
        <img data-slot="card-meta" src={src} alt="" className="card__meta" />
      ) : null}

      {content ? (
        <div data-slot="card-content" className="card__content">
          {content}
        </div>
      ) : null}

      {hasActions ? (
        <div
          data-slot="card-actions"
          className={cn(
            "card__actions",
            align !== "start" && `card__actions--align-${align}`
          )}
        >
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export { Card }
