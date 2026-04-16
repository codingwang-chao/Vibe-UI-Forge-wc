import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { List } from "./List"
import { ListItem } from "./ListItem"

const meta = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<typeof meta>

function PlaygroundDemo() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ width: 360 }}>
      <List>
        <ListItem
          title="账户设置"
          subtitle="基础资料、密码、安全"
          rightText={`点击 ${count} 次`}
          onClick={() => setCount((value) => value + 1)}
        />
        <ListItem
          left={
            <div
              style={{ width: 24, height: 24, borderRadius: 12, background: "#1989fa" }}
            />
          }
          title="消息通知"
          subtitle="系统通知和营销通知"
          rightText="已开启"
          leftGap={16}
          onClick={() => setCount((value) => value + 1)}
        />
        <ListItem
          title={<strong>自定义标题节点</strong>}
          subtitle={<span style={{ color: "rgba(0, 0, 0, 0.45)" }}>ReactNode 插槽语义</span>}
          right={<span style={{ color: "#1989fa" }}>自定义右侧</span>}
          showArrow={false}
          border={false}
        />
      </List>
    </div>
  )
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
}

export const Plain: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <List>
        <ListItem title="第一项" />
        <ListItem title="第二项" border={false} />
      </List>
    </div>
  ),
}

export const WithLeftSlot: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <List>
        <ListItem
          left={<div style={{ width: 28, height: 28, borderRadius: 999, background: "#f0f5ff" }} />}
          title="左侧内容"
          subtitle="用于头像、图标或状态标识"
          leftGap={12}
        />
      </List>
    </div>
  ),
}
