import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { servicesQuery } from '@/lib/sanity-queries'

export async function GET() {
  try {
    const services = await client.fetch(servicesQuery)
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}