import { Children, type CSSProperties, type ReactNode } from "react"
import "./Divider.css"

export type DividerContentPosition = "left" | "center" | "right"

export interface DividerProps {
  /** 线条颜色（Pixso 36:34893 主线约 1px 灰线） */
  color?: string
  /** 线的粗细（水平线的「高度」），数字为 px；如 `2` 即 2px */
  thickness?: string | number
  /** 外边距，数字视为 px（四边相同） */
  margin?: string | number
  /** 虚线 */
  dashed?: boolean
  /** 细线（0.5px 视觉） */
  hairline?: boolean
  /** 有插槽时文字位置：左 / 中 / 右 */
  contentPosition?: DividerContentPosition
  children?: ReactNode
}

const DEFAULT_COLOR = "rgba(0, 0, 0, 0.09803921729326248)"
const DEFAULT_THICKNESS = 1
const DEFAULT_MARGIN = "16px 0"

function normalizeCssLength(value: string | number | undefined, fallback: string) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `${value}px`
  }

  if (typeof value === "string" && value.trim() !== "") {
    return value
  }

  return fallback
}

function hasRenderableContent(children: ReactNode) {
  return Children.toArray(children).some((child) => {
    if (typeof child === "string") {
      return child.trim() !== ""
    }

    return true
  })
}

function isDividerContentPosition(value: string): value is DividerContentPosition {
  return value === "left" || value === "center" || value === "right"
}

export function Divider({
  color = DEFAULT_COLOR,
  thickness = DEFAULT_THICKNESS,
  margin = DEFAULT_MARGIN,
  dashed = false,
  hairline = false,
  contentPosition = "center",
  children,
}: DividerProps) {
  const hasContent = hasRenderableContent(children)
  const resolvedContentPosition = isDividerContentPosition(contentPosition) ? contentPosition : "center"
  const marginCss = normalizeCssLength(margin, DEFAULT_MARGIN)
  const thicknessCss = normalizeCssLength(thickness, `${DEFAULT_THICKNESS}px`)

  const rootStyle = {
    "--my-divider-color": color,
    "--my-divider-margin": marginCss,
    "--my-divider-thickness": thicknessCss,
  } as CSSProperties

  const rootClassName = [
    "my-divider",
    hasContent ? "my-divider--with-text" : "",
    dashed ? "my-divider--dashed" : "",
    hairline ? "my-divider--hairline" : "",
    hasContent ? `my-divider--content-${resolvedContentPosition}` : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={rootClassName} role="separator" style={rootStyle}>
      {hasContent ? (
        <>
          {resolvedContentPosition === "center" ? (
            <>
              <span className="my-divider__line" aria-hidden="true" />
              <span className="my-divider__text">{children}</span>
              <span className="my-divider__line" aria-hidden="true" />
            </>
          ) : resolvedContentPosition === "left" ? (
            <>
              <span className="my-divider__text">{children}</span>
              <span className="my-divider__line" aria-hidden="true" />
            </>
          ) : (
            <>
              <span className="my-divider__line" aria-hidden="true" />
              <span className="my-divider__text">{children}</span>
            </>
          )}
        </>
      ) : (
        <div className="my-divider__rule" />
      )}
    </div>
  )
}

export default Divider
