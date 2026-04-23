import { ButtonIcon } from "@/components/ui/button/button-icon"
import { cn } from "@/lib/utils"
import "./toolchain-sidebar.css"

export type ToolchainSidebarItem = {
  id: string
  label: string
  iconTone?: string
  children?: ToolchainSidebarItem[]
}

export type ToolchainSidebarProps = {
  className?: string
  projectName?: string
  items?: ToolchainSidebarItem[]
  activeId?: string
  openIds?: string[]
}

const defaultItems: ToolchainSidebarItem[] = [
  { id: "dashboard", label: "仪表盘", iconTone: "purple" },
  {
    id: "work-item",
    label: "工作项",
    iconTone: "orange",
    children: [
      { id: "requirement", label: "需求管理", iconTone: "slate" },
      { id: "defect", label: "缺陷管理", iconTone: "gray" },
    ],
  },
  { id: "modeling", label: "软件建模", iconTone: "green" },
  { id: "code", label: "代码", iconTone: "blue" },
  { id: "delivery", label: "持续交付", iconTone: "cyan" },
  { id: "artifact", label: "制品仓库", iconTone: "yellow" },
  { id: "test", label: "测试", iconTone: "lime" },
  { id: "wiki", label: "知识库", iconTone: "pink" },
]

function SidebarGlyph({ tone }: { tone?: string }) {
  return (
    <span
      className={cn("toolchain-sidebar__glyph", tone && `toolchain-sidebar__glyph--${tone}`)}
      aria-hidden="true"
    />
  )
}

export function ToolchainSidebar({
  className,
  projectName = "DevOps全流程示例项目",
  items = defaultItems,
  activeId = "requirement",
  openIds = ["work-item"],
}: ToolchainSidebarProps) {
  const renderItem = (item: ToolchainSidebarItem, depth = 0) => {
    const isActive = item.id === activeId
    const isOpen = openIds.includes(item.id)
    const hasChildren = Boolean(item.children?.length)

    return (
      <li key={item.id} className="toolchain-sidebar__item">
        <button
          type="button"
          className={cn(
            "toolchain-sidebar__entry",
            depth > 0 && "toolchain-sidebar__entry--child",
            isActive && "toolchain-sidebar__entry--active"
          )}
        >
          <SidebarGlyph tone={item.iconTone} />
          <span>{item.label}</span>
          {hasChildren ? (
            <ButtonIcon
              className={cn("toolchain-sidebar__chevron", isOpen && "toolchain-sidebar__chevron--open")}
              name="chevron-down"
            />
          ) : null}
        </button>
        {hasChildren && isOpen ? (
          <ul className="toolchain-sidebar__children">
            {item.children?.map((child) => renderItem(child, depth + 1))}
          </ul>
        ) : null}
      </li>
    )
  }

  return (
    <aside
      className={cn("toolchain-sidebar", className)}
      data-runtime-component="ToolchainSidebar"
    >
      <div className="toolchain-sidebar__top">
        <button type="button" className="toolchain-sidebar__project">
          <span className="toolchain-sidebar__project-mark" aria-hidden="true">
            D
          </span>
          <span className="toolchain-sidebar__project-name">{projectName}</span>
          <ButtonIcon name="chevron-down" />
        </button>
        <span className="toolchain-sidebar__rule" aria-hidden="true" />
        <nav aria-label="工具链导航">
          <ul className="toolchain-sidebar__list">{items.map((item) => renderItem(item))}</ul>
        </nav>
      </div>
      <button type="button" className="toolchain-sidebar__collapse" aria-label="收起侧边栏">
        <ButtonIcon name="list" />
      </button>
    </aside>
  )
}
