import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FormShellFrame } from "./index"

const meta = {
  title: "Components/FormShellFrame",
  component: FormShellFrame,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FormShellFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto max-w-6xl">
        <FormShellFrame
          header={
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">工单配置</h3>
                <p className="text-xs text-muted-foreground">
                  统一管理表单布局和流程节点
                </p>
              </div>
              <Badge status="info" count="草稿" />
            </div>
          }
          primaryNav={
            <ul className="space-y-2 text-sm">
              <li className="font-medium text-foreground">基础信息</li>
              <li className="text-muted-foreground">校验规则</li>
              <li className="text-muted-foreground">审批流</li>
              <li className="text-muted-foreground">扩展字段</li>
            </ul>
          }
          secondaryNav={
            <ul className="space-y-2 text-sm">
              <li className="font-medium text-foreground">字段设置</li>
              <li className="text-muted-foreground">展示逻辑</li>
              <li className="text-muted-foreground">权限策略</li>
            </ul>
          }
          secondaryHeader={
            <div className="rounded-md border bg-card p-3 text-sm">
              当前视图: 字段设置
            </div>
          }
          toolbar={
            <div className="flex flex-wrap gap-2">
              <Button size="sm">保存</Button>
              <Button size="sm" variant="outline">
                预览
              </Button>
              <Button size="sm" variant="text">
                发布
              </Button>
            </div>
          }
        >
          <div className="rounded-md border bg-card p-4">
            <p className="text-sm leading-6 text-muted-foreground">
              这里是内容区。你可以放置表单、步骤配置、字段预览或任何业务面板。
            </p>
          </div>
        </FormShellFrame>
      </div>
    </div>
  ),
}

export const WithoutSecondaryNav: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-6 text-foreground md:p-8">
      <div className="mx-auto max-w-5xl">
        <FormShellFrame
          header={<h3 className="text-base font-semibold">简单布局</h3>}
          primaryNav={<div className="text-sm text-muted-foreground">主导航</div>}
        >
          <div className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
            当不传 `secondaryNav` 时，内容区会自动占用剩余空间。
          </div>
        </FormShellFrame>
      </div>
    </div>
  ),
}
