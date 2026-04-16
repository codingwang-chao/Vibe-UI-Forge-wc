import type { Meta, StoryObj } from "@storybook/react-vite"
import { TitleTabsHeader } from "./index"

const items = [
  { id: "overview", label: "工程概览" },
  { id: "arch", label: "架构信息" },
  { id: "code", label: "代码模型" },
  { id: "requirement", label: "需求模型" },
]

const meta = {
  title: "Components/TitleTabsHeader",
  component: TitleTabsHeader,
  tags: ["autodocs"],
  args: {
    title: "流水线详情",
    items,
  },
} satisfies Meta<typeof TitleTabsHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    defaultModelValue: "overview",
  },
  render: (args) => <TitleTabsHeader {...args} />,
}
