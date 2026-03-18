"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MousePointer2,
  Hand,
  Square,
  Type,
  Pen,
  Image as ImageIcon,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface Project {
  _id: string
  title: string
  status?: string
  categories?: { title: string }[]
  mainImage?: { asset?: { url?: string } }
  body?: unknown[]
}

const TOOLBAR_ICONS = [
  MousePointer2,
  Hand,
  Square,
  Type,
  Pen,
  ImageIcon,
]

const EXPERIENCE = [
  {
    role: "Full-Stack & AI Developer",
    period: "2023 - Present",
    description: "Creating high-performance, scalable AI & ML projects.",
  },
  {
    role: "Front-End Developer",
    period: "2022 - 2023",
    description: "Modern web applications with React, Next.js, Tailwind.",
  },
  {
    role: "UX/UI Designer",
    period: "2021 - 2022",
    description: "Intuitive, user-friendly interface design.",
  },
]

export function FigmaApp() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activePage, setActivePage] = useState<"projects" | "experience">("projects")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/services", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setProjects(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
    return () => controller.abort()
  }, [])

  const handlePageSwitch = useCallback((page: "projects" | "experience") => {
    setActivePage(page)
  }, [])

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      {/* Left toolbar */}
      <div className="w-12 shrink-0 border-r border-white/5 flex flex-col items-center py-3 gap-2 bg-[#2c2c2c]">
        {TOOLBAR_ICONS.map((Icon, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 transition-colors"
            aria-label={`Tool ${i + 1}`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Pages sidebar */}
      <div className="w-40 shrink-0 border-r border-white/5 bg-[#252525]">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 pt-3 pb-2">
          Pages
        </p>
        {(["projects", "experience"] as const).map((page) => (
          <button
            key={page}
            onClick={() => handlePageSwitch(page)}
            className={`w-full text-left px-3 py-1.5 text-xs capitalize transition-colors ${
              activePage === page
                ? "text-white bg-blue-500/20"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 min-w-0 overflow-hidden bg-[#1a1a1a]">
        {/* Top toolbar */}
        <div className="flex items-center h-10 px-4 border-b border-white/5 text-xs text-gray-500 gap-4">
          <span>100%</span>
          <span className="text-gray-600">|</span>
          <span>{activePage === "projects" ? `${projects.length} frames` : "3 frames"}</span>
        </div>

        <ScrollArea className="h-[calc(100%-40px)]">
          <div className="p-8">
            {activePage === "projects" ? (
              <div className="grid grid-cols-2 gap-6">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-40 rounded-lg bg-white/5 animate-pulse"
                      />
                    ))
                  : projects.map((project) => (
                      <div
                        key={project._id}
                        className="rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-blue-500/40 transition-colors"
                      >
                        {/* Frame title bar */}
                        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                          <span className="text-xs font-medium text-gray-300 truncate">
                            {(project as Record<string, unknown>).name as string ?? project.title ?? "Untitled"}
                          </span>
                          {project.status && (
                            <Badge
                              variant="outline"
                              className="text-[10px] border-emerald-500/30 text-emerald-400"
                            >
                              {project.status}
                            </Badge>
                          )}
                        </div>
                        {/* Frame content */}
                        <div className="p-4 space-y-3">
                          <p className="text-xs text-gray-400 line-clamp-3">
                            {(project as Record<string, unknown>).description as string ?? "Project description"}
                          </p>
                          {(project as Record<string, unknown>).keywords && (
                            <div className="flex flex-wrap gap-1">
                              {((project as Record<string, unknown>).keywords as string[]).slice(0, 3).map((kw: string) => (
                                <span
                                  key={kw}
                                  className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            ) : (
              <div className="space-y-6 max-w-md mx-auto">
                {EXPERIENCE.map((exp) => (
                  <div
                    key={exp.role}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">
                        {exp.role}
                      </h4>
                      <span className="text-xs text-emerald-400">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
