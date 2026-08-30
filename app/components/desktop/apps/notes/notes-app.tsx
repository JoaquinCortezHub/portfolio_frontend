"use client"

import { RichTextRenderer } from "@/components/ui/rich-text-renderer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StickyNote, Search } from "lucide-react"
import { useEffect, useState, useCallback } from "react"

interface Service {
  _id: string
  name: string
  slug: { current: string }
  description: string
  keywords?: string[]
  featured?: boolean
  body?: unknown[]
}

const CORE_SERVICES: Service[] = [
  {
    _id: "cloud-services",
    name: "Cloud Services",
    slug: { current: "cloud-services" },
    description: "Cloud environments designed, deployed, and monitored to give your applications a reliable foundation.",
    keywords: ["Cloud Architecture", "Deployment", "Monitoring"],
  },
  {
    _id: "vps-setup-management",
    name: "VPS Setup & Management",
    slug: { current: "vps-setup-management" },
    description: "Secure VPS setup, containerized deployments, and ongoing server configuration for production workloads.",
    keywords: ["Linux", "Docker", "Security"],
  },
  {
    _id: "n8n-workflow-implementation",
    name: "n8n Workflow Implementation",
    slug: { current: "n8n-workflow-implementation" },
    description: "Custom n8n workflows that connect your tools, automate repetitive tasks, and keep business data moving.",
    keywords: ["n8n", "APIs", "Automation"],
  },
  {
    _id: "web-products",
    name: "Web Products",
    slug: { current: "web-products" },
    description: "Fast, accessible web applications with polished UX and maintainable full-stack foundations.",
    keywords: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
]

const mergeServices = (data: unknown): Service[] => {
  const cmsServices = Array.isArray(data) ? (data as Service[]) : []
  const coreSlugs = new Set(
    CORE_SERVICES.map((service) => service.slug.current)
  )

  return [...CORE_SERVICES, ...cmsServices.filter(
    (service) =>
      service?.slug?.current && !coreSlugs.has(service.slug.current)
  )]
}

export function NotesApp() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [serviceDetail, setServiceDetail] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/services", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const serviceData = mergeServices(data)
        setServices(serviceData)
        setSelectedService(serviceData[0])
        setIsLoading(false)
      })
      .catch(() => {
        setServices(CORE_SERVICES)
        setSelectedService(CORE_SERVICES[0])
        setIsLoading(false)
      })
    return () => controller.abort()
  }, [])

  // Fetch full service body when selected
  useEffect(() => {
    if (!selectedService?.slug?.current) {
      setServiceDetail(null)
      return
    }
    setIsLoadingDetail(true)
    const controller = new AbortController()
    fetch(`/api/services/${selectedService.slug.current}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setServiceDetail(data)
        setIsLoadingDetail(false)
      })
      .catch(() => setIsLoadingDetail(false))
    return () => controller.abort()
  }, [selectedService?.slug?.current])

  const handleSelect = useCallback((service: Service) => {
    setSelectedService(service)
  }, [])

  return (
    <div className="flex h-full">
      {/* Sidebar — note list */}
      <div className="w-56 shrink-0 border-r border-white/5 bg-[#1c1c1e] flex flex-col">
        {/* Search bar */}
        <div className="p-2 border-b border-white/5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-500">
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs">Search</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-1">
            {isLoading ? (
              <div className="space-y-2 p-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : (
              services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => handleSelect(service)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                    selectedService?._id === service._id
                      ? "bg-yellow-500/10 border border-yellow-500/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <StickyNote className="w-3 h-3 text-yellow-500 shrink-0" />
                    <span className="text-xs font-medium text-white truncate">
                      {service.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-2 pl-5">
                    {service.description}
                  </p>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Note content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {selectedService ? (
          <>
            {/* Note header */}
            <div className="px-6 pt-5 pb-3 border-b border-white/5">
              <h2 className="text-xl font-bold text-yellow-100">
                {selectedService.name}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {selectedService.description}
              </p>
              {selectedService.keywords && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedService.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Note body */}
            <ScrollArea className="flex-1">
              <div className="p-6">
                {isLoadingDetail ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-4 rounded bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : serviceDetail?.body ? (
                  <RichTextRenderer content={serviceDetail.body} />
                ) : (
                  <p className="text-sm text-gray-400">
                    {selectedService.description}
                  </p>
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">
            Select a note to view
          </div>
        )}
      </div>
    </div>
  )
}
