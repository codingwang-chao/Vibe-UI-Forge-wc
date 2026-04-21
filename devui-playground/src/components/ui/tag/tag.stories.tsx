import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tag } from "./index"

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: {
    children: "标签",
    size: "md",
    tagStyle: "regular",
    color: "grey",
    showIcon: true,
    closable: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
    },
    tagStyle: {
      control: "select",
      options: ["fill", "outline", "regular"],
    },
    color: {
      control: "select",
      options: ["green", "orange", "red", "grey"],
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#71757f" }}>Fill Tags</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Tag size="md" tagStyle="fill" color="green">绿色 md</Tag>
          <Tag size="lg" tagStyle="fill" color="green">绿色 lg</Tag>
          <Tag size="md" tagStyle="fill" color="orange">橙色 md</Tag>
          <Tag size="lg" tagStyle="fill" color="orange">橙色 lg</Tag>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#71757f" }}>Outline Tags</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Tag size="md" tagStyle="outline" color="green">绿色 md</Tag>
          <Tag size="lg" tagStyle="outline" color="green">绿色 lg</Tag>
          <Tag size="md" tagStyle="outline" color="orange">橙色 md</Tag>
          <Tag size="lg" tagStyle="outline" color="orange">橙色 lg</Tag>
          <Tag size="md" tagStyle="outline" color="red">红色 md</Tag>
          <Tag size="lg" tagStyle="outline" color="red">红色 lg</Tag>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#71757f" }}>Regular Tags</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Tag size="md" tagStyle="regular" color="green">绿色 md</Tag>
          <Tag size="lg" tagStyle="regular" color="green">绿色 lg</Tag>
          <Tag size="md" tagStyle="regular" color="grey">灰色 md</Tag>
          <Tag size="lg" tagStyle="regular" color="grey">灰色 lg</Tag>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#71757f" }}>Regular Tags (with icon & closable)</h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Tag size="md" showIcon closable>设置标签</Tag>
          <Tag size="lg" showIcon closable>设置标签</Tag>
          <Tag size="md" showIcon={false} closable>仅关闭</Tag>
          <Tag size="lg" showIcon={false} closable>仅关闭</Tag>
          <Tag size="md" showIcon closable={false}>仅图标</Tag>
          <Tag size="lg" showIcon closable={false}>仅图标</Tag>
        </div>
      </div>
    </div>
  ),
}
