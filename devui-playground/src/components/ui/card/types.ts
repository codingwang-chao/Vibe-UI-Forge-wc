import type { ReactNode } from "react"

export type CardAlign = "start" | "end" | "spaceBetween"

export type CardShadow = "always" | "hover" | "never"

export interface CardProps {
  align?: CardAlign
  src?: string
  shadow?: CardShadow
  className?: string
  children?: ReactNode
  avatar?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  content?: ReactNode
  actions?: ReactNode
}
