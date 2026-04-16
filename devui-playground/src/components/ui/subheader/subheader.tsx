import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import type {
  ScaffoldBreadcrumbItem,
  ScaffoldTabItem,
} from "@/components/ui/scaffold/types"
import "./subheader.css"

export type SubheaderBreadcrumbItem = ScaffoldBreadcrumbItem
export type SubheaderTabItem = ScaffoldTabItem

export type SubheaderProps = {
  breadcrumbs?: SubheaderBreadcrumbItem[]
  tabs?: SubheaderTabItem[]
  modelValue?: string
  defaultModelValue?: string
  className?: string
  onUpdateModelValue?: (value: string) => void
}

export function Subheader({
  breadcrumbs = [],
  tabs = [],
  modelValue,
  defaultModelValue,
  className,
  onUpdateModelValue,
}: SubheaderProps) {
  const fallbackValue = useMemo(
    () => defaultModelValue ?? tabs[0]?.id ?? "",
    [defaultModelValue, tabs]
  )
  const [uncontrolledValue, setUncontrolledValue] = useState(fallbackValue)
  const isControlled = modelValue !== undefined
  const activeValue = isControlled ? modelValue : uncontrolledValue

  const updateActiveValue = (value: string) => {
    if (!isControlled) {
      setUncontrolledValue(value)
    }
    onUpdateModelValue?.(value)
  }

  return (
    <section className={cn("subheader", className)} data-runtime-component="Subheader">
      {breadcrumbs.length ? (
        <nav className="subheader__breadcrumbs" aria-label="breadcrumb">
          {breadcrumbs.map((item, index) => (
            <span key={item.key ?? `${index}`} className="subheader__breadcrumb-item">
              {item.href ? (
                <a href={item.href} className="subheader__breadcrumb-link">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 ? (
                <span className="subheader__breadcrumb-separator">/</span>
              ) : null}
            </span>
          ))}
        </nav>
      ) : null}

      {tabs.length ? (
        <div className="subheader__tabs" role="tablist" aria-label="subheader tabs">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              disabled={item.disabled}
              aria-selected={activeValue === item.id}
              className={cn("subheader__tab", activeValue === item.id && "subheader__tab--active")}
              onClick={() => updateActiveValue(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}
