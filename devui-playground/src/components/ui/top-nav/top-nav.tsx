import type { ReactNode } from "react"
import { ButtonIcon } from "@/components/ui/button/button-icon"
import { cn } from "@/lib/utils"
import "./top-nav.css"

export type TopNavItem = {
  id: string
  label: string
  iconTone?: "home" | "workbench" | "insight" | "service" | "mirror"
  active?: boolean
  hasDropdown?: boolean
}

export type TopNavProps = {
  className?: string
  brandLabel?: string
  consoleLabel?: string
  regionLabel?: string
  items?: TopNavItem[]
  rightActions?: ReactNode
  userInitials?: string
}

const defaultItems: TopNavItem[] = [
  { id: "home", label: "首页", iconTone: "home" },
  { id: "workbench", label: "工作台", iconTone: "workbench" },
  { id: "insight", label: "效能洞察", iconTone: "insight" },
  { id: "service", label: "服务", iconTone: "service", hasDropdown: true },
  { id: "mirror", label: "华为开源镜像站", iconTone: "mirror" },
]

function ProductIcon({ tone }: { tone?: TopNavItem["iconTone"] }) {
  return (
    <span
      className={cn("top-nav__product-icon", tone && `top-nav__product-icon--${tone}`)}
      aria-hidden="true"
    />
  )
}

function IconAction({ label, icon }: { label: string; icon: string }) {
  return (
    <button type="button" className="top-nav__icon-action" aria-label={label}>
      <ButtonIcon name={icon} />
    </button>
  )
}

export function TopNav({
  className,
  brandLabel = "华为云",
  consoleLabel = "控制台",
  regionLabel = "华北-北京四",
  items = defaultItems,
  rightActions,
  userInitials = "HZ",
}: TopNavProps) {
  return (
    <header className={cn("top-nav", className)} data-runtime-component="TopNav">
      <div className="top-nav__left">
        <button type="button" className="top-nav__menu" aria-label="打开全局导航">
          <span />
          <span />
          <span />
        </button>
        <div className="top-nav__brand" aria-label={brandLabel}>
          <span className="top-nav__brand-mark" aria-hidden="true" />
          <span className="top-nav__brand-text">{brandLabel}</span>
        </div>
        <span className="top-nav__divider" aria-hidden="true" />
        <button type="button" className="top-nav__console">
          {consoleLabel}
        </button>
        <button type="button" className="top-nav__region">
          <span className="top-nav__location-dot" aria-hidden="true" />
          <span>{regionLabel}</span>
          <ButtonIcon name="chevron-down" />
        </button>
        <nav className="top-nav__items" aria-label="全局导航">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn("top-nav__item", item.active && "top-nav__item--active")}
            >
              <ProductIcon tone={item.iconTone} />
              <span>{item.label}</span>
              {item.hasDropdown ? <ButtonIcon name="chevron-down" /> : null}
            </button>
          ))}
        </nav>
      </div>
      <div className="top-nav__right">
        {rightActions ?? (
          <>
            <IconAction label="通知" icon="filter" />
            <IconAction label="刷新" icon="clear" />
            <IconAction label="更多" icon="more-horizontal" />
          </>
        )}
        <span className="top-nav__avatar" aria-label={`当前用户 ${userInitials}`}>
          {userInitials}
        </span>
      </div>
    </header>
  )
}
