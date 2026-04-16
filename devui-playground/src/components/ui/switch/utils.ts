export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function createNamespace(block: string) {
  const namespace = `devui-${block}`

  return {
    b: () => namespace,
    e: (element: string) => (element ? `${namespace}__${element}` : ""),
    m: (modifier: string) => (modifier ? `${namespace}--${modifier}` : ""),
  }
}
