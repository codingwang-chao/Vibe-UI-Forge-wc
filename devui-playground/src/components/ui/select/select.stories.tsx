import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Option, OptionGroup, Select } from "./index"

const cityOptions = [
  { name: "Beijing", value: "beijing" },
  { name: "Shanghai", value: "shanghai" },
  { name: "Shenzhen", value: "shenzhen" },
  { name: "Hong Kong", value: "hongkong" },
]

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    placeholder: "Please select",
    allowClear: true,
    filter: true,
    size: "md",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    overview: {
      control: "select",
      options: ["border", "underlined"],
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

function StatesContent() {
  const [basic, setBasic] = useState<string | number>("beijing")
  const [underlined, setUnderlined] = useState<string | number>("")
  const [multiple, setMultiple] = useState<Array<string | number>>([
    "beijing",
    "shanghai",
  ])
  const [grouped, setGrouped] = useState<string | number>("seoul")

  return (
    <div className="flex w-[420px] flex-col gap-4">
      <Select
        modelValue={basic}
        options={cityOptions}
        allowClear
        filter
        placeholder="Default"
        onUpdateModelValue={(next) => setBasic(next as string)}
      />

      <Select
        modelValue={underlined}
        options={cityOptions}
        overview="underlined"
        allowClear
        filter
        placeholder="Underlined"
        onUpdateModelValue={(next) => setUnderlined(next as string)}
      />

      <Select modelValue="beijing" options={cityOptions} disabled placeholder="Disabled" />

      <Select
        multiple
        modelValue={multiple}
        options={cityOptions}
        collapseTags
        collapseTagsTooltip
        filter
        allowClear
        placeholder="Multiple + collapse tags"
        onUpdateModelValue={(next) =>
          setMultiple(Array.isArray(next) ? next : [])
        }
      />

      <Select
        modelValue={grouped}
        filter
        allowClear
        placeholder="Grouped options"
        onUpdateModelValue={(next) => setGrouped(next as string)}
      >
        <OptionGroup label="Asia">
          <Option value="tokyo" name="Tokyo" />
          <Option value="seoul" name="Seoul" />
        </OptionGroup>
        <OptionGroup label="Europe">
          <Option value="berlin" name="Berlin" />
          <Option value="paris" name="Paris" />
        </OptionGroup>
      </Select>

      <Select modelValue="" options={cityOptions} loading loadingText="Loading..." placeholder="Loading" />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("")

    return (
      <div className="w-[320px]">
        <Select
          {...args}
          modelValue={value}
          options={cityOptions}
          onUpdateModelValue={(next) => setValue(next as string)}
        />
      </div>
    )
  },
}

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<Array<string | number>>(["beijing"])

    return (
      <div className="w-[360px]">
        <Select
          {...args}
          multiple
          collapseTags
          collapseTagsTooltip
          modelValue={value}
          options={cityOptions}
          onUpdateModelValue={(next) =>
            setValue(Array.isArray(next) ? next : [])
          }
        />
      </div>
    )
  },
}

export const WithOptionGroup: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>("")

    return (
      <div className="w-[320px]">
        <Select
          modelValue={value}
          filter
          allowClear
          placeholder="Grouped options"
          onUpdateModelValue={(next) => setValue(next as string)}
        >
          <OptionGroup label="Asia">
            <Option value="tokyo" name="Tokyo" />
            <Option value="seoul" name="Seoul" />
          </OptionGroup>
          <OptionGroup label="Europe">
            <Option value="berlin" name="Berlin" />
            <Option value="paris" name="Paris" />
          </OptionGroup>
        </Select>
      </div>
    )
  },
}

export const States: Story = {
  render: () => <StatesContent />,
}
