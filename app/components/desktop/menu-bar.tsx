"use client"

import { useDesktopStore } from "@/lib/desktop-store"
import type { AppId } from "@/lib/desktop-store"
import { useCallback, useEffect, useState } from "react"

const NAV_ITEMS: { label: string; appId: AppId }[] = [
  { label: "About", appId: "finder" },
  { label: "Projects", appId: "figma" },
  { label: "Services", appId: "notes" },
  { label: "Blog", appId: "safari" },
  { label: "Contact", appId: "mail" },
]

export function MenuBar() {
  const openApp = useDesktopStore((s) => s.openApp)
  const activeWindowId = useDesktopStore((s) => s.activeWindowId)
  const windows = useDesktopStore((s) => s.windows)
  const [time, setTime] = useState("")

  // Live clock — format with Intl.DateTimeFormat per web-design-guidelines
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      )
    }
    update()
    const interval = setInterval(update, 30_000)
    return () => clearInterval(interval)
  }, [])

  const activeTitle =
    windows.find((w) => w.appId === activeWindowId)?.title ?? ""

  const handleNavClick = useCallback(
    (appId: AppId) => {
      openApp(appId)
    },
    [openApp]
  )

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-7 px-4 text-[13px] text-gray-300 select-none"
      style={{
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
      }}
    >
      {/* Left: Logo + Active app name */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-white">JC</span>
        <span className="font-semibold text-white">{activeTitle}</span>
      </div>

      {/* Center: Navigation */}
      <nav className="flex items-center gap-4 ml-6" aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, appId }) => (
          <button
            key={appId}
            onClick={() => handleNavClick(appId)}
            className="hover:text-white transition-colors"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right: Date/time */}
      <div className="ml-auto flex items-center gap-3">
        <time className="font-medium tabular-nums">{time}</time>
      </div>
    </header>
  )
}
