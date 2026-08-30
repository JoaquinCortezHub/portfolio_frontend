import { fetchSpotifyListeningData } from "@/lib/spotify"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await fetchSpotifyListeningData({ limit: 8 })
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": data.configured
          ? "public, s-maxage=60, stale-while-revalidate=300"
          : "public, s-maxage=300",
      },
    })
  } catch (error) {
    console.error(
      "Spotify listening data request failed:",
      error instanceof Error ? error.message : "Unknown error"
    )
    return NextResponse.json(
      {
        configured: true,
        nowPlaying: null,
        recentTracks: [],
        error: "Listening history is temporarily unavailable.",
      },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      }
    )
  }
}
