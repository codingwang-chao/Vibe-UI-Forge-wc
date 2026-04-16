import type { Meta, StoryObj } from "@storybook/react-vite"

import { Message, message } from "./Message"

const meta = {
  title: "Components/Message",
  component: Message,
  tags: ["autodocs"],
  args: {
    message: "Hello from Harmony Message",
    type: "info",
    duration: 1500,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    duration: {
      control: { type: "number", min: 0, step: 100 },
    },
  },
} satisfies Meta<typeof Message>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Message
      key={`${String(args.message)}-${args.type}-${args.duration}`}
      {...args}
    />
  ),
}

export const Variants: Story = {
  render: () => {
    const variants = [
      { label: "Info", run: () => message("信息提示") },
      { label: "Success", run: () => message.success("操作成功") },
      { label: "Error", run: () => message.error("操作失败") },
      {
        label: "Warning",
        run: () => message({ message: "请注意风险", type: "warning" }),
      },
    ]

    return (
      <div className="flex flex-wrap gap-3">
        {variants.map((item) => (
          <button
            key={item.label}
            type="button"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/5"
            onClick={item.run}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  },
}

export const CustomContent: Story = {
  render: () => (
    <Message duration={2200} type="success">
      <span className="font-semibold">已保存</span>
      <span className="ml-2 opacity-80">草稿会在后台继续同步</span>
    </Message>
  ),
}
