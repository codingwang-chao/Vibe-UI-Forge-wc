import type { ReactNode } from "react"
import { useEffect, useId, useMemo, useRef } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import "./FloatLayer.css"

const DEFAULT_CLOSE_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M15 9L9 15" stroke="#000000" stroke-width="2" stroke-linecap="round" />
      <path d="M9 9L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round" />
    </svg>`
  )

type CloseRenderer = ReactNode | ((api: { close: () => void }) => ReactNode)

export type FloatLayerProps = {
  modelValue?: boolean
  title?: ReactNode
  closeOnClickMask?: boolean
  showClose?: boolean
  showGrab?: boolean
  closeIcon?: string
  ariaLabel?: string
  headPreset?: "sheet" | "titlebar"
  headClass?: string
  titleClass?: string
  left?: ReactNode
  close?: CloseRenderer
  children?: ReactNode
  panelClass?: string
  panelStyle?: React.CSSProperties
  panelHeight?: number | string
  onUpdateModelValue?: (value: boolean) => void
  onOpen?: () => void
  onClose?: () => void
  onMaskClick?: () => void
}

function isBlankText(value: unknown) {
  return typeof value === "string" && value.trim().length === 0
}

export function FloatLayer({
  modelValue = false,
  title = "",
  closeOnClickMask = true,
  showClose = true,
  showGrab = true,
  closeIcon = "",
  ariaLabel = "",
  headPreset = "sheet",
  headClass,
  titleClass,
  left,
  close,
  children,
  panelClass,
  panelStyle,
  panelHeight,
  onUpdateModelValue,
  onOpen,
  onClose,
  onMaskClick,
}: FloatLayerProps) {
  const prevModelValueRef = useRef(modelValue)
  const bodyOverflowRef = useRef("")
  const scrollLockedRef = useRef(false)
  const titleId = useId()

  const panelStyleWithHeight: React.CSSProperties | undefined = panelHeight
    ? { ...panelStyle, height: panelHeight, maxHeight: panelHeight }
    : panelStyle

  const hasStringTitle = typeof title === "string" && !isBlankText(title)
  const hasCustomTitle = title !== "" && title !== null && title !== undefined && !hasStringTitle
  const hasLeftSlot = left !== null && left !== undefined && left !== false
  const showRightAside = showClose || (close !== null && close !== undefined)

  const ariaLabelledBy = useMemo(
    () => (hasStringTitle ? titleId : undefined),
    [hasStringTitle, titleId]
  )

  const ariaLabelFallback = useMemo(() => {
    if (hasStringTitle) return undefined

    const label = typeof ariaLabel === "string" ? ariaLabel.trim() : String(ariaLabel).trim()
    return label || "浮层"
  }, [ariaLabel, hasStringTitle])

  const closeIconSrc = useMemo(() => {
    const icon = typeof closeIcon === "string" ? closeIcon.trim() : String(closeIcon).trim()
    return icon || DEFAULT_CLOSE_ICON
  }, [closeIcon])

  useEffect(() => {
    const prev = prevModelValueRef.current

    if (modelValue && !prev) {
      onOpen?.()
    }

    if (!modelValue && prev) {
      onClose?.()
    }

    prevModelValueRef.current = modelValue
  }, [modelValue, onClose, onOpen])

  useEffect(() => {
    if (typeof document === "undefined") return

    if (modelValue) {
      if (!scrollLockedRef.current) {
        bodyOverflowRef.current = document.body.style.overflow
      }

      document.body.style.overflow = "hidden"
      scrollLockedRef.current = true
      return
    }

    document.body.style.overflow = scrollLockedRef.current ? bodyOverflowRef.current : document.body.style.overflow
    scrollLockedRef.current = false
  }, [modelValue])

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined" && scrollLockedRef.current) {
        document.body.style.overflow = bodyOverflowRef.current
      }
    }
  }, [])

  const closePanel = () => {
    onUpdateModelValue?.(false)
  }

  const handleMaskClick = () => {
    onMaskClick?.()
    if (closeOnClickMask) {
      closePanel()
    }
  }

  if (typeof document === "undefined") return null

  if (!modelValue) return null

  const root = (
    <div className="my-float-layer" data-state="open">
      <div
        className="my-float-layer__mask"
        aria-hidden="true"
        onClick={handleMaskClick}
      />
      <div
        className={cn("my-float-layer__panel", panelClass)}
        style={panelStyleWithHeight}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabelFallback}
        onClick={(event) => event.stopPropagation()}
      >
        {showGrab ? <div className="my-float-layer__grab" aria-hidden="true" /> : null}

        {hasStringTitle || hasCustomTitle || hasLeftSlot || showRightAside ? (
          <div
            className={cn(
              "my-float-layer__head",
              headPreset === "titlebar" && "my-float-layer__head--titlebar",
              headClass
            )}
          >
            {hasLeftSlot ? <div className="my-float-layer__left">{left}</div> : null}

            <div className={cn("my-float-layer__title-wrap", titleClass)}>
              {hasStringTitle ? (
                <span
                  id={titleId}
                  className={cn(
                    "my-float-layer__title",
                    headPreset === "titlebar" && "my-float-layer__title--titlebar"
                  )}
                  title={typeof title === "string" ? title : undefined}
                >
                  {title}
                </span>
              ) : hasCustomTitle ? (
                title
              ) : null}
            </div>

            {showRightAside ? (
              <div className="my-float-layer__aside">
                {typeof close === "function" ? (
                  close({ close: closePanel })
                ) : close ? (
                  close
                ) : showClose ? (
                  <button
                    type="button"
                    className="my-float-layer__close"
                    aria-label="关闭"
                    onClick={closePanel}
                  >
                    <img
                      className="my-float-layer__close-img"
                      src={closeIconSrc}
                      alt=""
                      width={24}
                      height={24}
                      decoding="async"
                      draggable={false}
                    />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="my-float-layer__body">{children}</div>
      </div>
    </div>
  )

  return createPortal(root, document.body)
}

export default FloatLayer
