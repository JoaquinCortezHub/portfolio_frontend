import { useDesktopStore } from "@/lib/desktop-store"
import { ASCII_PROFILE, HELP_TEXT } from "./ascii-art"

export interface CommandResult {
  lines: string[]
  isAscii?: boolean
  isError?: boolean
  special?: "crab" | "rhcp"
}

type CommandHandler = (args: string[]) => CommandResult

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "OpenAI API", "PostgreSQL", "Docker", "REST APIs",
  "Machine Learning", "Tailwind CSS", "Git", "UX/UI",
  "Nest.js", "Scikit Learn",
]

const commands: Record<string, CommandHandler> = {
  help: () => ({
    lines: HELP_TEXT.split("\n"),
  }),

  about: () => ({
    lines: [
      "",
      "  Joaquin Cortez — AI & Web3 Developer",
      "  ─────────────────────────────────────",
      "",
      "  After studying international commerce, I took a 180° turn",
      "  and dove into tech. Started with graphic design, then UX/UI",
      "  (studied for ~2 years), and after an eye-opening year in the",
      "  USA, I realized building meaningful, innovative products was",
      "  what I really loved.",
      "",
      "  Now I create high-performance, scalable AI & ML projects",
      "  that drive massive growth for my clients.",
      "",
      "  Stats: 2+ years experience | 15+ projects | 2000+ hours studied",
      "",
    ],
  }),

  skills: () => ({
    lines: [
      "",
      "  Technical Skills",
      "  ────────────────",
      "",
      ...SKILLS.map((s, i) => `  ${(i + 1).toString().padStart(2, " ")}. ${s}`),
      "",
    ],
  }),

  experience: () => ({
    lines: [
      "",
      "  Work Experience",
      "  ───────────────",
      "",
      "  ● Full-Stack & AI Developer    2023 - Present",
      "    Creating high-performance, scalable AI & ML projects",
      "    that drive massive growth.",
      "",
      "  ○ Front-End Developer           2022 - 2023",
      "    Developed modern web applications using React,",
      "    Next.js, and Tailwind CSS.",
      "",
      "  ○ UX/UI Designer                2021 - 2022",
      "    Designing intuitive, user-friendly interfaces",
      "    that enhance user experience.",
      "",
    ],
  }),

  contact: () => ({
    lines: [
      "",
      "  Contact Information",
      "  ──────────────────",
      "",
      "  GitHub:    github.com/JoaquinCortezHub",
      "  LinkedIn:  linkedin.com/in/joaquín-cortez",
      "  Twitter:   x.com/JoacoLCortez",
      "",
      "  Tip: Type /mail to open the Mail app for booking a call.",
      "",
    ],
  }),

  ascii: () => ({
    lines: ASCII_PROFILE.split("\n"),
    isAscii: true,
  }),

  whoami: () => ({
    lines: [
      "",
      "  You are a curious visitor exploring Joaquin's portfolio.",
      "  Welcome! Feel free to explore.",
      "",
    ],
  }),

  projects: () => {
    // Open the Figma app
    useDesktopStore.getState().openApp("figma")
    return {
      lines: [
        "",
        "  Opening Projects in Figma...",
        "",
      ],
    }
  },

  services: () => {
    useDesktopStore.getState().openApp("notes")
    return {
      lines: [
        "",
        "  Opening Services in Notes...",
        "",
      ],
    }
  },

  mail: () => {
    useDesktopStore.getState().openApp("mail")
    return {
      lines: [
        "",
        "  Opening Mail...",
        "",
      ],
    }
  },

  clear: () => ({
    lines: [],
  }),

  // Easter eggs
  sudo: () => ({
    lines: ["", "  Nice try.", ""],
    isError: true,
  }),

  "rm": () => ({
    lines: ["", "  I don't think so.", ""],
    isError: true,
  }),

  claude: () => ({
    lines: [""],
    special: "crab" as const,
  }),

  rhcp: () => ({
    lines: [
      "",
      "  🎸 Californication — Red Hot Chili Peppers",
      "",
      "  ♪ e|--0--0--0--0--1--1--0--0--3--3--3--3--",
      "  ♪ B|--1--1--1--1--1--1--1--1--0--0--0--0--",
      "  ♪ G|--2--2--2--2--2--2--0--0--0--0--0--0--",
      "",
    ],
    isAscii: true,
    special: "rhcp" as const,
  }),

  neofetch: () => ({
    lines: [
      "",
      "  joaquin@JoaquínOS",
      "  ─────────────────",
      "  OS:      JoaquínOS v1.0",
      "  Host:    Next.js 15.2.4",
      "  Shell:   /portfolio/terminal",
      "  DE:      Custom Desktop Environment",
      "  WM:      Framer Motion",
      "  Theme:   Dark [always]",
      "  Icons:   Lucide React",
      "  Font:    SF Mono (system)",
      "  CPU:     React 19 @ 60fps",
      "  Memory:  Zustand Store",
      "",
    ],
  }),
}

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim()

  if (!trimmed) {
    return { lines: [] }
  }

  // Strip leading slash
  const normalized = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed
  const [command, ...args] = normalized.split(/\s+/)
  const handler = commands[command.toLowerCase()]

  if (handler) {
    return handler(args)
  }

  return {
    lines: [
      `  command not found: ${trimmed}`,
      "  Type /help for available commands.",
    ],
    isError: true,
  }
}

export function isClearCommand(input: string): boolean {
  const normalized = input.trim().replace(/^\//, "")
  return normalized.toLowerCase() === "clear"
}
