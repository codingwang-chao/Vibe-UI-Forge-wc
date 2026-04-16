export function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          d="M1.646 1.646a.5.5 0 0 1 .708 0L8 7.293l5.646-5.647a.5.5 0 0 1 .708.708L8.707 8l5.647 5.646a.5.5 0 0 1-.708.708L8 8.707l-5.646 5.647a.5.5 0 0 1-.708-.708L7.293 8 1.646 2.354a.5.5 0 0 1 0-.708Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

type StatusIconProps = {
  type: "success" | "failed" | "warning" | "info"
}

export function StatusIcon({ type }: StatusIconProps) {
  const palette = {
    success: "#22a06b",
    failed: "#dc2626",
    warning: "#d97706",
    info: "#2563eb",
  } as const

  const label = {
    success: "Success",
    failed: "Failed",
    warning: "Warning",
    info: "Info",
  }[type]

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
    >
      <circle cx="12" cy="12" r="10" fill={palette[type]} opacity="0.16" />
      <path
        d={
          type === "success"
            ? "M9.75 12.75 11.5 14.5 15.5 9.75"
            : type === "failed"
              ? "M8 8 16 16M16 8l-8 8"
              : type === "warning"
                ? "M12 7v5m0 3.5h.01M12 4.75a1 1 0 0 1 .866.5l7.7 13.25A1 1 0 0 1 19.7 20H4.3a1 1 0 0 1-.866-1.5l7.7-13.25A1 1 0 0 1 12 4.75Z"
                : "M12 16v-4m0-3h.01M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        }
        fill="none"
        stroke={palette[type]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}
