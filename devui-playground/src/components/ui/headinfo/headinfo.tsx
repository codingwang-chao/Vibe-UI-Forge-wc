import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import "./headinfo.css"

// Chevron Down Icon
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("headinfo__chevron", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 6L8 9.5L11.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Back Arrow Icon
function BackArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Search Icon
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("headinfo__search-icon", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.333 12.667C10.279 12.667 12.667 10.279 12.667 7.333C12.667 4.388 10.279 2 7.333 2C4.388 2 2 4.388 2 7.333C2 10.279 4.388 12.667 7.333 12.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L11.1 11.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export type HeadInfoStatus = "未检查" | "已检查"

export type HeadInfoBreadcrumbItem = {
  label: string
  isActive?: boolean
}

export type HeadInfoRepo = {
  id: string
  org: string
  name: string
  avatarSrc?: string
}

export type HeadInfoProps = {
  className?: string
  /** Size variant: lg (18px text) or md (14px text) */
  size?: "lg" | "md"
  /** Current breadcrumb items */
  breadcrumbs?: HeadInfoBreadcrumbItem[]
  /** Repository info */
  repo?: HeadInfoRepo
  /** Code health check status */
  status?: HeadInfoStatus
  /** Whether to show the search dropdown */
  showSearch?: boolean
  /** Search placeholder */
  searchPlaceholder?: string
  /** Available repos for search dropdown */
  searchResults?: HeadInfoRepo[]
  /** Search result count */
  searchResultCount?: number
  /** Whether search is collapsed (状态3) */
  isSearchCollapsed?: boolean
  /** Callback when search result is selected */
  onSearchSelect?: (repo: HeadInfoRepo) => void
  /** Callback when back button is clicked */
  onBack?: () => void
  /** Callback when breadcrumb item is clicked */
  onBreadcrumbClick?: (index: number) => void
}

const defaultBreadcrumbs: HeadInfoBreadcrumbItem[] = [
  { label: "huawei", isActive: false },
  { label: "Sample", isActive: true },
]

const defaultRepo: HeadInfoRepo = {
  id: "123456",
  org: "huawei",
  name: "Sample",
}

/**
 * Status Badge - Shows code health check status
 */
export function StatusBadge({
  status = "未检查",
}: {
  status?: HeadInfoStatus
}) {
  return (
    <div className="headinfo__status-badge">
      <span className="headinfo__status-badge-label">代码健康度</span>
      <span
        className={cn(
          "headinfo__status-badge-label",
          status === "已检查"
            ? "headinfo__status-badge-label--checked"
            : "headinfo__status-badge-label--unchecked"
        )}
      >
        {status}
      </span>
    </div>
  )
}

/**
 * Breadcrumb Item - Single breadcrumb with optional chevron
 */
export function BreadcrumbItem({
  label,
  isActive = false,
  size = "lg",
  showChevron = false,
  onClick,
}: {
  label: string
  isActive?: boolean
  size?: "lg" | "md"
  showChevron?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={cn(
        "headinfo__breadcrumb-item",
        size === "lg" ? "headinfo__breadcrumb-item--lg" : "headinfo__breadcrumb-item--md"
      )}
    >
      <span
        className={cn(
          "headinfo__breadcrumb-text",
          isActive ? "headinfo__breadcrumb-text--bold" : "headinfo__breadcrumb-text--weak"
        )}
        onClick={onClick}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        {label}
      </span>
      {showChevron && <ChevronDownIcon />}
    </div>
  )
}

/**
 * Breadcrumb Separator - The "/" divider
 */
export function BreadcrumbSeparator({ size = "lg" }: { size?: "lg" | "md" }) {
  return (
    <span
      className={cn(
        "headinfo__separator",
        size === "md" && "headinfo__separator--md"
      )}
    >
      /
    </span>
  )
}

/**
 * Breadcrumb Group - Full breadcrumb navigation
 */
export function BreadcrumbGroup({
  items,
  size = "lg",
  showChevronOnActive = true,
  onItemClick,
}: {
  items: HeadInfoBreadcrumbItem[]
  size?: "lg" | "md"
  showChevronOnActive?: boolean
  onItemClick?: (index: number) => void
}) {
  return (
    <div className="headinfo__breadcrumb-group">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <BreadcrumbSeparator size={size} />}
          <BreadcrumbItem
            label={item.label}
            isActive={item.isActive}
            size={size}
            showChevron={
              item.isActive && showChevronOnActive && index === items.length - 1
            }
            onClick={onItemClick ? () => onItemClick(index) : undefined}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * Repo Option - Single repository option for dropdown
 */
export function RepoOption({
  repo,
  size = "md",
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  repo: HeadInfoRepo
  size?: "lg" | "md"
  isHovered?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const avatarSize = size === "lg" ? 48 : 32

  return (
    <div
      className={cn(
        "headinfo__repo-option",
        isHovered && "headinfo__repo-option--hover"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Avatar
        className="headinfo__repo-option-avatar"
        name={repo.name}
        imgSrc={repo.avatarSrc}
        width={avatarSize}
        height={avatarSize}
      />
      <div className="headinfo__repo-option-content">
        <div className="headinfo__repo-option-path">
          <span>{repo.org}</span>
          <span className="headinfo__repo-option-separator">/</span>
          <span className="headinfo__repo-option-name">{repo.name}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Search Dropdown - Search input with dropdown results
 */
export function SearchDropdown({
  placeholder = "搜索代码仓",
  results = [],
  resultCount = 0,
  size = "md",
  onResultClick,
}: {
  placeholder?: string
  results?: HeadInfoRepo[]
  resultCount?: number
  size?: "lg" | "md"
  onResultClick?: (repo: HeadInfoRepo) => void
}) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <div className="headinfo__search-container">
      <div className="headinfo__search-input-wrapper">
        <SearchIcon />
        <span className="headinfo__search-placeholder">{placeholder}</span>
      </div>
      {results.length > 0 && (
        <div className="headinfo__search-results">
          {results.map((repo, index) => (
            <RepoOption
              key={`${repo.org}-${repo.name}`}
              repo={repo}
              size={size}
              isHovered={hoveredIndex === index}
              onClick={() => onResultClick?.(repo)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
          {resultCount > 0 && (
            <div className="headinfo__search-footer">
              总条数: {resultCount}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * HeadInfo - Main header information component
 *
 * Displays breadcrumb navigation with optional search dropdown,
 * status badge, and repository information.
 */
export function HeadInfo({
  className,
  size = "lg",
  breadcrumbs = defaultBreadcrumbs,
  repo = defaultRepo,
  status = "未检查",
  showSearch = false,
  searchPlaceholder = "搜索代码仓",
  searchResults = [],
  searchResultCount = 0,
  isSearchCollapsed = false,
  onSearchSelect,
  onBack,
  onBreadcrumbClick,
}: HeadInfoProps) {
  const avatarSize = size === "lg" ? 48 : 32

  return (
    <div className={cn("headinfo", className)}>
      {/* Back Button */}
      <button className="headinfo__back-button" onClick={onBack} type="button">
        <BackArrowIcon />
      </button>

      {/* Avatar */}
      <Avatar
        className="headinfo__avatar"
        name={repo.name}
        imgSrc={repo.avatarSrc}
        width={avatarSize}
        height={avatarSize}
      />

      {/* Content */}
      <div className="headinfo__content">
        {/* Breadcrumb Row */}
        <div className="headinfo__breadcrumb-row">
          <BreadcrumbGroup
            items={breadcrumbs}
            size={size}
            showChevronOnActive={!showSearch || isSearchCollapsed}
            onItemClick={onBreadcrumbClick}
          />
          {showSearch && !isSearchCollapsed && (
            <StatusBadge status={status} />
          )}
        </div>

        {/* Info Row or Search */}
        {showSearch ? (
          <SearchDropdown
            placeholder={searchPlaceholder}
            results={searchResults}
            resultCount={searchResultCount}
            size={size}
            onResultClick={onSearchSelect}
          />
        ) : (
          <div className="headinfo__info-row">
            <span>Repository ID：</span>
            <span>{repo.id}</span>
          </div>
        )}
      </div>
    </div>
  )
}
