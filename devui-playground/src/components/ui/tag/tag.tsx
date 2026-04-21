import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "@/components/ui/button"
import { ButtonIcon } from "@/components/ui/button/button-icon"
import { cn } from "@/lib/utils"
import "./tag.css"

const tagVariants = cva("devui-tag", {
  variants: {
    size: {
      md: "devui-tag--md",
      lg: "devui-tag--lg",
    },
    tagStyle: {
      fill: "devui-tag--fill",
      outline: "devui-tag--outline",
      regular: "devui-tag--regular",
    },
    color: {
      green: "devui-tag--green",
      orange: "devui-tag--orange",
      red: "devui-tag--red",
      grey: "devui-tag--grey",
    },
  },
  compoundVariants: [
    {
      tagStyle: "fill",
      color: "green",
      class: "devui-tag--fill-green",
    },
    {
      tagStyle: "fill",
      color: "orange",
      class: "devui-tag--fill-orange",
    },
    {
      tagStyle: "outline",
      color: "green",
      class: "devui-tag--outline-green",
    },
    {
      tagStyle: "outline",
      color: "orange",
      class: "devui-tag--outline-orange",
    },
    {
      tagStyle: "outline",
      color: "red",
      class: "devui-tag--outline-red",
    },
    {
      tagStyle: "regular",
      color: "green",
      class: "devui-tag--regular-green",
    },
    {
      tagStyle: "regular",
      color: "grey",
      class: "devui-tag--regular-grey",
    },
  ],
  defaultVariants: {
    size: "md",
    tagStyle: "regular",
    color: "grey",
  },
})

export type TagProps = Omit<
  React.ComponentProps<"span">,
  "onClose" | "prefix"
> &
  VariantProps<typeof tagVariants> & {
    icon?: string
    showIcon?: boolean
    closable?: boolean
    closeAriaLabel?: string
    onClose?: () => void
  }

function Tag({
  children = "标签",
  size = "md",
  tagStyle = "regular",
  color = "grey",
  icon = "setting",
  showIcon = true,
  closable = false,
  closeAriaLabel = "关闭标签",
  className,
  onClose,
  ...props
}: TagProps) {
  const isFill = tagStyle === "fill"
  const isOutline = tagStyle === "outline"
  const isRegular = tagStyle === "regular"
  const showIcons = isRegular && showIcon

  return (
    <span
      className={cn(
        tagVariants({ size, tagStyle, color }),
        className
      )}
      data-figma-node-id={isFill ? "40:116" : isOutline ? "306:595" : isRegular && color === "grey" ? "40:138" : "131:279"}
      data-runtime-component="Tag"
      data-slot="tag"
      {...props}
    >
      {showIcons ? (
        <ButtonIcon name={icon} className="devui-tag__icon" />
      ) : null}
      <span className="devui-tag__text">{children}</span>
      {closable && isRegular ? (
        <Button
          aria-label={closeAriaLabel}
          className="devui-tag__close"
          icon="close"
          onClick={(event) => {
            event.stopPropagation()
            onClose?.()
          }}
          size="icon"
          type="button"
          variant="text"
        />
      ) : null}
    </span>
  )
}

export { Tag }
