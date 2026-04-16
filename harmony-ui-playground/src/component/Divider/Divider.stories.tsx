import type { Meta, StoryObj } from "@storybook/react-vite"
import { Divider } from "./Divider"

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  args: {
    color: "rgba(0, 0, 0, 0.09803921729326248)",
    thickness: 1,
    margin: "16px 0",
    dashed: false,
    hairline: false,
    contentPosition: "center",
    children: "Divider",
  },
  argTypes: {
    contentPosition: {
      control: "inline-radio",
      options: ["left", "center", "right"],
    },
  },
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoContent: Story = {
  args: {
    children: undefined,
  },
}

export const Dashed: Story = {
  args: {
    dashed: true,
  },
}

export const Hairline: Story = {
  args: {
    hairline: true,
  },
}

export const LeftContent: Story = {
  args: {
    contentPosition: "left",
  },
}

export const RightContent: Story = {
  args: {
    contentPosition: "right",
  },
}
