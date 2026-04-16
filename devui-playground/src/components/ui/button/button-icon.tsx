import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

type IconName =
  | "add"
  | "filter"
  | "connect"
  | "delete"
  | "icon-select-arrow"
  | "icon-loading"

function IconBase({ className, children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("mini-devui-button__icon-svg", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  )
}

function AddIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  )
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </IconBase>
  )
}

function ConnectIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M10 13a5 5 0 0 1 0-7l1.2-1.2a5 5 0 0 1 7 7L17 13" />
      <path d="M14 11a5 5 0 0 1 0 7l-1.2 1.2a5 5 0 0 1-7-7L7 11" />
    </IconBase>
  )
}

function DeleteIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 12h10l1-12" />
      <path d="M9 7V4h6v3" />
    </IconBase>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  )
}

function LoadingIcon({ className }: { className?: string }) {
  return (
    <IconBase className={cn("mini-devui-button__icon-spin", className)}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </IconBase>
  )
}

export function ButtonIcon({
  name,
  className,
}: {
  name: IconName | string
  className?: string
}) {
  switch (name) {
    case "add":
      return <AddIcon className={className} />
    case "filter":
      return <FilterIcon className={className} />
    case "connect":
      return <ConnectIcon className={className} />
    case "delete":
      return <DeleteIcon className={className} />
    case "icon-select-arrow":
      return <ArrowIcon className={className} />
    case "icon-loading":
      return <LoadingIcon className={className} />
    default:
      return null
  }
}
