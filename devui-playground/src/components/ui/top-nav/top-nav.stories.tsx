import type { Meta, StoryObj } from "@storybook/react-vite"
import { TopNav } from "./index"

const meta = {
  title: "Blocks/TopNav",
  component: TopNav,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TopNav>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
