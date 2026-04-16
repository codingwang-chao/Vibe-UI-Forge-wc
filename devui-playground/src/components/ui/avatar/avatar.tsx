import * as React from "react"

import "./avatar.css"
import { AvatarBodyIcon } from "./avatar-body-icon"
import { AvatarNoBodyIcon } from "./avatar-nobody-icon"
import type { AvatarGender, AvatarProps } from "./avatar-types"

function getBackgroundCode(gender: AvatarGender, seed: string): 0 | 1 {
  if (typeof gender === "string" && gender) {
    const normalized = gender.toLowerCase()
    if (normalized === "male") {
      return 1
    }
    if (normalized === "female") {
      return 0
    }
    console.warn('gender must be "Male" or "Female"')
  }

  const codePoint = seed.charCodeAt(0) || 0
  return codePoint % 2 === 0 ? 0 : 1
}

function resolveDisplayName(nameValue: string, widthValue: number): string {
  let nameDisplay = ""

  if (nameValue.length < 2) {
    nameDisplay = nameValue
  } else if (/^[\u4e00-\u9fa5]/.test(nameValue)) {
    nameDisplay = nameValue.slice(-2)
  } else if (/^[A-Za-z]/.test(nameValue)) {
    if (/[_ -]/.test(nameValue)) {
      const [before = "", after = ""] = nameValue.split(/_|-|\s+/)
      if (after) {
        nameDisplay = `${before.slice(0, 1).toUpperCase()}${after.slice(0, 1).toUpperCase()}`
      } else {
        nameDisplay = nameValue.slice(0, 2).toUpperCase()
      }
    } else {
      nameDisplay = nameValue.slice(0, 2).toUpperCase()
    }
  } else {
    nameDisplay = nameValue.slice(0, 2)
  }

  if (widthValue < 30) {
    nameDisplay = nameValue.slice(0, 1).toUpperCase()
  }

  return nameDisplay
}

function joinClassNames(
  ...parts: Array<string | undefined | false | null>
): string {
  return parts.filter(Boolean).join(" ")
}

export function Avatar({
  name,
  gender,
  width = 36,
  height = 36,
  isRound = true,
  imgSrc = "",
  customText = null,
  loadError,
  className,
}: AvatarProps) {
  const [isErrorImg, setIsErrorImg] = React.useState(false)

  React.useEffect(() => {
    setIsErrorImg(false)
  }, [imgSrc])

  const sourceName = customText ? customText : name
  const minSize = Math.min(width, height)
  const fontSize = minSize / 4 + 3
  const borderRadius = isRound ? "100%" : "0"

  let isNobody = true
  let nameDisplay = ""
  let backgroundCode: 0 | 1 = 0

  if (sourceName) {
    isNobody = false
    nameDisplay = resolveDisplayName(sourceName, minSize)
    backgroundCode = getBackgroundCode(gender, sourceName.slice(0, 1))
  } else if (sourceName === "") {
    isNobody = false
    nameDisplay = ""
    backgroundCode = getBackgroundCode(gender, "")
  } else {
    isNobody = true
  }

  const imgElement = (
    <img
      src={imgSrc}
      alt=""
      onError={(event) => {
        setIsErrorImg(true)
        loadError?.(event)
      }}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        borderRadius,
        display: "block",
      }}
    />
  )

  const hasImgSrc = imgSrc && !isErrorImg ? imgElement : null

  const nameElement = (
    <span
      className={joinClassNames(
        "avatar--style",
        `avatar--background-${backgroundCode}`
      )}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        lineHeight: `${height}px`,
        fontSize: `${fontSize}px`,
        borderRadius,
      }}
    >
      {nameDisplay}
    </span>
  )

  const hasNameDisplay =
    !imgSrc && !isNobody && nameDisplay.length !== 0 ? nameElement : null

  const noNameElement = (
    <span className="avatar--style" style={{ borderRadius }}>
      <AvatarBodyIcon width={width} height={height} />
    </span>
  )

  const hasNoDisplayName =
    !imgSrc && !isNobody && nameDisplay.length === 0 ? noNameElement : null

  const noBodyElement = (
    <span className="avatar--style" style={{ borderRadius }}>
      <AvatarNoBodyIcon width={width} height={height} />
    </span>
  )

  const noBody =
    (!imgSrc && isNobody) || (imgSrc && isErrorImg) ? noBodyElement : null

  return (
    <span className={joinClassNames("avatar", className)}>
      {hasImgSrc}
      {hasNameDisplay}
      {hasNoDisplayName}
      {noBody}
    </span>
  )
}
