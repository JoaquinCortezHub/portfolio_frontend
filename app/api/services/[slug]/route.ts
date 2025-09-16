import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { serviceBySlugQuery } from '@/lib/sanity-queries'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const service = await client.fetch(serviceBySlugQuery, { slug: params.slug })
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}