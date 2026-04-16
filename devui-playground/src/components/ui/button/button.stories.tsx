import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./index"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Primary Button",
    variant: "solid",
    color: "primary",
    size: "md",
    disabled: false,
    loading: false,
    icon: "",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "text"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    icon: {
      control: "select",
      options: ["", "add", "filter", "connect", "delete"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="solid" color="primary">
        Solid
      </Button>
      <Button variant="outline" color="secondary">
        Outline
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
      <Button variant="solid" color="danger">
        Danger
      </Button>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button icon="add">With Icon</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
}
