import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "@/component/Button/Button"
import { Checkbox } from "@/component/Checkbox/Checkbox"
import { Divider } from "@/component/Divider/Divider"
import SubHeader from "@/component/SubHeader/SubHeader"
import { Switch } from "@/component/Switch/Switch"
import { TitleBar } from "@/component/TitleBar/title-bar"

const meta = {
  title: "Components/Showcase",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => {
    const [switchOn, setSwitchOn] = useState(true)
    const [checked, setChecked] = useState(true)

    return (
      <div className="min-h-screen bg-background p-6 text-foreground md:p-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <Button type="primary">Primary</Button>
              <Button type="default">Default</Button>
              <Button type="danger">Danger</Button>
              <Button loading>Loading</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold">Form Controls</h3>
            <div className="flex items-center gap-4">
              <Switch modelValue={switchOn} onUpdateModelValue={setSwitchOn} />
              <Checkbox modelValue={checked} onUpdateModelValue={setChecked}>
                Enable option
              </Checkbox>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:col-span-2">
            <h3 className="mb-3 text-sm font-semibold">Headers</h3>
            <div className="grid gap-3">
              <TitleBar title="Harmony UI" subtitle="Storybook Preview" />
              <SubHeader
                leftMode="double"
                rightMode="action"
                title="Content subheading"
                subtitle="subtitle"
                actionText="操作"
              />
              <Divider>Section Divider</Divider>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
