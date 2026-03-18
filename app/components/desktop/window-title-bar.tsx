"use client"

import { useDesktopStore } from "@/lib/desktop-store"
import { useCallback } from "react"

interface WindowTitleBarProps {
  appId: string
  title: string
  isMaximized: boolean
  isFocused: boolean
}

export function WindowTitleBar({
  appId,
  title,
  isMaximized,
  isFocused,
}: WindowTitleBarProps) {
  const closeApp = useDesktopStore((s) => s.closeApp)
  const minimizeApp = useDesktopStore((s) => s.minimizeApp)
  const maximizeApp = useDesktopStore((s) => s.maximizeApp)

  const handleClose = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation()
      closeApp(appId)
    },
    [appId, closeApp]
  )

  const handleMinimize = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation()
      minimizeApp(appId)
    },
    [appId, minimizeApp]
  )

  const handleMaximize = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation()
      maximizeApp(appId)
    },
    [appId, maximizeApp]
  )

  return (
    <div
      className="flex items-center h-12 px-4 select-none shrink-0"
    >
      {/* Traffic light buttons */}
      <div className="flex items-center gap-2 mr-4">
        <button
          onPointerDown={handleClose}
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-[filter] cursor-pointer"
          aria-label={`Close ${title}`}
        />
        <button
          onPointerDown={handleMinimize}
          className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-[filter] cursor-pointer"
          aria-label={`Minimize ${title}`}
        />
        <div
          className="w-3 h-3 rounded-full bg-[#28c840] opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* Window title */}
      <span
        className={`text-xs font-medium flex-1 text-center transition-colors ${
          isFocused ? "text-gray-300" : "text-gray-500"
        }`}
      >
        {title}
      </span>

      {/* Spacer to balance the traffic lights */}
      <div className="w-[60px]" />
    </div>
  )
}
