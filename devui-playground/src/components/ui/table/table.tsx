import * as React from "react"
import { Column } from "./column"
import type {
  ColumnProps,
  ResolvedColumn,
  TableProps,
  SortDirection,
} from "./types"
import {
  applySort,
  buildHeaderRows,
  cx,
  flattenColumns,
  flattenTreeRows,
  getByPath,
  getRowIdentity,
  isValueMatchedFilter,
  normalizeFilterList,
  textFromNode,
  toStyleValue,
} from "./utils"
import "./table.css"

function getColumnId(column: ColumnProps, index: number, path: string[]) {
  const headerText =
    typeof column.header === "function" ? "" : textFromNode(column.header)
  const seed = [
    column.type || "default",
    column.field || "field",
    headerText || "header",
    String(index),
    ...path,
  ].join("_")
  return seed.replace(/\s+/g, "_")
}

function isColumnElement(
  node: React.ReactNode
): node is React.ReactElement<ColumnProps> {
  return React.isValidElement(node) && node.type === Column
}

function collectColumns(
  nodes: React.ReactNode,
  depth = 0,
  path: string[] = []
): ResolvedColumn[] {
  return React.Children.toArray(nodes)
    .filter(isColumnElement)
    .map((node, index) => {
      const props = node.props
      const children =
        typeof props.children === "function"
          ? []
          : collectColumns(props.children, depth + 1, [...path, String(index)])
      return {
        id: getColumnId(props, index, path),
        depth,
        parentId: path.length ? path[path.length - 1] : undefined,
        children,
        leafCount: 0,
        rowSpan: 1,
        colSpan: 1,
        type: props.type || "",
        header: props.header,
        field: props.field,
        width: props.width,
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        formatter: props.formatter,
        order: props.order,
        sortable: props.sortable,
        sortDirection: props.sortDirection || "",
        sortMethod: props.sortMethod,
        filterable: props.filterable,
        filterMultiple: props.filterMultiple,
        filterList: normalizeFilterList(props.filterList),
        fixedLeft: props.fixedLeft,
        fixedRight: props.fixedRight,
        align: props.align || "left",
        showOverflowTooltip: props.showOverflowTooltip,
        checkable: props.checkable,
        resizeable: props.resizeable,
        reserveCheck: props.reserveCheck,
        cellClass: props.cellClass || "",
        childrenRenderer:
          typeof props.children === "function" ? props.children : undefined,
      } satisfies ResolvedColumn
    })
}

function createLeafSnapshot(columns: ResolvedColumn[]) {
  const ordered = [...columns].sort(
    (left, right) => (left.order ?? 0) - (right.order ?? 0)
  )
  const leaves = flattenColumns(ordered)
  return { ordered, leaves }
}

function resolveCellValue(
  row: Record<string, unknown>,
  column: ResolvedColumn,
  rowIndex: number
) {
  if (column.type === "index") {
    return rowIndex + 1
  }
  if (column.type === "checkable" || column.type === "expand") {
    return ""
  }
  const raw = getByPath(row, column.field)
  return column.formatter
    ? column.formatter(row, column, raw, rowIndex)
    : (raw ?? "")
}

function renderCellValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) {
    return ""
  }
  if (React.isValidElement(value)) {
    return value
  }
  if (Array.isArray(value)) {
    return value as React.ReactNode
  }
  if (value instanceof Date) {
    return value.toLocaleString()
  }
  if (typeof value === "object") {
    return ""
  }
  return String(value)
}

function compareFilterValues(left: unknown, right: unknown) {
  return `${left}` === `${right}`
}

export function Table({
  data = [],
  striped = false,
  scrollable = false,
  maxWidth,
  maxHeight,
  tableWidth,
  tableHeight,
  size = "sm",
  rowHoveredHighlight = true,
  fixHeader = false,
  checkable = false,
  tableLayout = "fixed",
  showLoading = false,
  headerBg = false,
  spanMethod,
  borderType = "",
  empty = "No Data",
  showHeader = true,
  rowKey = "id",
  defaultExpandAll = false,
  expandRowKeys,
  indent = 16,
  lazy = false,
  children,
  onSortChange,
  onCellClick,
  onRowClick,
  onCheckChange,
  onCheckAllChange,
  onExpandChange,
  onLoadMore,
}: TableProps) {
  const columnTree = React.useMemo(() => {
    return collectColumns(children)
  }, [children])

  const { ordered, leaves } = React.useMemo(
    () => createLeafSnapshot(columnTree),
    [columnTree]
  )
  const headerRows = React.useMemo(() => buildHeaderRows(ordered), [ordered])
  const [activeSort, setActiveSort] = React.useState<{
    columnId: string
    direction: SortDirection
  }>({ columnId: "", direction: "" })
  const [filterState, setFilterState] = React.useState<
    Record<string, unknown[]>
  >({})
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    () => new Set()
  )
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string>>(
    () => new Set(expandRowKeys || [])
  )
  const [openFilterColumnId, setOpenFilterColumnId] = React.useState<
    string | null
  >(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const sentinelRef = React.useRef<HTMLTableRowElement | null>(null)
  const visibleRows = React.useMemo(() => {
    const treeRows = flattenTreeRows(data, rowKey, expandedKeys)
    const filteredRows = treeRows.filter((item) =>
      leaves.every((column) => {
        const filters = filterState[column.id] || []
        if (!column.filterable || !filters.length) {
          return true
        }
        return isValueMatchedFilter(getByPath(item.row, column.field), filters)
      })
    )
    const activeSortColumn = leaves.find(
      (column) => column.id === activeSort.columnId
    )
    const sortedRows = applySort(
      filteredRows.map((item) => item.row),
      activeSortColumn,
      activeSort.direction
    )
    return sortedRows.map((row) => {
      const match = filteredRows.find((item) => item.row === row)
      return (
        match || {
          row,
          level: 0,
          hasChildren: false,
          expanded: false,
          identity: getRowIdentity(row, rowKey),
        }
      )
    })
  }, [
    activeSort.columnId,
    activeSort.direction,
    data,
    expandedKeys,
    filterState,
    leaves,
    rowKey,
  ])

  React.useEffect(() => {
    setExpandedKeys((current) => {
      const next = new Set(current)
      if (defaultExpandAll) {
        data.forEach((row, index) => {
          const identity = getRowIdentity(row, rowKey, index)
          if (
            Array.isArray(row.children) &&
            (row.children as Record<string, unknown>[]).length > 0
          ) {
            next.add(identity)
          }
        })
      }
      if (expandRowKeys?.length) {
        expandRowKeys.forEach((key) => next.add(key))
      }
      return next
    })
  }, [data, defaultExpandAll, expandRowKeys, rowKey])

  React.useEffect(() => {
    if (!lazy || !onLoadMore) {
      return
    }
    const root = containerRef.current
    const sentinel = sentinelRef.current
    if (!root || !sentinel) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore()
        }
      },
      { root }
    )
    observer.observe(sentinel)
    return () => {
      observer.disconnect()
    }
  }, [lazy, onLoadMore])

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!openFilterColumnId) {
        return
      }
      const target = event.target as Node
      const host = containerRef.current
      if (host && !host.contains(target)) {
        setOpenFilterColumnId(null)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [openFilterColumnId])

  const handleSort = (column: ResolvedColumn) => {
    const nextDirection: SortDirection =
      activeSort.columnId !== column.id
        ? "ASC"
        : activeSort.direction === "ASC"
          ? "DESC"
          : ""
    setActiveSort({
      columnId: nextDirection ? column.id : "",
      direction: nextDirection,
    })
    onSortChange?.({ field: column.field, direction: nextDirection })
  }

  const handleFilterChange = (
    column: ResolvedColumn,
    value: unknown,
    multiple: boolean
  ) => {
    setFilterState((current) => {
      const currentValues = current[column.id] || []
      const normalized = multiple
        ? currentValues.some((item) => compareFilterValues(item, value))
          ? currentValues.filter((item) => !compareFilterValues(item, value))
          : [...currentValues, value]
        : compareFilterValues(currentValues[0], value)
          ? []
          : [value]
      return { ...current, [column.id]: normalized }
    })
  }

  const toggleRowSelection = (row: Record<string, unknown>, index: number) => {
    const identity = getRowIdentity(row, rowKey, index)
    setSelectedKeys((current) => {
      const next = new Set(current)
      if (next.has(identity)) {
        next.delete(identity)
      } else {
        next.add(identity)
      }
      onCheckChange?.({
        row,
        checked: next.has(identity),
        checkedRows: visibleRows
          .filter((item) => next.has(item.identity))
          .map((item) => item.row),
      })
      return next
    })
  }

  const toggleAllSelection = () => {
    const selectable = visibleRows
      .filter((item) => item.row)
      .map((item) => item.identity)
    const next = new Set(selectedKeys)
    const shouldSelectAll = selectable.some((identity) => !next.has(identity))
    if (shouldSelectAll) {
      selectable.forEach((identity) => next.add(identity))
    } else {
      selectable.forEach((identity) => next.delete(identity))
    }
    setSelectedKeys(next)
    onCheckAllChange?.({
      checked: shouldSelectAll,
      checkedRows: visibleRows
        .filter((item) => next.has(item.identity))
        .map((item) => item.row),
    })
  }

  const toggleExpand = (row: Record<string, unknown>, index: number) => {
    const identity = getRowIdentity(row, rowKey, index)
    setExpandedKeys((current) => {
      const next = new Set(current)
      if (next.has(identity)) {
        next.delete(identity)
      } else {
        next.add(identity)
      }
      const expandedRows = data.filter((entry, entryIndex) =>
        next.has(getRowIdentity(entry, rowKey, entryIndex))
      )
      onExpandChange?.({ row, expandedRows })
      return next
    })
  }

  const spanMap = React.useMemo(() => {
    const map = new Map<string, { rowspan: number; colspan: number }>()
    if (!spanMethod) {
      return map
    }
    visibleRows.forEach((item, rowIndex) => {
      leaves.forEach((column, columnIndex) => {
        const result = spanMethod({
          row: item.row,
          column,
          rowIndex,
          columnIndex,
        })
        if (!result) {
          return
        }
        const rowspan = Array.isArray(result) ? result[0] : result.rowspan
        const colspan = Array.isArray(result) ? result[1] : result.colspan
        if (rowspan > 1 || colspan > 1) {
          map.set(`${rowIndex}-${columnIndex}`, { rowspan, colspan })
        }
      })
    })
    return map
  }, [leaves, spanMethod, visibleRows])

  const removedCells = React.useMemo(() => {
    const cells = new Set<string>()
    for (const [key, span] of spanMap.entries()) {
      const [rowIndex, columnIndex] = key.split("-").map(Number)
      for (let r = 0; r < span.rowspan; r += 1) {
        for (let c = 0; c < span.colspan; c += 1) {
          if (r === 0 && c === 0) {
            continue
          }
          cells.add(`${rowIndex + r}-${columnIndex + c}`)
        }
      }
    }
    return cells
  }, [spanMap])

  const headerCheckboxState = React.useMemo(() => {
    const selectable = visibleRows.length
    const checkedCount = visibleRows.filter((item) =>
      selectedKeys.has(item.identity)
    ).length
    return {
      checked: selectable > 0 && checkedCount === selectable,
      indeterminate: checkedCount > 0 && checkedCount < selectable,
    }
  }, [selectedKeys, visibleRows])

  const classes = cx(
    "devui-table__view",
    striped && "devui-table--striped",
    headerBg && "devui-table--header-bg",
    tableLayout === "auto" && "devui-table--layout-auto",
    size === "sm" && "devui-table--sm",
    size === "md" && "devui-table--md",
    size === "lg" && "devui-table--lg",
    borderType === "bordered" && "devui-table--bordered",
    borderType === "borderless" && "devui-table--borderless"
  )

  const tableStyle: React.CSSProperties = {
    maxHeight,
    maxWidth,
    height: tableHeight,
    width: tableWidth,
    tableLayout,
  }

  const tableNode = (
    <table
      className={classes}
      style={tableStyle}
      cellPadding={0}
      cellSpacing={0}
    >
      <colgroup>
        {leaves.map((column) => (
          <col
            key={column.id}
            style={{
              width: toStyleValue(column.width),
              minWidth: toStyleValue(column.minWidth),
              maxWidth: toStyleValue(column.maxWidth),
            }}
          />
        ))}
      </colgroup>
      {showHeader && (
        <thead className="devui-table__thead">
          {headerRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => {
                const isLastStickyLeft =
                  column.fixedLeft && !row[columnIndex + 1]?.fixedLeft
                const isFirstStickyRight =
                  column.fixedRight && !row[columnIndex - 1]?.fixedRight
                const isFilterOpen = openFilterColumnId === column.id
                const sortActive = activeSort.columnId === column.id
                return (
                  <th
                    key={column.id}
                    className={cx(
                      column.type === "checkable" &&
                        "devui-table__checkable-cell",
                      column.type === "index" && "devui-table__index-cell",
                      column.type === "expand" && "devui-table__expand-cell",
                      column.align === "center" && "is-center",
                      column.align === "right" && "is-right",
                      column.fixedLeft && "devui-table--sticky-cell left",
                      column.fixedRight && "devui-table--sticky-cell right",
                      isLastStickyLeft && "devui-table--last-sticky-left",
                      isFirstStickyRight && "devui-table--first-sticky-right",
                      (column.sortable ||
                        column.filterable ||
                        column.resizeable) &&
                        "operable",
                      column.resizeable && "resizeable",
                      sortActive && "sort-active",
                      isFilterOpen && "filter-active"
                    )}
                    rowSpan={column.rowSpan}
                    colSpan={column.colSpan}
                    style={{
                      left: column.fixedLeft,
                      right: column.fixedRight,
                      position:
                        column.fixedLeft || column.fixedRight
                          ? "sticky"
                          : undefined,
                    }}
                    onClick={() => {
                      if (column.sortable) {
                        handleSort(column)
                      }
                    }}
                  >
                    <div className="header-container">
                      <span className="title">
                        {column.type === "checkable" ? (
                          <input
                            type="checkbox"
                            checked={headerCheckboxState.checked}
                            ref={(node) => {
                              if (node) {
                                node.indeterminate =
                                  headerCheckboxState.indeterminate
                              }
                            }}
                            onChange={(event) => {
                              event.stopPropagation()
                              toggleAllSelection()
                            }}
                          />
                        ) : column.type === "index" ? (
                          "#"
                        ) : column.type === "expand" ? (
                          ""
                        ) : typeof column.header === "function" ? (
                          column.header()
                        ) : (
                          (column.header ?? column.field ?? "")
                        )}
                      </span>
                      {column.filterable && (
                        <button
                          type="button"
                          className={cx(
                            "filter-icon",
                            isFilterOpen && "is-open"
                          )}
                          onClick={(event) => {
                            event.stopPropagation()
                            setOpenFilterColumnId(
                              isFilterOpen ? null : column.id
                            )
                          }}
                        >
                          ⌄
                        </button>
                      )}
                      {column.sortable && (
                        <button
                          type="button"
                          className={cx(
                            "sort-clickable",
                            sortActive && "sort-active"
                          )}
                          aria-label="sort"
                        >
                          <span
                            className={cx(
                              "sort-indicator",
                              activeSort.direction === "ASC" && "asc",
                              activeSort.direction === "DESC" && "desc"
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {column.filterable && isFilterOpen && (
                      <div
                        className="filter-wrapper"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {(column.filterList || []).map((item) => {
                          const selected = (filterState[column.id] || []).some(
                            (value) => compareFilterValues(value, item.value)
                          )
                          return (
                            <button
                              key={`${column.id}-${String(item.value)}`}
                              type="button"
                              className={cx(
                                "filter-item",
                                selected && "is-active"
                              )}
                              onClick={() =>
                                handleFilterChange(
                                  column,
                                  item.value,
                                  Boolean(column.filterMultiple)
                                )
                              }
                            >
                              {item.name}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
      )}
      {!visibleRows.length ? null : (
        <tbody className="devui-table__tbody">
          {visibleRows.map((item, rowIndex) => (
            <React.Fragment key={item.identity}>
              <tr
                className={cx(
                  "devui-table__row",
                  rowHoveredHighlight && "hover-enabled",
                  item.expanded && "expanded",
                  item.level > 0 && `devui-table__row--level-${item.level}`,
                  Array.isArray(item.row.children) &&
                    item.row.children.length > 0 &&
                    "is-tree"
                )}
                onClick={() => onRowClick?.({ row: item.row })}
              >
                {leaves.map((column, columnIndex) => {
                  const cellId = `${rowIndex}-${columnIndex}`
                  if (removedCells.has(cellId)) {
                    return null
                  }
                  const span = spanMap.get(cellId)
                  const cellValue = resolveCellValue(item.row, column, rowIndex)
                  const showTreeToggle =
                    columnIndex === 0 &&
                    Array.isArray(item.row.children) &&
                    (item.row.children as Record<string, unknown>[]).length > 0
                  const isCheckableColumn =
                    checkable || column.type === "checkable"
                  const isExpandColumn = column.type === "expand"
                  return (
                    <td
                      key={`${item.identity}-${column.id}`}
                      rowSpan={span?.rowspan}
                      colSpan={span?.colspan}
                      className={cx(
                        column.cellClass,
                        column.align === "center" && "is-center",
                        column.align === "right" && "is-right",
                        column.fixedLeft && "devui-table--sticky-cell left",
                        column.fixedRight && "devui-table--sticky-cell right",
                        column.type === "checkable" &&
                          "devui-table__checkable-cell",
                        column.type === "index" && "devui-table__index-cell",
                        column.type === "expand" && "devui-table__expand-cell"
                      )}
                      style={{
                        left: column.fixedLeft,
                        right: column.fixedRight,
                        position:
                          column.fixedLeft || column.fixedRight
                            ? "sticky"
                            : undefined,
                      }}
                      title={
                        column.showOverflowTooltip ? `${cellValue}` : undefined
                      }
                      onClick={(event) => {
                        event.stopPropagation()
                        onCellClick?.({
                          rowIndex,
                          columnIndex,
                          column,
                          row: item.row,
                        })
                      }}
                    >
                      <div
                        className="cell-inner"
                        style={{
                          paddingLeft: showTreeToggle
                            ? item.level * indent
                            : undefined,
                        }}
                      >
                        {isCheckableColumn ? (
                          <input
                            type="checkbox"
                            checked={selectedKeys.has(item.identity)}
                            onChange={(event) => {
                              event.stopPropagation()
                              toggleRowSelection(item.row, rowIndex)
                            }}
                          />
                        ) : isExpandColumn ? (
                          <button
                            type="button"
                            className="expand-toggle"
                            onClick={() => toggleExpand(item.row, rowIndex)}
                          >
                            {expandedKeys.has(item.identity) ? "−" : "+"}
                          </button>
                        ) : (
                          <>
                            {showTreeToggle && (
                              <button
                                type="button"
                                className="expand-toggle"
                                onClick={() => toggleExpand(item.row, rowIndex)}
                              >
                                {expandedKeys.has(item.identity) ? "−" : "+"}
                              </button>
                            )}
                            {column.childrenRenderer
                              ? column.childrenRenderer({
                                  row: item.row,
                                  rowIndex,
                                  column,
                                  cellValue,
                                })
                              : renderCellValue(cellValue)}
                          </>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
              {leaves.some((column) => column.type === "expand") &&
                item.expanded &&
                leaves
                  .filter((column) => column.type === "expand")
                  .map((column) => (
                    <tr
                      key={`${item.identity}-expand-${column.id}`}
                      className="expanded"
                    >
                      <td colSpan={leaves.length}>
                        <div className="expand-panel">
                          {typeof column.childrenRenderer === "function"
                            ? column.childrenRenderer({
                                row: item.row,
                                rowIndex,
                                column,
                                cellValue: "",
                              })
                            : "Expanded content"}
                        </div>
                      </td>
                    </tr>
                  ))}
            </React.Fragment>
          ))}
          {lazy && (
            <tr ref={sentinelRef} className="devui-table__lazy-row">
              <td colSpan={leaves.length} />
            </tr>
          )}
        </tbody>
      )}
    </table>
  )

  return (
    <div
      ref={containerRef}
      className={cx(
        "devui-table",
        fixHeader && "devui-table--fix-header",
        scrollable && "devui-table--scrollable"
      )}
      style={{ maxHeight, maxWidth, height: tableHeight, width: tableWidth }}
    >
      <div className="devui-table__container">
        {showLoading && <div className="devui-table__loading">Loading…</div>}
        {visibleRows.length ? (
          tableNode
        ) : (
          <div className="devui-table__empty">{empty}</div>
        )}
      </div>
    </div>
  )
}

export default Table
