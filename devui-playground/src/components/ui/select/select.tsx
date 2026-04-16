import {
  Children,
  Fragment,
  isValidElement,
  forwardRef,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { InputClearIcon, SelectArrowIcon } from "./icons"
import { SelectContext } from "./context"
import { Option } from "./option"
import { OptionGroup } from "./option-group"
import type {
  SelectContextValue,
  SelectModelValue,
  SelectProps,
  SelectRegisteredOption,
} from "./types"
import { classNames, getLabel, normalizeOption, toValueKey } from "./utils"
import "./select.css"

export interface SelectRef {
  focus: () => void
  blur: () => void
  toggleChange: (open: boolean) => void
}

function isFunction(value: unknown): value is (query: string) => void {
  return typeof value === "function"
}

function normalizeValueList(value: SelectModelValue | undefined, multiple: boolean): Array<string | number> {
  if (multiple) {
    return Array.isArray(value) ? value : []
  }
  if (Array.isArray(value)) {
    return []
  }
  if (value === undefined || value === null) {
    return []
  }
  return [value]
}

function isSameValue(a: string | number, b: string | number) {
  return String(a) === String(b)
}

type SelectChildNodeProps = {
  children?: ReactNode
  value?: string | number
  name?: string
  disabled?: boolean
  create?: boolean
}

function collectChildOptions(nodes: ReactNode, inheritedDisabled = false): SelectRegisteredOption[] {
  const result: SelectRegisteredOption[] = []

  Children.forEach(nodes, (node) => {
    if (!isValidElement(node)) {
      return
    }

    if (node.type === Option) {
      const props = node.props as SelectChildNodeProps
      const value = props.value ?? ""
      result.push({
        value,
        name: props.name ?? String(value),
        disabled: props.disabled,
        create: props.create,
        groupDisabled: inheritedDisabled,
        source: "child",
      })
      return
    }

    if (node.type === OptionGroup) {
      const props = node.props as SelectChildNodeProps
      result.push(...collectChildOptions(props.children, inheritedDisabled || Boolean(props.disabled)))
      return
    }

    const props = node.props as SelectChildNodeProps
    if (props.children) {
      result.push(...collectChildOptions(props.children, inheritedDisabled))
    }
  })

  return result
}

function useClickOutside(
  refs: Array<RefObject<HTMLElement | null>>,
  handler: () => void,
  active: boolean
) {
  useEffect(() => {
    if (!active) {
      return
    }

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) {
        return
      }
      if (refs.some((ref) => ref.current && ref.current.contains(target))) {
        return
      }
      handler()
    }

    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [active, handler, refs])
}

export const Select = forwardRef<SelectRef, SelectProps>(function Select(props, ref) {
  const {
    modelValue,
    options = [],
    position = ["bottom", "top", "left", "right"],
    size = "",
    overview = "border",
    placeholder = "",
    multiple = false,
    disabled = false,
    allowClear = false,
    optionDisabledKey = "",
    collapseTags = false,
    collapseTagsTooltip = false,
    filter = false,
    allowCreate = false,
    noDataText = "",
    noMatchText = "",
    loading = false,
    loadingText = "",
    onToggleChange,
    onValueChange,
    multipleLimit = 0,
    showGlowStyle = true,
    menuClass = "",
    maxLength,
    onUpdateModelValue,
    children,
  } = props

  const rootRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [filterQuery, setFilterQuery] = useState("")
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({})
  const [registeredOptions, setRegisteredOptions] = useState<Map<string, SelectRegisteredOption>>(new Map())

  const isSelectDisabled = disabled
  const supportsFilter = isFunction(filter) || (typeof filter === "boolean" && filter)
  const isReadOnly = !supportsFilter

  const propOptions = useMemo(() => options.map((item) => normalizeOption(item, "prop")), [options])
  const childOptions = useMemo(() => collectChildOptions(children), [children])

  const visibleOptions = useMemo(() => {
    const all = [...registeredOptions.values()]
    if (all.length > 0) {
      return all
    }
    if (childOptions.length > 0) {
      return childOptions
    }
    return propOptions
  }, [childOptions, propOptions, registeredOptions])

  const currentValues = normalizeValueList(modelValue, multiple)

  const selectedOptions = useMemo<SelectRegisteredOption[]>(() => {
    return currentValues
      .map((value) => visibleOptions.find((item) => isSameValue(item.value, value)))
      .filter((item): item is SelectRegisteredOption => Boolean(item))
  }, [currentValues, visibleOptions])

  const displayValue = useMemo(() => {
    if (multiple) {
      return ""
    }
    const first = selectedOptions[0]
    return first ? getLabel(first) : ""
  }, [multiple, selectedOptions])

  const normalizedQuery = filterQuery.trim().toLowerCase()
  const filteredOptions = useMemo(() => {
    if (!supportsFilter || !normalizedQuery || isFunction(filter)) {
      return visibleOptions
    }
    return visibleOptions.filter((item) => getLabel(item).toLowerCase().includes(normalizedQuery))
  }, [filter, normalizedQuery, supportsFilter, visibleOptions])

  const hasMatchingOption = filteredOptions.some((item) => getLabel(item).toLowerCase() === normalizedQuery)
  const showCreateOption = Boolean(
    typeof filter === "boolean" &&
      filter &&
      allowCreate &&
      normalizedQuery &&
      !hasMatchingOption
  )

  const emptyText = useMemo(() => {
    if (loading) {
      return ""
    }
    if (supportsFilter && filterQuery && visibleOptions.length > 0 && filteredOptions.length === 0) {
      return noMatchText || "No matching data"
    }
    if (visibleOptions.length === 0) {
      return noDataText || "No data"
    }
    return ""
  }, [filteredOptions.length, filterQuery, loading, noDataText, noMatchText, supportsFilter, visibleOptions.length])

  const selectedCount = selectedOptions.length
  const canClear = allowClear && !isSelectDisabled && selectedCount > 0
  const showEmpty = Boolean(emptyText) && (!allowCreate || loading || (allowCreate && visibleOptions.length === 0))

  const updatePosition = () => {
    const trigger = triggerRef.current
    if (!trigger) {
      return
    }
    const rect = trigger.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const estimatedHeight = 320
    const preferred = position[0] ?? "bottom"
    const shouldOpenTop = preferred.startsWith("top") || (preferred === "bottom" && rect.bottom + estimatedHeight > viewportHeight && rect.top > estimatedHeight)
    const top = shouldOpenTop ? Math.max(8, rect.top - estimatedHeight - 8) : Math.min(viewportHeight - 8, rect.bottom + 8)

    setDropdownStyle({
      top,
      left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
      width: rect.width,
      transformOrigin: shouldOpenTop ? "center bottom" : "center top",
    })
  }

  const toggleChange = (open: boolean) => {
    if (isSelectDisabled) {
      return
    }
    setIsOpen(open)
    onToggleChange?.(open)
  }

  const focus = () => {
    if (!isSelectDisabled) {
      setIsFocused(true)
    }
    inputRef.current?.focus()
  }

  const blur = () => {
    if (!isSelectDisabled) {
      setIsFocused(false)
    }
    inputRef.current?.blur()
  }

  useImperativeHandle(ref, () => ({ focus, blur, toggleChange }), [isSelectDisabled])

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition()
    }
  }, [isOpen, visibleOptions.length])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const onResize = () => updatePosition()
    window.addEventListener("resize", onResize)
    window.addEventListener("scroll", onResize, true)
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onResize, true)
    }
  }, [isOpen])

  useClickOutside([rootRef, dropdownRef], () => toggleChange(false), isOpen)

  const isOptionDisabled = (option: SelectRegisteredOption): boolean => {
    const optionDisabled = Boolean(option.disabled || option.groupDisabled)
    const keyDisabled = optionDisabledKey
      ? Boolean((option as unknown as Record<string, unknown>)[optionDisabledKey])
      : false
    if (!multiple) {
      return optionDisabled || keyDisabled
    }
    const limitReached = Boolean(multipleLimit && multipleLimit <= currentValues.length && !currentValues.some((item) => isSameValue(item, option.value)))
    return optionDisabled || keyDisabled || limitReached
  }

  const registerOption = (option: SelectRegisteredOption) => {
    setRegisteredOptions((prev) => {
      const next = new Map(prev)
      next.set(toValueKey(option.value), option)
      return next
    })
  }

  const unregisterOption = (value: string | number) => {
    setRegisteredOptions((prev) => {
      const next = new Map(prev)
      next.delete(toValueKey(value))
      return next
    })
  }

  const emitSelection = (nextValues: Array<string | number>, option: SelectRegisteredOption) => {
    if (multiple) {
      const next = nextValues
      onUpdateModelValue?.(next)
      onValueChange?.(next, next.length - 1)
      return
    }

    const next = nextValues[0] ?? ""
    onUpdateModelValue?.(next)
    onValueChange?.(option, 0)
  }

  const selectOption = (option: SelectRegisteredOption) => {
    if (isOptionDisabled(option)) {
      return
    }

    if (multiple) {
      const exists = currentValues.some((item) => isSameValue(item, option.value))
      const next = exists
        ? currentValues.filter((item) => !isSameValue(item, option.value))
        : [...currentValues, option.value]

      emitSelection(next, option)
      if (option.create) {
        setFilterQuery("")
      }
      if (supportsFilter) {
        focus()
      }
      return
    }

    emitSelection([option.value], option)
    if (option.create) {
      setFilterQuery("")
    }
    toggleChange(false)
  }

  const handleClear = () => {
    const next = multiple ? [] : ""
    onUpdateModelValue?.(next)
    onValueChange?.(next, 0)
    props.onClear?.()
    setFilterQuery("")
    if (isOpen) {
      toggleChange(false)
      blur()
    }
  }

  const tagDelete = (option: SelectRegisteredOption) => {
    if (!multiple) {
      return
    }
    const next = currentValues.filter((value) => !isSameValue(value, option.value))
    onUpdateModelValue?.(next)
    onValueChange?.(next, 0)
    props.onRemoveTag?.(option.value)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    props.onInputChange?.(query)
    if (isFunction(filter)) {
      filter(query)
      return
    }
    if (typeof filter === "boolean" && filter) {
      setFilterQuery(query)
    }
  }

  const inputValue = multiple ? filterQuery : displayValue
  const placeholderText = inputValue ? "" : placeholder || "Please select"

  const queryMatches = (option: SelectRegisteredOption) =>
    getLabel(option).toLowerCase().includes(normalizedQuery)

  const contextValue = useMemo<SelectContextValue>(
    () => ({
      registerOption,
      unregisterOption,
      selectOption,
      isOptionDisabled,
      isOptionVisible: (option) => {
        if (!supportsFilter) {
          return true
        }
        if (isFunction(filter)) {
          return true
        }
        if (!normalizedQuery) {
          return true
        }
        return queryMatches(option)
      },
      filterQuery,
      multiple,
      collapseTags,
      collapseTagsTooltip,
      selectedOptions,
    }),
    [collapseTags, collapseTagsTooltip, filterQuery, multiple, selectedOptions, supportsFilter, normalizedQuery]
  )

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        className={classNames("d-select", {
          "d-select--open": isOpen,
          "d-select--focus": isFocused,
          "d-select--multiple": multiple,
          "d-select--sm": size === "sm",
          "d-select--lg": size === "lg",
          "d-select--underlined": overview === "underlined",
          "d-select--disabled": isSelectDisabled,
        })}
        onClick={() => toggleChange(!isOpen)}
      >
        <div
          ref={triggerRef}
          className={classNames("d-select__selection", {
            "d-select__selection--clearable": canClear,
            "d-select__selection--glow-style": showGlowStyle,
            "d-select__selection--multiple": multiple,
          })}
        >
          {multiple ? (
            <div className="d-select__multiple">
              {selectedOptions.length > 0 && !collapseTags ? (
                selectedOptions.map((item) => (
                  <span key={toValueKey(item.value)} className="d-select__tag" title={item.name}>
                    <span>{item.name}</span>
                    <button
                      type="button"
                      className="d-select__tag-delete"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        tagDelete(item)
                      }}
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : null}

              {selectedOptions.length > 0 && collapseTags ? (
                <Fragment>
                  <span className="d-select__tag" title={selectedOptions[0].name}>
                    <span>{selectedOptions[0].name}</span>
                    <button
                      type="button"
                      className="d-select__tag-delete"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        tagDelete(selectedOptions[0])
                      }}
                      aria-label={`Remove ${selectedOptions[0].name}`}
                    >
                      ×
                    </button>
                  </span>
                  {selectedOptions.length > 1 ? (
                    <span
                      className="d-select__tag"
                      title={collapseTagsTooltip ? selectedOptions.slice(1).map((item) => item.name).join(", ") : undefined}
                    >
                      +{selectedOptions.length - 1}
                    </span>
                  ) : null}
                </Fragment>
              ) : null}

              <div className="d-select__multiple--input">
                <input
                  ref={inputRef}
                  value={supportsFilter ? inputValue : displayValue}
                  type="text"
                  className={classNames("d-select__input", {
                    "d-select__input--sm": size === "sm",
                    "d-select__input--lg": size === "lg",
                  })}
                  placeholder={placeholderText}
                  readOnly={isReadOnly}
                  disabled={isSelectDisabled}
                  maxLength={maxLength}
                  onChange={handleInputChange}
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => {
                    setIsFocused(true)
                    if (!isSelectDisabled) {
                      toggleChange(true)
                    }
                    props.onFocus?.(event)
                  }}
                  onBlur={(event) => {
                    setIsFocused(false)
                    props.onBlur?.(event)
                  }}
                />
              </div>
            </div>
          ) : (
            <input
              ref={inputRef}
              value={supportsFilter ? filterQuery || displayValue : displayValue}
              type="text"
              className={classNames("d-select__input", {
                "d-select__input--sm": size === "sm",
                "d-select__input--lg": size === "lg",
              })}
              placeholder={placeholderText}
              readOnly={isReadOnly}
              disabled={isSelectDisabled}
              maxLength={maxLength}
              onChange={handleInputChange}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => {
                setIsFocused(true)
                if (!isSelectDisabled) {
                  toggleChange(true)
                }
                props.onFocus?.(event)
              }}
              onBlur={(event) => {
                setIsFocused(false)
                props.onBlur?.(event)
              }}
            />
          )}

          <button
            type="button"
            className="d-select__clear"
            aria-hidden={!canClear}
            aria-label="Clear selection"
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              handleClear()
            }}
          >
            <InputClearIcon className="d-select__icon" />
          </button>
          <span className="d-select__arrow" aria-hidden="true">
            <SelectArrowIcon className="d-select__icon" />
          </span>
        </div>
      </div>

      {isOpen
        ? createPortal(
            <div
              ref={dropdownRef}
              className={classNames("d-select__dropdown", {
                "d-select__dropdown--multiple": multiple,
                [menuClass]: Boolean(menuClass),
              })}
              style={dropdownStyle}
            >
              <div className="d-select__dropdown-inner">
                {loading ? (
                  <div className="d-select__dropdown-loading">{loadingText || "Loading..."}</div>
                ) : showEmpty ? (
                  <div className="d-select__dropdown--empty">{emptyText}</div>
                ) : (
                  <ul className="d-select__dropdown-list">
                    {showCreateOption ? (
                      <li
                        className="d-select__item"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() =>
                          selectOption({
                            value: filterQuery,
                            name: filterQuery,
                            create: true,
                            disabled: false,
                            groupDisabled: false,
                            source: "prop",
                          })
                        }
                      >
                        {multiple ? <input type="checkbox" readOnly checked={false} /> : filterQuery}
                      </li>
                    ) : null}
                    {children
                      ? children
                      : filteredOptions.map((item) => {
                          const disabled = isOptionDisabled(item)
                          const active = selectedOptions.some((selected) => isSameValue(selected.value, item.value))
                          return (
                            <li
                              key={toValueKey(item.value)}
                              className={classNames("d-select__item", {
                                active,
                                disabled,
                              })}
                              role="option"
                              aria-selected={active}
                              aria-disabled={disabled}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => {
                                if (!disabled) {
                                  selectOption(item)
                                }
                              }}
                            >
                              {multiple ? <input type="checkbox" readOnly checked={active} /> : item.name || item.value}
                            </li>
                          )
                        })}
                  </ul>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </SelectContext.Provider>
  )
})
