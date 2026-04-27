import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"

import { TitleBarHarmony3267 } from "./TitleBarHarmony3267"

function centerInViewport(Story: () => ReactNode) {
  return (
    <div className="box-border flex min-h-screen w-full min-w-0 items-center justify-center bg-[#f3f4f6] p-8">
      <Story />
    </div>
  )
}

const meta = {
  title: "Components/TitleBarHarmony3267",
  component: TitleBarHarmony3267,
  tags: ["autodocs"],
  decorators: [centerInViewport],
  args: {
    title: "页面标题",
    subtitle: "副标题",
  },
} satisfies Meta<typeof TitleBarHarmony3267>

export default meta

type Story = StoryObj<typeof meta>

/** 仅限制宽度；标题栏本身无底色，铺在 decorator 的灰底上。 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[328px] max-w-full">
      <TitleBarHarmony3267 {...args} />
    </div>
  ),
}

export const NoSubtitle: Story = {
  args: {
    subtitle: "",
    title: "仅主标题",
  },
  render: (args) => (
    <div className="w-[328px] max-w-full">
      <TitleBarHarmony3267 {...args} />
    </div>
  ),
}

export const SingleRightIcon: Story = {
  args: {
    rightIcons: [
      "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>`
        ),
    ],
  },
  render: (args) => (
    <div className="w-[328px] max-w-full">
      <TitleBarHarmony3267 {...args} />
    </div>
  ),
}
