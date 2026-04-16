import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import type { ScaffoldTabItem } from "@/components/ui/scaffold/types"
import "./title-tabs-header.css"

export type TitleTabsHeaderItem = ScaffoldTabItem

export type TitleTabsHeaderProps = {
  title: string
  items: TitleTabsHeaderItem[]
  modelValue?: string
  defaultModelValue?: string
  className?: string
  onUpdateModelValue?: (value: string) => void
}

export function TitleTabsHeader({
  title,
  items,
  modelValue,
  defaultModelValue,
  className,
  onUpdateModelValue,
}: TitleTabsHeaderProps) {
  const fallbackValue = useMemo(
    () => defaultModelValue ?? items[0]?.id ?? "",
    [defaultModelValue, items]
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
    <section className={cn("title-tabs-header", className)} data-runtime-component="TitleTabsHeader">
      <div className="title-tabs-header__title">{title}</div>
      <div className="title-tabs-header__tabs" role="tablist" aria-label={title}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            disabled={item.disabled}
            aria-selected={activeValue === item.id}
            className={cn(
              "title-tabs-header__tab",
              activeValue === item.id && "title-tabs-header__tab--active"
            )}
            onClick={() => updateActiveValue(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}
