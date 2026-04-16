import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import "./table-shell-frame.css"

export type TableShellFrameProps = {
  header?: ReactNode
  primaryNav?: ReactNode
  secondaryHeader?: ReactNode
  toolbar?: ReactNode
  children?: ReactNode
  className?: string
}

export function TableShellFrame({
  header,
  primaryNav,
  secondaryHeader,
  toolbar,
  children,
  className,
}: TableShellFrameProps) {
  return (
    <div className={cn("table-shell-frame", className)} data-runtime-component="TableShellFrame">
      <div className="table-shell-frame__header">{header}</div>
      <div className="table-shell-frame__body">
        <div className="table-shell-frame__primary-nav">{primaryNav}</div>
        <div className="table-shell-frame__content">
          {secondaryHeader}
          {toolbar}
          {children}
        </div>
      </div>
    </div>
  )
}
