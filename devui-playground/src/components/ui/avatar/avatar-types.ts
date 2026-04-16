export interface IconPropsType {
  width: number
  height: number
}

export type AvatarGender = "male" | "female" | string | null | undefined

export interface AvatarProps {
  name?: string | null
  gender?: AvatarGender
  width?: number
  height?: number
  isRound?: boolean
  imgSrc?: string
  customText?: string | null
  loadError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  className?: string
}
