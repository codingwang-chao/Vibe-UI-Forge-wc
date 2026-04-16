import { useEffect, useRef, useState, type RefObject } from "react"

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

let lockCount = 0
let previousBodyOverflow = ""
let previousBodyPaddingRight = ""

export function lockBodyScroll() {
  if (typeof document === "undefined") {
    return () => {}
  }

  const body = document.body
  const docEl = document.documentElement

  if (lockCount === 0) {
    previousBodyOverflow = body.style.overflow
    previousBodyPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - docEl.clientWidth
    body.style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
  }

  lockCount += 1

  return () => {
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) {
      body.style.overflow = previousBodyOverflow
      body.style.paddingRight = previousBodyPaddingRight
    }
  }
}

function addUnit(value?: string | number, defaultUnit = "px") {
  if (value === undefined || value === null || value === "") {
    return ""
  }
  if (typeof value === "string") {
    return value
  }
  return `${value}${defaultUnit}`
}

export function useDraggable(
  targetRef: RefObject<HTMLElement | null>,
  dragRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  const [transform, setTransform] = useState("translate(-50%, -50%)")
  const offsetRef = useRef({ offsetX: 0, offsetY: 0 })

  useEffect(() => {
    const dragEl = dragRef.current
    const targetEl = targetRef.current

    if (!enabled || !dragEl || !targetEl) {
      return
    }

    const onMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) {
        return
      }

      const downX = event.clientX
      const downY = event.clientY
      const { offsetX, offsetY } = offsetRef.current
      const targetRect = targetEl.getBoundingClientRect()

      const minLeft = -targetRect.left + offsetX
      const minTop = -targetRect.top + offsetY
      const maxLeft =
        document.documentElement.clientWidth -
        targetRect.left -
        targetRect.width +
        offsetX
      const maxTop =
        document.documentElement.clientHeight -
        targetRect.top -
        targetRect.height +
        offsetY

      const onMouseMove = (moveEvent: MouseEvent) => {
        const moveX = Math.min(
          Math.max(offsetX + moveEvent.clientX - downX, minLeft),
          maxLeft
        )
        const moveY = Math.min(
          Math.max(offsetY + moveEvent.clientY - downY, minTop),
          maxTop
        )
        offsetRef.current = { offsetX: moveX, offsetY: moveY }
        setTransform(
          `translate(calc(-50% + ${addUnit(moveX)}), calc(-50% + ${addUnit(moveY)}))`
        )
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    dragEl.addEventListener("mousedown", onMouseDown)

    return () => {
      dragEl.removeEventListener("mousedown", onMouseDown)
    }
  }, [dragRef, enabled, targetRef])

  const clearPosition = () => {
    offsetRef.current = { offsetX: 0, offsetY: 0 }
    setTransform("translate(-50%, -50%)")
  }

  return { clearPosition, transform }
}
