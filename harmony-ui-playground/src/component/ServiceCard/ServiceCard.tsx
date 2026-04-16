import * as React from "react"
import "./ServiceCard.css"

export type ServiceCardVariant = "muted" | "white"

export interface ServiceCardProps {
  title?: React.ReactNode
  variant?: ServiceCardVariant
  extra?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function hasContent(value: React.ReactNode) {
  if (value === null || value === undefined || value === false) {
    return false
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim().length > 0
  }

  return true
}

export function ServiceCard({
  title = "",
  variant = "muted",
  extra,
  children,
  className,
  style,
}: ServiceCardProps) {
  const hasHeader = hasContent(title) || hasContent(extra)

  return (
    <div
      className={cx(
        "my-service-card",
        variant === "muted" && "my-service-card--muted",
        variant === "white" && "my-service-card--white",
        className
      )}
      style={style}
    >
      {hasHeader ? (
        <header className="my-service-card__header">
          <div className="my-service-card__title">
            {hasContent(title) ? title : null}
          </div>
          <div className="my-service-card__extra">{extra}</div>
        </header>
      ) : null}
      <div className="my-service-card__body">{children}</div>
    </div>
  )
}

ServiceCard.displayName = "ServiceCard"

export default ServiceCard
