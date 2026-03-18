"use client"

import { useDesktopStore } from "@/lib/desktop-store"
import type { AppId } from "@/lib/desktop-store"
import { motion } from "motion/react"
import { useCallback, useRef } from "react"

interface DockIconProps {
  appId: AppId
  icon: React.ReactNode
  label: string
  cursorX: number | null
}

export function DockIcon({ appId, icon, label, cursorX }: DockIconProps) {
  const openApp = useDesktopStore((s) => s.openApp)
  const windows = useDesktopStore((s) => s.windows)
  const iconRef = useRef<HTMLButtonElement>(null)

  const isOpen = windows.some((w) => w.appId === appId && w.isOpen)

  // Magnification calculation based on cursor proximity
  let scale = 1
  if (cursorX !== null && iconRef.current) {
    const rect = iconRef.current.getBoundingClientRect()
    const iconCenter = rect.left + rect.width / 2
    const distance = Math.abs(cursorX - iconCenter)
    scale = Math.max(1, 1.5 - distance / 120)
  }

  const handleClick = useCallback(() => {
    openApp(appId)
  }, [appId, openApp])

  return (
    <div className="relative flex flex-col items-center group">
      <motion.button
        ref={iconRef}
        onClick={handleClick}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
        className="relative flex items-center justify-center w-12 h-12 rounded-xl opacity-80 hover:opacity-100 transition-opacity origin-bottom"
        aria-label={`Open ${label}`}
        style={{ transformOrigin: "center bottom" }}
      >
        {icon}
      </motion.button>

      {/* Tooltip */}
      <span className="absolute -top-8 px-2 py-1 text-[11px] font-medium text-white bg-gray-800/90 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm">
        {label}
      </span>

      {/* Open indicator dot */}
      {isOpen && (
        <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white/70" />
      )}
    </div>
  )
}
