"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { WELCOME_BANNER, WELCOME_MESSAGE } from "./ascii-art"
import { executeCommand, isClearCommand } from "./command-registry"

interface OutputLine {
  id: number
  text: string
  type: "output" | "input" | "ascii" | "error" | "system"
}

let lineIdCounter = 0

// Claude crab ASCII frames for walk animation
const CRAB_FRAMES = [
  [
    "     \\\\  ╱╱  ",
    "      (·  ·) ",
    "    ╱─┤    ├─╲",
    "   ╱  │~~~~│  ╲",
    "  ╱╱  ╰────╯  ╲╲",
  ],
  [
    "    \\\\  ╱╱   ",
    "     (·  ·)  ",
    "   ╱─┤    ├─╲ ",
    "  ╱  │~~~~│  ╲ ",
    "  ╱  ╰────╯  ╲ ",
  ],
]

const CRAB_WIDTH = 18 // visual char width of the crab

function WalkingCrab({ onComplete }: { onComplete: () => void }) {
  const [position, setPosition] = useState(-CRAB_WIDTH)
  const [frame, setFrame] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(-CRAB_WIDTH)
  const doneRef = useRef(false)

  useEffect(() => {
    const containerPx = containerRef.current?.parentElement?.clientWidth ?? 500
    const charWidth = 7.8
    const maxChars = Math.floor(containerPx / charWidth)

    const interval = setInterval(() => {
      posRef.current += 1
      setPosition(posRef.current)
      setFrame((prev) => (prev + 1) % CRAB_FRAMES.length)

      if (!doneRef.current && posRef.current > maxChars + CRAB_WIDTH) {
        doneRef.current = true
        clearInterval(interval)
        // Defer onComplete to avoid setState-during-render
        setTimeout(onComplete, 0)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  const pad = Math.max(0, position)
  const currentFrame = CRAB_FRAMES[frame]

  return (
    <div ref={containerRef} className="overflow-hidden text-orange-400 leading-none">
      {currentFrame.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {" ".repeat(pad)}{line}
        </div>
      ))}
      <div className="text-gray-500 text-xs mt-2 ml-1 whitespace-pre">
        {" ".repeat(Math.max(0, pad - 2))}Claude says hi!
      </div>
    </div>
  )
}

export function TerminalApp() {
  const [lines, setLines] = useState<OutputLine[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isReady, setIsReady] = useState(false)
  const [showCrab, setShowCrab] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  // Keep scrolling while crab walks
  useEffect(() => {
    if (!showCrab) return
    const interval = setInterval(scrollToBottom, 100)
    return () => clearInterval(interval)
  }, [showCrab, scrollToBottom])

  // Welcome message on mount — typed character by character
  useEffect(() => {
    const bannerLines = WELCOME_BANNER.split("\n").map((text) => ({
      id: lineIdCounter++,
      text,
      type: "ascii" as const,
    }))

    setLines(bannerLines)

    const messageLines = WELCOME_MESSAGE.split("\n")
    let charIndex = 0
    const fullText = messageLines.join("\n")

    const systemLineId = lineIdCounter++
    setLines((prev) => [
      ...prev,
      { id: systemLineId, text: "", type: "system" },
    ])

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        charIndex++
        setLines((prev) =>
          prev.map((line) =>
            line.id === systemLineId
              ? { ...line, text: fullText.slice(0, charIndex) }
              : line
          )
        )
        scrollToBottom()
      } else {
        clearInterval(interval)
        setIsReady(true)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [scrollToBottom])

  // Focus input when terminal is ready or clicked
  useEffect(() => {
    if (isReady) inputRef.current?.focus()
  }, [isReady])

  // Play the Californication intro riff via Web Audio API
  const playCalifornication = useCallback(() => {
    try {
      const ctx = new AudioContext()
      const t = ctx.currentTime

      // Californication intro — clean guitar arpeggio on Am, F, C, G
      // [frequency, startTime, duration]
      const notes: [number, number, number][] = [
        // Am arpeggio
        [440.00, 0.00, 0.28],   // A4
        [523.25, 0.30, 0.28],   // C5
        [659.25, 0.60, 0.28],   // E5
        [880.00, 0.90, 0.28],   // A5
        // F arpeggio
        [349.23, 1.25, 0.28],   // F4
        [440.00, 1.55, 0.28],   // A4
        [523.25, 1.85, 0.28],   // C5
        [698.46, 2.15, 0.28],   // F5
        // C arpeggio
        [261.63, 2.50, 0.28],   // C4
        [329.63, 2.80, 0.28],   // E4
        [392.00, 3.10, 0.28],   // G4
        [523.25, 3.40, 0.28],   // C5
        // G arpeggio
        [392.00, 3.75, 0.28],   // G4
        [493.88, 4.05, 0.28],   // B4
        [587.33, 4.35, 0.28],   // D5
        [783.99, 4.65, 0.38],   // G5
      ]

      for (const [freq, start, dur] of notes) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = "triangle"
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0, t + start)
        gain.gain.linearRampToValueAtTime(0.12, t + start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur)
        osc.start(t + start)
        osc.stop(t + start + dur + 0.05)
      }

      setTimeout(() => ctx.close(), 6000)
    } catch {
      // Audio not supported
    }
  }, [])

  // Short synth beep on command submit via Web Audio API
  const playBeep = useCallback(() => {
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = "sine"
      osc.frequency.value = 660
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.12)
      // Clean up after sound finishes
      osc.onended = () => ctx.close()
    } catch {
      // Audio not supported — silent fallback
    }
  }, [])

  const handleCrabComplete = useCallback(() => {
    setShowCrab(false)
    setLines((prev) => [
      ...prev,
      { id: lineIdCounter++, text: "  This site was built with Claude. Nice catch!", type: "output" },
      { id: lineIdCounter++, text: "", type: "output" },
    ])
  }, [])

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim()
    playBeep()
    if (!trimmed) {
      setLines((prev) => [
        ...prev,
        { id: lineIdCounter++, text: `visitor@joaquin ~ % ${trimmed}`, type: "input" },
      ])
      setInput("")
      scrollToBottom()
      return
    }

    // Add input echo
    setLines((prev) => [
      ...prev,
      { id: lineIdCounter++, text: `visitor@joaquin ~ % ${trimmed}`, type: "input" },
    ])

    // Update history
    setHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)

    // Check for clear — reset to banner
    if (isClearCommand(trimmed)) {
      const bannerLines = WELCOME_BANNER.split("\n").map((text) => ({
        id: lineIdCounter++,
        text,
        type: "ascii" as const,
      }))
      setLines(bannerLines)
      setInput("")
      return
    }

    // Execute command
    const result = executeCommand(trimmed)

    // Special: crab animation
    if (result.special === "crab") {
      setShowCrab(true)
      setInput("")
      return
    }

    // Special: play Californication riff
    if (result.special === "rhcp") {
      playCalifornication()
    }

    const newLines: OutputLine[] = result.lines.map((text) => ({
      id: lineIdCounter++,
      text,
      type: result.isAscii ? ("ascii" as const) : result.isError ? ("error" as const) : ("output" as const),
    }))

    setLines((prev) => [...prev, ...newLines])
    setInput("")

    // Defer scroll to next frame for DOM update
    requestAnimationFrame(scrollToBottom)
  }, [input, scrollToBottom, handleCrabComplete, playBeep, playCalifornication])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleSubmit()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (history.length > 0) {
          const nextIndex = Math.min(historyIndex + 1, history.length - 1)
          setHistoryIndex(nextIndex)
          setInput(history[nextIndex])
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyIndex > 0) {
          const nextIndex = historyIndex - 1
          setHistoryIndex(nextIndex)
          setInput(history[nextIndex])
        } else {
          setHistoryIndex(-1)
          setInput("")
        }
      }
    },
    [handleSubmit, history, historyIndex]
  )

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className="flex flex-col h-full bg-[#1a1a2e] font-mono text-sm cursor-text"
      onClick={handleContainerClick}
    >
      {/* Output area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-gray-400"
                : line.type === "ascii"
                  ? "text-emerald-400"
                  : line.type === "error"
                    ? "text-red-400"
                    : line.type === "system"
                      ? "text-emerald-300"
                      : "text-green-400"
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Walking crab animation */}
        {showCrab && <WalkingCrab onComplete={handleCrabComplete} />}
      </div>

      {/* Input area */}
      {isReady && (
        <div className="flex items-center px-4 py-3 border-t border-white/5">
          <span className="text-gray-500 mr-2 select-none shrink-0">
            visitor@joaquin ~ %
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      )}
    </div>
  )
}
