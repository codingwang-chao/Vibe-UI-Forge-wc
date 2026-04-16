import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { cn } from "@/lib/utils"
import "./title-bar.css"

const defaultLeftIcon =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M15 5L8 12L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
  )

const defaultRightIcon =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="1.8" fill="#000000" />
      <circle cx="12" cy="12" r="1.8" fill="#000000" />
      <circle cx="18" cy="12" r="1.8" fill="#000000" />
    </svg>`
  )

type ClickHandler = (event: MouseEvent<HTMLButtonElement>) => void

type RightClickHandler = (
  event: MouseEvent<HTMLButtonElement>,
  index: number
) => void

export type TitleBarProps = {
  title?: string
  titleStyle?: CSSProperties
  leftIcon?: string
  leftText?: string
  rightIcon?: string[]
  rightText?: string
  subtitle?: string
  subtitleStyle?: CSSProperties
  avatarSrc?: string
  avatarSize?: number
  avatarRadius?: number
  backgroundColor?: string
  left?: ReactNode
  right?: ReactNode
  "left-click"?: ClickHandler
  "right-click"?: RightClickHandler
}

export function TitleBar({
  title = "Title",
  titleStyle,
  leftIcon = defaultLeftIcon,
  leftText = "",
  rightIcon = [defaultRightIcon],
  rightText = "",
  subtitle = "",
  subtitleStyle,
  avatarSrc = "",
  avatarSize = 40,
  avatarRadius = 999,
  backgroundColor = "",
  left,
  right,
  "left-click": onLeftClick,
  "right-click": onRightClick,
}: TitleBarProps) {
  const rootStyle: CSSProperties | undefined = backgroundColor
    ? { backgroundColor }
    : undefined

  const leftTextToShow = leftText || ""
  const rightTextToShow = rightText || ""
  const rightIconsList = rightIcon.slice(0, 3)
  const showAvatar = Boolean(avatarSrc)
  const showLeft = Boolean(leftIcon || leftTextToShow)
  const showRightBlock = Boolean(rightTextToShow || rightIconsList.length > 0)

  const emitLeft = (event: MouseEvent<HTMLButtonElement>) => {
    onLeftClick?.(event)
  }

  const emitRight = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    onRightClick?.(event, index)
  }

  return (
    <div className={cn("title-bar")} style={rootStyle} data-runtime-component="TitleBar">
      {left ? (
        <div className="title-bar__left-slot">{left}</div>
      ) : showLeft ? (
        <button
          type="button"
          className={cn(
            "title-bar__bubble",
            leftTextToShow && "title-bar__bubble--text"
          )}
          onClick={emitLeft}
          aria-label={leftTextToShow || "left action"}
        >
          {leftTextToShow ? (
            <span className="title-bar__text">{leftTextToShow}</span>
          ) : (
            <img className="title-bar__img" src={leftIcon} alt="" />
          )}
        </button>
      ) : null}

      <div className="title-bar__center">
        {showAvatar ? (
          <div
            className="title-bar__avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarRadius,
            }}
          >
            <img className="title-bar__avatar-img" src={avatarSrc} alt="" />
          </div>
        ) : (
          <div className="title-bar__textblock">
            <div className="title-bar__title" style={titleStyle} title={title}>
              {title}
            </div>
            {subtitle ? (
              <div
                className="title-bar__subtitle"
                style={subtitleStyle}
                title={subtitle}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {right ? (
        <div className="title-bar__right">{right}</div>
      ) : showRightBlock ? (
        <div className="title-bar__right">
          {rightTextToShow ? (
            <button
              type="button"
              className="title-bar__bubble title-bar__bubble--text"
              onClick={(event) => emitRight(event, 0)}
              aria-label={rightTextToShow}
            >
              <span className="title-bar__text">{rightTextToShow}</span>
            </button>
          ) : null}

          {!rightTextToShow
            ? rightIconsList.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  className="title-bar__bubble"
                  onClick={(event) => emitRight(event, index)}
                  aria-label={`right action ${index + 1}`}
                >
                  <img className="title-bar__img" src={src} alt="" />
                </button>
              ))
            : null}
        </div>
      ) : null}
    </div>
  )
}
