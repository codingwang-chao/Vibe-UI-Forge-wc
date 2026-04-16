import type { CSSProperties } from "react"
import "./CloverWeekPanel.css"

import todoLeavesImg from "./todo_leaves.png"
import doneLeavesImg from "./done_leaves.png"
import disabledLeavesImg from "./disabled_leaves.png"
import doneIconImg from "./done_icon.png"
import cloverLeafRight from "./pixso-clover-leaf-r.png"
import cloverLeafLeft from "./pixso-clover-leaf-l.png"
import cloverLeafTop from "./pixso-clover-leaf-top.png"
import cloverStem from "./pixso-clover-stem.png"

export type CloverDayStatus = "todo" | "done" | "disabled" | string

export type CloverLegendItem = {
  text: string
  color: string
}

export type CloverWeekPanelProps = {
  /** 当前选中日在 labels 中的下标，0=一 … 6=日 */
  modelValue?: number
  /** 每日状态；三叶草为 todo_leaves / done_leaves / disabled_leaves，完成态额外在三叶草下显示 done_icon */
  dayStatuses?: CloverDayStatus[]
  /** 星期展示文案，默认「一」～「日」 */
  labels?: string[]
  /** 底部图例：文案 + 圆点色（对齐稿中三枚 Ellipse） */
  legend?: CloverLegendItem[]
  onUpdateModelValue?: (value: number) => void
  change?: (value: number) => void
}

const DEFAULT_DAY_STATUSES: CloverDayStatus[] = ["todo", "todo", "done", "todo", "disabled", "todo", "todo"]
const DEFAULT_LABELS = ["一", "二", "三", "四", "五", "六", "日"]
const DEFAULT_LEGEND: CloverLegendItem[] = [
  { text: "规律起床", color: "#5ccd7a" },
  { text: "锻炼时长", color: "#f5a623" },
  { text: "压力均值", color: "#7b8cff" },
]

const dayLeafImg: Record<"todo" | "done" | "disabled", string> = {
  todo: todoLeavesImg,
  done: doneLeavesImg,
  disabled: disabledLeavesImg,
}

function normalizeStatus(raw: CloverDayStatus | undefined) {
  if (raw === "done" || raw === "completed" || raw === "完成") return "done" as const
  if (raw === "disabled" || raw === "禁用") return "disabled" as const
  if (raw === "todo" || raw === "pending" || raw === "未完成") return "todo" as const
  return "todo" as const
}

function CloverIcon({ size = 156 }: { size?: number }) {
  const wrapStyle = {
    width: `${size}px`,
    height: `${size}px`,
  } satisfies CSSProperties

  return (
    <div className="my-clover" style={wrapStyle} role="img" aria-label="三叶草">
      <img className="my-clover__leaf my-clover__leaf--br" src={cloverLeafRight} alt="" aria-hidden="true" />
      <img className="my-clover__leaf my-clover__leaf--bl" src={cloverLeafLeft} alt="" aria-hidden="true" />
      <div className="my-clover__top">
        <img className="my-clover__leaf my-clover__leaf--top" src={cloverLeafTop} alt="" aria-hidden="true" />
        <img className="my-clover__stem" src={cloverStem} alt="" aria-hidden="true" />
      </div>
    </div>
  )
}

export function CloverWeekPanel({
  modelValue = 2,
  dayStatuses = DEFAULT_DAY_STATUSES,
  labels = DEFAULT_LABELS,
  legend = DEFAULT_LEGEND,
  onUpdateModelValue,
  change,
}: CloverWeekPanelProps) {
  const resolvedStatuses = labels.map((_, index) => normalizeStatus(dayStatuses[index]))
  const todayWeekIndex = (new Date().getDay() + 6) % 7

  const onSelect = (index: number) => {
    if (resolvedStatuses[index] === "disabled") return
    onUpdateModelValue?.(index)
    change?.(index)
  }

  return (
    <div className="my-clover-week-panel">
      <div className="my-clover-week-panel__week" role="tablist" aria-label="周期">
        {labels.map((label, index) => {
          const status = resolvedStatuses[index]
          const isActive = modelValue === index
          const isToday = index === todayWeekIndex

          return (
            <button
              key={`${label}-${index}`}
              type="button"
              className={[
                "day-pill",
                `day-pill--${status}`,
                isActive ? "day-pill--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="tab"
              aria-selected={isActive}
              disabled={status === "disabled"}
              onClick={() => onSelect(index)}
            >
              <span
                className={[
                  "day-pill__num",
                  status === "done" ? "day-pill__num--done" : "",
                  isToday ? "day-pill__num--today" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {label}
              </span>
              <span className="day-pill__clover" aria-hidden="true">
                <img className="day-pill__clover-img" src={dayLeafImg[status]} alt="" width={24} height={24} decoding="async" draggable={false} />
              </span>
              {status === "done" ? (
                <span className="day-pill__check" aria-hidden="true">
                  <img className="day-pill__check-img" src={doneIconImg} alt="" width={10} height={8} decoding="async" draggable={false} />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="my-clover-week-panel__hero" aria-hidden="true">
        <CloverIcon size={156} />
      </div>

      <div className="my-clover-week-panel__legend">
        {legend.map((item, index) => (
          <div key={`${item.text}-${index}`} className="legend-item">
            <span className="legend-item__dot" style={{ background: item.color }} />
            <span className="legend-item__text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CloverWeekPanel
