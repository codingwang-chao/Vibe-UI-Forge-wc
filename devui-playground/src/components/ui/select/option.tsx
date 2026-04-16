import { useEffect } from "react"
import { useSelectContext } from "./context"
import { useOptionGroupDisabled } from "./option-group"
import type { OptionProps } from "./types"

export function Option(props: OptionProps) {
  const select = useSelectContext()
  const value = props.value ?? ""
  const name = props.name ?? String(value)
  const groupDisabled = useOptionGroupDisabled()

  useEffect(() => {
    if (!select) {
      return
    }

    select.registerOption({
      value,
      name,
      disabled: props.disabled,
      create: props.create,
      groupDisabled,
      source: "child",
    })

    return () => {
      select.unregisterOption(value, "child")
    }
  }, [select, value, name, props.disabled, props.create])

  if (!select) {
    return null
  }

  const option = {
    value,
    name,
    disabled: props.disabled,
    create: props.create,
    groupDisabled,
    source: "child" as const,
  }

  if (!select.isOptionVisible(option)) {
    return null
  }

  const active = select.selectedOptions.some((item) => item.value === value)
  const disabled = select.isOptionDisabled(option)

  return (
    <li
      className={[
        "d-select__item",
        active ? "active" : "",
        disabled ? "disabled" : "",
      ].filter(Boolean).join(" ")}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        if (!disabled) {
          select.selectOption(option)
        }
      }}
      role="option"
      aria-selected={active}
      aria-disabled={disabled}>
      {select.multiple ? <input type="checkbox" readOnly checked={active} /> : null}
      <span>{props.children ?? name}</span>
    </li>
  )
}
