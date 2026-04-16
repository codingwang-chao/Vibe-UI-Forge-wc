import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { ToolbarBlock } from "./index"

const meta = {
  title: "Components/ToolbarBlock",
  component: ToolbarBlock,
  tags: ["autodocs"],
} satisfies Meta<typeof ToolbarBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <ToolbarBlock>
      <Button size="sm">保存</Button>
      <Button size="sm" variant="outline">
        重置
      </Button>
      <Button size="sm" variant="text">
        更多操作
      </Button>
    </ToolbarBlock>
  ),
}
