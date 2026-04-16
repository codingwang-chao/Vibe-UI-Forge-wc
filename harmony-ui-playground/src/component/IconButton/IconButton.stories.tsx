import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconButton } from "./IconButton"

const demoIcon =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="#323233" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  )

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    src: demoIcon,
    alt: "",
    size: 32,
    disabled: false,
  },
  argTypes: {
    size: {
      control: { type: "number", min: 20, max: 48, step: 1 },
    },
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const SizePresets: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} size={28} />
      <IconButton {...args} size={32} />
      <IconButton {...args} size={40} />
      <IconButton {...args} size={32} disabled />
    </div>
  ),
}
