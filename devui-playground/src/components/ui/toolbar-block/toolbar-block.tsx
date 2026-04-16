import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import "./toolbar-block.css"

export type ToolbarBlockProps = {
  children?: ReactNode
  className?: string
}

export function ToolbarBlock({ children, className }: ToolbarBlockProps) {
  return (
    <section className={cn("toolbar-block", className)} data-runtime-component="ToolbarBlock">
      {children}
    </section>
  )
}
