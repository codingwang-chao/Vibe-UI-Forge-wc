import type { Meta, StoryObj } from "@storybook/react-vite"
import MedicationPage from "./medication"

const meta = {
  title: "Blocks/Medication",
  component: MedicationPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MedicationPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: "360px", height: "800px", margin: "0 auto" }}>
      <MedicationPage />
    </div>
  ),
}