import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"

import { Button } from "@/component/Button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card"

function centerInViewport(Story: () => ReactNode) {
  return (
    <div className="box-border flex min-h-screen w-full min-w-0 items-center justify-center bg-[#f3f4f6] p-8">
      <Story />
    </div>
  )
}

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [centerInViewport],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[328px] max-w-full">
      <Card>
        <CardHeader>
          <CardTitle>卡片标题</CardTitle>
          <CardDescription>用于分组展示信息与操作，与设置页圆角卡片一致。</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="m-0 text-sm text-[rgba(0,0,0,0.75)] leading-relaxed">
            正文区域：可放表单、列表或说明文案。
          </p>
        </CardContent>
        <CardFooter>
          <Button type="default" size="small" plain>
            取消
          </Button>
          <Button type="primary" size="small">
            确定
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <div className="w-[328px] max-w-full">
      <Card>
        <CardHeader>
          <CardTitle>仅标题区</CardTitle>
          <CardDescription>无底部操作时可省略 CardFooter。</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-[rgba(0,0,0,0.6)]">简短内容</span>
        </CardContent>
      </Card>
    </div>
  ),
}
