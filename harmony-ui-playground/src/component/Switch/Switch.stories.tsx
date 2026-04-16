import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Switch } from "./Switch"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    modelValue: false,
    disabled: false,
    border: false,
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(Boolean(args.modelValue))
    return <Switch {...args} modelValue={value} onUpdateModelValue={setValue} />
  },
}

export const Border: Story = {
  render: () => {
    const [value, setValue] = useState(false)
    return <Switch modelValue={value} border onUpdateModelValue={setValue} />
  },
}

export const CustomColors: Story = {
  render: () => {
    const [value, setValue] = useState(true)
    return (
      <div className="flex items-center gap-3">
        <Switch
          modelValue={value}
          activeColor="#0f766e"
          inactiveColor="rgba(15, 118, 110, 0.18)"
          nodeColor="#f8fafc"
          border
          borderColor="#0f766e"
          borderWidth={2}
          borderGap={2}
          onUpdateModelValue={setValue}
        />
        <span className="text-sm text-muted-foreground">Current: {String(value)}</span>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch modelValue={false} disabled />
      <Switch modelValue disabled />
    </div>
  ),
}
