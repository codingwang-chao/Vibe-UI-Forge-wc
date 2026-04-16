import { cn } from "@/lib/utils"
import { ButtonGroupSizeContext } from "./button-group-context"
import type { ButtonGroupProps } from "./button.types"

export function ButtonGroup({
  size = "md",
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroupSizeContext.Provider value={size}>
      <div className={cn("mini-devui-button-group", className)} {...props}>
        {children}
      </div>
    </ButtonGroupSizeContext.Provider>
  )
}
