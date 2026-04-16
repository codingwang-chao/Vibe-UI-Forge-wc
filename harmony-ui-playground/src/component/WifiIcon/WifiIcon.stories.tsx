import type { Meta, StoryObj } from "@storybook/react-vite"
import { WifiIcon } from "./WifiIcon"

const meta = {
  title: "Components/WifiIcon",
  component: WifiIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    mode: "light",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["light", "dark"],
    },
  },
} satisfies Meta<typeof WifiIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <WifiIcon {...args} style={{ width: 96, height: 13 }} />,
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4">
      <div style={{ width: 96, height: 13 }}>
        <WifiIcon mode="light" />
      </div>
      <div style={{ width: 96, height: 13, background: "#111" }}>
        <WifiIcon mode="dark" />
      </div>
    </div>
  ),
}
