import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    type: "primary",
    size: "large",
    plain: false,
    round: false,
    block: false,
    disabled: false,
    loading: false,
    nativeType: "button",
    tag: "button",
    color: "",
    textColor: "",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "danger", "info", "success"],
    },
    size: {
      control: "select",
      options: ["large", "small"],
    },
    nativeType: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    tag: {
      control: "text",
    },
    color: {
      control: "color",
    },
    textColor: {
      control: "color",
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} type="primary">
        Primary
      </Button>
      <Button {...args} type="default">
        Default
      </Button>
      <Button {...args} type="danger">
        Danger
      </Button>
      <Button {...args} type="info">
        Info
      </Button>
      <Button {...args} type="success">
        Success
      </Button>
    </div>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-3">
        <Button {...args}>Normal</Button>
        <Button {...args} plain>
          Plain
        </Button>
        <Button {...args} round>
          Round
        </Button>
        <Button {...args} loading>
          Loading
        </Button>
        <Button {...args} disabled>
          Disabled
        </Button>
      </div>
      <Button {...args} block>
        Block Button
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="large">
        Large
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
    </div>
  ),
}

