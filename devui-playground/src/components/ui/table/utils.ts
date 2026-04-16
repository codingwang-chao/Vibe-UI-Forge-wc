import type { ReactNode } from "react"
import type {
  ColumnProps,
  FilterConfig,
  ResolvedColumn,
  RowKeyType,
  SortDirection,
  TreeRow,
} from "./types"

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function formatWidth(width: number | string | undefined) {
  if (width === undefined || width === "") {
    return undefined
  }
  if (typeof width === "number") {
    return width
  }
  const parsed = Number.parseInt(width, 10)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function getRowIdentity(
  row: Record<string, unknown>,
  rowKey: RowKeyType,
  index?: number
) {
  if (typeof rowKey === "function") {
    return rowKey(row, index)
  }
  const paths = String(rowKey || "id").split(".")
  let current: unknown = row
  for (const key of paths) {
    if (!current || typeof current !== "object") {
      return `${index ?? ""}`
    }
    current = (current as Record<string, unknown>)[key]
  }
  return `${current ?? index ?? ""}`
}

export function getByPath(row: Record<string, unknown>, field?: string) {
  if (!field) {
    return undefined
  }
  return field.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined
    }
    return (current as Record<string, unknown>)[key]
  }, row)
}

export function flattenColumns(columns: ResolvedColumn[]) {
  const result: ResolvedColumn[] = []
  const walk = (items: ResolvedColumn[]) => {
    for (const item of items) {
      if (item.children.length) {
        walk(item.children)
      } else {
        result.push(item)
      }
    }
  }
  walk(columns)
  return result
}

export function buildHeaderRows(columns: ResolvedColumn[]) {
  const maxDepth = Math.max(0, ...columns.map((column) => getDepth(column)))
  const rows: ResolvedColumn[][] = Array.from(
    { length: maxDepth + 1 },
    () => []
  )

  const visit = (items: ResolvedColumn[], depth: number) => {
    for (const item of items) {
      item.depth = depth
      item.colSpan = item.children.length ? leafCount(item) : 1
      item.rowSpan = item.children.length ? 1 : maxDepth - depth + 1
      rows[depth].push(item)
      if (item.children.length) {
        visit(item.children, depth + 1)
      }
    }
  }

  visit(columns, 0)
  return rows
}

export function leafCount(column: ResolvedColumn): number {
  if (!column.children.length) {
    return 1
  }
  return column.children.reduce((total, child) => total + leafCount(child), 0)
}

function getDepth(column: ResolvedColumn): number {
  if (!column.children.length) {
    return column.depth
  }
  return Math.max(
    column.depth,
    ...column.children.map((child) => getDepth(child))
  )
}

export function flattenTreeRows(
  data: Record<string, unknown>[],
  rowKey: RowKeyType,
  expandedKeys: Set<string>
): TreeRow[] {
  const rows: TreeRow[] = []

  const walk = (items: Record<string, unknown>[], level: number) => {
    items.forEach((row, index) => {
      const identity = getRowIdentity(row, rowKey, index)
      const children = Array.isArray(row.children)
        ? (row.children as Record<string, unknown>[])
        : []
      const hasChildren = children.length > 0
      const expanded = expandedKeys.has(identity)
      rows.push({ row, level, hasChildren, expanded, identity })
      if (hasChildren && expanded) {
        walk(children, level + 1)
      }
    })
  }

  walk(data, 0)
  return rows
}

export function applySort(
  rows: Record<string, unknown>[],
  activeColumn: ResolvedColumn | undefined,
  direction: SortDirection
) {
  if (!activeColumn || !direction) {
    return [...rows]
  }
  const sorted = [...rows]
  sorted.sort((a, b) => {
    const sortResult = activeColumn.sortMethod
      ? activeColumn.sortMethod(a, b)
      : compareValues(
          getByPath(a, activeColumn.field),
          getByPath(b, activeColumn.field)
        )
    if (direction === "ASC") {
      return sortResult ? 1 : -1
    }
    return sortResult ? -1 : 1
  })
  return sorted
}

function compareValues(left: unknown, right: unknown) {
  if (left === right) {
    return false
  }
  if (left === undefined || left === null) {
    return true
  }
  if (right === undefined || right === null) {
    return false
  }
  return String(left) > String(right)
}

export function normalizeFilterList(list: FilterConfig[] | undefined) {
  return (list || []).map((item) => ({ ...item }))
}

export function getSelectedFilterValues(list: FilterConfig[]) {
  return list.filter((item) => item.checked).map((item) => item.value)
}

export function isValueMatchedFilter(value: unknown, filters: unknown[]) {
  if (!filters.length) {
    return true
  }
  return filters.some((filter) => `${filter}` === `${value}`)
}

export function toStyleValue(value: number | string | undefined) {
  if (value === undefined || value === "") {
    return undefined
  }
  return typeof value === "number" ? `${value}px` : value
}

export function renderHeaderContent(header: ColumnProps["header"]) {
  if (typeof header === "function") {
    return header
  }
  return header ?? ""
}

export function textFromNode(node: ReactNode) {
  if (typeof node === "string" || typeof node === "number") {
    return `${node}`
  }
  return ""
}
