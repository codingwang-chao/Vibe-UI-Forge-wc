import type { Meta, StoryObj } from "@storybook/react-vite"
import { CloverIcon } from "./CloverIcon"

const meta = {
  title: "Components/CloverIcon",
  component: CloverIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    size: 156,
    variant: "default",
    ariaLabel: "三叶草",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 72, max: 220, step: 1 },
    },
    variant: {
      control: "select",
      options: ["default", "incomplete"],
    },
  },
} satisfies Meta<typeof CloverIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-10">
      <CloverIcon size={156} variant="default" />
      <CloverIcon size={96} variant="incomplete" />
    </div>
  ),
}
