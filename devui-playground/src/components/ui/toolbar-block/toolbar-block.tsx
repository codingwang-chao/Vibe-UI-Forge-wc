import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select } from "@/components/ui/select"
import { Tag } from "@/components/ui/tag"
import type { SelectModelValue, SelectOptionItem } from "@/components/ui/select"
import "./toolbar-block.css"

export type ToolbarBlockSelectOption = {
  name: string
  value: string | number
}

export type ToolbarBlockTabItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

export type ToolbarBlockFilterTag = {
  id: string
  label: ReactNode
  removable?: boolean
}

export type ToolbarBlockAction = {
  id: string
  label: ReactNode
  icon?: ToolbarBlockIconName
  hidden?: boolean
  onClick?: () => void
}

export type ToolbarBlockViewMode = {
  id: string
  icon: ToolbarBlockIconName
  label: string
  hidden?: boolean
}

type ToolbarBlockIconName =
  | "add"
  | "arrow-down"
  | "search"
  | "setting"
  | "close"
  | "clear"
  | "save"
  | "directory"
  | "list"
  | "tree"
  | "card"
  | "more"

export type ToolbarBlockProps = {
  children?: ReactNode
  className?: string
  scopeLabel?: ReactNode
  scopeOptions?: ToolbarBlockSelectOption[]
  scopeValue?: string | number
  tabs?: ToolbarBlockTabItem[]
  activeTabId?: string
  primaryAction?: ToolbarBlockAction | null
  temporaryFilterLabel?: ReactNode
  temporaryFilterOptions?: ToolbarBlockSelectOption[]
  temporaryFilterValue?: string | number
  filterTags?: ToolbarBlockFilterTag[]
  filterPlaceholder?: ReactNode
  actions?: ToolbarBlockAction[]
  viewModes?: ToolbarBlockViewMode[]
  activeViewModeId?: string
  onTabChange?: (id: string) => void
  onScopeChange?: (value: SelectModelValue) => void
  onTemporaryFilterChange?: (value: SelectModelValue) => void
  onFilterClear?: () => void
  onFilterSave?: () => void
  onFilterDirectory?: () => void
  onViewModeChange?: (id: string) => void
}

const defaultTabs: ToolbarBlockTabItem[] = [
  { id: "backlog", label: "Backlog" },
  { id: "defect", label: "缺陷" },
]

const defaultScopeOptions: ToolbarBlockSelectOption[] = [
  { name: "全部", value: "all" },
  { name: "我的", value: "mine" },
]

const defaultTemporaryFilterOptions: ToolbarBlockSelectOption[] = [
  { name: "临时过滤", value: "temporary" },
  { name: "已保存过滤", value: "saved" },
]

const defaultPrimaryAction: ToolbarBlockAction = {
  id: "create",
  label: "新建",
  icon: "add",
}

const defaultFilterTags: ToolbarBlockFilterTag[] = [
  {
    id: "status",
    label: "状态：新建｜进行中丨已解决！测试中｜已拒绝",
    removable: false,
  },
]

const defaultActions: ToolbarBlockAction[] = [
  { id: "table-settings", label: "表格设置", icon: "setting" },
  { id: "more", label: "更多", icon: "more" },
]

const defaultViewModes: ToolbarBlockViewMode[] = [
  { id: "list", icon: "list", label: "列表视图" },
  { id: "tree", icon: "tree", label: "树视图" },
  { id: "card", icon: "card", label: "卡片视图" },
]

function reactNodeToOptionName(value: ReactNode, fallback: string) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }

  return fallback
}

function ToolbarSelect({
  value,
  options,
  onChange,
}: {
  value: string | number
  options: SelectOptionItem[]
  onChange?: (value: SelectModelValue) => void
}) {
  return (
    <div className="toolbar-block__select-control">
      <Select
        modelValue={value}
        options={options}
        showGlowStyle={false}
        onUpdateModelValue={onChange}
      />
    </div>
  )
}

function ToolbarSeparator() {
  return (
    <Separator
      aria-hidden="true"
      className="toolbar-block__separator"
      orientation="vertical"
    />
  )
}

export function ToolbarBlock({
  children,
  className,
  scopeLabel = "全部",
  scopeOptions,
  scopeValue = "all",
  tabs = defaultTabs,
  activeTabId = "backlog",
  primaryAction = defaultPrimaryAction,
  temporaryFilterLabel = "临时过滤",
  temporaryFilterOptions,
  temporaryFilterValue = "temporary",
  filterTags = defaultFilterTags,
  filterPlaceholder = "点击此处添加筛选条件",
  actions = defaultActions,
  viewModes = defaultViewModes,
  activeViewModeId = "list",
  onTabChange,
  onScopeChange,
  onTemporaryFilterChange,
  onFilterClear,
  onFilterSave,
  onFilterDirectory,
  onViewModeChange,
}: ToolbarBlockProps) {
  const resolvedScopeOptions = scopeOptions ?? [
    {
      name: reactNodeToOptionName(scopeLabel, "全部"),
      value: scopeValue,
    },
    ...defaultScopeOptions.filter((option) => option.value !== scopeValue),
  ]
  const resolvedTemporaryFilterOptions = temporaryFilterOptions ?? [
    {
      name: reactNodeToOptionName(temporaryFilterLabel, "临时过滤"),
      value: temporaryFilterValue,
    },
    ...defaultTemporaryFilterOptions.filter(
      (option) => option.value !== temporaryFilterValue
    ),
  ]

  if (children) {
    return (
      <section
        className={cn("toolbar-block toolbar-block--custom", className)}
        data-runtime-component="ToolbarBlock"
      >
        {children}
      </section>
    )
  }

  return (
    <section
      className={cn("toolbar-block", className)}
      data-figma-node-id="3665:10320"
      data-runtime-component="ToolbarBlock"
    >
      <div className="toolbar-block__left">
        <ToolbarSelect
          value={scopeValue}
          options={resolvedScopeOptions}
          onChange={onScopeChange}
        />
        {tabs.length ? (
          <div className="toolbar-block__tabs" role="tablist">
            {tabs.map((tab) => {
              const active = tab.id === activeTabId

              return (
                <Button
                  aria-selected={active}
                  className={cn(
                    "toolbar-block__tab",
                    active && "toolbar-block__tab--active"
                  )}
                  disabled={tab.disabled}
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  role="tab"
                  size="sm"
                  type="button"
                  variant="text"
                >
                  <span>{tab.label}</span>
                </Button>
              )
            })}
          </div>
        ) : null}
      </div>

      <ToolbarSeparator />

      <div className="toolbar-block__main">
        {primaryAction ? (
          <Button
            className="toolbar-block__primary-button"
            icon={primaryAction.icon}
            onClick={primaryAction.onClick}
            size="md"
            type="button"
            variant="solid"
          >
            {primaryAction.label}
          </Button>
        ) : null}

        <ToolbarSelect
          value={temporaryFilterValue}
          options={resolvedTemporaryFilterOptions}
          onChange={onTemporaryFilterChange}
        />

        <Input
          className="toolbar-block__filter-input"
          placeholder={reactNodeToOptionName(
            filterPlaceholder,
            "点击此处添加筛选条件"
          )}
          prefix={
            <span className="toolbar-block__filter-prefix">
              <Button
                aria-hidden="true"
                className="toolbar-block__decorative-icon"
                icon="search"
                size="icon"
                tabIndex={-1}
                type="button"
                variant="text"
              />
              {filterTags.map((tag) => (
                <Tag
                  className="toolbar-block__filter-tag"
                  closable={tag.removable}
                  key={tag.id}
                  showIcon={false}
                  size="md"
                >
                  {tag.label}
                </Tag>
              ))}
            </span>
          }
          showGlowStyle={false}
          size="md"
          suffix={
            <span className="toolbar-block__filter-actions">
              <ToolbarSeparator />
              <Button
                aria-label="清空筛选"
                className="toolbar-block__icon-button"
                icon="clear"
                onClick={onFilterClear}
                size="icon"
                type="button"
                variant="text"
              />
              <Button
                aria-label="保存筛选"
                className="toolbar-block__icon-button"
                icon="save"
                onClick={onFilterSave}
                size="icon"
                type="button"
                variant="text"
              />
              <Button
                aria-label="筛选目录"
                className="toolbar-block__icon-button"
                icon="directory"
                onClick={onFilterDirectory}
                size="icon"
                type="button"
                variant="text"
              />
            </span>
          }
        />

        <div className="toolbar-block__actions">
          {actions
            .filter((action) => !action.hidden)
            .map((action) => (
              <Button
                className="toolbar-block__text-action"
                icon={action.icon}
                key={action.id}
                onClick={action.onClick}
                size="sm"
                type="button"
                variant="text"
              >
                {action.label}
              </Button>
            ))}
        </div>
      </div>

      <ToolbarSeparator />

      <div className="toolbar-block__view-switch" role="tablist">
        {viewModes
          .filter((mode) => !mode.hidden)
          .map((mode) => {
            const active = mode.id === activeViewModeId

            return (
              <Button
                aria-label={mode.label}
                aria-selected={active}
                className={cn(
                  "toolbar-block__view-button",
                  active && "toolbar-block__view-button--active"
                )}
                icon={mode.icon}
                key={mode.id}
                onClick={() => onViewModeChange?.(mode.id)}
                role="tab"
                size="icon"
                type="button"
                variant="text"
              />
            )
          })}
      </div>
    </section>
  )
}
