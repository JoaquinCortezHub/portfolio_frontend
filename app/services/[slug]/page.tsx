"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RichTextRenderer } from "@/components/ui/rich-text-renderer"
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react"
import Link from "next/link"

interface Service {
  _id: string
  name: string
  slug: { current: string }
  description: string
  keywords: string[]
  body: Array<{
    _type: string
    _key: string
    [key: string]: any
  }>
  relatedProjects: Array<{
    title: string
    url: string
    description?: string
  }>
  featured: boolean
  publishedAt: string
}

export default function ServicePage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${params.slug}`)
        if (!response.ok) {
          throw new Error('Service not found')
        }
        const data = await response.json()
        setService(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchService()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded mb-6 w-1/4"></div>
            <div className="h-12 bg-gray-800 rounded mb-4"></div>
            <div className="h-4 bg-gray-800 rounded mb-8 w-3/4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Service Not Found</h1>
          <p className="text-gray-400 mb-8">{error || 'The requested service could not be found.'}</p>
          <Link href="/#services">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
          <Link href="/#services" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div>
            {service.featured && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
                <span className="text-emerald-400 text-sm font-medium">Featured Service</span>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            {service.name}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {service.description}
          </p>
          
          {/* <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(service.publishedAt).toLocaleDateString()}</span>
            </div>
            {service.keywords && service.keywords.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{service.keywords.length} keywords</span>
              </div>
            )}
          </div> */}
          
          {/* Keywords */}
          {service.keywords && service.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {service.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm border border-emerald-400/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Service Details */}
        {service.body && service.body.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Service Details</h2>
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <RichTextRenderer content={service.body} />
            </div>
          </div>
        )}

        {/* Related Projects */}
        {service.relatedProjects && service.relatedProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Related Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {service.relatedProjects.map((project, idx) => (
                <Card key={idx} className="bg-gray-900/50 border-gray-800 hover:border-emerald-400/30 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    
                    {project.description && (
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl p-8 border border-emerald-400/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Interested in this service?</h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how I can help you with {service.name.toLowerCase()}.
            </p>
            <Link href="/#contact">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-semibold px-8 py-3">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}