import type { Meta, StoryObj } from "@storybook/react-vite"
import { AccordionNav } from "./index"

const items = [
  {
    key: "base",
    label: "基础信息",
    children: [
      { key: "base-name", label: "名称与编码" },
      { key: "base-owner", label: "负责人" },
    ],
  },
  {
    key: "workflow",
    label: "流程设置",
    children: [
      { key: "workflow-approval", label: "审批节点" },
      { key: "workflow-condition", label: "条件分支" },
    ],
  },
  { key: "publish", label: "发布策略" },
]

const meta = {
  title: "Components/AccordionNav",
  component: AccordionNav,
  tags: ["autodocs"],
  args: {
    title: "配置导航",
    items,
  },
} satisfies Meta<typeof AccordionNav>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    selectedKeys: ["base-name"],
  },
  render: (args) => (
    <div className="max-w-sm">
      <AccordionNav {...args} />
    </div>
  ),
}
