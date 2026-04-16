import * as React from "react"
import "./ServiceCardStatus.css"

export type ServiceCardStatusVariant = "primary" | "light"

export interface ServiceCardStatusProps {
  variant?: ServiceCardStatusVariant
  text?: React.ReactNode
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

export function ServiceCardStatus({
  variant = "primary",
  text = "",
  className,
  style,
}: ServiceCardStatusProps) {
  return (
    <div
      className={cx(
        "my-service-card-status",
        variant === "primary" && "my-service-card-status--primary",
        variant === "light" && "my-service-card-status--light",
        className
      )}
      style={style}
    >
      {variant === "light" ? (
        <span className="my-service-card-status__badge" aria-hidden="true">
          <span className="my-service-card-status__badge-inner">
            <svg
              className="my-service-card-status__check"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.2L3.6 6.8L9 1"
                stroke="#fff"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      ) : null}
      {hasContent(text) ? (
        <span className="my-service-card-status__text">{text}</span>
      ) : null}
    </div>
  )
}

ServiceCardStatus.displayName = "ServiceCardStatus"

export default ServiceCardStatus
