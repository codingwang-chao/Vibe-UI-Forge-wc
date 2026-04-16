import type { Meta, StoryObj } from "@storybook/react-vite"
import { Subheader } from "./index"

const breadcrumbs = [
  { label: "项目" },
  { label: "Furion移动客户端" },
  { label: "流水线" },
  { label: "详情" },
]

const tabs = [
  { id: "overview", label: "工程概览" },
  { id: "design", label: "模型设计" },
  { id: "arch", label: "架构信息" },
]

const meta = {
  title: "Components/Subheader",
  component: Subheader,
  tags: ["autodocs"],
  args: {
    breadcrumbs,
    tabs,
  },
} satisfies Meta<typeof Subheader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    defaultModelValue: "overview",
  },
  render: (args) => <Subheader {...args} />,
}
