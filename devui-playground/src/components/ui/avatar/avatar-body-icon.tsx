import { IconBody } from "./icon-body"
import type { IconPropsType } from "./avatar-types"

export function AvatarBodyIcon({
  width = 16,
  height = 16,
}: Partial<IconPropsType>) {
  return <IconBody width={width} height={height} />
}
