import { IconNobody } from "./icon-nobody"
import type { IconPropsType } from "./avatar-types"

export function AvatarNoBodyIcon({
  width = 16,
  height = 16,
}: Partial<IconPropsType>) {
  return <IconNobody width={width} height={height} />
}
