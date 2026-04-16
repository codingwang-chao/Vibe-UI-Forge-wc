import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

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
    const [selectValue, setSelectValue] = useState<string | number>("beijing")
    const [switchValue, setSwitchValue] = useState(true)
    const [inputValue, setInputValue] = useState("Sample input")

    return (
      <div className="min-h-screen bg-background p-6 text-foreground md:p-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <Card
            title="Button"
            subtitle="Variants and states"
            content={
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="text">Text</Button>
                <Button loading>Loading</Button>
              </div>
            }
          />

          <Card
            title="Input"
            subtitle="Form control"
            content={
              <Input
                modelValue={inputValue}
                clearable
                prefixIcon="search"
                onUpdateModelValue={setInputValue}
              />
            }
          />

          <Card
            title="Select & Switch"
            subtitle="Interactive controls"
            content={
              <div className="space-y-3">
                <Select
                  modelValue={selectValue}
                  options={[
                    { name: "Beijing", value: "beijing" },
                    { name: "Shanghai", value: "shanghai" },
                    { name: "Shenzhen", value: "shenzhen" },
                  ]}
                  allowClear
                  filter
                  onUpdateModelValue={(value) =>
                    setSelectValue(value as string)
                  }
                />
                <Switch
                  modelValue={switchValue}
                  onUpdateModelValue={(value) => setSwitchValue(Boolean(value))}
                />
              </div>
            }
          />

          <Card
            title="Avatar / Badge / Separator"
            subtitle="Visual primitives"
            content={
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar name="Li Lei" />
                  <Badge count={8} status="info" />
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  Core primitives are visible in one place for quick
                  smoke-check.
                </p>
              </div>
            }
          />
        </div>
      </div>
    )
  },
}
