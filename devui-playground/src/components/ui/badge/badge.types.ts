import type { HTMLAttributes, ReactNode } from "react"

export type BadgeStatusType =
  | "danger"
  | "warning"
  | "waiting"
  | "success"
  | "info"
  | "common"

export type BadgePositionType =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export interface MiniDevUIBadgeProps extends HTMLAttributes<HTMLDivElement> {
  count?: number | string
  maxCount?: number
  showDot?: boolean
  status?: BadgeStatusType
  position?: BadgePositionType
  offset?: [number, number]
  bgColor?: string
  textColor?: string
  hidden?: boolean
  children?: ReactNode
}
