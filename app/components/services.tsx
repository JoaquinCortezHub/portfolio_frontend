"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Brain, Smartphone, Database, Cloud, Zap, ArrowRight, Sparkles, DatabaseIcon, LucideGitGraph, Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Service {
  _id: string
  name: string
  slug: { current: string }
  description: string
  keywords: string[]
  body: any[]
  relatedProjects: Array<{
    title: string
    url: string
    description?: string
  }>
  featured: boolean
  publishedAt: string
}

// Icon mapping based on service keywords
const getServiceIcon = (keywords: string[]) => {
  const keywordString = keywords?.join(' ').toLowerCase() || ''
  
  if (keywordString.includes('ai') || keywordString.includes('machine learning') || keywordString.includes('ml')) {
    return <Brain className="h-8 w-8" />
  }
  if (keywordString.includes('infrastructure') || keywordString.includes('data')) {
    return <LucideGitGraph className="h-8 w-8" />
  }
  if (keywordString.includes('mobile') || keywordString.includes('app')) {
    return <Smartphone className="h-8 w-8" />
  }
  if (keywordString.includes('database') || keywordString.includes('db')) {
    return <Database className="h-8 w-8" />
  }
  if (keywordString.includes('cloud') || keywordString.includes('aws') || keywordString.includes('azure')) {
    return <Cloud className="h-8 w-8" />
  }
  
  return <Code className="h-8 w-8" />
}

// Determine grid size based on content and featured status
const getServiceSize = (service: Service) => {
  if (service.featured) return "large"
  if (service.keywords && service.keywords.length > 3) return "medium"
  return "small"
}
export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (!response.ok) {
          throw new Error('Failed to fetch services')
        }
        const data = await response.json()
        setServices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Fallback to hardcoded services if API fails
        setServices([
          {
            _id: '1',
            name: "AI Infrastructure",
            slug: { current: 'ai-infrastructure' },
            description: "End-to-end ML powered insights to understand your business and plan for the future.",
            keywords: ["Data Analysis", "Model Training", "Analytics Dashboard Design", "AI", "Infrastructure"],
            body: [],
            relatedProjects: [],
            featured: true,
            publishedAt: new Date().toISOString(),
          },
          {
            _id: '2',
            name: "Agent Development",
            slug: { current: 'agent-development' },
            description: "Develop and maintain personalized AI agents tailored to your needs.",
            keywords: ["ML Models", "Multi-modal Agents", "Custom Automations", "AI"],
            body: [],
            relatedProjects: [],
            featured: true,
            publishedAt: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section id="services" className="py-20 px-6 bg-gray-900/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">What I Offer</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Loading services...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 px-6 bg-gray-900/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">What I Offer</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive development solutions tailored to your business needs
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {services.map((service, index) => {
            const serviceSize = getServiceSize(service)
            const serviceIcon = getServiceIcon(service.keywords)
            
            return (
              <Card
                key={service._id}
                onClick={() => router.push(`/services/${service.slug.current}`)}
                className={`group relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                  service.featured
                    ? "border-emerald-400/50 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                    : "border-gray-800/50 hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-500/10"
                } ${
                  serviceSize === "large"
                    ? "md:col-span-2 lg:col-span-3"
                    : serviceSize === "medium"
                      ? "md:col-span-2 lg:col-span-2"
                      : "md:col-span-2 lg:col-span-2"
                }`}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        service.featured
                          ? "bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/25"
                          : "bg-emerald-500/20 group-hover:bg-emerald-500/30"
                      }`}
                    >
                      <div className="text-white">{serviceIcon}</div>
                    </div>

                    {service.featured && (
                      <div className="px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30">
                        <span className="text-emerald-400 text-xs font-medium">Popular</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>

                    {/* Features/Keywords */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {service.keywords?.slice(0, 4).map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs border border-emerald-400/20"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/services/${service.slug.current}`)
                    }}
                    className={`w-full group/btn transition-all hover:cursor-pointer duration-300 ${
                      service.featured
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-semibold shadow-lg shadow-emerald-500/25"
                        : "bg-transparent border border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400"
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>

                {/* Glow Effect */}
                {service.featured && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-emerald-400/30">
            <div className="text-emerald-400">
              <Edit className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Need something custom?</p>
              <p className="text-gray-400 text-sm">Let's discuss your unique requirements</p>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold hover:cursor-pointer">Contact Me</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
