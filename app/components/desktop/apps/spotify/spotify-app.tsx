"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react"
import { useCallback, useState } from "react"

interface Track {
  title: string
  artist: string
  album: string
  duration: string
}

const NOW_PLAYING: Track = {
  title: "Starboy",
  artist: "The Weeknd",
  album: "Starboy",
  duration: "3:50",
}

const PLAYLISTS = [
  { name: "Coding Flow", count: 42, color: "from-purple-600 to-blue-600" },
  { name: "Lo-Fi Focus", count: 28, color: "from-emerald-600 to-teal-600" },
  { name: "Rock Classics", count: 65, color: "from-red-600 to-orange-600" },
  { name: "Discover Weekly", count: 30, color: "from-blue-600 to-indigo-600" },
]

const RECENT_TRACKS: Track[] = [
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20" },
  { title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55" },
  { title: "Sultans of Swing", artist: "Dire Straits", album: "Dire Straits", duration: "5:48" },
  { title: "Money", artist: "Pink Floyd", album: "The Dark Side of the Moon", duration: "6:22" },
  { title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30" },
  { title: "Comfortably Numb", artist: "Pink Floyd", album: "The Wall", duration: "6:23" },
]

export function SpotifyApp() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress] = useState(42) // percentage

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1a1a2e] to-[#121212]">
      {/* Main content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Playlists grid */}
          <section>
            <h2 className="text-sm font-semibold text-white mb-3">
              Your Playlists
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {PLAYLISTS.map((playlist) => (
                <div
                  key={playlist.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default"
                >
                  <div
                    className={`w-10 h-10 rounded bg-gradient-to-br ${playlist.color} flex items-center justify-center shrink-0`}
                  >
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">
                      {playlist.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {playlist.count} songs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recently played */}
          <section>
            <h2 className="text-sm font-semibold text-white mb-3">
              Recently Played
            </h2>
            <div className="space-y-1">
              {RECENT_TRACKS.map((track, i) => (
                <div
                  key={track.title}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors cursor-default group"
                >
                  <span className="w-5 text-right text-xs text-gray-600 group-hover:hidden">
                    {i + 1}
                  </span>
                  <Play className="w-3.5 h-3.5 text-white hidden group-hover:block" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{track.title}</p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {track.artist}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-600">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Now Playing bar */}
      <div className="border-t border-white/5 bg-[#181818] px-4 py-3 shrink-0">
        <div className="flex items-center gap-4">
          {/* Track info */}
          <div className="flex items-center gap-3 w-44 shrink-0">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-red-500 to-purple-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-white truncate">{NOW_PLAYING.title}</p>
              <p className="text-[10px] text-gray-500 truncate">
                {NOW_PLAYING.artist}
              </p>
            </div>
            <Heart className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-white transition-colors" aria-label="Shuffle">
                <Shuffle className="w-3.5 h-3.5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors" aria-label="Previous">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white transition-colors" aria-label="Next">
                <SkipForward className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors" aria-label="Repeat">
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-xs flex items-center gap-2">
              <span className="text-[10px] text-gray-500 tabular-nums">1:37</span>
              <div className="flex-1 h-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500 tabular-nums">
                {NOW_PLAYING.duration}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-28 shrink-0">
            <Volume2 className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex-1 h-1 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-white/40 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
