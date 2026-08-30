"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { SpotifyListeningData, SpotifyTrackView } from "@/lib/spotify"
import {
  ExternalLink,
  LoaderCircle,
  Music2,
  Radio,
  RefreshCw,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"

type SpotifyApiResponse = SpotifyListeningData & { error?: string }

export function SpotifyApp() {
  const [data, setData] = useState<SpotifyListeningData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadListeningData = async () => {
      try {
        const response = await fetch("/api/spotify", {
          cache: "no-store",
          signal: controller.signal,
        })
        const payload = (await response.json()) as SpotifyApiResponse
        if (!response.ok) {
          throw new Error(payload.error ?? "Listening history is unavailable.")
        }
        setData(payload)
        setError(null)
      } catch (requestError) {
        if (controller.signal.aborted) return
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Listening history is unavailable."
        )
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    setIsLoading(true)
    void loadListeningData()
    const refreshInterval = window.setInterval(
      () => void loadListeningData(),
      60_000
    )

    return () => {
      controller.abort()
      window.clearInterval(refreshInterval)
    }
  }, [requestVersion])

  if (isLoading && !data) return <SpotifyLoadingState />
  if (error && !data) return <SpotifyErrorState message={error} onRetry={retry} />
  if (!data?.configured) return <SpotifySetupState />

  return (
    <div className="flex h-full min-h-0 flex-col bg-gradient-to-b from-[#173423] via-[#121b16] to-[#090b0a] text-white">
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-7 p-4 sm:p-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2 text-[#1ed760]">
                <Music2 className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Listening activity
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                What I&apos;ve been listening to
              </h1>
              <p className="mt-1 text-xs text-white/50">
                Live from Joaquín&apos;s Spotify history
              </p>
            </div>
            <button
              type="button"
              onClick={retry}
              className="rounded-full border border-white/10 bg-black/20 p-2 text-white/60 transition hover:border-white/20 hover:text-white"
              aria-label="Refresh listening activity"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </header>

          {data.nowPlaying && <NowPlayingCard track={data.nowPlaying} />}

          <section aria-labelledby="recently-played-heading">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <h2
                  id="recently-played-heading"
                  className="text-sm font-semibold"
                >
                  Recently played
                </h2>
                <p className="mt-0.5 text-[10px] text-white/40">
                  Updated automatically every minute
                </p>
              </div>
              <a
                href="https://open.spotify.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[10px] text-white/45 transition hover:text-[#1ed760]"
              >
                Open Spotify <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {data.recentTracks.length > 0 ? (
              <div className="space-y-1">
                {data.recentTracks.map((track, index) => (
                  <TrackRow
                    key={`${track.id}-${track.playedAt ?? index}`}
                    track={track}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-8 text-center text-xs text-white/45">
                No recent tracks were returned by Spotify.
              </div>
            )}
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}

function NowPlayingCard({ track }: { track: SpotifyTrackView }) {
  const progress =
    track.isPlaying && track.progressMs !== null && track.durationMs > 0
      ? Math.min(100, (track.progressMs / track.durationMs) * 100)
      : 0

  return (
    <section aria-label={track.isPlaying ? "Now playing" : "Last played"}>
      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 shadow-2xl shadow-black/20 transition hover:border-[#1ed760]/40 hover:bg-black/35"
      >
        <AlbumArtwork track={track} className="h-24 w-24 sm:h-28 sm:w-28" />
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1ed760]">
            {track.isPlaying ? (
              <>
                <Radio className="h-3 w-3 animate-pulse" /> Now playing
              </>
            ) : (
              "Last played"
            )}
          </div>
          <p className="truncate text-lg font-bold group-hover:underline">
            {track.title}
          </p>
          <p className="truncate text-sm text-white/65">{track.artist}</p>
          <p className="mt-1 truncate text-[11px] text-white/35">
            {track.album}
          </p>
          {track.isPlaying && (
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#1ed760]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-white/25 transition group-hover:text-[#1ed760]" />
      </a>
    </section>
  )
}

function TrackRow({
  track,
  index,
}: {
  track: SpotifyTrackView
  index: number
}) {
  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noreferrer"
      className="group grid grid-cols-[1.25rem_2.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/[0.07]"
    >
      <span className="text-right text-[11px] tabular-nums text-white/30">
        {index + 1}
      </span>
      <AlbumArtwork track={track} className="h-11 w-11" />
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-white group-hover:text-[#1ed760]">
          {track.title}
        </p>
        <p className="truncate text-[10px] text-white/45">
          {track.artist} · {track.album}
        </p>
        {track.playedAt && (
          <time
            dateTime={track.playedAt}
            className="text-[9px] text-white/25 sm:hidden"
          >
            {formatPlayedAt(track.playedAt)}
          </time>
        )}
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        {track.playedAt && (
          <time
            dateTime={track.playedAt}
            className="text-[9px] text-white/25"
          >
            {formatPlayedAt(track.playedAt)}
          </time>
        )}
        <span className="w-8 text-right text-[10px] tabular-nums text-white/35">
          {track.duration}
        </span>
      </div>
    </a>
  )
}

function AlbumArtwork({
  track,
  className,
}: {
  track: SpotifyTrackView
  className: string
}) {
  if (!track.albumImageUrl) {
    return (
      <div
        className={`${className} flex shrink-0 items-center justify-center rounded-md bg-white/10`}
      >
        <Music2 className="h-5 w-5 text-white/35" />
      </div>
    )
  }

  return (
    <img
      src={track.albumImageUrl}
      alt={`${track.album} album artwork`}
      className={`${className} shrink-0 rounded-md object-cover shadow-lg shadow-black/30`}
    />
  )
}

function SpotifyLoadingState() {
  return (
    <div className="flex h-full items-center justify-center bg-[#121212] text-white/55">
      <div className="flex flex-col items-center gap-3 text-xs">
        <LoaderCircle className="h-6 w-6 animate-spin text-[#1ed760]" />
        Loading listening activity…
      </div>
    </div>
  )
}

function SpotifyErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex h-full items-center justify-center bg-[#121212] p-8 text-center">
      <div className="max-w-xs">
        <Music2 className="mx-auto mb-3 h-8 w-8 text-white/30" />
        <p className="text-sm font-medium text-white">Spotify is taking a break</p>
        <p className="mt-1 text-xs text-white/45">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-[#1ed760] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#1fdf64]"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

function SpotifySetupState() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-[#173423] to-[#121212] p-8 text-center">
      <div className="max-w-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1ed760] text-black">
          <Music2 className="h-7 w-7" />
        </div>
        <p className="text-base font-semibold text-white">
          Listening history is being connected
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/50">
          This app is ready for live Spotify data. Check back soon to see what
          Joaquín has been listening to lately.
        </p>
      </div>
    </div>
  )
}

function formatPlayedAt(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Recently"
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}
