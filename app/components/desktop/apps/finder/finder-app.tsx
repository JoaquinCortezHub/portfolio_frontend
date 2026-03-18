"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  File,
  FileText,
  Folder,
  FolderOpen,
  Star,
  Download,
  Monitor,
} from "lucide-react"
import { useCallback, useState } from "react"

interface FileItem {
  name: string
  type: "file" | "folder"
  icon: React.ReactNode
  content: React.ReactNode
}

const FILES: FileItem[] = [
  {
    name: "about-me.txt",
    type: "file",
    icon: <FileText className="w-4 h-4 text-gray-400" />,
    content: (
      <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
        <h3 className="text-lg font-semibold text-white">
          From Commerce Student to Software Developer
        </h3>
        <p>
          After studying international commerce for a semester, I decided to take
          a 180° turn and dive into tech. I started doing some graphic design
          work, then broke into UX/UI design, which I studied for almost 2
          years.
        </p>
        <p>
          After an eye-opening year in the USA, I realized building meaningful,
          innovative products was what I really loved. Since then, I have been
          polishing and bettering my programming skills to offer high-quality
          products to my clients.
        </p>
        <div className="flex gap-4 mt-4 text-emerald-400 text-xs font-medium">
          <span>2+ Years Experience</span>
          <span>15+ Projects</span>
          <span>2000+ Hours Studied</span>
        </div>
      </div>
    ),
  },
  {
    name: "experience.md",
    type: "file",
    icon: <FileText className="w-4 h-4 text-blue-400" />,
    content: (
      <div className="space-y-6 text-sm">
        <h3 className="text-lg font-semibold text-white">Work Experience</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-emerald-500 pl-4">
            <h4 className="font-semibold text-white">Full-Stack & AI Developer</h4>
            <p className="text-emerald-400 text-xs">2023 - Present</p>
            <p className="text-gray-300 mt-1">
              Creating high-performance, scalable AI & ML projects that drive
              massive growth.
            </p>
          </div>
          <div className="border-l-2 border-emerald-500/60 pl-4">
            <h4 className="font-semibold text-white">Front-End Developer</h4>
            <p className="text-gray-400 text-xs">2022 - 2023</p>
            <p className="text-gray-300 mt-1">
              Developed modern web applications using React, Next.js, and
              Tailwind CSS.
            </p>
          </div>
          <div className="border-l-2 border-emerald-500/30 pl-4">
            <h4 className="font-semibold text-white">UX/UI Designer</h4>
            <p className="text-gray-400 text-xs">2021 - 2022</p>
            <p className="text-gray-300 mt-1">
              Designing intuitive, user-friendly interfaces that enhance user
              experience.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "skills.json",
    type: "file",
    icon: <File className="w-4 h-4 text-yellow-400" />,
    content: (
      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
        {JSON.stringify(
          {
            frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            backend: ["Node.js", "Nest.js", "REST APIs", "PostgreSQL"],
            ai_ml: ["Python", "OpenAI API", "Machine Learning", "Scikit Learn"],
            tools: ["Docker", "Git", "UX/UI"],
          },
          null,
          2
        )}
      </pre>
    ),
  },
  {
    name: "approach.md",
    type: "file",
    icon: <FileText className="w-4 h-4 text-purple-400" />,
    content: (
      <div className="space-y-4 text-sm">
        <h3 className="text-lg font-semibold text-white">
          My Development Philosophy
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "User-Centric Design",
              desc: "Every line of code focused on exceptional user experiences.",
            },
            {
              title: "Performance First",
              desc: "Optimized, scalable solutions that perform under any load.",
            },
            {
              title: "Data-Driven Results",
              desc: "Leveraging AI & ML for intelligent, adaptive applications.",
            },
            {
              title: "Personalized Solutions",
              desc: "Tailored solutions for unique needs and measurable results.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <h4 className="text-emerald-400 font-medium text-xs">
                {item.title}
              </h4>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "hobbies",
    type: "folder",
    icon: <Folder className="w-4 h-4 text-blue-400" />,
    content: (
      <div className="space-y-4 text-sm">
        <h3 className="text-lg font-semibold text-white">When I'm Not Coding</h3>
        <p className="text-gray-300">
          I believe the best developers are well-rounded individuals. When I'm
          not building applications, you'll find me exploring new technologies,
          playing my guitar, or hiking.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "🎸", name: "Music" },
            { emoji: "📚", name: "Reading" },
            { emoji: "🏃‍♂️", name: "Running" },
            { emoji: "✈️", name: "Travel" },
          ].map((hobby) => (
            <div
              key={hobby.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <span className="text-2xl">{hobby.emoji}</span>
              <span className="text-gray-300 font-medium">{hobby.name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const SIDEBAR_ITEMS = [
  { label: "Favorites", isHeader: true },
  { label: "Desktop", icon: <Monitor className="w-3.5 h-3.5" /> },
  { label: "Documents", icon: <Folder className="w-3.5 h-3.5" /> },
  { label: "Downloads", icon: <Download className="w-3.5 h-3.5" /> },
]

export function FinderApp() {
  const [selectedFile, setSelectedFile] = useState<FileItem>(FILES[0])

  const handleSelect = useCallback((file: FileItem) => {
    setSelectedFile(file)
  }, [])

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-44 shrink-0 border-r border-white/5 bg-white/[0.02] p-2">
        <div className="space-y-0.5">
          {SIDEBAR_ITEMS.map((item) =>
            item.isHeader ? (
              <p
                key={item.label}
                className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 pt-2 pb-1"
              >
                {item.label}
              </p>
            ) : (
              <div
                key={item.label}
                className="flex items-center gap-2 px-2 py-1 rounded text-xs text-gray-400 hover:bg-white/5 cursor-default"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            )
          )}
          <div className="pt-2">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2 pb-1">
              Tags
            </p>
            <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-400">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>Important</span>
            </div>
          </div>
        </div>
      </div>

      {/* File list */}
      <div className="w-48 shrink-0 border-r border-white/5 bg-white/[0.01]">
        <ScrollArea className="h-full">
          <div className="p-1">
            {FILES.map((file) => (
              <button
                key={file.name}
                onClick={() => handleSelect(file)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs text-left transition-colors ${
                  selectedFile.name === file.name
                    ? "bg-blue-500/20 text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                {file.name === selectedFile.name && file.type === "folder" ? (
                  <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" />
                ) : (
                  <span className="shrink-0">{file.icon}</span>
                )}
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Preview pane */}
      <div className="flex-1 min-w-0">
        <ScrollArea className="h-full">
          <div className="p-6">{selectedFile.content}</div>
        </ScrollArea>
      </div>
    </div>
  )
}
