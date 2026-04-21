import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Pagination } from "./index"

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    current: 1,
    total: 5,
    pageSize: 10,
    totalItems: 50,
    showJump: false,
  },
  argTypes: {
    current: { control: "number" },
    total: { control: "number" },
    pageSize: { control: "select", options: [10, 20, 50, 100] },
    showJump: { control: "boolean" },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.current)
    return (
      <div style={{ padding: "20px" }}>
        <Pagination
          {...args}
          current={page}
          onChange={(p) => setPage(p)}
        />
      </div>
    )
  },
}