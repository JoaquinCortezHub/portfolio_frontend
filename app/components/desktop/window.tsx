"use client"

import { useDesktopStore } from "@/lib/desktop-store"
import type { WindowState } from "@/lib/desktop-store"
import { motion, useMotionValue } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { WindowTitleBar } from "./window-title-bar"

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

// --- Shatter effect helpers ---

interface ShatterFragment {
  id: number
  x: number
  y: number
  width: number
  height: number
  vx: number
  vy: number
  rotation: number
  color: string
}

function generateFragments(): ShatterFragment[] {
  const fragments: ShatterFragment[] = []
  const cols = 5
  const rows = 4
  let id = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = (col / cols) * 100
      const baseY = (row / rows) * 100
      const w = 100 / cols
      const h = 100 / rows

      // Velocity direction from center of window
      const cx = baseX + w / 2 - 50
      const cy = baseY + h / 2 - 50
      const dist = Math.sqrt(cx * cx + cy * cy) || 1
      const speed = 300 + Math.random() * 500

      const brightness = 20 + Math.floor(Math.random() * 25)
      const color = `rgba(${brightness}, ${brightness}, ${brightness + 10}, 0.95)`

      fragments.push({
        id: id++,
        x: baseX,
        y: baseY,
        width: w + (Math.random() - 0.5) * 3,
        height: h + (Math.random() - 0.5) * 3,
        vx: (cx / dist) * speed + (Math.random() - 0.5) * 200,
        vy: (cy / dist) * speed + (Math.random() - 0.5) * 150 + 100,
        rotation: (Math.random() - 0.5) * 720,
        color,
      })
    }
  }

  return fragments
}

function playCrashSound() {
  try {
    const ctx = new AudioContext()
    const duration = 0.4
    const bufferSize = Math.floor(ctx.sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3)
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start()
    source.onended = () => ctx.close()
  } catch {
    // Audio not supported
  }
}

// --- Component ---

interface DesktopWindowProps {
  windowState: WindowState
  children: React.ReactNode
}

export function DesktopWindow({ windowState, children }: DesktopWindowProps) {
  const { appId, title, isMinimized, isMaximized, position, size, zIndex } =
    windowState

  const focusWindow = useDesktopStore((s) => s.focusWindow)
  const updatePosition = useDesktopStore((s) => s.updatePosition)
  const updateSize = useDesktopStore((s) => s.updateSize)
  const closeApp = useDesktopStore((s) => s.closeApp)
  const activeWindowId = useDesktopStore((s) => s.activeWindowId)

  // Motion values for drag — lets us reset transform after committing position
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  const isDragging = useRef(false)
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null)
  const isFocused = activeWindowId === appId

  // Shatter state
  const [isShattered, setIsShattered] = useState(false)
  const [fragments, setFragments] = useState<ShatterFragment[]>([])
  const shakeTrackRef = useRef({
    lastX: 0,
    lastDirX: 0,
    reversals: [] as number[],
  })

  // Auto-close window after shatter animation completes
  useEffect(() => {
    if (!isShattered) return
    const timer = setTimeout(() => closeApp(appId), 900)
    return () => clearTimeout(timer)
  }, [isShattered, closeApp, appId])

  const handleShatter = useCallback(() => {
    setFragments(generateFragments())
    setIsShattered(true)
    playCrashSound()
  }, [])

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
      if (isMaximized || isShattered) return
      // Manually start drag via pointer events on the title bar
      // We use the native pointer capture for smooth tracking
      const el = e.currentTarget
      el.setPointerCapture(e.pointerId)

      const startX = e.clientX
      const startY = e.clientY

      isDragging.current = true

      // Reset shake tracking for this drag session
      const shake = shakeTrackRef.current
      shake.lastX = e.clientX
      shake.lastDirX = 0
      shake.reversals = []

      const onMove = (ev: PointerEvent) => {
        dragX.set(ev.clientX - startX)
        dragY.set(ev.clientY - startY)

        // Shake detection: track horizontal direction reversals
        const dx = ev.clientX - shake.lastX
        if (Math.abs(dx) > 3) {
          const dirX = dx > 0 ? 1 : -1
          if (shake.lastDirX !== 0 && dirX !== shake.lastDirX) {
            const now = Date.now()
            shake.reversals.push(now)
            shake.reversals = shake.reversals.filter((t) => now - t < 600)
            if (shake.reversals.length >= 6) {
              // Shake threshold exceeded — shatter!
              el.removeEventListener("pointermove", onMove)
              el.removeEventListener("pointerup", onUp)
              const offsetX = dragX.get()
              const offsetY = dragY.get()
              updatePosition(appId, {
                x: position.x + offsetX,
                y: position.y + offsetY,
              })
              dragX.jump(0)
              dragY.jump(0)
              isDragging.current = false
              handleShatter()
              return
            }
          }
          shake.lastDirX = dirX
          shake.lastX = ev.clientX
        }
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
    [appId, isMaximized, isShattered, position.x, position.y, updatePosition, dragX, dragY, handleShatter]
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
      animate={isShattered ? { scale: 0.95, opacity: 0 } : animateState}
      exit="exit"
      variants={WINDOW_VARIANTS}
      onPointerDown={handlePointerDown}
      transition={isShattered ? { duration: 0.4, ease: "easeOut" } : undefined}
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
      className={`absolute flex flex-col rounded-xl ${
        isShattered ? "overflow-visible" : "overflow-hidden"
      } border shadow-2xl ${
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
      {!isMaximized && !isShattered && (
        <div
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
          aria-hidden="true"
          style={{ touchAction: "none" }}
        />
      )}

      {/* Shatter fragments */}
      {isShattered &&
        fragments.map((frag) => (
          <motion.div
            key={frag.id}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{
              x: frag.vx,
              y: frag.vy,
              rotate: frag.rotation,
              opacity: 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${frag.x}%`,
              top: `${frag.y}%`,
              width: `${frag.width}%`,
              height: `${frag.height}%`,
              background: frag.color,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "2px",
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
            }}
          />
        ))}
    </motion.div>
  )
}
