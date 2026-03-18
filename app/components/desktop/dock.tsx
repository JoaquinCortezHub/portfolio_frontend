"use client"

import type { AppId } from "@/lib/desktop-store"
import { useCallback, useRef, useState } from "react"
import { DockIcon } from "./dock-icon"
import {
  TerminalIcon,
  FinderIcon,
  FigmaIcon,
  SafariIcon,
  NotesIcon,
  MailIcon,
  SpotifyIcon,
} from "./dock-icons"

interface DockApp {
  id: AppId
  label: string
  icon: React.ReactNode
}

const DOCK_APPS: DockApp[][] = [
  // System apps
  [
    { id: "finder", label: "Finder", icon: <FinderIcon /> },
    { id: "terminal", label: "Terminal", icon: <TerminalIcon /> },
  ],
  // Content apps
  [
    { id: "figma", label: "Projects", icon: <FigmaIcon /> },
    { id: "safari", label: "Blog", icon: <SafariIcon /> },
    { id: "notes", label: "Services", icon: <NotesIcon /> },
    { id: "mail", label: "Contact", icon: <MailIcon /> },
  ],
  // Fun
  [
    { id: "spotify", label: "Spotify", icon: <SpotifyIcon /> },
  ],
]

export function Dock() {
  const [cursorX, setCursorX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorX(e.clientX)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorX(null)
  }, [])

  return (
    <div
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-end gap-1 px-3 py-2 bg-gray-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl"
    >
      {DOCK_APPS.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-end gap-1">
          {groupIndex > 0 && (
            <div className="w-px h-8 bg-white/10 mx-1" aria-hidden="true" />
          )}
          {group.map((app) => (
            <DockIcon
              key={app.id}
              appId={app.id}
              icon={app.icon}
              label={app.label}
              cursorX={cursorX}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
