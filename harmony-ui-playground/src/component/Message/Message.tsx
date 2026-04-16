import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"

import { cn } from "@/lib/utils"
import "./Message.css"

export type MessageType = "info" | "success" | "warning" | "error"

export interface MessageProps {
  message?: ReactNode
  type?: MessageType
  duration?: number
  onClose?: () => void
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface MessageOptions {
  message?: ReactNode
  type?: MessageType
  duration?: number
}

type MessageInvoker = {
  (options: string | MessageOptions): void
  success: (message: ReactNode) => void
  error: (message: ReactNode) => void
}

const EXIT_ANIMATION_MS = 200

function isBrowser() {
  return typeof document !== "undefined"
}

export function Message({
  message,
  type = "info",
  duration = 1500,
  onClose,
  children,
  className,
  style,
}: MessageProps) {
  const [visible, setVisible] = useState(false)
  const mountedRef = useRef(false)
  const previousVisibleRef = useRef(visible)

  useEffect(() => {
    setVisible(true)

    let timer: number | undefined
    if (duration > 0) {
      timer = window.setTimeout(() => {
        setVisible(false)
      }, duration)
    }

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer)
      }
    }
  }, [duration])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      previousVisibleRef.current = visible
      return
    }

    if (previousVisibleRef.current && !visible) {
      onClose?.()
    }

    previousVisibleRef.current = visible
  }, [onClose, visible])

  const content = children ?? message
  const isError = type === "error"

  return (
    <div
      className={cn(
        "my-message",
        `my-message--${type}`,
        visible && "my-message--visible",
        className
      )}
      style={style}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <span className="my-message__content">{content}</span>
    </div>
  )
}

Message.displayName = "Message"

function mountMessage(options: MessageOptions) {
  if (!isBrowser()) {
    return
  }

  const id = `my-message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const container = document.createElement("div")
  container.id = id
  document.body.appendChild(container)

  const root = createRoot(container)

  const remove = () => {
    window.setTimeout(() => {
      root.unmount()
      container.remove()
    }, EXIT_ANIMATION_MS)
  }

  root.render(
    <Message
      {...options}
      onClose={remove}
    />
  )
}

export const message = Object.assign(
  (options: string | MessageOptions) => {
    if (typeof options === "string") {
      mountMessage({ message: options, type: "info" })
      return
    }

    mountMessage(options)
  },
  {
    success: (msg: ReactNode) => {
      mountMessage({ message: msg, type: "success" })
    },
    error: (msg: ReactNode) => {
      mountMessage({ message: msg, type: "error" })
    },
  }
) as MessageInvoker

export default Message
