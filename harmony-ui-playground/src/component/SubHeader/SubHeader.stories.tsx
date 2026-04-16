import type { Meta, StoryObj } from "@storybook/react-vite"
import SubHeader from "./SubHeader"

const makeIcon = (fill: string, label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="${label}">
      <rect width="24" height="24" rx="12" fill="${fill}" />
      <path d="M8 12h8" stroke="white" stroke-width="1.8" stroke-linecap="round" />
      <path d="M12 8v8" stroke="white" stroke-width="1.8" stroke-linecap="round" />
    </svg>`,
  )}`

const meta = {
  title: "Components/SubHeader",
  component: SubHeader,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    leftMode: "double",
    rightMode: "action",
    title: "Content subheading",
    subtitle: "subheading",
    selectText: "Select",
    actionText: "操作",
    moreText: "more",
    rightIcons: ["", "", ""],
  },
  argTypes: {
    leftMode: {
      control: "select",
      options: ["double", "title", "subtitle", "select"],
    },
    rightMode: {
      control: "select",
      options: ["action", "chevron", "icons", "more"],
    },
    rightIcons: {
      control: "object",
    },
  },
} satisfies Meta<typeof SubHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Select: Story = {
  args: {
    leftMode: "select",
    rightMode: "chevron",
    selectText: "Select",
  },
}

export const Icons: Story = {
  args: {
    rightMode: "icons",
    rightIcons: [makeIcon("#111111", "icon-1"), makeIcon("#444444", "icon-2"), ""],
  },
}

export const More: Story = {
  args: {
    leftMode: "title",
    rightMode: "more",
    title: "Content subheading",
    moreText: "more",
  },
}
