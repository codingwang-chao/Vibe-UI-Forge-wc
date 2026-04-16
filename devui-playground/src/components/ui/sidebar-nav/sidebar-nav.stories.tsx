import type { Meta, StoryObj } from "@storybook/react-vite"
import { SidebarNav } from "./index"

const items = [
  { key: "dashboard", label: "仪表盘" },
  {
    key: "workspace",
    label: "工作空间",
    children: [
      { key: "workspace-list", label: "列表视图" },
      { key: "workspace-grid", label: "网格视图" },
    ],
  },
  {
    key: "delivery",
    label: "持续交付",
    children: [
      { key: "delivery-pipeline", label: "流水线" },
      { key: "delivery-release", label: "发布管理" },
    ],
  },
]

const meta = {
  title: "Components/SidebarNav",
  component: SidebarNav,
  tags: ["autodocs"],
  args: {
    title: "项目导航",
    subtitle: "Furion 移动端",
    items,
  },
} satisfies Meta<typeof SidebarNav>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    selectedKeys: ["delivery-pipeline"],
  },
  render: (args) => <SidebarNav {...args} />,
}
