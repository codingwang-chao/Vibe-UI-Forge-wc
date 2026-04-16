import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./index"

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    count: 12,
    status: "info",
    maxCount: 99,
    showDot: false,
    hidden: false,
  },
  argTypes: {
    status: {
      control: "select",
      options: ["info", "success", "warning", "danger", "waiting", "common"],
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Standalone: Story = {}

export const WithAnchor: Story = {
  args: {
    count: 8,
    children: (
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-xs">
        Slot
      </div>
    ),
  },
}

export const StatusSet: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge status="info" count={6} />
      <Badge status="success" count={6} />
      <Badge status="warning" count={6} />
      <Badge status="danger" count={6} />
      <Badge status="common" showDot />
    </div>
  ),
}
