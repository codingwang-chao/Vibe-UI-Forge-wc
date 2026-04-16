import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import "./form-shell-frame.css"

export type FormShellFrameProps = {
  header?: ReactNode
  primaryNav?: ReactNode
  secondaryNav?: ReactNode
  secondaryHeader?: ReactNode
  toolbar?: ReactNode
  children?: ReactNode
  className?: string
}

export function FormShellFrame({
  header,
  primaryNav,
  secondaryNav,
  secondaryHeader,
  toolbar,
  children,
  className,
}: FormShellFrameProps) {
  const hasSecondaryNav = secondaryNav !== undefined && secondaryNav !== null

  return (
    <div
      className={cn("form-shell-frame", className)}
      data-runtime-component="FormShellFrame"
    >
      <div className="form-shell-frame__header">{header}</div>
      <div
        className={cn(
          "form-shell-frame__body",
          hasSecondaryNav && "form-shell-frame__body--with-secondary-nav"
        )}
      >
        <div className="form-shell-frame__primary-nav">{primaryNav}</div>
        {hasSecondaryNav ? (
          <div className="form-shell-frame__secondary-nav">{secondaryNav}</div>
        ) : null}
        <div className="form-shell-frame__content">
          {secondaryHeader}
          {toolbar}
          {children}
        </div>
      </div>
    </div>
  )
}
