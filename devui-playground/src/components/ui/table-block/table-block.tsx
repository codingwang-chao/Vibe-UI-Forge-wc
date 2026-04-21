import * as React from "react"
import { ToolbarBlock } from "@/components/ui/toolbar-block"
import { Table } from "@/components/ui/table"
import { Column } from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"
import type { ToolbarBlockProps } from "@/components/ui/toolbar-block"
import type { TableProps } from "@/components/ui/table"
import type { PaginationProps } from "@/components/ui/pagination"
import "./table-block.css"

export type TableBlockToolbarProps = Pick<
  ToolbarBlockProps,
  | "scopeLabel"
  | "scopeOptions"
  | "scopeValue"
  | "tabs"
  | "activeTabId"
  | "primaryAction"
  | "temporaryFilterLabel"
  | "temporaryFilterOptions"
  | "temporaryFilterValue"
  | "filterTags"
  | "filterPlaceholder"
  | "actions"
  | "viewModes"
  | "activeViewModeId"
  | "onTabChange"
  | "onScopeChange"
  | "onTemporaryFilterChange"
  | "onFilterClear"
  | "onFilterSave"
  | "onFilterDirectory"
  | "onViewModeChange"
>

export type TableBlockPaginationProps = Pick<
  PaginationProps,
  | "pageSize"
  | "pageSizeOptions"
  | "totalItems"
  | "showJump"
>

export interface TableBlockRow {
  id: string
  [key: string]: unknown
}

export interface TableBlockColumn {
  field: string
  header: React.ReactNode
  width?: number | string
  minWidth?: number | string
  sortable?: boolean
  filterable?: boolean
  align?: "left" | "center" | "right"
}

export type TableBlockProps = {
  className?: string
  toolbarProps?: TableBlockToolbarProps
  columns: TableBlockColumn[]
  data: TableBlockRow[]
  paginationProps?: TableBlockPaginationProps
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function TableBlock({
  className,
  toolbarProps,
  columns,
  data,
  paginationProps,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onPageSizeChange,
}: TableBlockProps) {
  return (
    <div className={`table-block ${className || ""}`}>
      <ToolbarBlock {...toolbarProps} />

      <div className="table-block__container">
        <Table
          data={data}
          rowKey="id"
          size="sm"
          borderType="bordered"
          striped
          checkable
        >
          <Column type="checkable" width={48} />
          {columns.map((col) => (
            <Column
              key={col.field}
              type="index"
              field={col.field}
              header={col.header}
              width={col.width}
              minWidth={col.minWidth}
              sortable={col.sortable}
              filterable={col.filterable}
              align={col.align}
            />
          ))}
          <Column type="expand" width={80} />
        </Table>
      </div>

      <div className="table-block__pagination">
        <Pagination
          current={currentPage}
          total={totalPages}
          pageSize={paginationProps?.pageSize || 10}
          pageSizeOptions={paginationProps?.pageSizeOptions || [10, 20, 50, 100]}
          totalItems={paginationProps?.totalItems}
          showJump={paginationProps?.showJump}
          onChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  )
}

export default TableBlock