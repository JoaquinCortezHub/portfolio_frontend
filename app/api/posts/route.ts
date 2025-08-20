import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { postsQuery } from '@/lib/sanity-queries'

export async function GET() {
  try {
    const posts = await client.fetch(postsQuery)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}