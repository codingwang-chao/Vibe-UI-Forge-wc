import { useMemo, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { ScaffoldNavItem } from "@/components/ui/scaffold/types"
import "./sidebar-nav.css"

export type SidebarNavItem = ScaffoldNavItem

export type SidebarNavProps = {
  title?: string
  subtitle?: string
  items: SidebarNavItem[]
  selectedKeys?: string[]
  openKeys?: string[]
  className?: string
  emptyState?: ReactNode
  onSelectKey?: (key: string) => void
}

function hasSelectedDescendant(node: SidebarNavItem, selected: Set<string>): boolean {
  if (selected.has(node.key)) {
    return true
  }
  return (node.children ?? []).some((child) => hasSelectedDescendant(child, selected))
}

export function SidebarNav({
  title,
  subtitle,
  items,
  selectedKeys = [],
  openKeys,
  className,
  emptyState,
  onSelectKey,
}: SidebarNavProps) {
  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys])

  const renderItems = (navItems: SidebarNavItem[], depth = 0): ReactNode => {
    if (!navItems.length) {
      return null
    }

    return (
      <ul className="sidebar-nav__list" data-depth={depth}>
        {navItems.map((item) => {
          const isSelected = selectedSet.has(item.key)
          const hasChildren = Boolean(item.children?.length)
          const shouldOpen = openKeys
            ? openKeys.includes(item.key)
            : hasSelectedDescendant(item, selectedSet) || depth === 0

          return (
            <li key={item.key} className="sidebar-nav__item">
              <button
                type="button"
                disabled={item.disabled}
                className={cn(
                  "sidebar-nav__entry",
                  isSelected && "sidebar-nav__entry--active"
                )}
                onClick={() => onSelectKey?.(item.key)}
              >
                {item.label}
              </button>
              {hasChildren && shouldOpen ? renderItems(item.children ?? [], depth + 1) : null}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <aside className={cn("sidebar-nav", className)} data-runtime-component="SidebarNav">
      {title ? <div className="sidebar-nav__title">{title}</div> : null}
      {subtitle ? <div className="sidebar-nav__subtitle">{subtitle}</div> : null}
      {items.length ? renderItems(items) : <div className="sidebar-nav__empty">{emptyState ?? "暂无导航数据"}</div>}
    </aside>
  )
}
