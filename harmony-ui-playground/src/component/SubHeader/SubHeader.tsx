import type { HTMLAttributes } from "react"
import "./SubHeader.css"

export type SubHeaderLeftMode = "double" | "title" | "subtitle" | "select"
export type SubHeaderRightMode = "action" | "chevron" | "icons" | "more"

export interface SubHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** 左侧区域形态（Pixso 36:35055） */
  leftMode?: SubHeaderLeftMode
  /** 右侧区域形态（Pixso 36:35272） */
  rightMode?: SubHeaderRightMode
  title?: string
  subtitle?: string
  selectText?: string
  /** rightMode === action */
  actionText?: string
  /** rightMode === more */
  moreText?: string
  /** rightMode === icons：三个图标位，从左到右依次对应数组第 1~3 项。 */
  rightIcons?: Array<string | null | undefined>
}

function normalizeRightIcons(rightIcons: SubHeaderProps["rightIcons"]) {
  const raw = Array.isArray(rightIcons) ? rightIcons : []

  return [0, 1, 2].map((index) => {
    const value = raw[index]
    if (value == null) return null
    const text = String(value).trim()
    return text ? text : null
  })
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="rgba(0,0,0,0.65)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AsideChevronIcon() {
  return (
    <svg
      className="my-subheader__aside-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="rgba(0,0,0,0.9)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MoreArrowIcon() {
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.5 7.5L8 12l-3.5 4.5"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SubHeader(props: SubHeaderProps) {
  const {
    leftMode = "double",
    rightMode = "action",
    title = "Content subheading",
    subtitle = "subheading",
    selectText = "Select",
    actionText = "操作",
    moreText = "more",
    rightIcons,
    className,
    style,
    ...divProps
  } = props

  const normalizedIcons = normalizeRightIcons(rightIcons)

  const bodyClassName = [
    "my-subheader__body",
    leftMode === "double" ? "my-subheader__body--double" : "",
    leftMode === "title" ? "my-subheader__body--title" : "",
    leftMode === "subtitle" ? "my-subheader__body--subtitle" : "",
    leftMode === "select" ? "my-subheader__body--select" : "",
  ]
    .filter(Boolean)
    .join(" ")

  const asideClassName = [
    "my-subheader__aside",
    rightMode === "action" ? "my-subheader__aside--action" : "",
    rightMode === "chevron" ? "my-subheader__aside--chevron" : "",
    rightMode === "icons" ? "my-subheader__aside--icons" : "",
    rightMode === "more" ? "my-subheader__aside--more" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      {...divProps}
      className={className ? `my-subheader ${className}` : "my-subheader"}
      style={style}
    >
      <div className={bodyClassName}>
        {leftMode === "double" ? (
          <>
            <p className="my-subheader__title">{title}</p>
            <p className="my-subheader__subtitle">{subtitle}</p>
          </>
        ) : null}

        {leftMode === "title" ? <p className="my-subheader__title">{title}</p> : null}

        {leftMode === "subtitle" ? (
          <p className="my-subheader__subtitle">{subtitle}</p>
        ) : null}

        {leftMode === "select" ? (
          <div className="my-subheader__chip" role="button" tabIndex={0}>
            <span className="my-subheader__chip-text">{selectText}</span>
            <span className="my-subheader__chip-chevron">
              <ChevronIcon className="my-subheader__chip-chevron-icon" />
            </span>
          </div>
        ) : null}
      </div>

      <div className={asideClassName}>
        {rightMode === "action" ? (
          <span className="my-subheader__action">{actionText}</span>
        ) : null}

        {rightMode === "chevron" ? (
          <button type="button" className="my-subheader__aside-btn" aria-label="展开">
            <AsideChevronIcon />
          </button>
        ) : null}

        {rightMode === "icons" ? (
          <div className="my-subheader__icon-row">
            {normalizedIcons.map((src, index) => (
              <button
                key={`${src ?? "placeholder"}-${index}`}
                type="button"
                className="my-subheader__aside-btn"
                aria-label={`操作 ${index + 1}`}
              >
                {src ? (
                  <img className="my-subheader__aside-img" src={src} alt="" />
                ) : (
                  <span className="my-subheader__icon-dot" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        ) : null}

        {rightMode === "more" ? (
          <div className="my-subheader__more">
            <span className="my-subheader__more-text">{moreText}</span>
            <span className="my-subheader__more-arrow">
              <MoreArrowIcon />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SubHeader
