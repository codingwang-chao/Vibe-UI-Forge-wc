import type { Meta, StoryObj } from "@storybook/react-vite"
import { AppIcon } from "./AppIcon"

const demoSrc =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="24" fill="#e8eefc" />
      <circle cx="60" cy="54" r="24" fill="#5e7ce0" />
      <path d="M28 102c6-18 22-28 32-28s26 10 32 28" fill="#5e7ce0" />
    </svg>`
  )

const meta = {
  title: "Components/AppIcon",
  component: AppIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    src: demoSrc,
    size: 48,
    radius: 12,
  },
  argTypes: {
    size: { control: { type: "number", min: 16, max: 160, step: 1 } },
    radius: { control: { type: "number", min: 0, max: 64, step: 1 } },
  },
} satisfies Meta<typeof AppIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const FallbackContent: Story = {
  args: {
    src: "",
  },
  render: (args) => (
    <AppIcon {...args}>
      <span style={{ fontSize: 18, fontWeight: 600, color: "#4f5560" }}>AI</span>
    </AppIcon>
  ),
}
