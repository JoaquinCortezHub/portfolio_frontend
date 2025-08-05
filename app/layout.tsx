import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Joaquin Cortez | AI & ML",
  description: "I help you reach your business goals through scalables, modern AI infrastructure and Machine Learning",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
        `}</style>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
