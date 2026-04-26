import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

import "./PixsoContentSubheadingSection.css"

export interface PixsoContentSubheadingSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  headingTitle?: ReactNode
  headingSubtitle?: ReactNode
  actionLabel?: ReactNode
  selectLabel?: ReactNode
  footerTitle?: ReactNode
  footerSubtitle?: ReactNode
  moreLabel?: ReactNode
  onAction?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
  onSelect?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
  actionDisabled?: boolean
  selectDisabled?: boolean
}

function ChevronDownIcon() {
  return (
    <svg
      className="pixso-content-subheading-section__chevron"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 4.5L6 7.5L9 4.5" fill="currentColor" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      className="pixso-content-subheading-section__more-chevron"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 3L7.5 6L4.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg
      className="pixso-content-subheading-section__up-chevron"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 7.5L6 4.5L9 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RefreshGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pixso-content-subheading-section__refresh", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18.25 7.75A7.7 7.7 0 0 0 12.18 5C8.2 5 5 8.13 5 12s3.2 7 7.18 7c2.84 0 5.3-1.6 6.48-3.92"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M18.5 4.75V8h-3.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RefreshRow({ count }: { count: number }) {
  return (
    <div
      className="pixso-content-subheading-section__refresh-row"
      data-count={count}
    >
      {Array.from({ length: count }, (_, index) => (
        <RefreshGlyph key={index} />
      ))}
    </div>
  )
}

/**
 * Pixso `3286:12399` — Section_3286_12399.
 *
 * `get_node_dsl` fails for this node in the Pixso plugin path, so the component
 * is grounded by `get_image` plus the `design_to_code` hierarchy:
 * header (`3286:12554`) + three state groups (`3286:12400`, `3286:12410`,
 * `3286:12421`). Absolute offsets are measured against the exported screenshot
 * to preserve the mixed layout/positioning shown by the design.
 */
export function PixsoContentSubheadingSection({
  headingTitle = "Content subheading",
  headingSubtitle = "subheading",
  actionLabel = "操作",
  selectLabel = "Select",
  footerTitle = "Content subheading",
  footerSubtitle = "subheading",
  moreLabel = "more",
  onAction,
  onSelect,
  actionDisabled = false,
  selectDisabled = false,
  className,
  ...rest
}: PixsoContentSubheadingSectionProps) {
  return (
    <section
      {...rest}
      className={cn("pixso-content-subheading-section", className)}
      data-runtime-component="PixsoContentSubheadingSection"
    >
      <header className="pixso-content-subheading-section__header">
        <div className="pixso-content-subheading-section__heading-copy">
          <h2>{headingTitle}</h2>
          <p>{headingSubtitle}</p>
        </div>
        <button
          type="button"
          className="pixso-content-subheading-section__header-action"
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </header>

      <div className="pixso-content-subheading-section__card pixso-content-subheading-section__card--content">
        <h3 className="pixso-content-subheading-section__card-title">
          {headingTitle}
        </h3>
        <p className="pixso-content-subheading-section__card-subtitle">
          {headingSubtitle}
        </p>
        <button
          type="button"
          className="pixso-content-subheading-section__select"
          disabled={selectDisabled}
          onClick={onSelect}
        >
          <span>{selectLabel}</span>
          <ChevronDownIcon />
        </button>
        <div className="pixso-content-subheading-section__footer-copy">
          <h3>{footerTitle}</h3>
          <p>{footerSubtitle}</p>
        </div>
      </div>

      <div className="pixso-content-subheading-section__card pixso-content-subheading-section__card--operations">
        <div className="pixso-content-subheading-section__more">
          <span>{moreLabel}</span>
          <ChevronRightIcon />
        </div>
        <div className="pixso-content-subheading-section__up">
          <ChevronUpIcon />
        </div>
        <div className="pixso-content-subheading-section__inline-icons">
          <RefreshGlyph />
          <RefreshGlyph />
          <RefreshGlyph />
        </div>
        <button
          type="button"
          className="pixso-content-subheading-section__action"
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </div>

      <div className="pixso-content-subheading-section__card pixso-content-subheading-section__card--icons">
        <RefreshRow count={1} />
        <RefreshRow count={2} />
        <RefreshRow count={3} />
      </div>
    </section>
  )
}

export default PixsoContentSubheadingSection
