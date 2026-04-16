import type { Meta, StoryObj } from "@storybook/react-vite"
import WaterSettingsPage from "./water-settings"

const meta = {
  title: "Blocks/WaterSettings",
  component: WaterSettingsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WaterSettingsPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: "360px", minHeight: "800px", margin: "0 auto" }}>
      <WaterSettingsPage />
    </div>
  ),
}