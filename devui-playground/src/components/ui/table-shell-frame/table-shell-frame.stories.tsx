import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { TableShellFrame } from "./index"

const meta = {
  title: "Components/TableShellFrame",
  component: TableShellFrame,
  tags: ["autodocs"],
} satisfies Meta<typeof TableShellFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto max-w-6xl">
        <TableShellFrame
          header={<h3 className="text-base font-semibold">工作项列表</h3>}
          primaryNav={
            <ul className="space-y-2 text-sm">
              <li className="font-medium text-foreground">全部工单</li>
              <li className="text-muted-foreground">我负责的</li>
              <li className="text-muted-foreground">已关闭</li>
            </ul>
          }
          secondaryHeader={
            <div className="rounded-md border bg-card p-3 text-sm">查询条件: 最近 30 天</div>
          }
          toolbar={
            <div className="flex gap-2">
              <Button size="sm">新建工单</Button>
              <Button size="sm" variant="outline">
                导出
              </Button>
            </div>
          }
        >
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            这里用于放置表格主体内容。
          </div>
        </TableShellFrame>
      </div>
    </div>
  ),
}
