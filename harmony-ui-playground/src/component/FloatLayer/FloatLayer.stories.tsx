import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { FloatLayer } from "./FloatLayer"

const demoAvatar =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="24" fill="#dbeafe" />
      <circle cx="60" cy="48" r="20" fill="#0f62fe" />
      <path d="M28 100c6-18 21-28 32-28s26 10 32 28" fill="#0f62fe" />
    </svg>`
  )

const meta = {
  title: "Components/FloatLayer",
  component: FloatLayer,
  tags: ["autodocs"],
  args: {
    modelValue: true,
    title: "浮层标题",
    closeOnClickMask: true,
    showClose: true,
    showGrab: true,
    closeIcon: "",
    ariaLabel: "",
    headPreset: "sheet",
  },
  argTypes: {
    headPreset: {
      control: "select",
      options: ["sheet", "titlebar"],
    },
  },
} satisfies Meta<typeof FloatLayer>

export default meta

type Story = StoryObj<typeof meta>

function PlaygroundStory(args: Story["args"]) {
  const [open, setOpen] = useState(Boolean(args?.modelValue))

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-4 text-sm font-medium text-white"
        onClick={() => setOpen(true)}
      >
        Open FloatLayer
      </button>

      <FloatLayer
        {...args}
        modelValue={open}
        onUpdateModelValue={setOpen}
      >
        <div className="grid gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <img src={demoAvatar} alt="" className="h-12 w-12 rounded-2xl" />
              <div>
                <div className="text-sm font-semibold text-slate-900">浮层内容区</div>
                <div className="text-sm text-slate-500">用于验证遮罩、滚动和关闭交互。</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              这里是 body slot。
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              向下滚动也会保留头部和遮罩。
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              点击遮罩会按 closeOnClickMask 决定是否关闭。
            </div>
          </div>
        </div>
      </FloatLayer>
    </div>
  )
}

function TitleBarPresetStory(args: Story["args"]) {
  const [open, setOpen] = useState(true)

  return (
    <FloatLayer {...args} modelValue={open} onUpdateModelValue={setOpen}>
      <div className="space-y-3">
        <p className="text-sm leading-6 text-slate-700">
          这个预设会把标题行压成单行省略，并更贴近 TitleBar 的顶部布局。
        </p>
        <p className="text-sm leading-6 text-slate-700">
          你可以继续通过 `left`、`close` 和 `children` 组合出和 Vue 版本一致的结构。
        </p>
      </div>
    </FloatLayer>
  )
}

function CustomHeaderStory(args: Story["args"]) {
  const [open, setOpen] = useState(true)

  return (
    <FloatLayer
      {...args}
      modelValue={open}
      onUpdateModelValue={setOpen}
      left={
        <button type="button" aria-label="back">
          <img
            src={
              "data:image/svg+xml;utf8," +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <path d="M15 5L8 12L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
              )
            }
            alt=""
          />
        </button>
      }
      close={({ close }) => (
        <button
          type="button"
          className="my-float-layer__close"
          aria-label="custom close"
          onClick={close}
        >
          <span className="inline-flex items-center justify-center text-sm font-semibold text-slate-900">
            关闭
          </span>
        </button>
      )}
    >
      <div className="grid gap-3">
        <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
          自定义头部内容直接通过 ReactNode / render function 传入。
        </div>
        <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
          这保留了原 Vue 版本 `#left` 和 `#close` 插槽的语义。
        </div>
      </div>
    </FloatLayer>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundStory {...args} />,
}

export const TitleBarPreset: Story = {
  args: {
    headPreset: "titlebar",
    title: "标题栏模式",
  },
  render: (args) => <TitleBarPresetStory {...args} />,
}

export const CustomHeader: Story = {
  args: {
    modelValue: true,
    title: "",
    showClose: false,
  },
  render: (args) => <CustomHeaderStory {...args} />,
}
