import * as React from "react"

import { cn } from "@/lib/utils"

import "./SceneModeCard.css"

export type SceneModeCardSize = "large" | "small"

export interface SceneModeCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * 卡片尺寸。
   * - `large`: 244 × 220，对应 Pixso 变体「中间大卡片」
   * - `small`: 220 × 198（设计稿 219.6 × 198，按 1px 网格归一），对应「左/右侧小卡片」
   */
  size?: SceneModeCardSize
  /** 顶部图标插槽（建议 64×64 / 58×58 SVG，例如「免打扰」紫色月亮图标） */
  icon?: React.ReactNode
  /** 主标题，对应设计稿「免打扰」 */
  title?: React.ReactNode
  /** 副标题，对应设计稿「减少打扰保持专注」 */
  subtitle?: React.ReactNode
  /**
   * 可选浮动操作胶囊（设计稿中以 120×40 圆角胶囊浮于卡片右上角，
   * 视觉上会少量突出卡片右边缘——按 Pixso 节点 `3368:133/345/720` 还原）。
   * 不传时不渲染，避免破坏一般信息卡片的使用场景。
   */
  actionPill?: React.ReactNode
  /** 是否禁用（仅视觉弱化与禁用 click） */
  disabled?: boolean
}

function isInteractive(
  onClick: SceneModeCardProps["onClick"],
  onKeyDown: SceneModeCardProps["onKeyDown"]
): boolean {
  return Boolean(onClick) || Boolean(onKeyDown)
}

export function SceneModeCard({
  size = "large",
  icon,
  title,
  subtitle,
  actionPill,
  disabled = false,
  className,
  onClick,
  onKeyDown,
  ...rest
}: SceneModeCardProps) {
  const interactive = !disabled && isInteractive(onClick, onKeyDown)

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(event)
    },
    [disabled, onClick]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      onKeyDown?.(event)
      if (
        interactive &&
        !event.defaultPrevented &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault()
        onClick?.(
          event as unknown as React.MouseEvent<HTMLDivElement>
        )
      }
    },
    [disabled, interactive, onClick, onKeyDown]
  )

  return (
    <div
      data-size={size}
      data-disabled={disabled || undefined}
      role={interactive ? "button" : rest.role}
      tabIndex={interactive ? 0 : rest.tabIndex}
      aria-disabled={disabled || undefined}
      className={cn("my-scene-mode-card", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div className="my-scene-mode-card__inner">
        {icon ? (
          <div className="my-scene-mode-card__icon" aria-hidden="true">
            {icon}
          </div>
        ) : null}

        {title ? (
          <div className="my-scene-mode-card__title">{title}</div>
        ) : null}

        {subtitle ? (
          <div className="my-scene-mode-card__subtitle">{subtitle}</div>
        ) : null}
      </div>

      {actionPill ? (
        <div className="my-scene-mode-card__action-pill">{actionPill}</div>
      ) : null}
    </div>
  )
}

export default SceneModeCard
