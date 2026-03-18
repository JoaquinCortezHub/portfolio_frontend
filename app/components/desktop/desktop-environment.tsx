"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useDesktopStore } from "@/lib/desktop-store"
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import { Dock } from "./dock"
import { MenuBar } from "./menu-bar"
import { MobileLayout } from "./mobile-layout"
import { WindowManager } from "./window-manager"

function getFullscreenKey(): string {
  const ua = navigator.userAgent
  if (ua.includes("Mac")) return "Ctrl + Cmd + F"
  return "F11"
}

export function DesktopEnvironment() {
  const finishBoot = useDesktopStore((s) => s.finishBoot)
  const isMobile = useIsMobile()
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    // Center the terminal window on first load
    const terminalW = 700
    const terminalH = 450
    const menuBarH = 28
    const dockH = 80
    const desktopH = window.innerHeight - menuBarH - dockH
    const centeredX = Math.round((window.innerWidth - terminalW) / 2)
    const centeredY = Math.round((desktopH - terminalH) / 2)
    useDesktopStore.getState().updatePosition("terminal", { x: centeredX, y: centeredY })

    // Quick fade-in — mark boot complete after animation
    const timeout = setTimeout(() => finishBoot(), 800)
    // Auto-dismiss fullscreen hint after 8 seconds
    const hintTimeout = setTimeout(() => setShowHint(false), 8000)
    return () => {
      clearTimeout(timeout)
      clearTimeout(hintTimeout)
    }
  }, [finishBoot])

  // Keyboard shortcuts: Cmd/Ctrl + W (close), Cmd/Ctrl + M (minimize)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return

      const store = useDesktopStore.getState()
      const activeId = store.activeWindowId
      if (!activeId) return

      if (e.key === "w") {
        e.preventDefault()
        store.closeApp(activeId)
      } else if (e.key === "m") {
        e.preventDefault()
        store.minimizeApp(activeId)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (isMobile) return <MobileLayout />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-dvw h-dvh overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0d1117 25%, #0f1419 50%, #0d1117 75%, #0a0a0f 100%)",
      }}
    >
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <MenuBar />

      {/* Fullscreen hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="fixed top-9 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[12px] text-gray-400 cursor-pointer select-none"
            onClick={() => setShowHint(false)}
          >
            Fullscreen is suggested for a more immersive experience ({getFullscreenKey()})
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop area — between menu bar and dock */}
      <div
        className="absolute inset-0"
        style={{ top: 28, bottom: 80 }}
      >
        <WindowManager />
      </div>

      <Dock />
    </motion.div>
  )
}
