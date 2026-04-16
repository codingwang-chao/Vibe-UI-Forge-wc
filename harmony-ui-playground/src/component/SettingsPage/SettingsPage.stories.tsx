import type { Meta, StoryObj } from "@storybook/react-vite"
import { SettingsPage } from "./SettingsPage"

const meta = {
  title: "Component/SettingsPage",
  component: SettingsPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "鸿蒙风格设置页面组件",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "设置",
    deviceName: "Mate 70 Pro",
  },
}

export const WithUserInfo: Story = {
  args: {
    title: "设置",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=harmony",
    userName: "Harmony User",
    deviceName: "Mate 70 Pro",
  },
}