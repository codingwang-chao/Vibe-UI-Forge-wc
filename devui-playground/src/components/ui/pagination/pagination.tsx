import * as React from "react"
import { ButtonIcon } from "@/components/ui/button/button-icon"
import { cn } from "@/lib/utils"
import "./pagination.css"

export interface PaginationProps {
  /** Current page number (1-based) */
  current: number
  /** Total number of pages */
  total: number
  /** Number of items per page */
  pageSize: number
  /** Available page size options */
  pageSizeOptions?: number[]
  /** Total number of items */
  totalItems?: number
  /** Whether to show jump-to-page input */
  showJump?: boolean
  /** Callback when page changes */
  onChange?: (page: number) => void
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void
  /** Additional CSS class */
  className?: string
}

function getPageNumbers(
  current: number,
  total: number
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: Array<number | "ellipsis"> = []

  if (current <= 3) {
    pages.push(1, 2, 3, 4, "ellipsis", total)
  } else if (current >= total - 2) {
    pages.push(1, "ellipsis", total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, "ellipsis", current - 1, current, current + 1, "ellipsis", total)
  }

  return pages
}

export function Pagination({
  current = 1,
  total = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  totalItems,
  showJump = false,
  onChange,
  onPageSizeChange,
  className,
}: PaginationProps) {
  const [jumpValue, setJumpValue] = React.useState(String(current))

  const pageNumbers = React.useMemo(
    () => getPageNumbers(current, total),
    [current, total]
  )

  const handlePrev = () => {
    if (current > 1) {
      onChange?.(current - 1)
    }
  }

  const handleNext = () => {
    if (current < total) {
      onChange?.(current + 1)
    }
  }

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(jumpValue, 10)
      if (!isNaN(page) && page >= 1 && page <= total) {
        onChange?.(page)
      } else {
        setJumpValue(String(current))
      }
    }
  }

  const handleJumpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJumpValue(e.target.value)
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10)
    onPageSizeChange?.(newSize)
  }

  const canGoPrev = current > 1
  const canGoNext = current < total

  return (
    <div className={cn("devui-pagination", className)}>
      {/* Left: Page Size Selector & Total */}
      <div className="devui-pagination__left">
        <div className="devui-pagination__page-size">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="devui-pagination__page-size-select"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <ButtonIcon name="chevron-down" className="devui-pagination__select-arrow" />
        </div>
        <span className="devui-pagination__total">
          条/页{totalItems !== undefined && `, 总条数: ${totalItems}`}
        </span>
      </div>

      {/* Right: Page Numbers & Navigation */}
      <div className="devui-pagination__right">
        <div className="devui-pagination__pages">
          {/* Prev Button */}
          <button
            type="button"
            className={cn(
              "devui-pagination__nav-btn",
              !canGoPrev && "is-disabled"
            )}
            onClick={handlePrev}
            disabled={!canGoPrev}
            title="上一页"
          >
            <ButtonIcon name="chevron-left" />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="devui-pagination__ellipsis"
              >
                <ButtonIcon name="more-horizontal" />
              </span>
            ) : (
              <button
                key={page}
                type="button"
                className={cn(
                  "devui-pagination__page-btn",
                  page === current && "is-active"
                )}
                onClick={() => onChange?.(page)}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            type="button"
            className={cn(
              "devui-pagination__nav-btn",
              !canGoNext && "is-disabled"
            )}
            onClick={handleNext}
            disabled={!canGoNext}
            title="下一页"
          >
            <ButtonIcon name="chevron-right" />
          </button>
        </div>

        {/* Jump Input */}
        {showJump && (
          <div className="devui-pagination__jump">
            <span>跳至</span>
            <input
              type="text"
              className="devui-pagination__jump-input"
              value={jumpValue}
              onChange={handleJumpChange}
              onKeyDown={handleJump}
            />
            <span>页</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pagination