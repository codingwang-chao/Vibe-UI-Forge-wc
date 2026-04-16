import * as React from "react"
import "./ServiceCardItem.css"

export interface ServiceCardItemProps {
  name?: React.ReactNode
  subtitle?: string
  description?: string
  time?: React.ReactNode
  border?: boolean
  icon?: React.ReactNode
  title?: React.ReactNode
  desc?: React.ReactNode
  meta?: React.ReactNode
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

function normalizeText(value: string | undefined) {
  return value != null ? String(value).trim() : ""
}

export function ServiceCardItem({
  name = "",
  subtitle = "",
  description = "",
  time = "",
  border = true,
  icon,
  title,
  desc,
  meta,
  className,
  style,
}: ServiceCardItemProps) {
  const resolvedSubtitle = normalizeText(subtitle) || normalizeText(description)
  const showDesc = hasContent(desc) || hasContent(resolvedSubtitle)
  const showMeta = hasContent(meta) || hasContent(time)

  return (
    <div
      className={cx(
        "my-service-card-item",
        !border && "my-service-card-item--no-border",
        className
      )}
      style={style}
    >
      <div className="my-service-card-item__icon">
        {icon ?? (
          <span
            className="my-service-card-item__icon-pill"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="my-service-card-item__content">
        <div className="my-service-card-item__main">
          <div className="my-service-card-item__title">
            {hasContent(title) ? title : name}
          </div>
          {showDesc ? (
            <div className="my-service-card-item__desc">
              {hasContent(desc) ? desc : resolvedSubtitle}
            </div>
          ) : null}
        </div>
        <div className="my-service-card-item__meta">
          {hasContent(meta) ? meta : showMeta ? <span>{time}</span> : null}
        </div>
      </div>
    </div>
  )
}

ServiceCardItem.displayName = "ServiceCardItem"

export default ServiceCardItem
