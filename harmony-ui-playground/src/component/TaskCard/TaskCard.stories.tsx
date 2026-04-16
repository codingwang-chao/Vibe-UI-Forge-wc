import type { Meta, StoryObj } from "@storybook/react-vite"
import { TaskCard } from "./TaskCard"

const demoIcon =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#d9e4ff" />
      <path d="M10 16.5L14.5 21L22 11.5" stroke="#5e7ce0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
  )

const meta = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
  args: {
    value: "12",
    tag: "偏早",
    suffix: "/1 次",
    title: "晨间冥想",
    actionText: "去冥想",
    actionTone: "neutral",
  },
} satisfies Meta<typeof TaskCard>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <TaskCard {...args} />,
}

export const AccentAction: Story = {
  args: {
    value: "1",
    tag: "",
    suffix: "",
    title: "今日任务已完成",
    actionText: "已完成",
    actionTone: "accent",
  },
}

export const WithCustomIcon: Story = {
  args: {
    title: "步行打卡",
    value: "8000",
    tag: "",
    suffix: "步",
    icon: (
      <img
        src={demoIcon}
        alt=""
        width={32}
        height={32}
        style={{ display: "block" }}
      />
    ),
  },
}

export const CustomContent: Story = {
  render: () => (
    <TaskCard
      title={
        <span style={{ color: "#1f2937", fontWeight: 600 }}>
          自定义标题节点
        </span>
      }
      valueRow={
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="my-task-card__value">22:30</span>
          <span className="my-task-card__tag">偏晚</span>
          <span className="my-task-card__suffix">/睡前</span>
        </div>
      }
      action={<span>去记录</span>}
      icon={
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "#dbeafe",
            display: "block",
          }}
        />
      }
    />
  ),
}
