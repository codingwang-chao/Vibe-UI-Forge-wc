import type { Meta, StoryObj } from "@storybook/react-vite"
import { AiBottomBar } from "./AiBottomBar"

const meta = {
  title: "Components/AiBottomBar",
  component: AiBottomBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    mode: "light",
    showHandle: false,
    showDarkPlate: false,
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["light", "dark", "transparent"],
    },
  },
} satisfies Meta<typeof AiBottomBar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="grid gap-4">
      <AiBottomBar {...args} mode="light" showHandle showDarkPlate />
      <AiBottomBar {...args} mode="dark" showHandle showDarkPlate />
      <AiBottomBar {...args} mode="transparent" showHandle />
    </div>
  ),
}
