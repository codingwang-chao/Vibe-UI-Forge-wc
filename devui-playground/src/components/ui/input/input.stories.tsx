import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentProps } from "react"
import { useState } from "react"
import { Input } from "./index"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type something...",
    size: "md",
    disabled: false,
    error: false,
    clearable: false,
    showPassword: false,
    styleType: "default",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    styleType: {
      control: "select",
      options: ["default", "gray"],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

function PlaygroundContent(args: ComponentProps<typeof Input>) {
  const [value, setValue] = useState("storybook")
  return (
    <div className="w-[340px]">
      <Input
        {...args}
        modelValue={value}
        onUpdateModelValue={setValue}
        clearable={args.clearable}
      />
    </div>
  )
}

function StatesContent() {
  return (
    <div className="flex w-[420px] flex-col gap-4">
      <Input placeholder="Default input" />
      <Input placeholder="Error input" error />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Search with prefix icon" prefixIcon="search" />
      <Input placeholder="Password input" showPassword modelValue="secret" />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundContent {...args} />,
}

export const States: Story = {
  render: () => <StatesContent />,
}
