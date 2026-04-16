import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "./avatar"

const demoImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#dbe5ff" />
      <circle cx="48" cy="38" r="18" fill="#5e7ce0" />
      <rect x="22" y="62" width="52" height="20" rx="10" fill="#5e7ce0" />
    </svg>`
  )

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Li Lei",
    width: 48,
    height: 48,
    isRound: true,
  },
  argTypes: {
    gender: {
      control: "select",
      options: [undefined, "male", "female"],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name="王小明" gender="male" />
      <Avatar name="Alice Cooper" gender="female" />
      <Avatar name="AB" isRound={false} />
      <Avatar imgSrc={demoImage} />
      <Avatar />
    </div>
  ),
}
