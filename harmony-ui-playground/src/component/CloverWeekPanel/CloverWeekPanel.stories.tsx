import type { Meta, StoryObj } from "@storybook/react-vite"
import { CloverWeekPanel } from "./CloverWeekPanel"

const meta = {
  title: "Components/CloverWeekPanel",
  component: CloverWeekPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    modelValue: 2,
    dayStatuses: ["todo", "todo", "done", "todo", "disabled", "todo", "todo"],
    labels: ["一", "二", "三", "四", "五", "六", "日"],
    legend: [
      { text: "规律起床", color: "#5ccd7a" },
      { text: "锻炼时长", color: "#f5a623" },
      { text: "压力均值", color: "#7b8cff" },
    ],
  },
  argTypes: {
    dayStatuses: { control: false },
    labels: { control: false },
    legend: { control: false },
  },
} satisfies Meta<typeof CloverWeekPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AlternateStates: Story = {
  render: (args) => (
    <div className="grid gap-6">
      <CloverWeekPanel
        {...args}
        modelValue={0}
        dayStatuses={["done", "done", "todo", "todo", "todo", "disabled", "todo"]}
      />
      <CloverWeekPanel
        {...args}
        modelValue={4}
        dayStatuses={["todo", "todo", "todo", "todo", "done", "todo", "disabled"]}
      />
    </div>
  ),
}
