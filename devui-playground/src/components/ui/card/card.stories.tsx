import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "./card"

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Card title",
    subtitle: "Card subtitle",
    content:
      "This is a card content area. Use it for summary text, status, or quick actions.",
    shadow: "hover",
    align: "start",
  },
  argTypes: {
    shadow: {
      control: "select",
      options: ["always", "hover", "never"],
    },
    align: {
      control: "select",
      options: ["start", "end", "spaceBetween"],
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[360px]">
      <Card
        {...args}
        avatar={<Avatar name="UI" width={36} height={36} />}
        actions={
          <>
            <Button variant="outline" color="secondary" size="sm">
              Cancel
            </Button>
            <Button size="sm">Confirm</Button>
          </>
        }
      />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        shadow="always"
        title="Always Shadow"
        subtitle="Stable emphasis"
        content="Useful for key summary cards."
      />
      <Card
        shadow="never"
        title="No Shadow"
        subtitle="Low emphasis"
        content="Use when cards should blend into the surface."
      />
    </div>
  ),
}
