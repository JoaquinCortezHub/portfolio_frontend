"use client"

import type { AppId } from "@/lib/desktop-store"
import {
  FolderOpen,
  Globe,
  Layout,
  Mail,
  Music,
  StickyNote,
  TerminalSquare,
  X,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"

// Lazy-load app content
const TerminalApp = dynamic(
  () => import("./apps/terminal/terminal-app").then((m) => ({ default: m.TerminalApp })),
  { ssr: false }
)
const FinderApp = dynamic(
  () => import("./apps/finder/finder-app").then((m) => ({ default: m.FinderApp })),
  { ssr: false }
)
const FigmaApp = dynamic(
  () => import("./apps/figma/figma-app").then((m) => ({ default: m.FigmaApp })),
  { ssr: false }
)
const SafariApp = dynamic(
  () => import("./apps/safari/safari-app").then((m) => ({ default: m.SafariApp })),
  { ssr: false }
)
const NotesApp = dynamic(
  () => import("./apps/notes/notes-app").then((m) => ({ default: m.NotesApp })),
  { ssr: false }
)
const MailApp = dynamic(
  () => import("./apps/mail/mail-app").then((m) => ({ default: m.MailApp })),
  { ssr: false }
)
const SpotifyApp = dynamic(
  () => import("./apps/spotify/spotify-app").then((m) => ({ default: m.SpotifyApp })),
  { ssr: false }
)

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  terminal: TerminalApp,
  finder: FinderApp,
  figma: FigmaApp,
  safari: SafariApp,
  notes: NotesApp,
  mail: MailApp,
  spotify: SpotifyApp,
}

interface AppItem {
  id: AppId
  label: string
  icon: React.ReactNode
  color: string
}

const APPS: AppItem[] = [
  { id: "finder", label: "About", icon: <FolderOpen className="w-7 h-7" />, color: "bg-blue-500" },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare className="w-7 h-7" />, color: "bg-gray-700" },
  { id: "figma", label: "Projects", icon: <Layout className="w-7 h-7" />, color: "bg-purple-500" },
  { id: "safari", label: "Blog", icon: <Globe className="w-7 h-7" />, color: "bg-sky-500" },
  { id: "notes", label: "Services", icon: <StickyNote className="w-7 h-7" />, color: "bg-yellow-500" },
  { id: "mail", label: "Contact", icon: <Mail className="w-7 h-7" />, color: "bg-red-500" },
  { id: "spotify", label: "Spotify", icon: <Music className="w-7 h-7" />, color: "bg-emerald-500" },
]

export function MobileLayout() {
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
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

  const handleOpen = useCallback((id: AppId) => {
    setOpenApp(id)
  }, [])

  const handleClose = useCallback(() => {
    setOpenApp(null)
  }, [])

  const AppContent = openApp ? APP_COMPONENTS[openApp] : null

  return (
    <div
      className="relative w-dvw h-dvh overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 text-xs text-white font-medium">
        <span>JC Portfolio</span>
        <time className="tabular-nums">{time}</time>
      </div>

      {/* App grid */}
      <div className="grid grid-cols-3 gap-6 px-8 pt-12">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => handleOpen(app.id)}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center text-white shadow-lg`}
            >
              {app.icon}
            </div>
            <span className="text-[11px] text-white/80 font-medium">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* Full-screen app sheet */}
      <AnimatePresence>
        {openApp && AppContent && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#1e1e1e]"
          >
            {/* Sheet header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="text-sm font-medium text-white">
                {APPS.find((a) => a.id === openApp)?.label}
              </span>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* App content */}
            <div className="flex-1 overflow-hidden">
              <AppContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
