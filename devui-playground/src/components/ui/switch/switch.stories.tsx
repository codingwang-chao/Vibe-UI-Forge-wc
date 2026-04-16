import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Switch } from "./switch"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    modelValue: false,
    size: "md",
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.modelValue)
    return <Switch {...args} modelValue={value} onUpdateModelValue={(next) => setValue(next as boolean)} />
  },
}

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(true)
    const [medium, setMedium] = useState(false)
    const [large, setLarge] = useState(true)

    return (
      <div className="flex items-center gap-6">
        <Switch size="sm" modelValue={small} onUpdateModelValue={(next) => setSmall(next as boolean)} />
        <Switch size="md" modelValue={medium} onUpdateModelValue={(next) => setMedium(next as boolean)} />
        <Switch size="lg" modelValue={large} onUpdateModelValue={(next) => setLarge(next as boolean)} />
      </div>
    )
  },
}

export const States: Story = {
  render: () => {
    const [unchecked, setUnchecked] = useState(false)
    const [checked, setChecked] = useState(true)

    return (
      <div className="flex items-center gap-6">
        <Switch modelValue={unchecked} onUpdateModelValue={(next) => setUnchecked(next as boolean)} />
        <Switch modelValue={checked} onUpdateModelValue={(next) => setChecked(next as boolean)} />
        <Switch modelValue={false} disabled />
        <Switch modelValue={true} disabled />
      </div>
    )
  },
}

export const Content: Story = {
  render: () => {
    const [value, setValue] = useState(false)

    return (
      <Switch
        modelValue={value}
        onUpdateModelValue={(next) => setValue(next as boolean)}
        checkedContent="ON"
        uncheckedContent="OFF"
      />
    )
  },
}

export const CustomValues: Story = {
  render: () => {
    const [value, setValue] = useState<"on" | "off">("off")
    return (
      <div className="flex items-center gap-3">
        <Switch
          modelValue={value}
          activeValue="on"
          inactiveValue="off"
          onUpdateModelValue={(next) => setValue(next as "on" | "off")}
          checkedContent="ON"
          uncheckedContent="OFF"
          color="var(--devui-primary)"
        />
        <span className="text-sm text-muted-foreground">Current: {value}</span>
      </div>
    )
  },
}
