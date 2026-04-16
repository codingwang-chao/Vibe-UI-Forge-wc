import type { CSSProperties, ReactNode } from "react"

export type DialogType = "success" | "failed" | "warning" | "info" | ""

export interface DialogProps {
  open: boolean
  title?: string
  lockScroll?: boolean
  draggable?: boolean
  closeOnClickOverlay?: boolean
  beforeClose?: (done: () => void) => void
  escapable?: boolean
  showClose?: boolean
  showAnimation?: boolean
  showOverlay?: boolean
  appendToBody?: boolean
  type?: DialogType
  keepLast?: boolean
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  className?: string
  style?: CSSProperties
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

export interface DialogSectionProps {
  children?: ReactNode
  className?: string
  showCloseButton?: boolean
}
