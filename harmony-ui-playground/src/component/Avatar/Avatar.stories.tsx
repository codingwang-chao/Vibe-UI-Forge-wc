import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "./Avatar"

const demoSrc =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="60" fill="#cdd8ff" />
      <circle cx="60" cy="50" r="22" fill="#5e7ce0" />
      <path d="M28 100c6-18 21-27 32-27s26 9 32 27" fill="#5e7ce0" />
    </svg>`
  )

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    src: demoSrc,
    size: 40,
    radius: 999,
  },
  argTypes: {
    size: { control: { type: "number", min: 24, max: 120, step: 1 } },
    radius: { control: { type: "number", min: 0, max: 999, step: 1 } },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const FallbackContent: Story = {
  args: {
    src: "",
  },
  render: (args) => (
    <Avatar {...args}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#4f5560" }}>RU</span>
    </Avatar>
  ),
}
