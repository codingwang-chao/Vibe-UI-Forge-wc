import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentProps } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogFooter } from "./dialog"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Delete item",
    showOverlay: true,
    showClose: true,
    closeOnClickOverlay: true,
    draggable: true,
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

function PlaygroundContent(args: ComponentProps<typeof Dialog>) {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        {...args}
        open={open}
        appendToBody={false}
        onOpenChange={setOpen}
        footer={
          <DialogFooter>
            <Button
              variant="outline"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button color="danger" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        }
      >
        This operation cannot be undone. Please confirm to continue.
      </Dialog>
    </div>
  )
}

function StatusTypesContent() {
  const [type, setType] = useState<
    "" | "success" | "failed" | "warning" | "info"
  >("")

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setType("success")}>Success</Button>
        <Button onClick={() => setType("info")}>Info</Button>
        <Button onClick={() => setType("warning")}>Warning</Button>
        <Button onClick={() => setType("failed")} color="danger">
          Failed
        </Button>
      </div>

      <Dialog
        open={Boolean(type)}
        type={type}
        appendToBody={false}
        onOpenChange={(open) => {
          if (!open) {
            setType("")
          }
        }}
        footer={
          <DialogFooter>
            <Button onClick={() => setType("")}>OK</Button>
          </DialogFooter>
        }
      >
        Dialog type preview: {type || "none"}.
      </Dialog>
    </div>
  )
}

export const Playground: Story = {
  args: {
    open: false,
  },
  render: (args) => <PlaygroundContent {...args} />,
}

export const StatusTypes: Story = {
  args: {
    open: false,
  },
  render: () => <StatusTypesContent />,
}
