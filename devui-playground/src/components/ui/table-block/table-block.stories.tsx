import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { TableBlock } from "./index"

type DemoRow = {
  id: string
  title: string
  status: string
  priority: string
  assignee: string
}

const defaultData: DemoRow[] = [
  {
    id: "1",
    title: "用户管理-无法手动设置会员级别",
    status: "新建",
    priority: "中",
    assignee: "hw12345678",
  },
  {
    id: "2",
    title: "积分管理-无法显示积分规则界面",
    status: "新建",
    priority: "高",
    assignee: "hw12345678",
  },
  {
    id: "3",
    title: "作为用户应该可以查看产品列表",
    status: "新建",
    priority: "低",
    assignee: "hw12345678",
  },
]

const meta = {
  title: "Blocks/TableBlock",
  component: TableBlock,
  tags: ["autodocs"],
  args: {
    currentPage: 1,
    totalPages: 5,
    paginationProps: {
      pageSize: 10,
      totalItems: 50,
      showJump: false,
    },
  },
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
  },
} satisfies Meta<typeof TableBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage)
    const [pageSize, setPageSize] = useState(10)

    return (
      <div style={{ minWidth: "1000px" }}>
        <TableBlock
          {...args}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(size) => setPageSize(size)}
          columns={[
            { field: "title", header: "标题", sortable: true },
            { field: "status", header: "状态", sortable: true, filterable: true },
            { field: "priority", header: "优先级", sortable: true, filterable: true },
            { field: "assignee", header: "处理人", sortable: true, filterable: true },
          ]}
          data={defaultData}
        />
      </div>
    )
  },
}