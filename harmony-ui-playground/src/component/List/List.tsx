import type { HTMLAttributes, ReactNode } from "react"
import "./List.css"

function classNames(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function List({ className, children, ...rest }: ListProps) {
  return (
    <div className={classNames(["my-list", className])} {...rest}>
      {children}
    </div>
  )
}

export default List

