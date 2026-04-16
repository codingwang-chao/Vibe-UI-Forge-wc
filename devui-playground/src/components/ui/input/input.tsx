import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react"
import { InputClearIcon, InputIcon } from "./input-icon"
import type { InputHandle, MiniDevUIInputProps } from "./input.types"
import { cn } from "./utils"
import "./input.css"

function isInputCompositionTarget(value: string) {
  const lastCharacter = value[value.length - 1] || ""
  return !/([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(lastCharacter)
}

export const Input = forwardRef<InputHandle, MiniDevUIInputProps>(
  function Input(
    {
      modelValue,
      defaultModelValue = "",
      disabled = false,
      error = false,
      size = "md",
      validateEvent = true,
      prefixIcon = "",
      suffixIcon = "",
      prefix,
      suffix,
      prepend,
      append,
      showPassword = false,
      clearable = false,
      placeholder = "",
      title = "",
      autofocus = false,
      autoFocus,
      showGlowStyle = true,
      styleType = "default",
      className,
      style,
      type,
      onUpdateModelValue,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onClear,
      ...rest
    },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const composingRef = useRef(false)
    const isControlled = modelValue !== undefined
    const [uncontrolledValue, setUncontrolledValue] =
      useState(defaultModelValue)
    const value = isControlled ? modelValue : uncontrolledValue
    const hasPrepend =
      prepend !== null && prepend !== undefined && prepend !== false
    const hasAppend =
      append !== null && append !== undefined && append !== false

    useEffect(() => {
      if ((autofocus || autoFocus) && inputRef.current) {
        inputRef.current.focus()
      }
    }, [autoFocus, autofocus])

    useImperativeHandle(ref, () => ({
      select: () => inputRef.current?.select(),
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }))

    const hasValue = (value ?? "").length > 0
    const prefixVisible = Boolean(prefix || prefixIcon)
    const suffixVisible = Boolean(
      suffix || suffixIcon || showPassword || clearable
    )
    const showPasswordVisible = showPassword && !disabled
    const showClearable = clearable && !disabled && hasValue

    const rootClassName = useMemo(
      () =>
        cn(
          "devui-input",
          size === "sm" && "devui-input--sm",
          size === "lg" && "devui-input--lg",
          hasPrepend && "devui-input--prepend",
          hasAppend && "devui-input--append",
          error && "devui-input--error",
          isFocused && "devui-input--focus",
          disabled && "devui-input--disabled",
          showGlowStyle && "devui-input--glow-style",
          styleType === "gray" && "devui-input--gray-style",
          className
        ),
      [
        className,
        disabled,
        error,
        isFocused,
        hasAppend,
        hasPrepend,
        showGlowStyle,
        size,
        styleType,
      ]
    )

    const wrapperClassName = cn(
      "devui-input__wrapper",
      isFocused && "devui-input--focus",
      disabled && "devui-input--disabled",
      error && "devui-input--error",
      showGlowStyle && "devui-input--glow-style",
      styleType === "gray" && "devui-input--gray-style"
    )

    const commitValue = (nextValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }
      onUpdateModelValue?.(nextValue)
    }

    const handleInput = (event: FormEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value
      onInput?.(nextValue, event)
      if (composingRef.current) {
        return
      }
      commitValue(nextValue)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.currentTarget.value, event)
    }

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(event)
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(event)
      if (validateEvent) {
        void 0
      }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
    }

    const handleClear = () => {
      commitValue("")
      onClear?.()
      inputRef.current?.focus()
    }

    const handlePasswordToggle = () => {
      setPasswordVisible((current) => !current)
      inputRef.current?.blur()
    }

    const resolvedType = showPassword
      ? passwordVisible
        ? "text"
        : "password"
      : (type ?? "text")

    return (
      <div className={rootClassName} style={style}>
        {hasPrepend ? (
          <div className="devui-input-slot__prepend">{prepend}</div>
        ) : null}
        <div className={wrapperClassName}>
          {prefixVisible ? (
            <span className="devui-input-slot__prefix">
              {prefix ? <span>{prefix}</span> : null}
              {prefixIcon ? (
                <InputIcon
                  name={prefixIcon}
                  size={size === "lg" ? 18 : size === "sm" ? 14 : 16}
                />
              ) : null}
            </span>
          ) : null}
          <input
            ref={inputRef}
            value={value}
            disabled={disabled}
            className="devui-input__inner"
            placeholder={placeholder}
            title={title}
            type={resolvedType}
            autoFocus={autofocus || autoFocus}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => {
              composingRef.current = true
            }}
            onCompositionUpdate={(event) => {
              composingRef.current = isInputCompositionTarget(
                event.currentTarget.value
              )
            }}
            onCompositionEnd={(event) => {
              if (composingRef.current) {
                composingRef.current = false
                commitValue(event.currentTarget.value)
              }
            }}
            {...rest}
          />
          {suffixVisible ? (
            <span className="devui-input-slot__suffix">
              {suffixIcon ? (
                <InputIcon
                  name={suffixIcon}
                  size={size === "lg" ? 18 : size === "sm" ? 14 : 16}
                />
              ) : null}
              {suffix ? <span>{suffix}</span> : null}
              {showPasswordVisible ? (
                <button
                  type="button"
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                  className="devui-input__password-toggle"
                  onClick={handlePasswordToggle}
                >
                  <InputIcon
                    name={passwordVisible ? "preview" : "preview-forbidden"}
                  />
                </button>
              ) : null}
              {showClearable ? (
                <button
                  type="button"
                  aria-label="Clear input"
                  className="devui-input__clear-toggle"
                  onClick={handleClear}
                >
                  <InputClearIcon
                    className="devui-input__clear--icon"
                    size={size === "lg" ? 18 : size === "sm" ? 14 : 16}
                  />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
        {hasAppend ? (
          <div className="devui-input-slot__append">{append}</div>
        ) : null}
      </div>
    )
  }
)
