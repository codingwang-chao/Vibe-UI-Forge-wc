import type { Meta, StoryObj } from "@storybook/react-vite"
import { DevOpsWorkItemListPage } from "./devops-work-item-list-page"

const meta = {
  title: "Pages/MiniDevUI/DevOpsWorkItemList",
  component: DevOpsWorkItemListPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DevOpsWorkItemListPage>

export default meta
type Story = StoryObj<typeof meta>

export const FigmaTemplate: Story = {}
