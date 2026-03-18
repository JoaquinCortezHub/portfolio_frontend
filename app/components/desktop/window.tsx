"use client"

import { useDesktopStore } from "@/lib/desktop-store"
import type { WindowState } from "@/lib/desktop-store"
import { motion, useMotionValue } from "motion/react"
import { useCallback, useRef } from "react"
import { WindowTitleBar } from "./window-title-bar"

interface DesktopWindowProps {
  windowState: WindowState
  children: React.ReactNode
}

const WINDOW_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  minimized: {
    scale: 0.3,
    opacity: 0,
    y: 400,
    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

export function DesktopWindow({ windowState, children }: DesktopWindowProps) {
  const { appId, title, isMinimized, isMaximized, position, size, zIndex } =
    windowState

  const focusWindow = useDesktopStore((s) => s.focusWindow)
  const updatePosition = useDesktopStore((s) => s.updatePosition)
  const updateSize = useDesktopStore((s) => s.updateSize)
  const activeWindowId = useDesktopStore((s) => s.activeWindowId)

  // Motion values for drag — lets us reset transform after committing position
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  const isDragging = useRef(false)
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null)
  const isFocused = activeWindowId === appId

  const handlePointerDown = useCallback(() => {
    focusWindow(appId)
  }, [appId, focusWindow])

  const handleDragStart = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleDragEnd = useCallback(() => {
    // Commit the drag offset to the store position
    const offsetX = dragX.get()
    const offsetY = dragY.get()
    updatePosition(appId, {
      x: position.x + offsetX,
      y: position.y + offsetY,
    })
    // Reset motion values so the transform goes back to 0
    // (the element stays in place because left/top now reflect the new position)
    dragX.jump(0)
    dragY.jump(0)
    isDragging.current = false
  }, [appId, position.x, position.y, updatePosition, dragX, dragY])

  const handleTitleBarPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isMaximized) return
      // Manually start drag via pointer events on the title bar
      // We use the native pointer capture for smooth tracking
      const el = e.currentTarget
      el.setPointerCapture(e.pointerId)

      const startX = e.clientX
      const startY = e.clientY

      isDragging.current = true

      const onMove = (ev: PointerEvent) => {
        dragX.set(ev.clientX - startX)
        dragY.set(ev.clientY - startY)
      }

      const onUp = () => {
        el.removeEventListener("pointermove", onMove)
        el.removeEventListener("pointerup", onUp)
        // Commit position
        const offsetX = dragX.get()
        const offsetY = dragY.get()
        updatePosition(appId, {
          x: position.x + offsetX,
          y: position.y + offsetY,
        })
        dragX.jump(0)
        dragY.jump(0)
        isDragging.current = false
      }

      el.addEventListener("pointermove", onMove)
      el.addEventListener("pointerup", onUp)
    },
    [appId, isMaximized, position.x, position.y, updatePosition, dragX, dragY]
  )

  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation()
      e.preventDefault()
      focusWindow(appId)

      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)

      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: size.width,
        startH: size.height,
      }
    },
    [appId, size.width, size.height, focusWindow]
  )

  const handleResizePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizeRef.current) return
      const { startX, startY, startW, startH } = resizeRef.current
      const newWidth = Math.max(400, startW + (e.clientX - startX))
      const newHeight = Math.max(300, startH + (e.clientY - startY))
      updateSize(appId, { width: newWidth, height: newHeight })
    },
    [appId, updateSize]
  )

  const handleResizePointerUp = useCallback(() => {
    resizeRef.current = null
  }, [])

  const animateState = isMinimized ? "minimized" : "visible"

  return (
    <motion.div
      layout={false}
      initial="hidden"
      animate={animateState}
      exit="exit"
      variants={WINDOW_VARIANTS}
      onPointerDown={handlePointerDown}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        x: dragX,
        y: dragY,
        zIndex,
        background: "rgba(30, 30, 30, 0.95)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
      }}
      className={`absolute flex flex-col rounded-xl overflow-hidden border shadow-2xl ${
        isFocused
          ? "border-white/15 shadow-black/60"
          : "border-white/5 shadow-black/40"
      }`}
    >
      {/* Title bar — drag handle */}
      <div
        onPointerDown={handleTitleBarPointerDown}
        style={{ cursor: isMaximized ? "default" : "grab", touchAction: "none" }}
      >
        <WindowTitleBar
          appId={appId}
          title={title}
          isMaximized={isMaximized}
          isFocused={isFocused}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Resize handle (bottom-right) */}
      {!isMaximized && (
        <div
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
          aria-hidden="true"
          style={{ touchAction: "none" }}
        />
      )}
    </motion.div>
  )
}
