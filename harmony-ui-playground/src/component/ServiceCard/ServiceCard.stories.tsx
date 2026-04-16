import type { Meta, StoryObj } from "@storybook/react-vite"
import { ServiceCard } from "./ServiceCard"
import { ServiceCardItem } from "./ServiceCardItem"
import { ServiceCardStatus } from "./ServiceCardStatus"

const meta = {
  title: "Components/ServiceCard",
  component: ServiceCard,
  subcomponents: {
    ServiceCardItem,
    ServiceCardStatus,
  },
  tags: ["autodocs"],
  args: {
    title: "18:00",
    variant: "muted",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["muted", "white"],
    },
  },
} satisfies Meta<typeof ServiceCard>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <ServiceCard
      {...args}
      extra={<ServiceCardStatus variant="primary" text="服药" />}
    >
      <ServiceCardItem name="阿莫西林" subtitle="500mg" time="18:05" />
      <ServiceCardItem
        name="维生素D"
        description="饭后服用"
        time="18:10"
        border={false}
      />
    </ServiceCard>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <ServiceCard
        {...args}
        variant="muted"
        title="18:00"
        extra={<ServiceCardStatus variant="primary" text="服药" />}
      >
        <ServiceCardItem name="阿莫西林" subtitle="500mg" time="18:05" />
      </ServiceCard>
      <ServiceCard
        {...args}
        variant="white"
        title="08:30"
        extra={<ServiceCardStatus variant="light" text="已服药" />}
      >
        <ServiceCardItem
          name="早餐后维持药物"
          description="已完成"
          time="08:31"
        />
      </ServiceCard>
    </div>
  ),
}

export const Items: Story = {
  render: () => (
    <ServiceCard
      title="今日用药"
      variant="white"
      extra={<ServiceCardStatus variant="light" text="已完成" />}
    >
      <ServiceCardItem name="阿司匹林" subtitle="100mg" time="07:30" />
      <ServiceCardItem name="钙片" description="饭后 30 分钟" time="12:30" />
      <ServiceCardItem
        name="维生素B"
        subtitle="无需随餐"
        time="21:00"
        border={false}
      />
    </ServiceCard>
  ),
}

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ServiceCardStatus variant="primary" text="服药" />
      <ServiceCardStatus variant="light" text="已服药" />
    </div>
  ),
}
