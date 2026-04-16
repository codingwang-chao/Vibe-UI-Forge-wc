import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusBar } from "./StatusBar"

const meta = {
  title: "Components/StatusBar",
  component: StatusBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    mode: "light",
    time: "08:08",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["light", "dark"],
    },
  },
} satisfies Meta<typeof StatusBar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="grid gap-4">
      <StatusBar {...args} mode="light" />
      <StatusBar {...args} mode="dark" />
    </div>
  ),
}
