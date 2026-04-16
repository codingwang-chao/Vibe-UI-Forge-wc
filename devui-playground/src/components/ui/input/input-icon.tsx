import type { CSSProperties, ReactNode } from "react"
import { cn } from "./utils"

type IconName = "search" | "like" | "preview" | "preview-forbidden"

function BaseIcon({
  className,
  size = 16,
  children,
}: {
  className?: string
  size?: number | string
  children: ReactNode
}) {
  const style: CSSProperties =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: size, height: size }

  return (
    <svg
      aria-hidden="true"
      className={cn("devui-input__icon", className)}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {children}
    </svg>
  )
}

function SearchIcon({
  className,
  size,
}: {
  className?: string
  size?: number | string
}) {
  return (
    <BaseIcon className={className} size={size}>
      <path
        d="M7.713 1.533a6 6 0 1 1-3.95 10.534l-2.347 2.347a.5.5 0 0 1-.707-.707l2.347-2.347A6 6 0 0 1 7.713 1.533Zm0 1a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
        fill="currentColor"
      />
    </BaseIcon>
  )
}

function LikeIcon({
  className,
  size,
}: {
  className?: string
  size?: number | string
}) {
  return (
    <BaseIcon className={className} size={size}>
      <path
        d="M8 13.5 3.28 8.78a3.05 3.05 0 0 1 0-4.32 3.05 3.05 0 0 1 4.32 0L8 4.86l.4-.4a3.05 3.05 0 0 1 4.32 0 3.05 3.05 0 0 1 0 4.32L8 13.5Z"
        fill="currentColor"
      />
    </BaseIcon>
  )
}

function PreviewIcon({
  className,
  size,
}: {
  className?: string
  size?: number | string
}) {
  return (
    <BaseIcon className={className} size={size}>
      <path
        d="M8 3.25c3.49 0 6.41 2.12 7.5 4.75-1.09 2.63-4.01 4.75-7.5 4.75S1.59 10.63.5 8C1.59 5.37 4.51 3.25 8 3.25Zm0 1C5.18 4.25 2.75 5.9 1.75 8 2.75 10.1 5.18 11.75 8 11.75S13.25 10.1 14.25 8C13.25 5.9 10.82 4.25 8 4.25Zm0 1.25A2.5 2.5 0 1 1 8 10a2.5 2.5 0 0 1 0-5Zm0 1A1.5 1.5 0 1 0 8 9a1.5 1.5 0 0 0 0-3Z"
        fill="currentColor"
      />
    </BaseIcon>
  )
}

function PreviewForbiddenIcon({
  className,
  size,
}: {
  className?: string
  size?: number | string
}) {
  return (
    <BaseIcon className={className} size={size}>
      <path
        d="M2.15 3.15 12.85 13.85l-.7.7-1.9-1.9A9.8 9.8 0 0 1 8 12.75C4.51 12.75 1.59 10.63.5 8a10.37 10.37 0 0 1 2.62-3.66L1.45 2.65l.7-.7Zm3.04 3.04A2.5 2.5 0 0 0 9.8 9.8L5.2 6.2Zm8.31 2.57C12.25 6.9 10.2 5.4 8 5.4c-.56 0-1.1.08-1.61.23l.84.84a2.5 2.5 0 0 1 3.31 3.31l1.31 1.31c.67-.53 1.26-1.18 1.65-2.03Z"
        fill="currentColor"
      />
    </BaseIcon>
  )
}

function InputClearIcon({
  className,
  size = 16,
}: {
  className?: string
  size?: number | string
}) {
  return (
    <BaseIcon className={className} size={size}>
      <path
        d="M2.78 2.07a.5.5 0 0 0-.71.71L7.29 8l-5.22 5.22a.5.5 0 1 0 .71.71L8 8.71l5.21 5.22a.5.5 0 0 0 .71-.71L8.71 8l5.21-5.22a.5.5 0 0 0-.71-.71L8 7.29 2.78 2.07Z"
        fill="currentColor"
      />
    </BaseIcon>
  )
}

export function InputIcon({
  name,
  className,
  size,
}: {
  name: IconName | string
  className?: string
  size?: number | string
}) {
  switch (name) {
    case "search":
      return <SearchIcon className={className} size={size} />
    case "like":
      return <LikeIcon className={className} size={size} />
    case "preview":
      return <PreviewIcon className={className} size={size} />
    case "preview-forbidden":
      return <PreviewForbiddenIcon className={className} size={size} />
    default:
      return null
  }
}

export { InputClearIcon }
