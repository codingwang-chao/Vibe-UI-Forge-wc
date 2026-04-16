import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"
import { ButtonIcon } from "./button-icon"
import { useButtonGroupSize } from "./button-group-context"
import type {
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonWaveStyle,
  LegacyButtonSize,
  LegacyButtonVariant,
  MiniDevUIButtonSize,
  MiniDevUIButtonVariant,
} from "./button.types"
import "./button.css"

const defaultColorMap: Record<MiniDevUIButtonVariant, ButtonColor> = {
  solid: "primary",
  outline: "secondary",
  text: "secondary",
}

const legacyVariantMap: Record<
  LegacyButtonVariant,
  {
    variant: MiniDevUIButtonVariant
    color?: ButtonColor
  }
> = {
  default: { variant: "solid", color: "primary" },
  outline: { variant: "outline", color: "secondary" },
  secondary: { variant: "solid", color: "secondary" },
  ghost: { variant: "text", color: "secondary" },
  destructive: { variant: "solid", color: "danger" },
  link: { variant: "text", color: "primary" },
}

const legacySizeMap: Record<
  LegacyButtonSize,
  {
    size: MiniDevUIButtonSize
    iconOnly: boolean
  }
> = {
  default: { size: "md", iconOnly: false },
  xs: { size: "sm", iconOnly: false },
  sm: { size: "sm", iconOnly: false },
  lg: { size: "lg", iconOnly: false },
  icon: { size: "sm", iconOnly: true },
  "icon-xs": { size: "sm", iconOnly: true },
  "icon-sm": { size: "sm", iconOnly: true },
  "icon-lg": { size: "lg", iconOnly: true },
}

const miniVariants = ["solid", "outline", "text"] as const
const miniSizes = ["sm", "md", "lg"] as const

function isMiniVariant(value: ButtonVariant): value is MiniDevUIButtonVariant {
  return (miniVariants as readonly string[]).includes(value)
}

function isMiniSize(value: ButtonSize): value is MiniDevUIButtonSize {
  return (miniSizes as readonly string[]).includes(value)
}

function resolveVariant(
  variant: ButtonVariant,
  color?: ButtonColor
): {
  variant: MiniDevUIButtonVariant
  color: ButtonColor
} {
  if (isMiniVariant(variant)) {
    return {
      variant,
      color: color ?? defaultColorMap[variant],
    }
  }

  const mapped = legacyVariantMap[variant]
  return {
    variant: mapped.variant,
    color: color ?? mapped.color ?? defaultColorMap[mapped.variant],
  }
}

function resolveSize(size: ButtonSize): {
  size: MiniDevUIButtonSize
  iconOnly: boolean
} {
  if (isMiniSize(size)) {
    return { size, iconOnly: false }
  }

  return legacySizeMap[size]
}

type ButtonVariantOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  shape?: ButtonShape
  icon?: string
  loading?: boolean
  className?: string
  children?: ReactNode
}

function buttonVariants({
  variant = "default",
  size = "default",
  color,
  shape,
  icon = "",
  loading = false,
  className,
  children,
}: ButtonVariantOptions = {}) {
  const { variant: resolvedVariant, color: resolvedColor } = resolveVariant(
    variant,
    color
  )
  const { size: resolvedSize, iconOnly: iconSizeOnly } = resolveSize(size)
  const hasContent =
    children !== undefined && children !== null && children !== false
  const isIconOnly = iconSizeOnly || (Boolean(icon) && !hasContent)

  return cn(
    "mini-devui-button",
    `mini-devui-button--${resolvedVariant}`,
    `mini-devui-button--${resolvedVariant}--${resolvedColor}`,
    `mini-devui-button--${resolvedSize}`,
    icon && "mini-devui-button--icon-wrap",
    isIconOnly && "mini-devui-button--icon-only",
    loading && "mini-devui-button--is-loading",
    shape && `mini-devui-button--${shape}`,
    className
  )
}

function Button({
  variant = "default",
  size = "default",
  color,
  icon = "",
  loading = false,
  disabled = false,
  shape,
  nativeType = "button",
  type,
  asChild = false,
  className,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const groupSize = useButtonGroupSize()
  const effectiveSize: ButtonSize = groupSize ?? size

  const { variant: resolvedVariant } = resolveVariant(variant, color)
  const { size: resolvedSize } = resolveSize(effectiveSize)

  const hasContent =
    children !== undefined && children !== null && children !== false
  const timeoutRef = useRef<number | null>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [showWave, setShowWave] = useState(false)
  const [waveStyle, setWaveStyle] = useState<ButtonWaveStyle>({
    top: "0px",
    left: "0px",
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const classes = cn(
    buttonVariants({
      variant,
      size: effectiveSize,
      color,
      shape,
      icon,
      loading,
      className,
      children,
    }),
    isMouseDown && "mini-devui-button--mousedown"
  )

  const showClickWave = (event: MouseEvent<HTMLButtonElement>) => {
    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()

    setWaveStyle({
      left: `${clientX - rect.left}px`,
      top: `${clientY - rect.top}px`,
    })
    setShowWave(true)

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setShowWave(false)
      timeoutRef.current = null
    }, 300)
  }

  const buttonChildren = (
    <>
      {icon ? (
        <ButtonIcon
          name={icon}
          className={cn(
            "mini-devui-button__icon-fix",
            hasContent && "mini-devui-button__icon-gap"
          )}
        />
      ) : null}
      {loading ? (
        <span className="mini-devui-button__loading" aria-hidden="true">
          <ButtonIcon name="icon-loading" />
        </span>
      ) : null}
      {hasContent ? (
        <span className="mini-devui-button__content">{children}</span>
      ) : null}
      {showWave && !asChild ? (
        <span className="mini-devui-button__wave" style={waveStyle} />
      ) : null}
    </>
  )

  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-size={resolvedSize}
        data-variant={resolvedVariant}
        aria-disabled={disabled || loading || undefined}
        className={classes}
        {...props}
      >
        {buttonChildren}
      </Slot.Root>
    )
  }

  const resolvedNativeType = type ?? nativeType

  return (
    <button
      data-slot="button"
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      className={classes}
      disabled={disabled || loading}
      onClick={(event) => {
        if (loading || disabled) {
          event.preventDefault()
          return
        }

        showClickWave(event)
        onClick?.(event)
      }}
      onMouseDown={(event) => {
        setIsMouseDown(true)
        onMouseDown?.(event)
      }}
      onMouseLeave={(event) => {
        setIsMouseDown(false)
        onMouseLeave?.(event)
      }}
      onMouseUp={(event) => {
        setIsMouseDown(false)
        onMouseUp?.(event)
      }}
      type={resolvedNativeType}
      {...props}
    >
      {buttonChildren}
    </button>
  )
}

export { Button }
