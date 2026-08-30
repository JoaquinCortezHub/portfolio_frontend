const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
const SPOTIFY_API_URL = "https://api.spotify.com/v1"

export interface SpotifyTrackView {
  id: string
  title: string
  artist: string
  album: string
  albumImageUrl: string | null
  spotifyUrl: string
  durationMs: number
  duration: string
  playedAt: string | null
  isPlaying: boolean
  progressMs: number | null
}

export interface SpotifyListeningData {
  configured: boolean
  nowPlaying: SpotifyTrackView | null
  recentTracks: SpotifyTrackView[]
}

interface SpotifyConfig {
  clientId: string
  clientSecret: string
  refreshToken: string
}

interface SpotifyApiTrack {
  id: string
  name: string
  duration_ms: number
  external_urls: { spotify: string }
  artists: Array<{ name: string }>
  album: {
    name: string
    images: Array<{ url: string; width: number | null; height: number | null }>
  }
}

interface SpotifyRecentlyPlayedResponse {
  items: Array<{ played_at: string; track: SpotifyApiTrack }>
}

interface SpotifyCurrentlyPlayingResponse {
  is_playing: boolean
  progress_ms: number | null
  item: SpotifyApiTrack | null
}

interface FetchSpotifyOptions {
  env?: Record<string, string | undefined>
  fetcher?: typeof fetch
  limit?: number
}

export function getSpotifyConfig(
  env: Record<string, string | undefined> = process.env
): SpotifyConfig | null {
  const clientId = env.SPOTIFY_CLIENT_ID?.trim()
  const clientSecret = env.SPOTIFY_CLIENT_SECRET?.trim()
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN?.trim()

  if (!clientId || !clientSecret || !refreshToken) return null
  return { clientId, clientSecret, refreshToken }
}

export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export async function fetchSpotifyListeningData({
  env = process.env,
  fetcher = fetch,
  limit = 8,
}: FetchSpotifyOptions = {}): Promise<SpotifyListeningData> {
  const config = getSpotifyConfig(env)
  if (!config) {
    return { configured: false, nowPlaying: null, recentTracks: [] }
  }

  const accessToken = await refreshAccessToken(config, fetcher)
  const headers = { Authorization: `Bearer ${accessToken}` }
  const safeLimit = Math.min(50, Math.max(1, Math.floor(limit)))

  const [currentlyPlayingResponse, recentlyPlayedResponse] = await Promise.all([
    fetcher(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
      headers,
      cache: "no-store",
    }),
    fetcher(
      `${SPOTIFY_API_URL}/me/player/recently-played?limit=${safeLimit}`,
      { headers, cache: "no-store" }
    ),
  ])

  if (!recentlyPlayedResponse.ok) {
    throw new Error(
      `Spotify recently played request failed (${recentlyPlayedResponse.status})`
    )
  }

  const recentPayload =
    (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedResponse
  const recentTracks = recentPayload.items
    .filter((item) => item.track?.id)
    .map((item) => normalizeTrack(item.track, { playedAt: item.played_at }))

  let nowPlaying: SpotifyTrackView | null = null
  if (currentlyPlayingResponse.status !== 204 && currentlyPlayingResponse.ok) {
    const currentPayload =
      (await currentlyPlayingResponse.json()) as SpotifyCurrentlyPlayingResponse
    if (currentPayload.item?.id) {
      nowPlaying = normalizeTrack(currentPayload.item, {
        isPlaying: currentPayload.is_playing,
        progressMs: currentPayload.progress_ms,
      })
    }
  }

  if (!nowPlaying && recentTracks.length > 0) {
    nowPlaying = { ...recentTracks[0], isPlaying: false, progressMs: null }
  }

  return { configured: true, nowPlaying, recentTracks }
}

async function refreshAccessToken(
  config: SpotifyConfig,
  fetcher: typeof fetch
): Promise<string> {
  const credentials = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64")
  const response = await fetcher(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.refreshToken,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Spotify token request failed (${response.status})`)
  }

  const payload = (await response.json()) as { access_token?: string }
  if (!payload.access_token) {
    throw new Error("Spotify token response did not include an access token")
  }
  return payload.access_token
}

function normalizeTrack(
  track: SpotifyApiTrack,
  playback: {
    playedAt?: string | null
    isPlaying?: boolean
    progressMs?: number | null
  }
): SpotifyTrackView {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url ?? null,
    spotifyUrl: track.external_urls.spotify,
    durationMs: track.duration_ms,
    duration: formatDuration(track.duration_ms),
    playedAt: playback.playedAt ?? null,
    isPlaying: playback.isPlaying ?? false,
    progressMs: playback.progressMs ?? null,
  }
}
