import { useMemo, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { ScaffoldNavItem } from "@/components/ui/scaffold/types"
import "./accordion-nav.css"

export type AccordionNavItem = ScaffoldNavItem

export type AccordionNavProps = {
  title?: string
  items: AccordionNavItem[]
  selectedKeys?: string[]
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  className?: string
  onSelectKey?: (key: string) => void
  onExpandedKeysChange?: (keys: string[]) => void
  emptyState?: ReactNode
}

export function AccordionNav({
  title,
  items,
  selectedKeys = [],
  defaultExpandedKeys,
  expandedKeys,
  className,
  onSelectKey,
  onExpandedKeysChange,
  emptyState,
}: AccordionNavProps) {
  const [uncontrolledExpandedKeys, setUncontrolledExpandedKeys] = useState<string[]>(
    defaultExpandedKeys ?? items.map((item) => item.key)
  )

  const activeExpandedKeys = expandedKeys ?? uncontrolledExpandedKeys
  const selectedKeySet = useMemo(() => new Set(selectedKeys), [selectedKeys])

  const updateExpandedKeys = (nextKeys: string[]) => {
    if (expandedKeys === undefined) {
      setUncontrolledExpandedKeys(nextKeys)
    }
    onExpandedKeysChange?.(nextKeys)
  }

  const toggleExpand = (key: string) => {
    const nextKeys = activeExpandedKeys.includes(key)
      ? activeExpandedKeys.filter((value) => value !== key)
      : [...activeExpandedKeys, key]
    updateExpandedKeys(nextKeys)
  }

  const renderItems = (navItems: AccordionNavItem[], depth = 0): ReactNode => {
    if (!navItems.length) {
      return null
    }

    return (
      <ul className="accordion-nav__list" data-depth={depth}>
        {navItems.map((item) => {
          const hasChildren = Boolean(item.children?.length)
          const isExpanded = activeExpandedKeys.includes(item.key)
          const isSelected = selectedKeySet.has(item.key)

          return (
            <li key={item.key} className="accordion-nav__item">
              <div className="accordion-nav__row">
                {hasChildren ? (
                  <button
                    type="button"
                    className="accordion-nav__toggle"
                    onClick={() => toggleExpand(item.key)}
                    aria-label={isExpanded ? "收起" : "展开"}
                  >
                    {isExpanded ? "−" : "+"}
                  </button>
                ) : (
                  <span className="accordion-nav__toggle-placeholder" />
                )}
                <button
                  type="button"
                  disabled={item.disabled}
                  className={cn(
                    "accordion-nav__label",
                    isSelected && "accordion-nav__label--active"
                  )}
                  onClick={() => onSelectKey?.(item.key)}
                >
                  {item.label}
                </button>
              </div>
              {hasChildren && isExpanded ? renderItems(item.children ?? [], depth + 1) : null}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <aside className={cn("accordion-nav", className)} data-runtime-component="AccordionNav">
      {title ? <div className="accordion-nav__title">{title}</div> : null}
      {items.length ? renderItems(items) : <div className="accordion-nav__empty">{emptyState ?? "暂无数据"}</div>}
    </aside>
  )
}
