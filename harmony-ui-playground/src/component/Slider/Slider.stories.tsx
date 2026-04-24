import type { Meta, StoryObj } from "@storybook/react-vite"
import { Sun, SunDim } from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"

import { SliderBase } from "./SliderBase"
import { SliderWithIcons } from "./SliderWithIcons"
import { SliderWithScale } from "./SliderWithScale"

function centerInViewport(Story: () => ReactNode) {
  return (
    <div className="box-border flex min-h-screen w-full min-w-0 items-center justify-center bg-[#f3f4f6] p-8">
      <Story />
    </div>
  )
}

const meta = {
  title: "Components/Slider",
  component: SliderBase,
  tags: ["autodocs"],
  decorators: [centerInViewport],
  args: {
    modelValue: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
} satisfies Meta<typeof SliderBase>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(Number(args.modelValue))
    return (
      <div className="w-[280px]">
        <SliderBase {...args} modelValue={value} onUpdateModelValue={setValue} />
        <p className="mt-2 text-sm text-muted-foreground">当前值：{value}</p>
      </div>
    )
  },
}

export const WithIcons: StoryObj = {
  render: () => {
    const [value, setValue] = useState(60)
    return (
      <div className="w-[280px]">
        <SliderWithIcons
          modelValue={value}
          onUpdateModelValue={setValue}
          leftIcon={<SunDim size={20} strokeWidth={1.5} />}
          rightIcon={<Sun size={20} strokeWidth={1.5} />}
        />
        <p className="mt-2 text-sm text-muted-foreground">当前值：{value}</p>
      </div>
    )
  },
}

export const WithScale: StoryObj = {
  render: () => {
    const [value, setValue] = useState(35)
    return (
      <div className="w-[280px]">
        <SliderWithScale
          modelValue={value}
          onUpdateModelValue={setValue}
          ticks={[0, 20, 40, 60, 80, 100]}
          showValue
          valueFormatter={(v) => `${v}%`}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-[280px] flex-col gap-4">
      <SliderBase modelValue={30} disabled />
      <SliderBase modelValue={70} disabled />
    </div>
  ),
}
