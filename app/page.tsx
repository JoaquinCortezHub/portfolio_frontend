"use client"

import dynamic from "next/dynamic"

// bundle-dynamic-imports: Desktop is entirely client-side (drag, animations, state)
// ssr: false avoids hydration mismatches with window dimensions and mouse tracking
const DesktopEnvironment = dynamic(
  () =>
    import("./components/desktop/desktop-environment").then((m) => ({
      default: m.DesktopEnvironment,
    })),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="h-dvh w-dvw overflow-hidden bg-[#0a0a0f]">
      <DesktopEnvironment />
    </main>
  )
}
