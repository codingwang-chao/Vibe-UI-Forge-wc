import type { Meta, StoryObj } from "@storybook/react-vite"
import SettingsPage from "./settings-page"

const meta: Meta<typeof SettingsPage> = {
  title: "Blocks/SettingsPage",
  component: SettingsPage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SettingsPage>

export const Default: Story = {}