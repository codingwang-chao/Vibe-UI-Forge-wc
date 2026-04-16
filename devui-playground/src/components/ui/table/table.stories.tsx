import type { Meta, StoryObj } from "@storybook/react-vite"
import { Column, Table } from "./index"

type DemoRow = {
  id: string
  name: string
  status: "Active" | "Paused" | "Draft"
  owner: string
  budget: number
  children?: DemoRow[]
}

const rows: DemoRow[] = [
  {
    id: "p-1",
    name: "Marketing Site",
    status: "Active",
    owner: "Alice",
    budget: 12000,
    children: [
      {
        id: "p-1-1",
        name: "Landing Page A/B",
        status: "Active",
        owner: "Liam",
        budget: 3500,
      },
    ],
  },
  {
    id: "p-2",
    name: "Checkout Revamp",
    status: "Paused",
    owner: "Bob",
    budget: 8500,
  },
  {
    id: "p-3",
    name: "Design System",
    status: "Draft",
    owner: "Chloe",
    budget: 6400,
  },
]

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    striped: true,
    borderType: "bordered",
    rowHoveredHighlight: true,
    checkable: true,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    borderType: {
      control: "select",
      options: ["", "bordered", "borderless"],
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[920px]">
      <Table {...args} data={rows} rowKey="id" tableWidth="100%">
        <Column type="index" header="#" width={64} />
        <Column
          field="name"
          header="Project"
          sortable
          filterable
          filterList={[
            { name: "Design System", value: "Design System" },
            { name: "Checkout Revamp", value: "Checkout Revamp" },
          ]}
          minWidth={220}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterable
          filterList={[
            { name: "Active", value: "Active" },
            { name: "Paused", value: "Paused" },
            { name: "Draft", value: "Draft" },
          ]}
          minWidth={120}
        />
        <Column field="owner" header="Owner" minWidth={120} />
        <Column
          field="budget"
          header="Budget"
          align="right"
          sortable
          formatter={(row) => `$${Number(row.budget).toLocaleString()}`}
          minWidth={140}
        />
        <Column
          type="expand"
          width={80}
          children={({ row }) => (
            <div className="text-sm text-muted-foreground">
              Expanded panel for <strong>{String(row.name)}</strong>.
            </div>
          )}
        />
      </Table>
    </div>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <div className="w-[920px]">
      <Table data={[]} tableWidth="100%" empty="No projects found">
        <Column field="name" header="Project" />
        <Column field="owner" header="Owner" />
      </Table>
    </div>
  ),
}
