import {
  createContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  useContext,
  useEffect,
  useRef,
} from "react"
import { createPortal } from "react-dom"

import "./dialog.css"
import { CloseIcon, StatusIcon } from "./dialog-icons"
import { cn, lockBodyScroll, useDraggable } from "./dialog-utils"
import type {
  DialogProps,
  DialogSectionProps,
  DialogType,
} from "./dialog.types"

type DialogContextValue = {
  requestClose: () => void
  type: DialogType
}

type CloseActionProps = Pick<
  DialogProps,
  "beforeClose" | "onClose" | "onOpenChange"
>

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  return useContext(DialogContext)
}

function useCloseAction(props: CloseActionProps) {
  return () => {
    const close = () => {
      props.onOpenChange?.(false)
      props.onClose?.()
    }

    if (props.beforeClose) {
      props.beforeClose(close)
      return
    }

    close()
  }
}

function useEscapeToClose(
  open: boolean,
  escapable: boolean | undefined,
  requestClose: () => void
) {
  useEffect(() => {
    if (!open || !escapable || typeof window === "undefined") {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [escapable, open, requestClose])
}

function useBodyLock(open: boolean, lockScroll: boolean | undefined) {
  useEffect(() => {
    if (!open || !lockScroll) {
      return
    }

    return lockBodyScroll()
  }, [lockScroll, open])
}

function useAutofocus(
  open: boolean,
  keepLast: boolean | undefined,
  clearPosition: () => void
) {
  useEffect(() => {
    if (!open) {
      return
    }

    if (!keepLast) {
      clearPosition()
    }

    const timer = window.setTimeout(() => {
      const autofocus = document.querySelector<HTMLElement>("[autofocus]")
      autofocus?.focus()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [clearPosition, keepLast, open])
}

function DialogOverlay({
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mini-modal-overlay", className)}
      onClick={onClick}
      {...props}
    />
  )
}

function DialogClose({
  className,
  children,
  onClick,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useDialogContext()

  return (
    <button
      type={type}
      className={cn("mini-modal__action mini-modal__action--ghost", className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          context?.requestClose()
        }
      }}
      {...props}
    >
      {children ?? "Close"}
    </button>
  )
}

function DialogHeader({
  className,
  children,
  ...props
}: DialogSectionProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mini-modal__header", className)} {...props}>
      {children}
    </div>
  )
}

function DialogBody({
  className,
  children,
  ...props
}: DialogSectionProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mini-modal__body", className)} {...props}>
      {children}
    </div>
  )
}

function DialogFooter({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogSectionProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mini-modal__footer", className)} {...props}>
      {children}
      {showCloseButton ? <DialogClose /> : null}
    </div>
  )
}

function renderTypeHeader(type: Exclude<DialogType, "">) {
  const text = {
    success: "成功",
    failed: "错误",
    warning: "警告",
    info: "信息",
  }[type]

  return (
    <DialogHeader className="mini-modal__header--draggable">
      <span className="mini-modal__type">
        <span className="mini-modal__header-icon">
          <StatusIcon type={type} />
        </span>
        <span className="mini-modal__type-text">{text}</span>
      </span>
    </DialogHeader>
  )
}

function Dialog({
  open,
  title = "",
  lockScroll = true,
  draggable = true,
  closeOnClickOverlay = true,
  beforeClose,
  escapable = true,
  showClose = true,
  showAnimation = true,
  showOverlay = true,
  appendToBody = true,
  type = "",
  keepLast = false,
  header,
  footer,
  children,
  className,
  style,
  onOpenChange,
  onClose,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const requestClose = useCloseAction({ beforeClose, onClose, onOpenChange })
  const { clearPosition, transform } = useDraggable(
    dialogRef,
    headerRef,
    open && draggable
  )

  useEscapeToClose(open, escapable, requestClose)
  useBodyLock(open, lockScroll)
  useAutofocus(open, keepLast, clearPosition)

  if (!open) {
    return null
  }

  const modalNode = (
    <DialogContext.Provider value={{ requestClose, type }}>
      <div
        className="mini-modal-root"
        onClick={(event) => event.stopPropagation()}
      >
        {showOverlay ? (
          <DialogOverlay
            onClick={() => {
              if (closeOnClickOverlay) {
                requestClose()
              }
            }}
          />
        ) : null}
        <div
          ref={dialogRef}
          className={cn(
            "mini-modal",
            showAnimation && "mini-modal--animated",
            className
          )}
          style={{
            transform,
            ...style,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          {showClose ? (
            <button
              type="button"
              aria-label="Close dialog"
              className="mini-modal__close"
              onClick={requestClose}
            >
              <CloseIcon />
            </button>
          ) : null}

          {header ? (
            <div
              ref={headerRef}
              className={cn(
                "mini-modal__header",
                draggable && "mini-modal__header--draggable"
              )}
            >
              {header}
            </div>
          ) : type ? (
            <div
              ref={headerRef}
              className={cn(draggable && "mini-modal__header--draggable")}
            >
              {renderTypeHeader(type as Exclude<DialogType, "">)}
            </div>
          ) : title ? (
            <div
              ref={headerRef}
              className={cn(
                "mini-modal__header",
                draggable && "mini-modal__header--draggable"
              )}
            >
              <span className="mini-modal__header-text">{title}</span>
            </div>
          ) : null}

          <DialogBody>{children}</DialogBody>
          {footer ?? null}
        </div>
      </div>
    </DialogContext.Provider>
  )

  if (appendToBody && typeof document !== "undefined") {
    return createPortal(modalNode, document.body)
  }

  return modalNode
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
}
