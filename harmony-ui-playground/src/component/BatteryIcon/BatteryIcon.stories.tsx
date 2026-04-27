import type { Meta, StoryObj } from "@storybook/react-vite"
import { BatteryIcon } from "./BatteryIcon"

const meta = {
  title: "Components/BatteryIcon",
  component: BatteryIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "outline",
    mode: "light",
    percentage: 100,
    showLabel: true,
    height: 12,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "solid"],
    },
    mode: {
      control: "select",
      options: ["light", "dark"],
    },
    percentage: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    height: {
      control: { type: "number", min: 12, max: 64, step: 1 },
    },
  },
} satisfies Meta<typeof BatteryIcon>

export default meta

type Story = StoryObj<typeof meta>

const cardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 24px",
  borderRadius: 12,
  background: "#ffffff",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
}

const darkCardStyle: React.CSSProperties = {
  ...cardStyle,
  background: "#111111",
}

export const Playground: Story = {
  render: (args) => (
    <div style={{ ...cardStyle, padding: "32px 48px" }}>
      <BatteryIcon {...args} height={Math.max(args.height ?? 12, 24)} />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4" style={{ minWidth: 240 }}>
      <div style={cardStyle}>
        <BatteryIcon variant="outline" mode="light" percentage={100} height={32} />
      </div>
      <div style={cardStyle}>
        <BatteryIcon variant="filled" mode="light" percentage={100} height={32} />
      </div>
      <div style={cardStyle}>
        <BatteryIcon variant="solid" mode="light" percentage={100} height={32} />
      </div>
    </div>
  ),
}

export const Modes: Story = {
  render: () => (
    <div className="grid gap-4" style={{ minWidth: 240 }}>
      <div style={cardStyle}>
        <BatteryIcon variant="outline" mode="light" height={32} />
      </div>
      <div style={darkCardStyle}>
        <BatteryIcon variant="outline" mode="dark" height={32} />
      </div>
      <div style={cardStyle}>
        <BatteryIcon variant="filled" mode="light" height={32} />
      </div>
      <div style={darkCardStyle}>
        <BatteryIcon variant="filled" mode="dark" height={32} />
      </div>
    </div>
  ),
}

export const PercentageScale: Story = {
  render: () => (
    <div className="grid gap-4" style={{ minWidth: 320 }}>
      {[100, 80, 50, 20, 5].map((value) => (
        <div key={value} style={cardStyle}>
          <BatteryIcon variant="filled" mode="light" percentage={value} height={32} />
        </div>
      ))}
    </div>
  ),
}

export const InStatusBar: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: 360,
        height: 36,
        padding: "8px 24px",
        boxSizing: "border-box",
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(0,0,0,0.9)" }}>
        08:08
      </span>
      <BatteryIcon variant="outline" mode="light" percentage={100} />
    </div>
  ),
}
