import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

import "./Card.css"

function mergeClassNames(
  base: string,
  className: string | undefined
): string {
  return cn(base, className)
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div className={mergeClassNames("my-card", className)} {...rest}>
      {children}
    </div>
  )
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function CardHeader({ className, children, ...rest }: CardHeaderProps) {
  return (
    <div className={mergeClassNames("my-card__header", className)} {...rest}>
      {children}
    </div>
  )
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
}

export function CardTitle({ className, children, ...rest }: CardTitleProps) {
  return (
    <h3 className={mergeClassNames("my-card__title", className)} {...rest}>
      {children}
    </h3>
  )
}

export interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

export function CardDescription({
  className,
  children,
  ...rest
}: CardDescriptionProps) {
  return (
    <p className={mergeClassNames("my-card__description", className)} {...rest}>
      {children}
    </p>
  )
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function CardContent({ className, children, ...rest }: CardContentProps) {
  return (
    <div className={mergeClassNames("my-card__content", className)} {...rest}>
      {children}
    </div>
  )
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function CardFooter({ className, children, ...rest }: CardFooterProps) {
  return (
    <div className={mergeClassNames("my-card__footer", className)} {...rest}>
      {children}
    </div>
  )
}
