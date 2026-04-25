import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"

import { SceneModeCard } from "./SceneModeCard"

/* 与 `Card.stories.tsx` / `Slider.stories.tsx` 等保持同一画布背景，避免与项目其余 Story 不一致。 */
function centerInViewport(Story: () => ReactNode) {
  return (
    <div className="box-border flex min-h-screen w-full min-w-0 items-center justify-center bg-[#f3f4f6] p-8">
      <Story />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* DnD（免打扰）图标 — 紫色圆形 + 白色月牙                                          */
/* 来源：Pixso 节点 3368:122 sub vector，用纯 SVG 等价实现                           */
/* -------------------------------------------------------------------------- */
function DoNotDisturbIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="免打扰">
      <circle cx="32" cy="32" r="29" fill="#542BD7" />
      <path
        d="M40.4 41.2c-7.4 0-13.4-6-13.4-13.4 0-3 1-5.7 2.6-7.9-5.6 1.4-9.7 6.4-9.7 12.4 0 7.1 5.7 12.8 12.8 12.8 6 0 11-4.1 12.4-9.7-1.4 1-2.9 1.7-4.7 1.8z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/* 工作模式 — 蓝色圆 + 简化的「文档/工作」抽象图形 */
function WorkModeIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="工作模式">
      <circle cx="32" cy="32" r="29" fill="#0A59F7" />
      <rect x="22" y="20" width="20" height="24" rx="3" fill="#FFFFFF" />
      <rect x="26" y="26" width="12" height="2" rx="1" fill="#0A59F7" />
      <rect x="26" y="31" width="12" height="2" rx="1" fill="#0A59F7" />
      <rect x="26" y="36" width="8" height="2" rx="1" fill="#0A59F7" />
    </svg>
  )
}

/* 睡眠模式 — 蓝紫圆 + 简化星月 */
function SleepModeIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="睡眠模式">
      <circle cx="32" cy="32" r="29" fill="#3B5BFF" />
      <path
        d="M40 41c-7.5 0-13.5-6-13.5-13.5 0-2.6.7-5 2-7-5.5 1.5-9.5 6.5-9.5 12.5 0 7.2 5.8 13 13 13 5.4 0 10-3.3 12-8-1.3.6-2.7 1-4 1z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
const meta = {
  title: "Components/SceneModeCard",
  component: SceneModeCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "情景模式卡片（Pixso 节点 `3368:205`）。两种尺寸：`large` 244×220 / r24，`small` 220×198 / r22；表面为 `rgba(255,255,255,0.8)` 毛玻璃，主标题 24/22px Regular，副标题 14/13px Bold。",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["large", "small"],
      description: "Pixso 变体「中间大卡片」/「左·右侧小卡片」",
    },
    title: { control: "text" },
    subtitle: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "large",
    title: "免打扰",
    subtitle: "减少打扰保持专注",
    icon: <DoNotDisturbIcon />,
  },
  decorators: [centerInViewport],
} satisfies Meta<typeof SceneModeCard>

export default meta

type Story = StoryObj<typeof meta>

/* -------------------------------------------------------------------------- */
/* 1. 基础用法：大卡片                                                            */
/* -------------------------------------------------------------------------- */
export const Large: Story = {
  args: { size: "large" },
}

/* -------------------------------------------------------------------------- */
/* 2. 小卡片                                                                    */
/* -------------------------------------------------------------------------- */
export const Small: Story = {
  args: { size: "small" },
}

/* -------------------------------------------------------------------------- */
/* 3. 三联布局：左小 / 中大 / 右小（与 Pixso COMPONENT_SET 三个变体的语义一致）          */
/* -------------------------------------------------------------------------- */
export const TripletLayout: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <SceneModeCard
        size="small"
        title="工作模式"
        subtitle="专注会议与文档"
        icon={<WorkModeIcon />}
      />
      <SceneModeCard
        size="large"
        title="免打扰"
        subtitle="减少打扰保持专注"
        icon={<DoNotDisturbIcon />}
      />
      <SceneModeCard
        size="small"
        title="睡眠"
        subtitle="夜间静音与暗色"
        icon={<SleepModeIcon />}
      />
    </div>
  ),
}

/* -------------------------------------------------------------------------- */
/* 4. 多状态对照：default / hover (CSS 模拟) / pressed / focus / disabled              */
/* -------------------------------------------------------------------------- */
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-black/60">default</span>
        <SceneModeCard
          size="small"
          title="免打扰"
          subtitle="减少打扰保持专注"
          icon={<DoNotDisturbIcon />}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-black/60">interactive (hover/active 可在画布交互)</span>
        <SceneModeCard
          size="small"
          title="免打扰"
          subtitle="减少打扰保持专注"
          icon={<DoNotDisturbIcon />}
          onClick={() => undefined}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-black/60">focus（Tab 聚焦）</span>
        <SceneModeCard
          size="small"
          title="免打扰"
          subtitle="减少打扰保持专注"
          icon={<DoNotDisturbIcon />}
          onClick={() => undefined}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-black/60">disabled</span>
        <SceneModeCard
          size="small"
          title="免打扰"
          subtitle="减少打扰保持专注"
          icon={<DoNotDisturbIcon />}
          disabled
          onClick={() => undefined}
        />
      </div>
    </div>
  ),
}

/* -------------------------------------------------------------------------- */
/* 5. 带浮动操作胶囊（按 Pixso 节点 3368:133/345/720 1:1 还原；视觉上略突出右边缘）       */
/* -------------------------------------------------------------------------- */
export const WithActionPill: Story = {
  args: {
    size: "large",
    actionPill: "进入",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pixso 设计稿在卡片右上方 (180, 20) 处叠放 120×40 / r20 的胶囊，视觉上少量突出卡片右边缘——按设计稿 1:1 还原。",
      },
    },
  },
}

/* -------------------------------------------------------------------------- */
/* 6. 可点击：将卡片整体作为按钮（role=button）                                       */
/* -------------------------------------------------------------------------- */
export const Clickable: Story = {
  args: {
    size: "large",
    onClick: () => window.alert("进入：免打扰模式"),
  },
}
