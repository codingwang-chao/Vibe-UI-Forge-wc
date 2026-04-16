import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Checkbox } from "./Checkbox"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    modelValue: false,
    disabled: false,
    size: "default",
    checkedColor: "rgba(0, 125, 255, 1)",
    borderColor: "rgba(0, 0, 0, 0.4000000059604645)",
    border: false,
    children: "Checkbox label",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "large"],
    },
    checkedColor: {
      control: "color",
    },
    borderColor: {
      control: "color",
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(Boolean(args.modelValue))

    return (
      <Checkbox
        {...args}
        modelValue={value}
        onUpdateModelValue={(next) => setValue(next)}
      />
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(false)
    const [large, setLarge] = useState(true)

    return (
      <div className="flex items-center gap-6">
        <Checkbox
          modelValue={small}
          onUpdateModelValue={(next) => setSmall(next)}
        >
          Default
        </Checkbox>
        <Checkbox
          size="large"
          modelValue={large}
          onUpdateModelValue={(next) => setLarge(next)}
        >
          Large
        </Checkbox>
      </div>
    )
  },
}

export const States: Story = {
  render: () => {
    const [unchecked, setUnchecked] = useState(false)
    const [checked, setChecked] = useState(true)

    return (
      <div className="flex flex-wrap items-center gap-6">
        <Checkbox
          modelValue={unchecked}
          onUpdateModelValue={(next) => setUnchecked(next)}
        >
          Unchecked
        </Checkbox>
        <Checkbox
          modelValue={checked}
          onUpdateModelValue={(next) => setChecked(next)}
        >
          Checked
        </Checkbox>
        <Checkbox modelValue={false} disabled>
          Disabled
        </Checkbox>
        <Checkbox modelValue border>
          Border ring
        </Checkbox>
      </div>
    )
  },
}

export const CustomColors: Story = {
  render: () => {
    const [value, setValue] = useState(false)

    return (
      <Checkbox
        modelValue={value}
        checkedColor="rgba(10, 89, 247, 1)"
        borderColor="rgba(16, 185, 129, 0.48)"
        border
        onUpdateModelValue={(next) => setValue(next)}
      >
        Brand color
      </Checkbox>
    )
  },
}
