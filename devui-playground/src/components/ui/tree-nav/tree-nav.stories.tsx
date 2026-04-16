import type { Meta, StoryObj } from "@storybook/react-vite"
import { TreeNav } from "./index"

const data = [
  {
    key: "project",
    label: "项目",
    children: [
      { key: "project-overview", label: "概览" },
      {
        key: "project-pipeline",
        label: "流水线",
        children: [
          { key: "project-pipeline-build", label: "构建" },
          { key: "project-pipeline-release", label: "发布" },
        ],
      },
    ],
  },
  {
    key: "settings",
    label: "设置",
    children: [
      { key: "settings-permission", label: "权限" },
      { key: "settings-notification", label: "通知" },
    ],
  },
]

const meta = {
  title: "Components/TreeNav",
  component: TreeNav,
  tags: ["autodocs"],
  args: {
    title: "资源树",
    data,
    height: 320,
  },
} satisfies Meta<typeof TreeNav>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    selectedKey: "project-pipeline-build",
  },
  render: (args) => (
    <div className="max-w-sm">
      <TreeNav {...args} />
    </div>
  ),
}
