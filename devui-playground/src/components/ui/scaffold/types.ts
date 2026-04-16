import type { ReactNode } from "react"

export type ScaffoldNavItem = {
  key: string
  label: ReactNode
  children?: ScaffoldNavItem[]
  disabled?: boolean
}

export type ScaffoldTreeNode = {
  key: string
  label: ReactNode
  children?: ScaffoldTreeNode[]
  disabled?: boolean
}

export type ScaffoldTabItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

export type ScaffoldBreadcrumbItem = {
  key?: string
  label: ReactNode
  href?: string
}
