import type { SelectOptionItem, SelectRegisteredOption } from "./types"

export function classNames(
  base: string,
  conditions?: Record<string, boolean | undefined | null>
): string {
  if (!conditions) {
    return base
  }

  return Object.entries(conditions).reduce((acc, [key, value]) => {
    if (value) {
      acc.push(key)
    }
    return acc
  }, [base]).join(" ")
}

export function escapeRegExp(value = ""): string {
  return value.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&")
}

export function normalizeOption(
  item: SelectOptionItem,
  fallbackSource: "prop" | "child" = "prop"
): SelectRegisteredOption {
  if (typeof item === "object") {
    const value = item.value
    return {
      value,
      name: item.name ?? String(value),
      disabled: item.disabled,
      create: item.create,
      groupDisabled: false,
      source: fallbackSource,
    }
  }

  return {
    value: item,
    name: String(item),
    disabled: false,
    create: false,
    groupDisabled: false,
    source: fallbackSource,
  }
}

export function getLabel(option: SelectRegisteredOption): string {
  return option.name ?? String(option.value)
}

export function toValueKey(value: string | number): string {
  return `${typeof value}:${String(value)}`
}

