"use client"

import { useDesktopStore } from "@/lib/desktop-store"
import { AnimatePresence } from "motion/react"
import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import { DesktopWindow } from "./window"

// bundle-dynamic-imports: Lazy-load all app components (only Terminal is eagerly used)
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

const APP_COMPONENTS: Record<string, ComponentType> = {
  terminal: TerminalApp,
  finder: FinderApp,
  figma: FigmaApp,
  safari: SafariApp,
  notes: NotesApp,
  mail: MailApp,
  spotify: SpotifyApp,
}

export function WindowManager() {
  const windows = useDesktopStore((s) => s.windows)

  return (
    <AnimatePresence mode="sync">
      {windows
        .filter((w) => w.isOpen)
        .map((windowState) => {
          const AppComponent = APP_COMPONENTS[windowState.appId]
          if (!AppComponent) return null

          return (
            <DesktopWindow key={windowState.id} windowState={windowState}>
              <AppComponent />
            </DesktopWindow>
          )
        })}
    </AnimatePresence>
  )
}
