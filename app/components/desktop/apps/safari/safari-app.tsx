"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Lock,
  RotateCw,
  Share,
} from "lucide-react"
import { useEffect, useState } from "react"

interface BlogPost {
  _id: string
  title: string
  description?: string
  slug?: { current?: string }
  publishedAt?: string
  cover?: { asset?: { url?: string } }
  Type?: string
  categories?: { title: string }[]
  author?: { name: string }
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    _id: "1",
    title: "Building AI-Powered Applications with Next.js",
    description:
      "Exploring how to integrate AI capabilities into modern web applications using Next.js and the OpenAI API.",
    Type: "Article",
    publishedAt: "2024-01-15",
    author: { name: "Joaquin Cortez" },
  },
  {
    _id: "2",
    title: "The Future of Machine Learning in Web Development",
    description:
      "How ML is reshaping the way we build and optimize web experiences.",
    Type: "Research",
    publishedAt: "2024-02-20",
    author: { name: "Joaquin Cortez" },
  },
  {
    _id: "3",
    title: "Designing for AI: UX Patterns for Intelligent Interfaces",
    description:
      "Best practices for designing user interfaces that leverage AI capabilities.",
    Type: "Design",
    publishedAt: "2024-03-10",
    author: { name: "Joaquin Cortez" },
  },
]

export function SafariApp() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/posts", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const postData = Array.isArray(data) && data.length > 0 ? data : FALLBACK_POSTS
        setPosts(postData)
        setIsLoading(false)
      })
      .catch(() => {
        setPosts(FALLBACK_POSTS)
        setIsLoading(false)
      })
    return () => controller.abort()
  }, [])

  const currentUrl = selectedPost
    ? `joaquincortez.dev/blog/${selectedPost.slug?.current ?? selectedPost._id}`
    : "joaquincortez.dev/blog"

  return (
    <div className="flex flex-col h-full bg-[#1c1c1e]">
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#2c2c2e] border-b border-white/5">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedPost(null)}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded text-gray-600"
            aria-label="Go forward"
            disabled
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 border border-white/5">
          <Lock className="w-3 h-3 text-gray-500 shrink-0" />
          <span className="text-xs text-gray-400 truncate">{currentUrl}</span>
        </div>

        <button
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 transition-colors"
          aria-label="Refresh"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
        <button
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 transition-colors"
          aria-label="Share"
        >
          <Share className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bookmarks bar */}
      <div className="flex items-center gap-3 px-4 py-1.5 border-b border-white/5 text-[11px] text-gray-500">
        <Globe className="w-3 h-3" />
        <button
          onClick={() => setSelectedPost(null)}
          className="hover:text-white transition-colors"
        >
          All Posts
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-lg bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : selectedPost ? (
          <article className="p-6 max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs text-blue-400 hover:text-blue-300 mb-4 transition-colors"
            >
              &larr; Back to all posts
            </button>
            <h1 className="text-2xl font-bold text-white mb-3">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-6">
              {selectedPost.author?.name && (
                <span>{selectedPost.author.name}</span>
              )}
              {selectedPost.publishedAt && (
                <time>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(selectedPost.publishedAt))}
                </time>
              )}
            </div>
            <p className="text-gray-300 leading-relaxed">
              {selectedPost.description}
            </p>
          </article>
        ) : (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-1">Blog</h2>
            <p className="text-xs text-gray-500 mb-6">
              Thoughts on AI, development, and design.
            </p>
            <div className="space-y-3">
              {posts.map((post) => (
                <button
                  key={post._id}
                  onClick={() => setSelectedPost(post)}
                  className="w-full text-left p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {post.Type && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {post.Type}
                      </span>
                    )}
                    {post.publishedAt && (
                      <time className="text-[10px] text-gray-600">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(post.publishedAt))}
                      </time>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {post.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
