import assert from "node:assert/strict"
import test from "node:test"

import {
  fetchSpotifyListeningData,
  formatDuration,
  getSpotifyConfig,
} from "../lib/spotify.ts"

const ENV = {
  SPOTIFY_CLIENT_ID: "client-id",
  SPOTIFY_CLIENT_SECRET: "client-secret",
  SPOTIFY_REFRESH_TOKEN: "refresh-token",
}

test("getSpotifyConfig returns null unless every server credential exists", () => {
  assert.equal(getSpotifyConfig({}), null)
  assert.equal(
    getSpotifyConfig({
      SPOTIFY_CLIENT_ID: "client-id",
      SPOTIFY_CLIENT_SECRET: "client-secret",
    }),
    null
  )
  assert.deepEqual(getSpotifyConfig(ENV), {
    clientId: "client-id",
    clientSecret: "client-secret",
    refreshToken: "refresh-token",
  })
})

test("formatDuration renders Spotify millisecond durations", () => {
  assert.equal(formatDuration(0), "0:00")
  assert.equal(formatDuration(201_000), "3:21")
  assert.equal(formatDuration(3_661_000), "61:01")
})

test("fetchSpotifyListeningData refreshes the token and normalizes current and recent tracks", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = []
  const fetcher: typeof fetch = async (input, init) => {
    const url = String(input)
    calls.push({ url, init })

    if (url.includes("accounts.spotify.com")) {
      return Response.json({ access_token: "access-token" })
    }

    if (url.includes("currently-playing")) {
      return Response.json({
        is_playing: true,
        progress_ms: 50_000,
        item: spotifyTrack("current", "Current song", 200_000),
      })
    }

    return Response.json({
      items: [
        { played_at: "2026-08-30T00:00:00.000Z", track: spotifyTrack("one", "First", 180_000) },
        { played_at: "2026-08-29T23:00:00.000Z", track: spotifyTrack("two", "Second", 201_000) },
      ],
    })
  }

  const result = await fetchSpotifyListeningData({ env: ENV, fetcher, limit: 6 })

  assert.equal(result.configured, true)
  assert.equal(result.nowPlaying?.title, "Current song")
  assert.equal(result.nowPlaying?.isPlaying, true)
  assert.equal(result.nowPlaying?.progressMs, 50_000)
  assert.deepEqual(result.recentTracks.map((track) => track.title), ["First", "Second"])
  assert.equal(result.recentTracks[1].duration, "3:21")
  assert.equal(calls.length, 3)
  assert.match(String(calls[2].url), /limit=6/)
  assert.equal(new Headers(calls[1].init?.headers).get("Authorization"), "Bearer access-token")
})

test("fetchSpotifyListeningData falls back to the newest recent track when nothing is playing", async () => {
  const fetcher: typeof fetch = async (input) => {
    const url = String(input)
    if (url.includes("accounts.spotify.com")) return Response.json({ access_token: "token" })
    if (url.includes("currently-playing")) return new Response(null, { status: 204 })
    return Response.json({
      items: [
        { played_at: "2026-08-30T00:00:00.000Z", track: spotifyTrack("recent", "Latest", 120_000) },
      ],
    })
  }

  const result = await fetchSpotifyListeningData({ env: ENV, fetcher })

  assert.equal(result.nowPlaying?.title, "Latest")
  assert.equal(result.nowPlaying?.isPlaying, false)
  assert.equal(result.nowPlaying?.progressMs, null)
})

test("fetchSpotifyListeningData reports an unconfigured integration without making requests", async () => {
  let requested = false
  const fetcher: typeof fetch = async () => {
    requested = true
    return new Response()
  }

  const result = await fetchSpotifyListeningData({ env: {}, fetcher })

  assert.deepEqual(result, { configured: false, nowPlaying: null, recentTracks: [] })
  assert.equal(requested, false)
})

test("fetchSpotifyListeningData surfaces Spotify API failures without exposing response bodies", async () => {
  const fetcher: typeof fetch = async (input) => {
    if (String(input).includes("accounts.spotify.com")) {
      return new Response("sensitive provider details", { status: 401 })
    }
    return new Response()
  }

  await assert.rejects(
    () => fetchSpotifyListeningData({ env: ENV, fetcher }),
    /Spotify token request failed \(401\)/
  )
})

function spotifyTrack(id: string, name: string, durationMs: number) {
  return {
    id,
    name,
    duration_ms: durationMs,
    external_urls: { spotify: `https://open.spotify.com/track/${id}` },
    artists: [{ name: "Artist" }],
    album: {
      name: "Album",
      images: [{ url: `https://i.scdn.co/image/${id}`, width: 300, height: 300 }],
    },
  }
}
