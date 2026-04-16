import * as React from "react"
import "./Button.css"

export type ButtonVariant =
  | "primary"
  | "default"
  | "danger"
  | "info"
  | "success"

export type ButtonSize = "large" | "small"

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: ButtonVariant
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  block?: boolean
  loading?: boolean
  nativeType?: "button" | "submit" | "reset"
  tag?: React.ElementType
  color?: string
  textColor?: string
}

function getClassNames(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  function Button(
    {
      type = "primary",
      size = "large",
      plain = false,
      round = false,
      block = false,
      disabled = false,
      loading = false,
      nativeType = "button",
      tag: Tag = "button",
      color = "",
      textColor = "",
      className,
      style,
      onClick,
      children,
      ...rest
    },
    ref
  ) {
    const isButtonTag = Tag === "button"
    const isDisabled = disabled || loading
    const Component = Tag as React.ElementType

    const mergedStyle = React.useMemo<React.CSSProperties>(() => {
      const nextStyle: React.CSSProperties & Record<string, string> = {}

      if (color) {
        nextStyle["--my-btn-bg"] = color

        if (!textColor) {
          nextStyle["--my-btn-color"] = "#fff"
        }
      }

      if (textColor) {
        nextStyle["--my-btn-color"] = textColor
      }

      return nextStyle
    }, [color, textColor])

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (isDisabled) {
          event.preventDefault()
          return
        }

        onClick?.(event as React.MouseEvent<HTMLButtonElement>)
      },
      [isDisabled, onClick]
    )

    const classes = getClassNames([
      "my-btn",
      `my-btn--${type}`,
      `my-btn--${size}`,
      plain && "my-btn--plain",
      round && "my-btn--round",
      block && "my-btn--block",
      disabled && "my-btn--disabled",
      loading && "my-btn--loading",
      className,
    ])

    const sharedProps = {
      ...rest,
      className: classes,
      style: {
        ...mergedStyle,
        ...style,
      },
      onClick: handleClick,
      "aria-disabled": isDisabled || undefined,
      "data-disabled": isDisabled || undefined,
      "data-loading": loading || undefined,
    }

    if (isButtonTag) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          type={nativeType}
          disabled={isDisabled}
        >
          {loading ? <span className="my-btn__loading" aria-hidden="true" /> : null}
          <span className="my-btn__text">{children}</span>
        </button>
      )
    }

    return (
      <Component
        ref={ref as never}
        {...(sharedProps as any)}
        role={rest.role ?? "button"}
        aria-disabled={isDisabled || undefined}
      >
        {loading ? <span className="my-btn__loading" aria-hidden="true" /> : null}
        <span className="my-btn__text">{children}</span>
      </Component>
    )
  }
)

Button.displayName = "Button"

export default Button
