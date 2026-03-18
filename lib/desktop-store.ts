import { create } from "zustand"

export interface WindowState {
  id: string
  appId: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  defaultSize: { width: number; height: number }
  defaultPosition: { x: number; y: number }
  previousState?: {
    position: { x: number; y: number }
    size: { width: number; height: number }
  }
}

export type AppId =
  | "terminal"
  | "finder"
  | "figma"
  | "safari"
  | "notes"
  | "mail"
  | "spotify"

interface DesktopStore {
  windows: WindowState[]
  activeWindowId: string | null
  nextZIndex: number
  isBooted: boolean

  openApp: (appId: AppId) => void
  closeApp: (appId: string) => void
  minimizeApp: (appId: string) => void
  maximizeApp: (appId: string) => void
  focusWindow: (appId: string) => void
  updatePosition: (appId: string, position: { x: number; y: number }) => void
  updateSize: (appId: string, size: { width: number; height: number }) => void
  finishBoot: () => void
}

const APP_DEFAULTS: Record<
  AppId,
  { title: string; size: { width: number; height: number }; position: { x: number; y: number } }
> = {
  terminal: {
    title: "Terminal",
    size: { width: 700, height: 450 },
    position: { x: 120, y: 80 },
  },
  finder: {
    title: "Finder",
    size: { width: 750, height: 500 },
    position: { x: 160, y: 60 },
  },
  figma: {
    title: "Figma",
    size: { width: 900, height: 580 },
    position: { x: 100, y: 50 },
  },
  safari: {
    title: "Safari",
    size: { width: 850, height: 550 },
    position: { x: 140, y: 70 },
  },
  notes: {
    title: "Notes",
    size: { width: 700, height: 500 },
    position: { x: 180, y: 90 },
  },
  mail: {
    title: "Mail",
    size: { width: 800, height: 520 },
    position: { x: 130, y: 65 },
  },
  spotify: {
    title: "Spotify",
    size: { width: 680, height: 480 },
    position: { x: 200, y: 100 },
  },
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: [
    {
      id: "terminal",
      appId: "terminal",
      title: "Terminal",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 80 },
      size: { width: 700, height: 450 },
      zIndex: 1,
      defaultSize: { width: 700, height: 450 },
      defaultPosition: { x: 120, y: 80 },
    },
  ],
  activeWindowId: "terminal",
  nextZIndex: 2,
  isBooted: false,

  openApp: (appId) => {
    const { windows, nextZIndex } = get()
    const existing = windows.find((w) => w.appId === appId)

    if (existing) {
      if (existing.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.appId === appId
              ? { ...w, isMinimized: false, isOpen: true, zIndex: nextZIndex }
              : w
          ),
          activeWindowId: appId,
          nextZIndex: nextZIndex + 1,
        })
      } else {
        // Already open — just focus it
        get().focusWindow(appId)
      }
      return
    }

    const defaults = APP_DEFAULTS[appId]
    if (!defaults) return

    const newWindow: WindowState = {
      id: appId,
      appId,
      title: defaults.title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { ...defaults.position },
      size: { ...defaults.size },
      zIndex: nextZIndex,
      defaultSize: { ...defaults.size },
      defaultPosition: { ...defaults.position },
    }

    set({
      windows: [...windows, newWindow],
      activeWindowId: appId,
      nextZIndex: nextZIndex + 1,
    })
  },

  closeApp: (appId) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.appId !== appId),
      activeWindowId:
        state.activeWindowId === appId ? null : state.activeWindowId,
    }))
  },

  minimizeApp: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.appId === appId ? { ...w, isMinimized: true } : w
      ),
      activeWindowId:
        state.activeWindowId === appId ? null : state.activeWindowId,
    }))
  },

  maximizeApp: (appId) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.appId !== appId) return w
        if (w.isMaximized) {
          // Restore to previous state
          return {
            ...w,
            isMaximized: false,
            position: w.previousState?.position ?? w.defaultPosition,
            size: w.previousState?.size ?? w.defaultSize,
          }
        }
        // Maximize — save current state, fill viewport (below menu bar)
        return {
          ...w,
          isMaximized: true,
          previousState: { position: w.position, size: w.size },
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 28 - 80 },
        }
      }),
    }))
  },

  focusWindow: (appId) => {
    const { nextZIndex } = get()
    set((state) => ({
      windows: state.windows.map((w) =>
        w.appId === appId ? { ...w, zIndex: nextZIndex } : w
      ),
      activeWindowId: appId,
      nextZIndex: nextZIndex + 1,
    }))
  },

  updatePosition: (appId, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.appId === appId ? { ...w, position } : w
      ),
    }))
  },

  updateSize: (appId, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.appId === appId ? { ...w, size } : w
      ),
    }))
  },

  finishBoot: () => set({ isBooted: true }),
}))
