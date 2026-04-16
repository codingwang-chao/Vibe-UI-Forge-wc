import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/component/Button"

const meta = {
  title: "Test/SimpleButton",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Test Button",
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}