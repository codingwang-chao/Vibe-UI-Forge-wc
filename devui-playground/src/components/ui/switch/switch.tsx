import { useEffect, useRef, useState } from "react"

import type { SwitchProps } from "./switch.types"
import { cn, createNamespace } from "./utils"
import "./switch.css"

const ns = createNamespace("switch")
const MOUSE_DOWN_RESET_MS = 150

export function Switch({
  modelValue = false,
  onUpdateModelValue,
  change,
  beforeChange,
  activeValue = true,
  inactiveValue = false,
  size = "md",
  color,
  disabled = false,
  checkedContent,
  uncheckedContent,
  className,
  style,
}: SwitchProps) {
  const isChecked = modelValue === activeValue
  const switchDisabled = disabled
  const [isMouseDown, setIsMouseDown] = useState(false)
  const mouseUpTimer = useRef<number | null>(null)

  useEffect(() => {
    if (modelValue === activeValue || modelValue === inactiveValue) {
      return
    }

    onUpdateModelValue?.(inactiveValue)
  }, [activeValue, inactiveValue, modelValue, onUpdateModelValue])

  useEffect(() => {
    return () => {
      if (mouseUpTimer.current) {
        window.clearTimeout(mouseUpTimer.current)
      }
    }
  }, [])

  const flushMouseDown = () => {
    if (mouseUpTimer.current) {
      window.clearTimeout(mouseUpTimer.current)
    }

    mouseUpTimer.current = window.setTimeout(() => {
      setIsMouseDown(false)
      mouseUpTimer.current = null
    }, MOUSE_DOWN_RESET_MS)
  }

  const canChange = async () => {
    if (switchDisabled) {
      return false
    }

    if (!beforeChange) {
      return true
    }

    try {
      return await Promise.resolve(beforeChange(!isChecked))
    } catch {
      return false
    }
  }

  const handleToggle = async () => {
    if (!(await canChange())) {
      return
    }

    const nextValue = isChecked ? inactiveValue : activeValue
    onUpdateModelValue?.(nextValue)
    change?.(nextValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    void handleToggle()
  }

  const wrapperStyle =
    isChecked && !switchDisabled && color
      ? { backgroundColor: color, borderColor: color }
      : undefined

  return (
    <div className={cn(ns.b(), ns.m(size), className)} style={style}>
      <span
        role="switch"
        aria-checked={isChecked}
        aria-disabled={switchDisabled}
        tabIndex={switchDisabled ? -1 : 0}
        className={cn(
          ns.e("wrapper"),
          isChecked && ns.m("checked"),
          switchDisabled && ns.m("disabled")
        )}
        style={wrapperStyle}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={flushMouseDown}
        onMouseLeave={flushMouseDown}
      >
        <span className={ns.e("inner-wrapper")}>
          <div className={ns.e("inner")}>
            {isChecked ? checkedContent : uncheckedContent}
          </div>
        </span>
        <small className={cn(isMouseDown && !switchDisabled && "mouseDown")} />
      </span>
    </div>
  )
}
