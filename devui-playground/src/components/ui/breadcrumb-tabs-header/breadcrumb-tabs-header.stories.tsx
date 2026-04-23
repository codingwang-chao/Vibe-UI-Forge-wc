import type { Meta, StoryObj } from "@storybook/react-vite"
import { BreadcrumbTabsHeader } from "./index"

const meta = {
  title: "Blocks/BreadcrumbTabsHeader",
  component: BreadcrumbTabsHeader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BreadcrumbTabsHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
