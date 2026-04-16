import * as React from "react"
import "./TaskCard.css"

export type TaskCardActionTone = "neutral" | "accent" | "disabled"

export interface TaskCardProps {
  /** 第一行加粗数值，如完成次数、时刻 */
  value?: string
  /** 中间提示标签，如「偏早」「偏晚」；设计稿为橙色 */
  tag?: string
  /** 后缀文案，如「/1 次」「/22:30」「/8000 步」 */
  suffix?: string
  /** 第二行任务名称 */
  title?: React.ReactNode
  /** 右上角按钮文案，如「去冥想」「已完成」 */
  actionText?: string
  /**
   * 右上角胶囊 .my-task-card__action 的配色/透明度。
   * neutral：bg rgba(0,0,0,.05)，字 rgba(0,0,0,.6)，默认「去××」。
   * accent：bg rgba(251,101,34,.1)，字 #f56522，「已完成」等强调。
   * disabled：同色于 neutral + opacity .4，仅视觉弱化；不禁止卡片 click。
   */
  actionTone?: TaskCardActionTone
  icon?: React.ReactNode
  valueRow?: React.ReactNode
  action?: React.ReactNode
  click?: (event: React.MouseEvent<HTMLDivElement>) => void
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

function hasRenderableText(value: string | undefined) {
  return Boolean(value && value.trim())
}

function hasRenderableNode(value: React.ReactNode) {
  if (typeof value === "string") {
    return value.trim() !== ""
  }

  if (typeof value === "number") {
    return true
  }

  return value !== null && value !== undefined && value !== false
}

function isTaskCardActionTone(
  value: string | undefined
): value is TaskCardActionTone {
  return value === "neutral" || value === "accent" || value === "disabled"
}

export function TaskCard({
  value = "",
  tag = "",
  suffix = "",
  title = "",
  actionText = "",
  actionTone = "neutral",
  icon,
  valueRow,
  action,
  click,
  onClick,
}: TaskCardProps) {
  const hasAction = hasRenderableNode(action) || hasRenderableText(actionText)
  const showTitle = hasRenderableNode(title)
  const metricsWithTagGap = !valueRow && hasRenderableText(tag)
  const resolvedActionTone = isTaskCardActionTone(actionTone)
    ? actionTone
    : "neutral"

  const emitClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      click?.(event)
      onClick?.(event)
    },
    [click, onClick]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter") {
        return
      }

      event.preventDefault()
      emitClick(event as unknown as React.MouseEvent<HTMLDivElement>)
    },
    [emitClick]
  )

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      emitClick(event)
    },
    [emitClick]
  )

  return (
    <div
      className="my-task-card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="my-task-card__main">
        <div className="my-task-card__icon">
          {hasRenderableNode(icon) ? (
            icon
          ) : (
            <span className="my-task-card__icon-fallback" aria-hidden="true" />
          )}
        </div>

        <div className="my-task-card__text">
          <div
            className={[
              "my-task-card__metrics",
              metricsWithTagGap ? "my-task-card__metrics--with-tag" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {hasRenderableNode(valueRow) ? (
              valueRow
            ) : (
              <>
                {hasRenderableText(value) ? (
                  <span className="my-task-card__value">{value}</span>
                ) : null}
                {hasRenderableText(tag) ? (
                  <span className="my-task-card__tag">{tag}</span>
                ) : null}
                {hasRenderableText(suffix) ? (
                  <span className="my-task-card__suffix">{suffix}</span>
                ) : null}
              </>
            )}
          </div>

          {showTitle ? (
            <div className="my-task-card__title">{title}</div>
          ) : null}
        </div>
      </div>

      {hasAction ? (
        <div
          className={[
            "my-task-card__action",
            `my-task-card__action--${resolvedActionTone}`,
          ].join(" ")}
        >
          {hasRenderableNode(action) ? action : actionText}
        </div>
      ) : null}
    </div>
  )
}

export default TaskCard
