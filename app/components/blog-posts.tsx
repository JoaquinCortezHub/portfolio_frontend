"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { client } from "@/sanity/client"
import { postsQuery } from "@/lib/sanity-queries"
import { useEffect, useState } from "react"

interface Post {
  _id: string
  title: string
  description: string
  slug: { 
    _type: string
    current: string 
  }
  publishedAt: string
  cover?: {
    asset: {
      _id: string
      url: string
    }
  }
  Type: string
  categories?: Array<{ title: string }>
  author?: { name: string }
  content?: Array<any>
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts from Sanity...")
        
        // Fallback mock data for showcase
        const mockPosts: Post[] = [
          {
            _id: "mock-1",
            title: "Building Scalable AI Applications with Next.js",
            description: "Learn how to integrate machine learning models into your Next.js applications for better user experiences.",
            slug: { _type: "slug", current: "ai-applications" },
            publishedAt: "2024-01-15T00:00:00Z",
            cover: {
              asset: {
                _id: "mock-image-1",
                url: "/placeholder.svg?height=200&width=300&text=AI+Applications"
              }
            },
            Type: "personal learning",
            categories: [{ title: "AI Development" }],
            author: { name: "Joaquín Cortez" }
          },
          {
            _id: "mock-2", 
            title: "The Future of Full-Stack Development",
            description: "Exploring emerging trends and technologies that are shaping the future of web development.",
            slug: { _type: "slug", current: "future-development" },
            publishedAt: "2024-01-10T00:00:00Z",
            cover: {
              asset: {
                _id: "mock-image-2",
                url: "/placeholder.svg?height=200&width=300&text=Future+Development"
              }
            },
            Type: "project update",
            categories: [{ title: "Web Development" }],
            author: { name: "Joaquín Cortez" }
          },
          {
            _id: "mock-3",
            title: "Optimizing Database Performance at Scale", 
            description: "Best practices for database optimization and scaling strategies for high-traffic applications.",
            slug: { _type: "slug", current: "database-performance" },
            publishedAt: "2024-01-05T00:00:00Z",
            cover: {
              asset: {
                _id: "mock-image-3",
                url: "/placeholder.svg?height=200&width=300&text=Database+Performance"
              }
            },
            Type: "personal learning",
            categories: [{ title: "Backend" }],
            author: { name: "Joaquín Cortez" }
          }
        ]
        
        try {
          const fetchedPosts = await client.fetch(postsQuery)
          console.log("Posts fetched successfully:", fetchedPosts)
          setPosts(fetchedPosts.length > 0 ? fetchedPosts : mockPosts)
        } catch (sanityError) {
          console.warn("Sanity fetch failed, using mock data:", sanityError)
          setPosts(mockPosts)
        }
        
        setError(null)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent pb-3">
            Recent Blog Posts
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights and tutorials on modern development practices and AI integration
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-800 animate-pulse rounded-t-lg" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-800 animate-pulse rounded" />
                    <div className="h-6 bg-gray-800 animate-pulse rounded" />
                    <div className="h-16 bg-gray-800 animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-red-400 font-semibold mb-2">Error Loading Posts</h3>
              <p className="text-red-300 text-sm mb-4">{error}</p>
              <p className="text-gray-400 text-xs">Check console for more details</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-gray-300 font-semibold mb-2">No Posts Found</h3>
              <p className="text-gray-400 text-sm">Create your first post in Sanity Studio</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post._id}
                className="bg-gray-900 border-gray-800 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.cover?.asset?.url || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-black font-medium">
                        {post.Type || post.categories?.[0]?.title || "Blog"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      {post.author && (
                        <>
                          <span className="mx-2">•</span>
                          <span>by {post.author.name}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400">{post.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
