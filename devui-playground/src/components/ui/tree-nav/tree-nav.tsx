import { useMemo, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { ScaffoldTreeNode } from "@/components/ui/scaffold/types"
import "./tree-nav.css"

export type TreeNavNode = ScaffoldTreeNode

export type TreeNavProps = {
  title?: string
  data: TreeNavNode[]
  selectedKey?: string
  height?: string | number
  className?: string
  emptyState?: ReactNode
  onSelectKey?: (key: string) => void
}

function hasSelected(node: TreeNavNode, selectedKey: string): boolean {
  if (node.key === selectedKey) {
    return true
  }
  return (node.children ?? []).some((child) => hasSelected(child, selectedKey))
}

export function TreeNav({
  title,
  data,
  selectedKey,
  height = 360,
  className,
  emptyState,
  onSelectKey,
}: TreeNavProps) {
  const resolvedHeight = useMemo(
    () => (typeof height === "number" ? `${height}px` : height),
    [height]
  )

  const renderNodes = (nodes: TreeNavNode[], depth = 0): ReactNode => {
    if (!nodes.length) {
      return null
    }

    return (
      <ul className="tree-nav__list" data-depth={depth}>
        {nodes.map((node) => {
          const isSelected = selectedKey === node.key
          const hasChildren = Boolean(node.children?.length)
          const expanded = selectedKey ? hasSelected(node, selectedKey) || depth === 0 : depth === 0

          return (
            <li key={node.key} className="tree-nav__item">
              <button
                type="button"
                disabled={node.disabled}
                className={cn("tree-nav__node", isSelected && "tree-nav__node--active")}
                onClick={() => onSelectKey?.(node.key)}
              >
                {node.label}
              </button>
              {hasChildren && expanded ? renderNodes(node.children ?? [], depth + 1) : null}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <aside className={cn("tree-nav", className)} data-runtime-component="TreeNav">
      {title ? <div className="tree-nav__title">{title}</div> : null}
      <div className="tree-nav__panel" style={{ height: resolvedHeight }}>
        {data.length ? renderNodes(data) : <div className="tree-nav__empty">{emptyState ?? "暂无树节点"}</div>}
      </div>
    </aside>
  )
}
