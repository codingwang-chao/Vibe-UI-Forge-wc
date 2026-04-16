import { createContext, useContext } from "react"
import type { OptionGroupProps } from "./types"

const OptionGroupContext = createContext<boolean>(false)

export function useOptionGroupDisabled() {
  return useContext(OptionGroupContext)
}

export function OptionGroup(props: OptionGroupProps) {
  return (
    <OptionGroupContext.Provider value={Boolean(props.disabled)}>
      <ul className="d-select__group">
        <li className="d-select__group-title">{props.label || ""}</li>
        <li>
          <ul className="d-select__group-content">{props.children}</ul>
        </li>
      </ul>
    </OptionGroupContext.Provider>
  )
}

