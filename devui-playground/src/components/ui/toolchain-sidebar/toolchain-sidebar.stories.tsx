import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToolchainSidebar } from "./index"

const meta = {
  title: "Blocks/ToolchainSidebar",
  component: ToolchainSidebar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: 1040 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToolchainSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
