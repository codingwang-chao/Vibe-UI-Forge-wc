import type { Meta, StoryObj } from "@storybook/react-vite"
import { TitleBar } from "./title-bar"

const demoAvatar =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="24" fill="#d9e4ff" />
      <circle cx="60" cy="50" r="22" fill="#5e7ce0" />
      <path d="M28 100c6-18 21-27 32-27s26 9 32 27" fill="#5e7ce0" />
    </svg>`
  )

const meta = {
  title: "Components/TitleBar",
  component: TitleBar,
  tags: ["autodocs"],
  args: {
    title: "页面标题",
    subtitle: "副标题内容",
    leftText: "返回",
    rightText: "编辑",
  },
} satisfies Meta<typeof TitleBar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <TitleBar {...args} />,
}

export const IconActions: Story = {
  args: {
    leftText: "",
    rightText: "",
    rightIcon: [
      "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M8 5L15 12L8 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        ),
      "data:image/svg+xml;utf8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
        ),
    ],
  },
}

export const AvatarState: Story = {
  args: {
    title: "",
    subtitle: "",
    avatarSrc: demoAvatar,
  },
}

export const CustomSlots: Story = {
  render: () => {
    return (
      <TitleBar
        title="自定义区域"
        subtitle="left / right 通过 ReactNode 传入"
        left={
          <button
            type="button"
            className="title-bar__bubble"
            aria-label="custom back"
          >
            <span className="title-bar__text">返回</span>
          </button>
        }
        right={
          <div className="title-bar__right">
            <button
              type="button"
              className="title-bar__bubble"
              aria-label="share"
            >
              <span className="title-bar__text">分享</span>
            </button>
            <button
              type="button"
              className="title-bar__bubble"
              aria-label="more"
            >
              <span className="title-bar__text">更多</span>
            </button>
          </div>
        }
        backgroundColor="#ffffff"
      />
    )
  },
}
