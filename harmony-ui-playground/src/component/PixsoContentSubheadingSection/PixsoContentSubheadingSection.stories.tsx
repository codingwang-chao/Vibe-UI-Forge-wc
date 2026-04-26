import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"
import { useState } from "react"

import { PixsoContentSubheadingSection } from "./PixsoContentSubheadingSection"

function centerInViewport(Story: () => ReactNode) {
  return (
    <div className="box-border flex min-h-screen w-full min-w-0 items-center justify-center bg-[#f3f4f6] p-8">
      <div className="rounded-[2px] bg-white p-0 shadow-sm">
        <Story />
      </div>
    </div>
  )
}

const meta = {
  title: "Components/PixsoContentSubheadingSection",
  component: PixsoContentSubheadingSection,
  tags: ["autodocs"],
  decorators: [centerInViewport],
  parameters: {
    docs: {
      description: {
        component:
          "Pixso `3286:12399` — Section_3286_12399. 由顶部 content subheading + 三个状态组组成，按 Pixso `get_image` 截图与 `design_to_code` 结构还原。",
      },
    },
  },
  argTypes: {
    headingTitle: { control: "text" },
    headingSubtitle: { control: "text" },
    actionLabel: { control: "text" },
    selectLabel: { control: "text" },
    footerTitle: { control: "text" },
    footerSubtitle: { control: "text" },
    moreLabel: { control: "text" },
    actionDisabled: { control: "boolean" },
    selectDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof PixsoContentSubheadingSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [selectCount, setSelectCount] = useState(0)
    const [actionCount, setActionCount] = useState(0)

    return (
      <PixsoContentSubheadingSection
        {...args}
        selectLabel={selectCount > 0 ? `Select ${selectCount}` : "Select"}
        actionLabel={actionCount > 0 ? `操作 ${actionCount}` : "操作"}
        onSelect={() => setSelectCount((value) => value + 1)}
        onAction={() => setActionCount((value) => value + 1)}
      />
    )
  },
}

export const ChineseCopy: Story = {
  args: {
    headingTitle: "内容副标题",
    headingSubtitle: "副标题",
    footerTitle: "内容副标题",
    footerSubtitle: "副标题",
    selectLabel: "选择",
    moreLabel: "更多",
    actionLabel: "操作",
  },
}

export const Disabled: Story = {
  args: {
    actionDisabled: true,
    selectDisabled: true,
  },
}
