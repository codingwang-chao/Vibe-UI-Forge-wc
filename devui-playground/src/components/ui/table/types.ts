import type { ReactNode } from "react"

export type TableSize = "sm" | "md" | "lg"
export type BorderType = "" | "bordered" | "borderless"
export type RowKeyType =
  | string
  | ((row: Record<string, unknown>, index?: number) => string)
export type SortDirection = "ASC" | "DESC" | ""
export type ColumnAlign = "left" | "center" | "right"
export type ColumnType = "checkable" | "index" | "expand" | "editable" | ""

export interface FilterConfig {
  name: string
  value: unknown
  checked?: boolean
}

export type SpanMethod = (data: {
  row: unknown
  column: unknown
  rowIndex: number
  columnIndex: number
}) => number[] | { rowspan: number; colspan: number } | void

export interface ColumnProps {
  type?: ColumnType
  header?: ReactNode | (() => ReactNode)
  field?: string
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  formatter?: (
    row: Record<string, unknown>,
    column: ColumnFormatterColumn,
    cellValue: unknown,
    rowIndex: number
  ) => ReactNode
  order?: number
  sortable?: boolean
  sortDirection?: SortDirection
  sortMethod?: (
    a: Record<string, unknown>,
    b: Record<string, unknown>
  ) => boolean
  filterable?: boolean
  filterMultiple?: boolean
  filterList?: FilterConfig[]
  fixedLeft?: string
  fixedRight?: string
  align?: ColumnAlign
  showOverflowTooltip?: boolean
  checkable?: (row: unknown, rowIndex: number) => boolean
  resizeable?: boolean
  reserveCheck?: boolean
  cellClass?: string
  children?:
    | ReactNode
    | ((scope: {
        row: Record<string, unknown>
        rowIndex: number
        column: ResolvedColumn
        cellValue: unknown
      }) => ReactNode)
}

export interface TableProps {
  data?: Record<string, unknown>[]
  striped?: boolean
  scrollable?: boolean
  maxWidth?: string
  maxHeight?: string
  tableWidth?: string
  tableHeight?: string
  size?: TableSize
  rowHoveredHighlight?: boolean
  fixHeader?: boolean
  checkable?: boolean
  tableLayout?: "fixed" | "auto"
  showLoading?: boolean
  headerBg?: boolean
  spanMethod?: SpanMethod
  borderType?: BorderType
  empty?: ReactNode
  showHeader?: boolean
  rowKey?: RowKeyType
  defaultExpandAll?: boolean
  expandRowKeys?: string[]
  indent?: number
  lazy?: boolean
  children?: ReactNode
  onSortChange?: (payload: { field?: string; direction: SortDirection }) => void
  onCellClick?: (payload: {
    rowIndex: number
    columnIndex: number
    column: ResolvedColumn
    row: Record<string, unknown>
  }) => void
  onRowClick?: (payload: { row: Record<string, unknown> }) => void
  onCheckChange?: (payload: {
    row: Record<string, unknown>
    checked: boolean
    checkedRows: Record<string, unknown>[]
  }) => void
  onCheckAllChange?: (payload: {
    checked: boolean
    checkedRows: Record<string, unknown>[]
  }) => void
  onExpandChange?: (payload: {
    row: Record<string, unknown>
    expandedRows: Record<string, unknown>[]
  }) => void
  onLoadMore?: () => void
}

export interface ResolvedColumn {
  id: string
  depth: number
  parentId?: string
  children: ResolvedColumn[]
  leafCount: number
  rowSpan: number
  colSpan: number
  type: ColumnType
  header?: ReactNode | (() => ReactNode)
  field?: string
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  formatter?: ColumnProps["formatter"]
  order?: number
  sortable?: boolean
  sortDirection?: SortDirection
  sortMethod?: ColumnProps["sortMethod"]
  filterable?: boolean
  filterMultiple?: boolean
  filterList?: FilterConfig[]
  fixedLeft?: string
  fixedRight?: string
  align?: ColumnAlign
  showOverflowTooltip?: boolean
  checkable?: ColumnProps["checkable"]
  resizeable?: boolean
  reserveCheck?: boolean
  cellClass?: string
  childrenRenderer?: (scope: {
    row: Record<string, unknown>
    rowIndex: number
    column: ResolvedColumn
    cellValue: unknown
  }) => ReactNode
}

export type ColumnFormatterColumn = Omit<
  ResolvedColumn,
  "children" | "childrenRenderer"
>

export interface TreeRow {
  row: Record<string, unknown>
  level: number
  hasChildren: boolean
  expanded: boolean
  identity: string
}
