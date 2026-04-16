import type { Meta, StoryObj } from "@storybook/react-vite"
import HealthCloverPage from "./health-clover"

const meta = {
  title: "Blocks/HealthClover",
  component: HealthCloverPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HealthCloverPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: "360px", minHeight: "800px", margin: "0 auto" }}>
      <HealthCloverPage />
    </div>
  ),
}