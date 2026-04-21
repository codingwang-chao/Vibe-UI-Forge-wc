import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

type IconName =
  | "add"
  | "filter"
  | "connect"
  | "delete"
  | "search"
  | "setting"
  | "close"
  | "clear"
  | "save"
  | "directory"
  | "list"
  | "tree"
  | "card"
  | "more"
  | "more-horizontal"
  | "icon-select-arrow"
  | "icon-loading"
  | "arrow-up-down"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "flag"
  | "pencil"
  | "star"

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

function SearchIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} fill="currentColor" stroke="none" viewBox="0 0 16 16">
      <path d="M7.2 2.25a4.95 4.95 0 1 1-3.31 8.63l-1.9 1.9a.55.55 0 0 1-.78-.78l1.9-1.9A4.95 4.95 0 0 1 7.2 2.25Zm0 1.1a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Z" />
    </IconBase>
  )
}

function SettingIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} fill="currentColor" stroke="none" viewBox="0 0 16 16">
      <path d="M6.86 1.75h2.28l.35 1.52c.36.13.71.28 1.02.47l1.34-.82 1.62 1.62-.82 1.34c.19.32.35.66.47 1.02l1.53.35v2.3l-1.53.34c-.12.36-.28.7-.47 1.02l.82 1.35-1.62 1.62-1.34-.82c-.31.18-.66.34-1.02.46l-.35 1.53H6.86l-.35-1.53a5.9 5.9 0 0 1-1.02-.46l-1.34.82-1.62-1.62.82-1.35a5.82 5.82 0 0 1-.47-1.02l-1.53-.34v-2.3l1.53-.35c.12-.36.28-.7.47-1.02l-.82-1.34 1.62-1.62 1.34.82c.31-.19.66-.34 1.02-.47l.35-1.52ZM8 5.77a2.63 2.63 0 1 0 0 5.26 2.63 2.63 0 0 0 0-5.26Z" />
    </IconBase>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M4.75 4.75 11.25 11.25M11.25 4.75 4.75 11.25" />
    </IconBase>
  )
}

function ClearIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="5.7" strokeWidth="1.2" />
      <path d="M5.8 5.8 10.2 10.2M10.2 5.8 5.8 10.2" strokeWidth="1.2" />
    </IconBase>
  )
}

function SaveIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M3 2.5h8.2L13 4.3v9.2H3V2.5Zm2 0v3.2h5V2.5M5 13.5V9h6v4.5" strokeWidth="1.2" />
    </IconBase>
  )
}

function DirectoryIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M2 4h4.15l1.2 1.2H14v6.8H2V4Zm0 2.35h12" strokeWidth="1.2" />
    </IconBase>
  )
}

function ListIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M5 4h8M5 8h8M5 12h8" strokeWidth="1.4" />
      <path d="M2.8 4h.05M2.8 8h.05M2.8 12h.05" strokeWidth="2" />
    </IconBase>
  )
}

function TreeIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M4 2.5h4v3H4v-3Zm4 1.5h2.5v2.5M4 4v7.5h2M10.5 6.5H14v3h-3.5v-3ZM6 10h4v3H6v-3Z" strokeWidth="1.2" />
    </IconBase>
  )
}

function CardIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M2.5 3h11v10h-11V3Zm0 3.2h11M5.2 9h2.1M5.2 11h5.6" strokeWidth="1.2" />
    </IconBase>
  )
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 16 16">
      <path d="M8 3.2v.1M8 8v.1M8 12.8v.1" strokeWidth="2.2" />
    </IconBase>
  )
}

function MoreHorizontalIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </IconBase>
  )
}

function ArrowUpDownIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
      <path d="M12 20v-4" />
      <path d="M12 14V4" />
    </IconBase>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  )
}

function FlagIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </IconBase>
  )
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </IconBase>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
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
    case "search":
      return <SearchIcon className={className} />
    case "setting":
      return <SettingIcon className={className} />
    case "close":
      return <CloseIcon className={className} />
    case "clear":
      return <ClearIcon className={className} />
    case "save":
      return <SaveIcon className={className} />
    case "directory":
      return <DirectoryIcon className={className} />
    case "list":
      return <ListIcon className={className} />
    case "tree":
      return <TreeIcon className={className} />
    case "card":
      return <CardIcon className={className} />
    case "more":
      return <MoreIcon className={className} />
    case "more-horizontal":
      return <MoreHorizontalIcon className={className} />
    case "icon-select-arrow":
      return <ArrowIcon className={className} />
    case "icon-loading":
      return <LoadingIcon className={className} />
    case "arrow-up-down":
      return <ArrowUpDownIcon className={className} />
    case "chevron-right":
      return <ChevronRightIcon className={className} />
    case "chevron-left":
      return <ChevronLeftIcon className={className} />
    case "chevron-down":
      return <ChevronDownIcon className={className} />
    case "flag":
      return <FlagIcon className={className} />
    case "pencil":
      return <PencilIcon className={className} />
    case "star":
      return <StarIcon className={className} />
    default:
      return null
  }
}
