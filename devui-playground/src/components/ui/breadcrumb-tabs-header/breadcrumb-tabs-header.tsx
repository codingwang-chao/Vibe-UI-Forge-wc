import { cn } from "@/lib/utils"
import "./breadcrumb-tabs-header.css"

export type BreadcrumbTabsHeaderItem = {
  id: string
  label: string
}

export type BreadcrumbTabsHeaderProps = {
  className?: string
  breadcrumbs?: BreadcrumbTabsHeaderItem[]
  tabs?: BreadcrumbTabsHeaderItem[]
  activeTabId?: string
  onTabChange?: (id: string) => void
}

const defaultBreadcrumbs: BreadcrumbTabsHeaderItem[] = [
  { id: "home", label: "首页" },
  { id: "project", label: "De vOps全流程示例项目" },
  { id: "work-item", label: "工作项" },
]

const defaultTabs: BreadcrumbTabsHeaderItem[] = [
  { id: "plan", label: "规划" },
  { id: "work-item", label: "工作项" },
  { id: "iteration", label: "迭代" },
  { id: "stats", label: "统计" },
  { id: "report", label: "报告" },
]

export function BreadcrumbTabsHeader({
  className,
  breadcrumbs = defaultBreadcrumbs,
  tabs = defaultTabs,
  activeTabId = "work-item",
  onTabChange,
}: BreadcrumbTabsHeaderProps) {
  return (
    <section
      className={cn("breadcrumb-tabs-header", className)}
      data-runtime-component="BreadcrumbTabsHeader"
    >
      <nav className="breadcrumb-tabs-header__breadcrumbs" aria-label="面包屑">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <span
              key={item.id}
              className={cn(
                "breadcrumb-tabs-header__breadcrumb",
                isLast && "breadcrumb-tabs-header__breadcrumb--current"
              )}
            >
              <span>{item.label}</span>
              {!isLast ? <span className="breadcrumb-tabs-header__separator">/</span> : null}
            </span>
          )
        })}
      </nav>
      <div className="breadcrumb-tabs-header__tabs" role="tablist" aria-label="工作项导航">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "breadcrumb-tabs-header__tab",
                isActive && "breadcrumb-tabs-header__tab--active"
              )}
              onClick={() => onTabChange?.(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
